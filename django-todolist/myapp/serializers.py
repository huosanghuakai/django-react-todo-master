# -*- coding: utf-8 -*-
from rest_framework import serializers
from models import Tasks

# 它序列化的方式很类似于Django的forms
class TasksSerializer(serializers.ModelSerializer):
    class Meta:
        model = Tasks
        fields = ('task_id', 'content', 'status', 'expire_date', 'priority')