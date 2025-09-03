/**
 * 🧪 API Tests para Notes Endpoints
 * 
 * Este es un ejemplo básico de API testing con Playwright
 * Aprenderás a:
 * - Hacer peticiones HTTP (GET, POST, PUT, DELETE)
 * - Validar status codes y responses
 * - Testear tu API de forma automatizada
 */

import { expect, test } from '@playwright/test';

// Importar configuración desde archivo JavaScript
const { URLS } = require('../../config.js');

// Configuración base desde config centralizado
const NOTES_ENDPOINT = URLS.API_NOTES;

test.describe('📝 Notes API Tests', () => {
  
  test('🔍 GET /api/notes - Debería obtener todas las notas', async ({ request }) => {
    // 🚀 Hacer petición GET
    const response = await request.get(NOTES_ENDPOINT);
    
    // ✅ Validar status code
    expect(response.status()).toBe(200);
    
    // ✅ Validar estructura de respuesta
    const data = await response.json();
    expect(data).toHaveProperty('success', true);
    expect(data).toHaveProperty('notes');
    expect(data).toHaveProperty('count');
    expect(Array.isArray(data.notes)).toBe(true);
    
    console.log('📊 Respuesta GET:', data);
  });

  test('➕ POST /api/notes - Debería crear una nueva nota', async ({ request }) => {
    const newNote = {
      text: 'Esta es una nota creada desde API testing con Playwright 🚀'
    };
    
    // 🚀 Hacer petición POST
    const response = await request.post(NOTES_ENDPOINT, {
      data: newNote,
      headers: {
        'Content-Type': 'application/json'
      }
    });
    
    // ✅ Validar status code de creación
    expect(response.status()).toBe(201);
    
    // ✅ Validar respuesta
    const data = await response.json();
    expect(data.success).toBe(true);
    expect(data.note).toBeDefined();
    expect(data.note.text).toBe(newNote.text);
    expect(data.note.id).toBeDefined();
    expect(data.note.createdAt).toBeDefined();
    
    console.log('✨ Nota creada:', data.note);
    
    // 🧪 Bonus: Verificar que la nota existe haciendo GET
    const getResponse = await request.get(NOTES_ENDPOINT);
    const getAllData = await getResponse.json();
    const createdNote = getAllData.notes.find((note: any) => note.id === data.note.id);
    expect(createdNote).toBeDefined();
    expect(createdNote.text).toBe(newNote.text);
  });

  test('🔄 Flujo completo: Crear → Verificar → Limpiar', async ({ request }) => {
    // 📝 PASO 1: Crear nota
    const testNote = {
      text: 'Nota temporal para testing - será eliminada'
    };
    
    const createResponse = await request.post(NOTES_ENDPOINT, {
      data: testNote
    });
    
    expect(createResponse.status()).toBe(201);
    const createdData = await createResponse.json();
    const noteId = createdData.note.id;
    
    console.log(`📝 Nota creada con ID: ${noteId}`);
    
    // 🔍 PASO 2: Verificar que existe
    const getResponse = await request.get(`${NOTES_ENDPOINT}/${noteId}`);
    expect(getResponse.status()).toBe(200);
    
    const noteData = await getResponse.json();
    expect(noteData.note.text).toBe(testNote.text);
    
    console.log('✅ Nota verificada correctamente');
    
    // 🗑️ PASO 3: Limpiar (eliminar la nota de prueba)
    const deleteResponse = await request.delete(`${NOTES_ENDPOINT}/${noteId}`);
    expect(deleteResponse.status()).toBe(200);
    
    console.log('🗑️ Nota eliminada después del test');
    
    // ✅ PASO 4: Confirmar que fue eliminada
    const verifyDeleteResponse = await request.get(`${NOTES_ENDPOINT}/${noteId}`);
    expect(verifyDeleteResponse.status()).toBe(404);
    
    console.log('✨ Test completo: Crear → Verificar → Eliminar ✨');
  });
});

/**
 * 📚 NOTAS PARA APRENDER:
 * 
 * 1. 🎯 request.get/post/put/delete() - Métodos HTTP
 * 2. 🔍 expect(response.status()).toBe(200) - Validar códigos
 * 3. 📊 await response.json() - Obtener datos de respuesta
 * 4. ✅ expect(data).toHaveProperty('key', value) - Validar estructura
 * 5. 🔄 Flujos: Crear → Verificar → Limpiar
 * 
 * 🚀 Para ejecutar: npm run test:api
 */
