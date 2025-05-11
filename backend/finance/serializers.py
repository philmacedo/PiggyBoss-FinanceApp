from rest_framework import serializers
from .models import *

class BankAccountSerializer(serializers.ModelSerializer):
    class Meta:
        model = BankAccount
        fields = "__all__"

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

class CardSerializer(serializers.ModelSerializer):
    class Meta:
        model = Card
        fields = "__all__"

class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = "__all__"

    balance_type = serializers.ChoiceField(
        choices = [
            ('expenses', 'Expenses'),
            ('income', 'Income')
        ],
        error_messages = {
            'invalid_input' : 'invalid balance_type'
        }
    )

class ThirdSerializer(serializers.ModelSerializer):
    class Meta:
        model = Third
        fields = "__all__"

class TransactionsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Transactions
        fields = "__all__"

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

class CreditCardBillSerializer(serializers.ModelSerializer):
    class Meta:
        model = CreditCardBill
        fields = "__all__"
        read_only_fields = ['status']