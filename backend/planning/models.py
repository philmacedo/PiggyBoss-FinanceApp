from django.db import models
from django.contrib.auth.models import User
from finance.models import Category
from datetime import date

class Budget(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name="budgets")
    category = models.ForeignKey(Category, on_delete=models.CASCADE, related_name='budgets')
    limit_value = models.DecimalField(max_digits=10, decimal_places=2)
    month = models.PositiveSmallIntegerField()
    year = models.PositiveSmallIntegerField()
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        verbose_name = "Budget"
        verbose_name_plural = "Budgets"
        unique_together = ('user', 'category', 'month', 'year') # evita duplicidade

    def __str__(self):
        return f"{self.category.name} - {self.month}/{self.year} (R$ {self.limit_value})"
