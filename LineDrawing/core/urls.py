from django.urls import path

from core import views

urlpatterns = [
    path('',views.Index.as_view(),name="index"),
    path('save',views.SaveAxes.as_view(),name='save'),
    path('clear',views.ClearAxes.as_view(),name='clear'),
    path('getlines',views.GetLines.as_view(),name='getlines'),
]
