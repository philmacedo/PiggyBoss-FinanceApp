from ..account.models import Profile
from django.db.models import Sum
from ..finance.models import *

def get_month_transactions_balance(user, month, year):
    expenses = Transactions.objects.filter(
        user=user,
        type='expense',
        date__month=month,
        date__year=year
    ).aggregate(total=Sum('value'))['total']

    incomes = Transactions.objects.filter(
        user=user,
        type='income',
        date__month=month,
        date__year=year
    ).aggregate(total=Sum('value'))['total']

    return (expenses + incomes)

def get_expenses_by_category( user, category, card = None, month = None, year = None ):
    category = Category.objects.get(user = user , name = category)

    if card:
        transactions = category.transactions.filter(
            card = card,
        )

    if month:
        transactions = category.transactions.filter(
            date__month = month,
        )

    if year:
        transactions = category.transactions.filter(
            date__year = year,
        )

    return transactions

def get_category_expenses_distribution(user, card = None, month = None, year = None):
    if card:
        queryset = Transactions.objects.filter(
        user=user,
        type='expense',
        card=card,
        date__month=month,
        date__year=year,
        ).values('category__name').annotate(total=Sum('value'))

        total_expenses = sum(item['total'] for item in queryset)

    else:
        queryset = Transactions.objects.filter(
        user=user,
        type='expense',
        date__month=month,
        date__year=year,
        ).values('category__name').annotate(total=Sum('value'))

        total_expenses = sum(item['total'] for item in queryset)

    result = []
    for item in queryset:
        percent = (item['total'] / total_expenses * 100) if total_expenses > 0 else 0
        result.append({
            'category': item['category__name'],
            'total': item['total'],
            'percent': round(percent, 2),
        })
    
    return result
                                          

def get_month_bill_total(user, card = None, month = None, year = None):
    bills = CreditCardBill.objects.filter(user=user)

    if month:
        bills = bills.filter(bill_month=month)
    if year:
        bills = bills.filter(bill_year=year)
    if card:
        bills = bills.filter(card=card)
        
    bills = bills.annotate(total=Sum('transactions__amount'))

    return bills




