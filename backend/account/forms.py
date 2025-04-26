from django import forms
from django.contrib.auth.forms import UserCreationForm
from django.contrib.auth.models import User
import random
import string

class RegisterForm(UserCreationForm):
    first_name = forms.CharField(max_length=30, required=True, widget=forms.TextInput(attrs={'placeholder': 'Nome'}))
    last_name = forms.CharField(max_length=30, required=True, widget=forms.TextInput(attrs={'placeholder': 'Sobrenome'}))
    email = forms.EmailField(required=True, widget=forms.EmailInput(attrs={'placeholder': 'E-mail'}))
    password1 = forms.CharField(required=True, widget=forms.PasswordInput(attrs={'placeholder': 'Senha'}), label="Senha")
    password2 = forms.CharField(required=True, widget=forms.PasswordInput(attrs={'placeholder': 'Confirme sua senha'}), label="Confirme sua senha")

    class Meta:
        model = User
        fields = ['first_name', 'last_name', 'email', 'password1', 'password2']


    def generate_unique_username(self, first_name, last_name):
        base_username = f"{first_name.lower()}-{last_name.lower()}"
        
        if User.objects.filter(username=base_username).exists():
            suffix = ''.join(random.choices(string.ascii_lowercase + string.digits, k=4))
            base_username = f"{base_username}-{suffix}"

        return base_username

    def clean_username(self):
        first_name = self.cleaned_data.get('first_name')
        last_name = self.cleaned_data.get('last_name')

        username = self.generate_unique_username(first_name, last_name)

        return username
    
    def clean_email(self):
        email = self.cleaned_data.get('email')
        # Checa se o email já está em uso
        if User.objects.filter(email=email).exists():
            raise forms.ValidationError("Este e-mail já está em uso.")
        return email
