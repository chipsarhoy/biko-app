from django.shortcuts import render

# Create your views here.
from django.http import HttpResponse

def home(request):
    return HttpResponse("Oh ye")

def stuff(request):
    return HttpResponse("<h1>Some stuff :D</h1>")