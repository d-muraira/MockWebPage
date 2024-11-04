from django.urls import path
from . import views


urlpatterns =[
    path("",views.home, name="home"),
    path("cafes/", views.cafes, name="cafes"), 
    path("pedidos/", views.pedidos, name="pedidos"),
    path('submit-form/', views.submit_form, name='submit_form'),
]