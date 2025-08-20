const { test, expect } = require('@playwright/test');

test.describe('Pruebas de navegación', () => {
  test('debe cargar la página principal', async ({ page }) => {
    await page.goto('/');
    
    // Verificar elementos de la página principal
    await expect(page.locator('h1')).toContainText('Bienvenida, Delfina!');
    await expect(page.locator('.contador')).toBeVisible();
    await expect(page.locator('a[href="/notas"]')).toBeVisible();
  });

  test('debe navegar a la página de notas', async ({ page }) => {
    await page.goto('/');
    
    // Hacer clic en el enlace a notas
    await page.click('a[href="/notas"]');
    
    // Verificar que estamos en la página de notas
    await expect(page.url()).toContain('/notas');
    await expect(page.locator('h1')).toContainText('Momentos Especiales de Delfina');
  });
});

test.describe('Funcionalidad de notas', () => {
  test('debe agregar una nueva nota', async ({ page }) => {
    await page.goto('/notas');
    
    // Datos de prueba
    const titulo = 'Nota de prueba';
    const contenido = 'Contenido de prueba';

    // Llenar y enviar el formulario
    await page.fill('#nota-titulo', titulo);
    await page.fill('#nota-contenido', contenido);
    await page.click('#guardar-nota');

    // Verificar que la nota aparece en la lista
    const notaElement = page.locator('.nota').first();
    await expect(notaElement.locator('h3')).toContainText(titulo);
    await expect(notaElement.locator('p')).toContainText(contenido);
  });

  test('debe persistir las notas después de recargar', async ({ page }) => {
    await page.goto('/notas');
    
    // Agregar una nota
    const titulo = 'Nota persistente';
    const contenido = 'Esta nota debe permanecer después de recargar';
    
    await page.fill('#nota-titulo', titulo);
    await page.fill('#nota-contenido', contenido);
    await page.click('#guardar-nota');

    // Recargar la página
    await page.reload();

    // Verificar que la nota sigue ahí
    const notaElement = page.locator('.nota').first();
    await expect(notaElement.locator('h3')).toContainText(titulo);
    await expect(notaElement.locator('p')).toContainText(contenido);
  });

  test('debe poder volver al inicio desde la página de notas', async ({ page }) => {
    await page.goto('/notas');
    
    // Hacer clic en el enlace para volver
    await page.click('a[href="/"]');
    
    // Verificar que estamos en la página principal
    await expect(page.url()).toBe('http://localhost:3000/');
    await expect(page.locator('h1')).toContainText('Bienvenida, Delfina!');
  });
});
