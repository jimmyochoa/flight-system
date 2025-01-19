# 🚀 **Sistema de Gestión de Vuelos - Dockerized API Restful**

Sistema completamente dockerizado que permite gestionar vuelos, usuarios, autenticación, y reservas, todo en contenedores de Docker para facilitar el despliegue y la escalabilidad.

---
## 📦 **Tecnologías Usadas**
- Node.js 🚀 para la creación de microservicios
- MongoDB para la base de datos (Dockerizada también)
- Docker para la contenedorización y orquestación
- JWT para la autenticación
- Axios para la comunicación entre microservicios
- Postman para probar la API y ver la documentación

---
## 📋 **Descripción corta**

Una plataforma para gestionar vuelos, crear y cancelar reservas, y autenticar usuarios. Todo está completamente contenedorizado y se comunica entre microservicios usando Docker y APIs RESTful.

---

## 🛠️ **Requisitos Técnicos**

Antes de comenzar, asegúrate de tener los siguientes requisitos:

- Docker 🔵 (Y Docker Compose si deseas usar la configuración de múltiples contenedores)
- Docker Hub o imágenes locales para todos los servicios
- Postman para probar la API 📝
  
---

## 🏃‍♂️ **Pasos para iniciar la aplicación con Docker**

1. **Clonar el repositorio**
   Primero, clona el repositorio del proyecto en tu máquina local:
   ```bash
   git clone https://github.com/jimmyochoa/flight-system.git
   cd flight-system
   
2. **Construir y desplegar los contenedores con Docker Compose**
   ```bash
   docker-compose up -d --build
   
3. **Verifica que los contenedores estén corriendo**
   ```bash
   docker ps
   
4. **Accede a los microservicios**
   Cada microservicio estará corriendo en los puertos especificados (3000, 3001, 3002, 3003). Puedes probar las rutas utilizando Postman o realizar peticiones directamente desde tu navegador.
5. **Pruebas con Postman**
   Para ver cómo funciona la API y probar los endpoints, consulta nuestra documentación interactiva de Postman en este enlace:
   [Documentación Postman](https://documenter.getpostman.com/view/36488040/2sAYQanBcj)📚


