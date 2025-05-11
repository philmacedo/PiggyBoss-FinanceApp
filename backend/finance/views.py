from rest_framework import viewsets
from .models import *
from .serializers import *

class BankAccountViewSet(viewsets.ModelViewSet):
    queryset = BankAccount.objects.all()
    serializer_class = BankAccountSerializer

class CardViewSet(viewsets.ModelViewSet):
    queryset = Card.objects.all()
    serializer_class = CardSerializer

class CategoryViewSet(viewsets.ModelViewSet):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer

class ThirdViewSet(viewsets.ModelViewSet):
    queryset = Third.objects.all()
    serializer_class = ThirdSerializer

class TransactionsViewSet(viewsets.ModelViewSet):
    queryset = Transactions.objects.all()
    serializer_class = TransactionsSerializer

class CreditCardBillViewSet(viewsets.ModelViewSet):
    queryset = CreditCardBill.objects.all()
    serializer_class = CreditCardBillSerializer