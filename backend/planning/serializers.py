from rest_framework import serializers
from .models import *

class BudgetSerializer(serializers.ModelSerializer):
    class Meta:
        model = Budget
        fields = "__all__"
        read_only_fields = ['user']


    def validate_month(self, value):
        if value < 1 or value > 12:
            raise serializers.ValidationError("The month must be between 1 and 12.")
        return value

    def create(self, validated_data):
        validated_data['user'] = self.context['request'].user
        return super().create(validated_data)
    
