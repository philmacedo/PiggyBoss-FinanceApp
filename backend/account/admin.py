from django.contrib import admin
from .models import Profile

@admin.register(Profile)
class ProfileAdmin(admin.ModelAdmin):
    list_display = ('user', 'full_name', 'phone_number', 'date_of_birth', 'preferred_language', 'created_at')
    search_fields = ('user__username', 'full_name', 'phone_number')
    list_filter = ('preferred_language', 'created_at')
    readonly_fields = ('created_at', 'updated_at')
