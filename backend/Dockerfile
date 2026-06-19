# 1. Definir la imagen base oficial de Python (versión ligera)
FROM python:3.11-slim

# 2. Crear y establecer el directorio de trabajo dentro del contenedor
WORKDIR /app

# 3. Copiar el archivo de dependencias antes de instalar
COPY requirements.txt .

# 4. Instalar las librerías necesarias de Python sin almacenar caché
RUN pip install --no-cache-dir -r requirements.txt

# 5. Copiar todo el contenido de la carpeta backend actual dentro del contenedor
COPY . .

# 6. Informar a Docker que el contenedor escuchará en el puerto 8000
EXPOSE 8000

# 7. Comando para arrancar el servidor Uvicorn con FastAPI
CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000"]