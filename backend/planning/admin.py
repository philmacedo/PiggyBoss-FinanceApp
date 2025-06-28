from django.contrib import admin
from .models import Budget

@admin.register(Budget)
class BudgetAdmin(admin.ModelAdmin):
    list_display = ('user', 'category', 'limit_value', 'month', 'year', 'created_at')
    list_filter = ('category','limit_value', 'month', 'year')
    search_fields = ('user',)


