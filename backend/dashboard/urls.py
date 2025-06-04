from django.urls import path
from . import views

urlpatterns = [
    path('api/month-balance/', views.month_transactions_balance, name='month-balance'),
    path('api/expenses-by-category/', views.expenses_by_category, name='expenses-by-category'),
    path('api/category-expenses-distribution/', views.category_expenses_distribution, name='category-expenses-distribution'),
    path('api/month-bill-total/', views.month_bill_total, name='month-bill-total'),
]