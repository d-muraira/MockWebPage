from django.shortcuts import render
import pymongo
import base64
from django.http import HttpResponse
import json

def cafes(request):
    client = pymongo.MongoClient("mongodb://localhost:27017/")
    db = client["ColdBro"]
    collection = db["Cafes"]
    cafes = []
    documents = collection.find()
    for doc in documents:
        image_data = base64.b64encode(doc.get("Imagen")).decode('utf-8')
        cafe = {
            'tipoCafe': doc.get("TipoCafe"),
            'descripcion': doc.get("Descripcion"),
            'ingredientes': doc.get("Ingredientes"),
            'imagen': f"data:image/png;base64,{image_data}" 
        }
        cafes.append(cafe)


    context = {'cafes': cafes}
    return render(request, 'cafes.html', context)

def home(request):
    return render(request,"home.html")

def pedidos(request):
    return render(request,"pedidos.html")

def submit_form(request):
    if request.method == "POST":
        client =pymongo.MongoClient("mongodb://localhost:27017/")
        db = client["ColdBro"]
        collection = db["Ordenes"]
        name = request.POST.get('name')
        email = request.POST.get('email')
        phone = request.POST.get('phone')
        street = request.POST.get('street')
        postal_code = request.POST.get('postal-code')
        exterior_number = request.POST.get('exterior-number')
        cart_data = json.loads(request.POST.get('cart-data', '{}'))
        estate="Activo"

        datos={
            "Calle" :street,
            "Codigo Postal" : postal_code,
            "Nombre": name,
            "Numero Exterior":exterior_number,
            "Numero Telefono":phone,
            "Correo":email,
            "Pedido":cart_data,
            "Estado":estate
        }
        collection.insert_one(datos)
       
        print(f"Name: {name}")
        print(f"Email: {email}")
        print(f"Phone: {phone}")
        print(f"Street: {street}")
        print(f"Postal Code: {postal_code}")
        print(f"Exterior Number: {exterior_number}")
        print(f"Cart Data: {cart_data}")
        return HttpResponse("Se ha creado tu orden, gracias por ordenar con nosotros")

    return HttpResponse("Invalid request")
