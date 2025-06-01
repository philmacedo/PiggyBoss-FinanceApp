from rest_framework import viewsets
from .models import *
from .serializers import *

class BankAccountViewSet(viewsets.ModelViewSet):
    queryset = BankAccount.objects.all()
    serializer_class = BankAccountSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return BankAccount.objects.filter(profile=self.request.user.profile)

class CardViewSet(viewsets.ModelViewSet):
    queryset = Card.objects.all()
    serializer_class = CardSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return Card.objects.filter(profile=self.request.user.profile)

class CategoryViewSet(viewsets.ModelViewSet):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return Category.objects.filter(profile=self.request.user.profile)

class ThirdViewSet(viewsets.ModelViewSet):
    queryset = Third.objects.all()
    serializer_class = ThirdSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return Third.objects.filter(profile=self.request.user.profile)

class TransactionsViewSet(viewsets.ModelViewSet):
    queryset = Transactions.objects.all()
    serializer_class = TransactionsSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return Transactions.objects.filter(profile=self.request.user.profile)

class CreditCardBillViewSet(viewsets.ModelViewSet):
    queryset = CreditCardBill.objects.all()
    serializer_class = CreditCardBillSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return CreditCardBill.objects.filter(profile=self.request.user.profile)