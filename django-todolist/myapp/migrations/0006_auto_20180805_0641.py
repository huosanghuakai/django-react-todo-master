# -*- coding: utf-8 -*-
# Generated by Django 1.11.15 on 2018-08-04 22:41
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('myapp', '0005_auto_20180805_0301'),
    ]

    operations = [
        migrations.AlterField(
            model_name='tasks',
            name='expire_date',
            field=models.DateField(),
        ),
    ]
