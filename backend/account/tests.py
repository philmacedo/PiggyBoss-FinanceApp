from django.test import TestCase
from django.urls import reverse
from .factories import UserFactory
from django.contrib.sessions.models import Session
from django.contrib.auth import get_user_model, logout
from django.db import connection

class AccountTest(TestCase):
    
    def setUp(self):
        Session.objects.all().delete() 
        self.user = UserFactory.create()

    def test_register_form_valid(self):

        data = {
            'username': 'teste1',
            'first_name': "im",
            'last_name': "testing",
            'email': "test_email@email.com",
            'password1' : "randompassowrd123",
            'password2' : "randompassowrd123"
        }

        response = self.client.post(reverse('register'), data)

        self.assertEqual(response.status_code, 302)
        User = get_user_model()
        self.assertTrue(User.objects.filter(email=self.user.email).exists())

    def test_register_form_invalid_password_mismatch(self):

        data = {
            'username': 'teste2',
            'first_name': "im",
            'last_name': "testing_2",
            'email': "test_email_2@email.com",
            'password1' : "randompassowrd123",
            'password2' : "randompassowrd12345"
        }

        response = self.client.post(reverse('register'), data)
        form = response.context.get('form')
        self.assertFalse(form.is_valid())
        self.assertIn('Os dois campos de senha não correspondem.', form.errors['password2'])


    def test_register_form_invalid_email(self):

        data = {
            'username': 'teste3',
            'first_name': "im",
            'last_name': "testing_2",
            'email': "email",
            'password1' : "randompassowrd123",
            'password2' : "randompassowrd123"
        }

        response = self.client.post(reverse('register'), data)

        form = response.context.get('form')
        self.assertFalse(form.is_valid())
        self.assertIn('Informe um endereço de email válido.', form.errors['email'])

    def test_register_form_invalid_used_email(self):

        data = {
            'username' : self.user.email,
            'first_name': self.user.first_name,
            'last_name': self.user.last_name,
            'email': self.user.email,
            'password1' : "randompassowrd123",
            'password2' : "randompassowrd123"
        }

        response = self.client.post(reverse('register'), data)
        
        form = response.context.get('form')
        self.assertFalse(form.is_valid())
        self.assertIn('Este e-mail já está em uso.', form.errors['email'])

    def test_login_form_with_correct_credentials(self):
        data = {
            'username' : self.user.email,
            'password' : 'strongPassword123',
        }

        response = self.client.post(reverse('login'), data, follow=True)
        form = response.context.get('form')

        self.assertEqual(response.status_code, 200)
        self.assertTrue(response.context['user'].is_authenticated)

        logout(self.client)

    def test_login_form_with_incorrect_credentials(self):
        data = {
            'username': 'johndoe',
            'password': 'wrongpassword'
        }

        response = self.client.post(reverse('login'), data)

        self.assertFalse(response.context['user'].is_authenticated)

        form = response.context.get('form')
        
        self.assertIsNotNone(form)
        self.assertFalse(form.is_valid())
        self.assertIn('__all__', form.errors)

    @classmethod
    def tearDownClass(cls):
        connection.close()
        super().tearDownClass()