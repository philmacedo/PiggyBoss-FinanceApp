from rest_framework import generics, status
from rest_framework.views import APIView
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.response import Response
from rest_framework import status
from .serializers import RegisterSerializer, LoginSerializer

from django.contrib.auth.models import User
from django.core.mail import send_mail
from django.contrib.auth.tokens import default_token_generator
from django.conf import settings

class RegisterView(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = RegisterSerializer
    permission_classes = [AllowAny]

    def create(self, request, *args, **kwargs):
        response = super().create(request, *args, **kwargs)
        return Response({'mensagem': 'Usuário criado com sucesso!'}, status=status.HTTP_201_CREATED)

class LoginView(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        serializer = LoginSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        return Response(serializer.validated_data, status=status.HTTP_200_OK)

class ForgotPasswordView(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        email_or_phone = request.data.get("emailOrPhone")
        user = User.objects.filter(email=email_or_phone).first()
        if user:
            token = default_token_generator.make_token(user)
            uid = user.pk
            reset_link = f"http://localhost:5173/reset-password/{uid}/{token}/"
            send_mail(
                'Recuperação de senha - PiggyBoss',
                f'Olá, clique no link para redefinir sua senha: {reset_link}',
                settings.DEFAULT_FROM_EMAIL,
                [user.email],
                fail_silently=False,
            )
        return Response({"message": "If the email exists, a link has been sent."}, status=status.HTTP_200_OK)
    
class UserInfoView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        profile = request.user.profile
        return Response({
            "full_name": profile.full_name,
            "email": request.user.email,
        })