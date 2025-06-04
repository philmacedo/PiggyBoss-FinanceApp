from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from django.db.models import Sum
from .models import Transactions, Category, CreditCardBill

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def month_transactions_balance(request):
    user = request.user
    month = request.query_params.get('month')
    year = request.query_params.get('year')

    expenses = Transactions.objects.filter(
        user=user,
        type='expense',
        date__month=month,
        date__year=year
    ).aggregate(total=Sum('value'))['total'] or 0

    incomes = Transactions.objects.filter(
        user=user,
        type='income',
        date__month=month,
        date__year=year
    ).aggregate(total=Sum('value'))['total'] or 0

    balance = incomes + expenses
    return Response({'balance': balance})


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def expenses_by_category(request):
    user = request.user
    category_name = request.query_params.get('category')
    card = request.query_params.get('card')
    month = request.query_params.get('month')
    year = request.query_params.get('year')

    try:
        category = Category.objects.get(user=user, name=category_name)
    except Category.DoesNotExist:
        return Response({'error': 'Category not found'}, status=404)

    transactions = category.transactions.filter()
    if card:
        transactions = transactions.filter(card=card)
    if month:
        transactions = transactions.filter(date__month=month)
    if year:
        transactions = transactions.filter(date__year=year)

    data = [{'id': t.id, 'value': t.value, 'date': t.date} for t in transactions]
    return Response(data)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def category_expenses_distribution(request):
    user = request.user
    card = request.query_params.get('card')
    month = request.query_params.get('month')
    year = request.query_params.get('year')

    filters = {
        'user': user,
        'type': 'expense'
    }
    if card:
        filters['card'] = card
    if month:
        filters['date__month'] = month
    if year:
        filters['date__year'] = year

    queryset = Transactions.objects.filter(**filters).values('category__name').annotate(total=Sum('value'))
    total_expenses = sum(item['total'] for item in queryset)

    result = []
    for item in queryset:
        percent = (item['total'] / total_expenses * 100) if total_expenses > 0 else 0
        result.append({
            'category': item['category__name'],
            'total': item['total'],
            'percent': round(percent, 2),
        })
    return Response(result)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def month_bill_total(request):
    user = request.user
    card = request.query_params.get('card')
    month = request.query_params.get('month')
    year = request.query_params.get('year')

    bills = CreditCardBill.objects.filter(user=user)
    if month:
        bills = bills.filter(bill_month=month)
    if year:
        bills = bills.filter(bill_year=year)
    if card:
        bills = bills.filter(card=card)

    bills = bills.annotate(total=Sum('transactions__amount'))
    data = []
    for bill in bills:
        data.append({
            'id': bill.id,
            'card': bill.card.id,
            'bill_month': bill.bill_month,
            'bill_year': bill.bill_year,
            'total': bill.total or 0,
        })

    return Response(data)