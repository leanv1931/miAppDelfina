# 🧪 API Testing con Playwright

## 📝 ¿Qué es esto?

Este directorio contiene **tests automatizados para la API** de Mi Delfina. A diferencia de Postman (que es manual), estos tests se ejecutan automáticamente y validan que tu API funcione correctamente.

## 🚀 ¿Cómo usar?

### 1️⃣ **Ejecutar todos los API tests**:
```bash
npm run test:api
```

### 2️⃣ **Ver reporte HTML detallado**:
```bash
npm run test:api:report
```

### 3️⃣ **Ejecutar con debug visible**:
```bash
npm run test:api:headed
```

## 📂 Estructura

```
test/api/
├── notes.api.test.ts     # Tests para endpoints de notas
└── README.md            # Esta guía
```

## 🎯 ¿Qué testa actualmente?

### **📝 Notes API Tests**:
- ✅ **GET /api/notes** - Obtener todas las notas
- ✅ **POST /api/notes** - Crear nueva nota
- ✅ **Flujo completo** - Crear → Verificar → Eliminar

## 📊 Ejemplo de ejecución

```bash
$ npm run test:api

Running 3 tests using 3 workers
✓ GET /api/notes - Debería obtener todas las notas (119ms)
✓ POST /api/notes - Debería crear una nueva nota (140ms)  
✓ Flujo completo: Crear → Verificar → Limpiar (165ms)

3 passed (1.1s)
```

## 🔧 ¿Cómo agregar más tests?

### **Ejemplo: Test para PUT (actualizar)**:

```typescript
test('🔄 PUT /api/notes/:id - Debería actualizar nota', async ({ request }) => {
  // 1. Crear nota
  const createResponse = await request.post(NOTES_ENDPOINT, {
    data: { text: 'Texto original' }
  });
  const noteId = (await createResponse.json()).note.id;
  
  // 2. Actualizar nota
  const updateResponse = await request.put(`${NOTES_ENDPOINT}/${noteId}`, {
    data: { text: 'Texto actualizado' }
  });
  
  // 3. Validar actualización
  expect(updateResponse.status()).toBe(200);
  const data = await updateResponse.json();
  expect(data.note.text).toBe('Texto actualizado');
});
```

### **Ejemplo: Test para DELETE**:

```typescript
test('🗑️ DELETE /api/notes/:id - Debería eliminar nota', async ({ request }) => {
  // 1. Crear nota
  const createResponse = await request.post(NOTES_ENDPOINT, {
    data: { text: 'Para eliminar' }
  });
  const noteId = (await createResponse.json()).note.id;
  
  // 2. Eliminar nota
  const deleteResponse = await request.delete(`${NOTES_ENDPOINT}/${noteId}`);
  expect(deleteResponse.status()).toBe(200);
  
  // 3. Verificar que fue eliminada
  const getResponse = await request.get(`${NOTES_ENDPOINT}/${noteId}`);
  expect(getResponse.status()).toBe(404);
});
```

## 🎓 Conceptos para aprender

### **🔍 Validaciones básicas**:
```typescript
// Status codes
expect(response.status()).toBe(200);
expect(response.status()).toBe(201);
expect(response.status()).toBe(404);

// Estructura de datos
expect(data).toHaveProperty('success', true);
expect(data.notes).toBeDefined();
expect(Array.isArray(data.notes)).toBe(true);

// Contenido específico
expect(data.note.text).toBe('Mi texto');
expect(data.note.id).toBeDefined();
```

### **🔄 Métodos HTTP**:
```typescript
// GET
const response = await request.get('/api/notes');

// POST
const response = await request.post('/api/notes', {
  data: { text: 'Nueva nota' }
});

// PUT
const response = await request.put('/api/notes/1', {
  data: { text: 'Nota actualizada' }
});

// DELETE
const response = await request.delete('/api/notes/1');
```

## 🛠️ Requisitos

1. **Servidor corriendo**: `npm start` en directorio principal
2. **Puerto 3002**: Configurado en `playwright.config.ts`
3. **API funcionando**: Endpoints `/api/notes` disponibles

## 📈 Próximos pasos

1. **Agregar más endpoints**: PUT, DELETE, GET por ID
2. **Tests de validación**: Campos requeridos, errores 400
3. **Tests de performance**: Tiempo de respuesta
4. **Tests de integración**: Flujos complejos
5. **CI/CD**: Ejecutar en GitHub Actions

---

🎯 **Meta**: Tener cobertura completa de testing para todos los endpoints de la API
