from django.urls import path

from core import views

urlpatterns = [
    path('',views.Index.as_view(),name="index"),
    path('save',views.SaveAxis.as_view(),name='save'),
    path('clear',views.ClearAxis.as_view(),name='clear'),
    path('last',views.LastAxis.as_view(),name='last'),
]
