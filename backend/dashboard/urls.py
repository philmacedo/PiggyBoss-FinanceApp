from django.urls import path
from . import views

urlpatterns = [
    path('month-balance/', views.MonthBalanceView.as_view(), name='month-balance'),
    path('expenses-by-category/', views.ExpensesByCategoryView.as_view(), name='expenses-by-category'),
    path('category-expenses-distribution/', views.CategoryExpensesDistributionView.as_view(), name='category-expenses-distribution'),
    path('month-bill-total/', views.MonthBillTotalView.as_view(), name='month-bill-total'),
    ]