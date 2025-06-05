from rest_framework import viewsets
from .models import *
from .serializers import *
from rest_framework.permissions import IsAuthenticated

class BankAccountViewSet(viewsets.ModelViewSet):
    queryset = BankAccount.objects.all()
    serializer_class = BankAccountSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return BankAccount.objects.filter(user=self.request.user)

class CardViewSet(viewsets.ModelViewSet):
    queryset = Card.objects.all()
    serializer_class = CardSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return Card.objects.filter(user=self.request.user)

class CategoryViewSet(viewsets.ModelViewSet):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return Category.objects.filter(user=self.request.user)

class ThirdViewSet(viewsets.ModelViewSet):
    queryset = Third.objects.all()
    serializer_class = ThirdSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return Third.objects.filter(user=self.request.user)

class TransactionsViewSet(viewsets.ModelViewSet):
    queryset = Transactions.objects.all()
    serializer_class = TransactionsSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return Transactions.objects.filter(user=self.request.user)

class CreditCardBillViewSet(viewsets.ModelViewSet):
    queryset = CreditCardBill.objects.all()
    serializer_class = CreditCardBillSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return CreditCardBill.objects.filter(user=self.request.user)