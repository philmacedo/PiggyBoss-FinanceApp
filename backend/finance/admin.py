from django.contrib import admin
from .models import (
    Institution, BankAccount, Card,
    Category, third, Transactions, CreditCardBill
)

@admin.register(Institution)
class InstitutionAdmin(admin.ModelAdmin):
    list_display = ('name', 'code', 'institution_type', 'active', 'created_at')
    list_filter = ('institution_type', 'active')
    search_fields = ('name', 'code')


@admin.register(BankAccount)
class BankAccountAdmin(admin.ModelAdmin):
    list_display = ('profile_id', 'institution', 'account_type')
    list_filter = ('account_type', 'institution')
    search_fields = ('profile_id__user__username',)


@admin.register(Card)
class CardAdmin(admin.ModelAdmin):
    list_display = ('name', 'profile', 'bank', 'created_at')
    search_fields = ('name', 'profile__user__username')


@admin.register(Category)
class CategoryAdmin(admin.ModelAdmin):
    list_display = ('name', 'profile', 'balance_type')
    list_filter = ('balance_type',)
    search_fields = ('name',)


@admin.register(third)
class ThirdAdmin(admin.ModelAdmin):
    list_display = ('name', 'related', 'age', 'profile')
    search_fields = ('name', 'related')


@admin.register(Transactions)
class TransactionsAdmin(admin.ModelAdmin):
    list_display = ('name', 'amount', 'date', 'payment_method', 'profile')
    list_filter = ('payment_method', 'date', 'category')
    search_fields = ('name', 'description')


@admin.register(CreditCardBill)
class CreditCardBillAdmin(admin.ModelAdmin):
    list_display = ('card', 'bill_month', 'due_date', 'total_amount', 'status')
    list_filter = ('status', 'bill_month')
