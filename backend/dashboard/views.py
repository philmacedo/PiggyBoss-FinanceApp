from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated

from .services import (
    get_month_transactions_balance,
    get_expenses_by_category,
    get_category_expenses_distribution,
    get_month_bill_total
)

class MonthBalanceView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        month = int(request.query_params.get('month'))
        year = int(request.query_params.get('year'))

        total = get_month_transactions_balance(request.user, month, year)
        return Response({'balance': total})


class ExpensesByCategoryView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        category = request.query_params.get('category')
        card = request.query_params.get('card')
        month = request.query_params.get('month')
        year = request.query_params.get('year')

        transactions = get_expenses_by_category(
            user=request.user,
            category=category,
            card=card,
            month=int(month) if month else None,
            year=int(year) if year else None
        )
        data = [
            {'id': t.id, 'amount': t.amount, 'date': t.date, 'description': t.description}
            for t in transactions
        ]
        return Response(data)


class CategoryExpensesDistributionView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        card = request.query_params.get('card')
        month = request.query_params.get('month')
        year = request.query_params.get('year')

        data = get_category_expenses_distribution(
            user=request.user,
            card=card,
            month=month,
            year=year
        )
        return Response(data)


class MonthBillTotalView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        month = request.query_params.get('month')
        year = request.query_params.get('year')

        total = get_month_bill_total(
            user=request.user,
            month=int(month) if month else None,
            year=int(year) if year else None
        )
        
        return Response(total)
