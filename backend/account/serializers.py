from rest_framework import serializers
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework.exceptions import AuthenticationFailed
from django.contrib.auth.models import User
from django.contrib.auth import authenticate
from django.core.validators import validate_email
from django.core.exceptions import ValidationError as DjangoValidationError
from phonenumber_field.serializerfields import PhoneNumberField
from account.models import Profile
import re


class RegisterSerializer(serializers.ModelSerializer):
    first_name = serializers.CharField()
    last_name = serializers.CharField()
    email = serializers.EmailField()
    date_of_birth = serializers.DateField(required=False, allow_null=True)
    phone_number = PhoneNumberField(region="BR", required=False, allow_null=True)
    password = serializers.CharField(write_only=True)

    class Meta:
        model = User
        fields = ['first_name', 'last_name', 'email', 'date_of_birth', 'phone_number', 'password']

    def validate_email(self, value):
        if User.objects.filter(email=value).exists():
                raise serializers.ValidationError("This email is already in use.")
        
        return value

    def validate_password(self, value):
        if len(value) < 8:
            raise serializers.ValidationError("Password must be at least 8 characters long.")
        if not re.search(r"[A-Z]", value):
            raise serializers.ValidationError("Password must contain at least one uppercase letter.")
        if not re.search(r"[a-z]", value):
            raise serializers.ValidationError("Password must contain at least one lowercase letter.")
        if not re.search(r"[0-9]", value):
            raise serializers.ValidationError("Password must contain at least one number.")
        if not re.search(r"[!@#$%^&*(),.?\":{}|<>]", value):
            raise serializers.ValidationError("Password must contain at least one special character.")
        return value

    def create(self, validated_data):
        first_name = validated_data.pop('first_name')
        last_name = validated_data.pop('last_name')
        full_name = f'{first_name} {last_name}'
        password = validated_data.pop('password')
        phone_number = validated_data.pop('phone_number', None)
        date_of_birth = validated_data.pop('date_of_birth', None)

        validated_data['username'] = validated_data['email']
        user = User.objects.create(
            username = validated_data['username'],
            email = validated_data['email'],
            first_name=first_name,
            last_name=last_name
        )
        user.set_password(password)
        user.save()

        Profile.objects.create(
            user=user,
            full_name=full_name,
            phone_number=phone_number,
            date_of_birth=date_of_birth
        )

        return user


class LoginSerializer(serializers.Serializer):
    email = serializers.EmailField()
    password = serializers.CharField(write_only=True)

    class Meta:
        model = User
        fields = ['email', 'password']

    def validate_email(self, value):
        try:
            validate_email(value)
        except DjangoValidationError:
            raise serializers.ValidationError("Invalid email format.")
        return value

    def validate(self, validation_data):
        email = validation_data.get('email')
        password = validation_data.get('password')

        user = authenticate(username=email, password=password)
        if not user:
            raise AuthenticationFailed('Invalid credentials.')

        refresh = RefreshToken.for_user(user)
        return {
            'access': str(refresh.access_token),
            'refresh': str(refresh),
        }