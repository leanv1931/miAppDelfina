# 📬 Guía de Postman para miDelfina API

## 🚀 **Setup Inicial**

1. **Descargar Postman**: https://www.postman.com/downloads/
2. **Iniciar servidor**: `npm start` (debe estar corriendo en puerto 3001)
3. **Base URL**: `http://localhost:3001`

## 📋 **Endpoints Disponibles**

### 1. **GET /api/notes** - Obtener todas las notas
```
Method: GET
URL: http://localhost:3001/api/notes
Headers: Content-Type: application/json
```

**Respuesta esperada (200)**:
```json
{
  "success": true,
  "count": 2,
  "notes": [
    {
      "id": 1,
      "text": "Nota de ejemplo",
      "createdAt": "2025-08-29T..."
    },
    {
      "id": 2,
      "text": "Aprender API testing",
      "createdAt": "2025-08-29T..."
    }
  ]
}
```

### 2. **GET /api/notes/:id** - Obtener nota específica
```
Method: GET
URL: http://localhost:3001/api/notes/1
Headers: Content-Type: application/json
```

**Respuesta esperada (200)**:
```json
{
  "success": true,
  "note": {
    "id": 1,
    "text": "Nota de ejemplo",
    "createdAt": "2025-08-29T..."
  }
}
```

**Error (404)**:
```json
{
  "success": false,
  "error": "Nota no encontrada"
}
```

### 3. **POST /api/notes** - Crear nueva nota
```
Method: POST
URL: http://localhost:3001/api/notes
Headers: Content-Type: application/json
Body (raw JSON):
{
  "text": "Mi nueva nota desde Postman"
}
```

**Respuesta esperada (201)**:
```json
{
  "success": true,
  "note": {
    "id": 3,
    "text": "Mi nueva nota desde Postman",
    "createdAt": "2025-08-29T..."
  }
}
```

### 4. **PUT /api/notes/:id** - Actualizar nota
```
Method: PUT
URL: http://localhost:3001/api/notes/1
Headers: Content-Type: application/json
Body (raw JSON):
{
  "text": "Nota actualizada desde Postman"
}
```

### 5. **DELETE /api/notes/:id** - Eliminar nota
```
Method: DELETE
URL: http://localhost:3001/api/notes/1
Headers: Content-Type: application/json
```

## 🧪 **Ejercicios de Aprendizaje**

### **Ejercicio 1: CRUD Básico**
1. GET todas las notas
2. POST crear una nueva nota
3. GET la nota específica que creaste
4. PUT actualizar esa nota
5. DELETE eliminar la nota
6. GET todas las notas para verificar

### **Ejercicio 2: Manejo de Errores**
1. GET nota con ID que no existe (ej: /api/notes/999)
2. POST nota sin texto o con texto vacío
3. PUT nota que no existe
4. DELETE nota que no existe

### **Ejercicio 3: Validaciones**
1. POST con diferentes tipos de texto (largo, corto, con espacios)
2. POST sin body
3. POST con JSON malformado

## 📁 **Crear Collection en Postman**

1. **Crear Nueva Collection**: "miDelfina API"
2. **Agregar requests** para cada endpoint
3. **Guardar ejemplos** de respuestas exitosas y errores
4. **Agregar tests básicos** (opcional para después)

## 🔧 **Variables de Entorno en Postman**

Crear environment "Local Development":
- `base_url`: `http://localhost:3001`
- `api_prefix`: `/api`

Usar en requests: `{{base_url}}{{api_prefix}}/notes`

## 📊 **Status Codes que debes observar**

- **200**: OK (GET, PUT exitosos)
- **201**: Created (POST exitoso)
- **400**: Bad Request (datos inválidos)
- **404**: Not Found (recurso no existe)
- **500**: Internal Server Error (error del servidor)

## 🎯 **Próximos Pasos**

Una vez que domines Postman:
1. **Newman** - Correr collections desde terminal
2. **Cucumber + Axios** - Tests automatizados BDD
3. **Supertest** - Tests unitarios de API
4. **API Documentation** - Swagger/OpenAPI

---

**💡 Tip**: Guarda todas tus requests en una Collection para poder reutilizarlas fácilmente.
