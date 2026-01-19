# 🌍 PROYECTO MÓDULO 6: API de Certificaciones – Node.js + Express + MongoDB

## ÍNDICE
1. Introducción  
2. Contexto de negocio  
3. Modelos del sistema  
4. Roles y reglas de autorización  
5. Endpoints implementados  
6. Documentación con Swagger / OpenAPI  
7. Persistencia y despliegue  
8. Plan de pruebas (QA)  
9. Instalación y uso local  
10. Comentarios finales  

---

## 1. Introducción

Este proyecto fue desarrollado en el marco del **Bootcamp Desarrollo Web Full Stack**, correspondiente al **Módulo 6**, cuyo foco es el desarrollo de un **backend con Node.js, Express y MongoDB**, aplicando buenas prácticas de diseño, seguridad y arquitectura.

El objetivo del proyecto es construir una **API REST** que permita gestionar **usuarios** y **productos**, donde el producto principal del negocio son las **certificaciones**.

La aplicación incluye:
- Autenticación con JWT  
- Autorización basada en roles y campus  
- Persistencia en MongoDB (local y Atlas)  
- Documentación con Swagger / OpenAPI  
- Despliegue en Render  

---

## 2. Contexto de negocio

El sistema representa un escenario institucional donde se administran **certificaciones académicas**, las cuales:

- Se imparten en un **campus** específico (Santiago o Concepción)
- Son gestionadas por distintas **unidades académicas**
- Pueden ser creadas, editadas y visualizadas según el **rol del usuario**

Aunque el proyecto está diseñado pensando en un sistema escalable (con cursos y requisitos asociados a certificaciones), **para efectos de la entrega del Módulo 6 el foco se concentra en dos modelos exigidos por el enunciado**:

- **Usuarios**
- **Productos**, representados por el modelo **Certificación**

---

## 3. Modelos del sistema

### 👤 User (Usuario)
Representa a los usuarios del sistema.  
Cada usuario cuenta con:
- Nombre
- Email (único)
- Password (encriptado)
- Rol

### 🎓 Certification (Certificación / Producto)
Representa el producto del negocio.  
Cada certificación contiene:
- Código de certificación (`certCode`, único)
- Nombre
- Campus
- Unidad responsable (`ownerUnit`)
- Usuario que la creó (`createdBy`)

🔗 **Relación entre modelos**  
Cada certificación queda asociada al usuario que la creó mediante el campo `createdBy`, estableciendo una relación directa entre **usuario** y **producto**.

### 📚 Modelos adicionales (escala futura)
El proyecto también incluye los modelos:
- **Course**
- **Requirement**

Estos modelos no son requeridos explícitamente para la evaluación del Módulo 6, pero fueron incorporados como base para un sistema más robusto y escalable.

---

## 4. Roles y reglas de autorización

### Roles disponibles
- `admin`
- `sede_santiago`
- `sede_concepcion`

### Reglas principales
- **Admin**
  - Puede crear, editar, eliminar y visualizar todas las certificaciones
  - Puede operar sobre ambos campus

- **Usuarios de sede**
  - Solo pueden crear, editar y visualizar certificaciones de su propio campus
  - No pueden acceder ni modificar certificaciones del otro campus

---

## 5. Endpoints implementados

### Usuarios
| Método | Endpoint | Descripción |
|------|---------|------------|
| POST | `/api/user/register` | Registro de usuario |
| POST | `/api/user/login` | Login y obtención de JWT |
| GET | `/api/user/verifytoken` | Verificación de token |
| PUT | `/api/user/update` | Actualización de usuario |

### Certificaciones (Productos)
| Método | Endpoint | Descripción |
|------|---------|------------|
| POST | `/api/certifications` | Crear certificación |
| GET | `/api/certifications` | Listar certificaciones |
| GET | `/api/certifications/:certCode` | Obtener certificación |
| PUT | `/api/certifications/:certCode` | Actualizar certificación |
| DELETE | `/api/certifications/:certCode` | Eliminar certificación |

📌 **Nota sobre nomenclatura**  
Se optó por buenas prácticas REST, donde el verbo se expresa mediante el método HTTP y la ruta representa el recurso.

---

## 6. Documentación con Swagger / OpenAPI

- Swagger UI:  
  https://proyectodwfsm06.onrender.com/api-docs
- OpenAPI JSON:  
  https://proyectodwfsm06.onrender.com/openapi.json

---

## 7. Persistencia y despliegue

- Base de datos: **MongoDB Atlas**
- Despliegue: **Render**

---

## 8. Plan de pruebas (QA)

Se diseñó y ejecutó un plan de pruebas manual utilizando **Postman**, validando autenticación, roles, campus y reglas de negocio.

---

## 9. Comentarios finales

Proyecto desarrollado de manera individual, con apoyo de ChatGPT como tutor técnico para aclarar dudas, aprender cosas nuevas y guía en el desarrollo del proyecto. También se aplicaron buenas prácticas de backend, seguridad y diseño REST; con el apoyo de ChatGPT para clarar dudas, guía

Autor: **Mauricio Larrondo**
