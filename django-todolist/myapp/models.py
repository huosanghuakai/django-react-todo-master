# -*- coding: utf-8 -*-
from django.db import models

class Tasks(models.Model):
    
    PRIORITY=(
        (1,'PRI 1'),
        (2,'PRI 2'),
        (3,'PRI 3'),
        (4,'PRI 3'),
    )
    
    task_id = models.IntegerField(primary_key=True)
    content = models.CharField(max_length=100, default='type content')
    status = models.BooleanField(default=False)
    expire_date = models.DateField()
    priority = models.IntegerField(choices=PRIORITY,default=4)
    

    class Meta:
        ordering = ('priority',)