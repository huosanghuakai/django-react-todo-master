# -*- coding: utf-8 -*-
# Generated by Django 1.11.15 on 2018-08-05 08:06
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('myapp', '0009_auto_20180805_1606'),
    ]

    operations = [
        migrations.AlterField(
            model_name='tasks',
            name='task_id',
            field=models.IntegerField(primary_key=True, serialize=False),
        ),
    ]
