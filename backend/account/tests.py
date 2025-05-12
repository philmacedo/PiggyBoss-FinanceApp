from rest_framework.test import APITestCase
from rest_framework import status
from django.contrib.auth import get_user_model
from .factories import UserFactory

User = get_user_model()

class AccountAPITest(APITestCase):
    
    def setUp(self):
        self.user = UserFactory.create()

    def test_register_valid_data(self):
        data = {
            "first_name": "John",
            "last_name": "Doe",
            "email": "john.doe@example.com",
            "password": "StrongPass123!",
            "date_of_birth": "2000-01-01",
            "phone_number": "+5521999991234"
        }
        response = self.client.post("/account/register/", data, format="json")

        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertTrue(User.objects.filter(email="john.doe@example.com").exists())

    def test_register_valid_data_and_null_fields(self):
        data = {
            "first_name": "John",
            "last_name": "Doe",
            "email": "john.doe@example.com",
            "password": "StrongPass123!",
            "date_of_birth": None,
            "phone_number": None
        }
        response = self.client.post("/account/register/", data, format="json")

        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertTrue(User.objects.filter(email="john.doe@example.com").exists())

    def test_register_week_password(self):
        data = {
            "first_name": "Jane",
            "last_name": "Doe",
            "email": "jane.doe@example.com",
            "password": "senha12345678"
        }
        
        response = self.client.post("/account/register/", data, format="json")
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertIn("password", response.data)

    def test_register_invalid_email_format(self):
        data = {
            "first_name": "Bad",
            "last_name": "Email",
            "email": "not-an-email",
            "password": "StrongPass123!"
        }
        response = self.client.post("/account/register/", data, format="json")
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertIn("email", response.data)

    def test_register_email_already_used(self):
        data = {
            "first_name": "Existing",
            "last_name": "User",
            "email": self.user.email,
            "password": "AnotherPass123!"
        }
        response = self.client.post("/account/register/", data, format="json")
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertIn("email", response.data)

    def test_login_with_correct_credentials(self):
        data = {
            "email": self.user.email,
            "password": "strong@Password123"
        }
        response = self.client.post("/account/login/", data, format="json")
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertIn("access", response.data)
        self.assertIn("refresh", response.data)

    def test_login_with_wrong_credentials(self):
        data = {
            "email": self.user.email,
            "password": "wrongpassword"
        }
        response = self.client.post("/account/login/", data, format="json")
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)
        self.assertIn("detail", response.data)