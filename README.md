# 🏪 Sistema de Gestión de Inventario con Google Apps Script

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

Un sistema completo de gestión de inventario construido con Google Apps Script que se integra con Google Sheets. Perfecto para restaurantes, cafeterías o cualquier negocio que necesite controlar su inventario de manera eficiente.

## 🎥 Introducción a Google Apps Script

Si eres nuevo en Google Apps Script, te recomiendo ver esta [serie de tutoriales en YouTube](https://youtube.com/playlist?list=PLG1qdjD__qH4dyXq4sM03Rf0RFhB_4tbm) para entender mejor cómo funciona la plataforma.

## ✨ Características Principales

- 🍽️ **Gestión de Recetas**: Registra tus platos y sus ingredientes
- � **Control de Inventario**: Sigue tu stock en tiempo real
- 🚨 **Alertas Inteligentes**: Avisos de stock bajo y crítico
- 🛒 **Lista de Compras Automática**: Generada con un clic
- � **Reportes**: Estado del inventario con un solo clic
- 🔄 **Actualización Automática**: Con cada nueva venta registrada

## 🚀 Cómo Empezar

### Requisitos previos

- Una cuenta de Google
- Acceso a Google Sheets
- Acceso a Google Apps Script

### Instalación Rápida

1. **Crea una nueva hoja de cálculo de Google**
2. Ve a `Extensiones` > `Apps Script`
3. Copia y pega el contenido de `Code.gs`
4. Guarda el proyecto (Ctrl + S o ⌘ + S)
5. Recarga la página

### Configuración Inicial

1. **Crea 4 hojas** en tu documento de Google Sheets:
   - `Recetas`
   - `Inventario`
   - `Ventas`
   - `Lista_Compras`

2. **Configura los encabezados** en cada hoja:

   **Recetas**
   ```
   | Plato | Ingrediente | Cantidad | Unidad |
   ```

   **Inventario**
   ```
   | Ingrediente | Stock Actual | Unidad | Stock Mínimo | Estado |
   ```

   **Ventas**
   ```
   | Fecha | Plato | Cantidad |
   ```

   **Lista_Compras** (se genera automáticamente)

## 🎯 Cómo Usar

### 1. Registrar Recetas
1. Ve a la hoja "Recetas"
2. Agrega cada plato con sus ingredientes y cantidades

### 2. Configurar Inventario
1. Ve a la hoja "Inventario"
2. Ingresa el stock inicial de cada ingrediente
3. Define el stock mínimo para cada uno

### 3. Registrar Ventas
1. Ve a la hoja "Ventas"
2. Agrega la fecha, plato y cantidad vendida
3. Usa el menú "🍕 Gestión de Inventario" > "📦 Actualizar Inventario"

### 4. Revisar Lista de Compras
1. Ve a la hoja "Lista_Compras"
2. Encontrarás los ingredientes que necesitas comprar

## 🛠️ Funciones Principales

- **Actualizar Inventario**: Actualiza el stock basado en las ventas
- **Generar Lista de Compras**: Muestra qué ingredientes comprar
- **Reporte de Inventario**: Muestra un resumen del estado actual
- **Ayuda**: Muestra instrucciones de uso

## 📌 Consejos

- Usa el menú "🍕 Gestión de Inventario" para acceder a todas las funciones
- El sistema sugiere comprar un 50% extra del faltante
- Los estados del inventario se actualizan automáticamente

## 📄 Licencia

Este proyecto está bajo la Licencia MIT - ver el archivo [LICENSE](LICENSE) para más detalles.

## 🤝 Contribuir

¡Las contribuciones son bienvenidas! Siéntete libre de enviar un Pull Request o reportar problemas.

## 🙏 Agradecimientos

- A la comunidad de Google Apps Script
- A todos los que contribuyen a mejorar este proyecto
