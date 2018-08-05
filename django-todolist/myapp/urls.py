from django.conf.urls import url
from myapp import views

urlpatterns = [
    url(r'^myapp/$', views.task_list),
    url(r'^myapp/(?P<id>[0-9]+)/$', views.task_detail),
]