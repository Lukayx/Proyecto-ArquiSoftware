import requests
from faker import Faker

# Crear una instancia de Faker
fake = Faker()

# URL del endpoint
url = 'http://172.29.16.1:3000/api/postClient'

# Función para generar un teléfono aleatorio
def generar_telefono():
    return fake.phone_number()

# Datos a enviar (crear 600 clientes)
for _ in range(600):
    # Generar datos aleatorios usando Faker
    nombre = fake.name()  # Genera un nombre completo aleatorio
    email = fake.email()  # Genera un correo electrónico aleatorio
    telefono = generar_telefono()

    # Crear el cuerpo de la solicitud
    body = {
        "nombre": nombre,
        "email": email,
        "telefono": telefono
    }

    # Hacer la solicitud POST
    try:
        response = requests.post(url, json=body)
        
        # Verificar si la solicitud fue exitosa
        if response.status_code == 200:
            print(f"Cliente {nombre} agregado exitosamente.")
        else:
            print(f"Error al agregar cliente {nombre}: {response.text}")
    except requests.exceptions.RequestException as e:
        print(f"Error en la conexión: {e}")
