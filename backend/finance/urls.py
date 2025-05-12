from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import *

router = DefaultRouter()
router.register(r'bank_account', BankAccountViewSet)
router.register(r'card', CardViewSet)
router.register(r'category', CategoryViewSet)
router.register(r'third', ThirdViewSet)
router.register(r'transactions', TransactionsViewSet)
router.register(r'creditcardbill', CreditCardBillViewSet)

urlpatterns = [
    path('', include(router.urls)),
]