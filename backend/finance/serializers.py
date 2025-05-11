from rest_framework import serializers
from rest_framework.permissions import IsAuthenticated
from .models import *

class BankAccountSerializer(serializers.ModelSerializer):
    class Meta:
        model = BankAccount
        fields = "__all__"
        read_only_fields = ['profile'] 
        
    account_type = serializers.ChoiceField(
        choices = [
            ('checking', 'Checking'), 
            ('savings', 'Savings'),
            ('investment', 'Investment'),
            ('joint', 'Joint')
        ],
        error_messages = {
            'invalid_choice' : 'The account type must be one of the following: ' \
            + 'Checking, Savings, Investment, Joint'
        }
    )

    def create(self, validated_data):
        validated_data['profile'] = self.context['request'].user.profile
        return super().create(validated_data)

class CardSerializer(serializers.ModelSerializer):
    class Meta:
        model = Card
        fields = "__all__"
        read_only_fields = ['profile']
    
    def create(self, validated_data):
        validated_data['profile'] = self.context['request'].user.profile
        return super().create(validated_data)

class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = "__all__"
        read_only_fields = ['profile']

    balance_type = serializers.ChoiceField(
        choices = [
            ('expenses', 'Expenses'),
            ('income', 'Income')
        ],
        error_messages = {
            'invalid_input' : 'invalid balance_type'
        }
    )

    def create(self, validated_data):
        validated_data['profile'] = self.context['request'].user.profile
        return super().create(validated_data)

class ThirdSerializer(serializers.ModelSerializer):
    class Meta:
        model = Third
        fields = "__all__"
        read_only_fields = ['profile']

    def create(self, validated_data):
        validated_data['profile'] = self.context['request'].user.profile
        return super().create(validated_data)
    
class TransactionsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Transactions
        fields = "__all__"
        read_only_fields = ['profile']

    transactions_type = serializers.ChoiceField(
        choices = [
            ('income', 'Income'),
            ('expense', 'Expense'),
        ],
        error_messages = {
            'invalid_input' : 'Transaction type input must be income or expense'
        }
    )

    payment_method = serializers.ChoiceField(
        choices = [
            ('card', 'Card'),
            ('cash', 'Cash'),
            ('pix', 'Pix')
        ],
        error_messages = {
            'invalid_choice' : 'The payment_method must be one of the following: ' \
            + 'Card, Cash or Pix'
        }
    )

    def create(self, validated_data):
        validated_data['profile'] = self.context['request'].user.profile
        return super().create(validated_data)

class CreditCardBillSerializer(serializers.ModelSerializer):
    class Meta:
        model = CreditCardBill
        fields = "__all__"
        read_only_fields = ['profile', 'status']

    def create(self, validated_data):
        validated_data['profile'] = self.context['request'].user.profile
        return super().create(validated_data)