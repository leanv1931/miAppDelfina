# Mi Delfina - Aplicación Web con Testing BDD

Una aplicación web simple de Express.js con arquitectura de testing completa usando Cucumber, Playwright y Page Object Model.

## 🚀 Inicio Rápido

```bash
# Configuración inicial
npm run setup

# Iniciar aplicación
npm start

# Ejecutar todos los tests
npm test
```

## 📋 Comandos Disponibles

### 🖥️ Aplicación Principal

| Comando | Descripción |
|---------|-------------|
| `npm start` | Inicia el servidor en producción |
| `npm run dev` | Inicia el servidor con auto-reload |
| `npm run setup` | Instala todas las dependencias |
| `npm run build` | Info sobre build (no necesario) |

### 🧪 Testing

| Comando | Descripción |
|---------|-------------|
| `npm test` | Ejecuta todos los tests BDD |
| `npm run test:ui` | Ejecuta tests y abre reporte HTML |
| `npm run test:home` | Solo tests de página principal |
| `npm run test:notes` | Solo tests de funcionalidad notas |
| `npm run test:watch` | Tests en modo watch |
| `npm run test:debug` | Tests con fail-fast |
| `npm run test:visual` | 🎬 **Tests VISUALES paso a paso** |
| `npm run test:dev` | Inicia app y tests en paralelo |

### 🔧 Desarrollo y QA

| Comando | Descripción |
|---------|-------------|
| `npm run clean` | Limpia reportes de tests |
| `npm run lint` | Verifica tipado TypeScript |
| `./test-ui.sh` | Tests + UI + Reporte automático |
| `./test-visual.sh` | 🎯 **DEBUG VISUAL completo** |

## 🎯 Para QA Automation

### 🎬 **Tests con UI VISIBLE paso a paso**
```bash
# Opción 1: Debug visual completo (RECOMENDADO para debugging)
npm run test:visual-debug
# o
./test-visual.sh

# Características del modo visual:
# ✅ Navegador visible (no headless)
# ✅ Pausa de 1 segundo entre acciones
# ✅ Elementos se resaltan antes de interactuar
# ✅ Logs detallados en consola de cada paso
# ✅ Timeout extendido (60 segundos)
# ✅ Ventana de navegador amplia (1280x720)
```

### 🚀 **Tests rápidos con reporte**
```bash
# Opción 2: Demo completa automática
npm run test:ui-demo

# Opción 3: Tests con reporte
npm run test:visual
```

### Debugging Tests
```bash
# Tests con fallo rápido
npm run test:debug

# Watch mode para desarrollo iterativo
npm run test:watch

# Tests específicos
npm run test:home   # Solo página principal
npm run test:notes  # Solo funcionalidad notas
```

### Reportes
- **HTML**: `test/test-results/cucumber-report.html`
- **JSON**: `test/test-results/cucumber-report.json`
- **Abrir reporte**: `cd test && npm run report`

## 🏗️ Arquitectura de Testing

```
test/
├── features/           # Scenarios BDD en Gherkin
├── pages/             # Page Object Model
├── step-definitions/  # Implementación steps
├── support/          # Configuración Playwright
└── test-results/     # Reportes generados
```

### Page Object Model
- **BasePage**: Funcionalidad común
- **HomePage**: Página principal con navegación
- **NotesPage**: Gestión de notas

### BDD Features
- **home.feature**: Tests de página principal
- **notes.feature**: Tests de funcionalidad notas

## 🌐 URLs de Testing
- **Aplicación**: http://localhost:3001
- **Página principal**: http://localhost:3001/
- **Notas**: http://localhost:3001/notas

## 🛠️ Stack Tecnológico
- **Backend**: Express.js
- **Testing**: Cucumber + Playwright + TypeScript
- **Pattern**: Page Object Model
- **Reports**: HTML + JSON
- **CI/CD Ready**: Scripts optimizados para automation
