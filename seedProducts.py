import requests
from faker import Faker
import random

# Inicializar Faker con la localización en español (España)
fake = Faker('es_ES')

# Obtener el número total de usuarios
users_count_url = "http://localhost:3000/api/usersCount"
response = requests.get(users_count_url)
data = response.json()

if response.status_code == 200 and 'totalUsuarios' in data:
    total_usuarios = data['totalUsuarios']
    print(f"Total de usuarios: {total_usuarios}")

    # Generar 1000 productos
    for _ in range(1000):
        # Seleccionar un usuario aleatorio
        random_user_id = random.randint(1, total_usuarios)

        # Generar datos aleatorios para el producto
        producto_data = {
            "precio": round(random.uniform(10, 500), 2),
            "descripcion": fake.sentence(),  # Descripción en español
            "nombre": fake.word() + " " + fake.word(),  # Nombre en español
            "vendedor": random_user_id,  # Usar el ID de usuario aleatorio
            "fechaPublicacion": fake.date_this_year().isoformat()  # Fecha en formato ISO
        }

        # Hacer el POST para crear el producto
        post_product_url = "http://localhost:3000/api/postProduct"
        product_response = requests.post(post_product_url, json=producto_data)

        if product_response.status_code == 200:
            print(f"Producto creado con éxito: {producto_data['nombre']}")
        else:
            print(f"Error al crear producto: {producto_data['nombre']}")
else:
    print("Error al obtener el número de usuarios")
