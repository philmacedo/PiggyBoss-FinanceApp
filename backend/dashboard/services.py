from django.db.models import Sum
from finance.models import *

def get_month_transactions_balance(user, month, year):
    expenses = Transactions.objects.filter(
        user=user,
        transactions_type='expense',
        date__month=month,
        date__year=year
    ).aggregate(total=Sum('amount'))['total'] or 0

    incomes = Transactions.objects.filter(
        user=user,
        transactions_type='income',
        date__month=month,
        date__year=year
    ).aggregate(total=Sum('amount'))['total'] or 0

    return (incomes - expenses)

def get_expenses_by_category( user, category, card = None, month = None, year = None ):
    category = Category.objects.get(user = user , name = category)
    transactions = category.transactions.all()

    if card:
        transactions = transactions.filter(
            card = card,
        )

    if month:
        transactions = transactions.filter(
            date__month = month,
        )

    if year:
        transactions = transactions.filter(
            date__year = year,
        )

    return transactions

def get_category_expenses_distribution(user, card = None, month = None, year = None):
    transactions = Transactions.objects.filter(
        user=user,
        transactions_type='expense',
        )

    if card:
        transactions = transactions.filter(
            card=card
        )

    if month:
        transactions = transactions.filter(
            date__month=month
        )

    if year:
        transactions = transactions.filter(
            date__year=year
        )


    transactions = transactions.values('category__name').annotate(total=Sum('amount'))
    total_expenses = sum(item['total'] for item in transactions)

    result = []
    for item in transactions:
        percent = (item['total'] / total_expenses * 100) if total_expenses > 0 else 0
        result.append({
            'category': item['category__name'],
            'total': item['total'],
            'percent': round(percent, 2),
        })
    
    return result
                                          

def get_month_bill_total(user, month=None, year=None):
    transactions = Transactions.objects.filter(
        user=user,
        transactions_type='expense',
        payment_method='credit',
    )

    if month:
        transactions = transactions.filter(date__month=month)
    if year:
        transactions = transactions.filter(date__year=year)

    totals = (
        transactions.values('card__name')
        .annotate(total=Sum('amount'))
        .order_by('card__name')
    )

    return totals




