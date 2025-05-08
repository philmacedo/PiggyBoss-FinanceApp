import factory
from django.contrib.auth.models import User
import random, string

class UserFactory(factory.django.DjangoModelFactory):
    class Meta:
        model = User
    
    @staticmethod
    def generate_random_characters():
        return ''.join(random.choices(string.ascii_lowercase + string.digits, k=3))
    
    first_name = factory.Faker('first_name')
    last_name = factory.Faker('last_name')
    email = factory.LazyAttribute(
        lambda o: f"{o.first_name.lower()}_{o.last_name.lower()}_{''.join(random.choices(string.ascii_lowercase + string.digits, k=3))}@example.com")
    password = factory.PostGenerationMethodCall('set_password', 'strongPassword123')

    @factory.lazy_attribute
    def username(self):
        return self.email