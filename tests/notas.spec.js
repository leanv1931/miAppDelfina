const { test, expect } = require('@playwright/test');

test.describe('Sistema de Notas', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto('http://localhost:3000'); // Ajusta la URL según tu configuración
    });

    test('debe agregar una nueva nota', async ({ page }) => {
        // Datos de prueba
        const titulo = 'Primera Sonrisa';
        const contenido = 'Hoy Delfina sonrió por primera vez';

        // Llenar el formulario
        await page.fill('#nota-titulo', titulo);
        await page.fill('#nota-contenido', contenido);
        await page.click('#guardar-nota');

        // Verificar que la nota se agregó correctamente
        const notaElement = page.locator('.nota').first();
        await expect(notaElement.locator('h3')).toHaveText(titulo);
        await expect(notaElement.locator('p')).toHaveText(contenido);
    });

    test('debe persistir las notas después de recargar', async ({ page }) => {
        // Agregar una nota
        const titulo = 'Test de Persistencia';
        await page.fill('#nota-titulo', titulo);
        await page.fill('#nota-contenido', 'Contenido de prueba');
        await page.click('#guardar-nota');

        // Recargar la página
        await page.reload();

        // Verificar que la nota sigue ahí
        const notaElement = page.locator('.nota').first();
        await expect(notaElement.locator('h3')).toHaveText(titulo);
    });
});
