from django.db import models
from colorfield.fields import ColorField
from phonenumber_field.modelfields import PhoneNumberField
from datetime import date
from account.models import Profile

class Institution(models.Model):
    name = models.CharField(max_length=50, unique=True)
    code = models.CharField(max_length=50, unique=True)
    institution_type = models.CharField(
        max_length=20,
        choices=[
            ('bank', 'Bank'),
            ('broker', 'Broker'),
            ('fintech', 'Fintech'),
            ('other', 'Other'),
        ]
    )
    active = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.name

    class Meta:
        verbose_name = "Institution"
        verbose_name_plural = "Institutions"

class BankAccount(models.Model):
    profile = models.ForeignKey(Profile, on_delete=models.CASCADE, related_name="bank_accounts")
    institution = models.ForeignKey(Institution, on_delete=models.SET_NULL, null=True, blank=True, related_name="bank_accounts")
    account_type = models.CharField(max_length=20, 
        choices=[
        ('checking', 'Checking'), 
        ('savings', 'Savings'),
        ('investment', 'Investment'),
        ('joint', 'Joint')
        ]
    )

    def __str__(self):
        return self.institution.name
    
    class Meta:
        verbose_name = "Bank Account"
        verbose_name_plural = "Bank Accounts"

class Card(models.Model):
    profile = models.ForeignKey(Profile, on_delete=models.CASCADE, related_name='cards')
    name = models.CharField(max_length=30)
    bank = models.ForeignKey(BankAccount, on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.name
    
    class Meta:
        verbose_name = "Card"
        verbose_name_plural = "Cards"

class Category(models.Model):
    profile = models.ForeignKey(Profile, on_delete=models.CASCADE, related_name='category')
    name = models.CharField(max_length=30, unique=True)
    color = ColorField(default='#FF0000')
    icon = models.ImageField(upload_to='category_images', null=True, blank=True)
    balance_type = models.CharField(max_length=20, choices=[
        ('expenses', 'Expenses'), 
        ('income', 'Income')
        ])
    
    class Meta:
        verbose_name = "Category"
        verbose_name_plural = "Categories"

    def __str__(self):
        return self.name
    
class Third(models.Model):
    profile = models.ForeignKey(Profile, on_delete=models.CASCADE, related_name='thirds')
    name = models.CharField(max_length=30)
    related = models.CharField(max_length=30)
    age = models.IntegerField()    
    number = PhoneNumberField(region="BR")

    class Meta:
        verbose_name = "Third"
        verbose_name_plural = "Thirds"
    
    def __str__(self):
        return self.name

class Transactions(models.Model):
    profile = models.ForeignKey(Profile, on_delete=models.CASCADE, related_name='transactions')
    name = models.CharField(max_length=50)
    transactions_type = models.CharField(max_length=50, choices=[
        ('income', 'Income'),
        ('expense', 'Expense'),
        ],
        default='expense')
    amount = models.DecimalField(max_digits=12, decimal_places=2)
    category = models.ForeignKey(Category, on_delete=models.SET_NULL, null=True, blank=True)
    date = models.DateField(default=date.today)
    payment_method = models.CharField(max_length=50, choices=[
        ('card', 'Card'),
        ('cash', 'Cash'),
        ('pix', 'Pix')
        ])
    card = models.ForeignKey(Card, on_delete=models.SET_NULL, null=True, blank=True)
    bank = models.ForeignKey(BankAccount, on_delete=models.SET_NULL, null=True, blank=True)
    third = models.ForeignKey(Third, on_delete=models.SET_NULL, null=True, blank=True)
    description = models.TextField(null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        verbose_name = "Transaction"
        verbose_name_plural = "Transactions"

    def __str__(self):
        return self.name
    
class CreditCardBill(models.Model):
    card = models.ForeignKey(Card, on_delete=models.CASCADE, related_name='bills')
    bill_month = models.DateField()
    due_date = models.DateField()
    total_amount = models.DecimalField(max_digits=14, decimal_places=2)
    status = models.CharField(max_length=20, 
        choices=[
        ('paid', 'Paid'),
        ('unpaid', 'Unpaid'),
        ('overdue', 'Overdue')
        ],
        default='unpaid'
    )

    class Meta:
        verbose_name = "Credit Card Bill"
        verbose_name_plural = "Credit Card Bills"

    def __str__(self):
        return self.bill_month