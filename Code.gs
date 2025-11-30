// ============================================
// SISTEMA DE GESTIÓN DE INVENTARIO
// Para Cocina
// ============================================

/**
 * Función principal que se ejecuta cuando registras ventas
 * Actualiza el inventario automáticamente
 */
function actualizarInventario() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const hojaVentas = ss.getSheetByName("Ventas");
  const hojaInventario = ss.getSheetByName("Inventario");
  const hojaRecetas = ss.getSheetByName("Recetas");
  
  if (!hojaVentas || !hojaInventario || !hojaRecetas) {
    SpreadsheetApp.getUi().alert('Error: Verifica que existan las hojas "Ventas", "Inventario" y "Recetas"');
    return;
  }
  
  // Obtener datos de ventas (última fila solo)
  const ultimaFila = hojaVentas.getLastRow();
  if (ultimaFila < 2) {
    SpreadsheetApp.getUi().alert('No hay ventas registradas');
    return;
  }
  
  const venta = hojaVentas.getRange(ultimaFila, 1, 1, 3).getValues()[0];
  const plato = venta[1];
  const cantidad = venta[2];
  
  if (!plato || !cantidad) {
    SpreadsheetApp.getUi().alert('Completa el plato y la cantidad en la última venta');
    return;
  }
  
  // Obtener receta del plato
  const datosRecetas = hojaRecetas.getRange(2, 1, hojaRecetas.getLastRow() - 1, 4).getValues();
  const ingredientesPlato = datosRecetas.filter(row => row[0] === plato);
  
  if (ingredientesPlato.length === 0) {
    SpreadsheetApp.getUi().alert('No se encontró la receta para: ' + plato);
    return;
  }
  
  // Obtener inventario actual
  const datosInventario = hojaInventario.getRange(2, 1, hojaInventario.getLastRow() - 1, 5).getValues();
  
  // Actualizar inventario
  ingredientesPlato.forEach(ingrediente => {
    const nombreIngrediente = ingrediente[1];
    const cantidadPorPorcion = ingrediente[2];
    const totalGastado = cantidadPorPorcion * cantidad;
    
    // Buscar el ingrediente en inventario
    for (let i = 0; i < datosInventario.length; i++) {
      if (datosInventario[i][0] === nombreIngrediente) {
        const stockActual = datosInventario[i][1];
        const nuevoStock = stockActual - totalGastado;
        
        // Actualizar stock
        hojaInventario.getRange(i + 2, 2).setValue(nuevoStock);
        
        // Actualizar estado
        const stockMinimo = datosInventario[i][3];
        let estado = "✅ OK";
        if (nuevoStock <= stockMinimo) {
          estado = "🔴 COMPRAR";
        } else if (nuevoStock <= stockMinimo * 1.5) {
          estado = "⚠️ Bajo";
        }
        hojaInventario.getRange(i + 2, 5).setValue(estado);
        break;
      }
    }
  });
  
  // Actualizar lista de compras
  generarListaCompras();
  
  SpreadsheetApp.getUi().alert('✅ Inventario actualizado correctamente!\n\n' + 
                               'Plato: ' + plato + '\n' +
                               'Cantidad: ' + cantidad + '\n\n' +
                               'Revisa la hoja "Lista_Compras" para ver qué necesitas comprar.');
}

/**
 * Genera automáticamente la lista de compras
 * con los ingredientes que están bajo el stock mínimo
 */
function generarListaCompras() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const hojaInventario = ss.getSheetByName("Inventario");
  const hojaCompras = ss.getSheetByName("Lista_Compras");
  
  if (!hojaCompras) {
    SpreadsheetApp.getUi().alert('Error: No existe la hoja "Lista_Compras"');
    return;
  }
  
  // Limpiar lista de compras
  hojaCompras.clear();
  hojaCompras.getRange(1, 1, 1, 5).setValues([
    ["Ingrediente", "Stock Actual", "Stock Mínimo", "Faltante", "Unidad"]
  ]).setFontWeight("bold").setBackground("#4285f4").setFontColor("white");
  
  // Obtener datos de inventario
  const datosInventario = hojaInventario.getRange(2, 1, hojaInventario.getLastRow() - 1, 4).getValues();
  
  // Filtrar ingredientes que necesitan comprarse
  const compras = [];
  datosInventario.forEach(row => {
    const ingrediente = row[0];
    const stockActual = row[1];
    const unidad = row[2];
    const stockMinimo = row[3];
    
    if (stockActual <= stockMinimo) {
      const faltante = stockMinimo - stockActual + (stockMinimo * 0.5); // Comprar 50% extra
      compras.push([ingrediente, stockActual, stockMinimo, Math.ceil(faltante), unidad]);
    }
  });
  
  // Escribir lista de compras
  if (compras.length > 0) {
    hojaCompras.getRange(2, 1, compras.length, 5).setValues(compras);
    
    // Resaltar en rojo los faltantes
    hojaCompras.getRange(2, 1, compras.length, 5).setBackground("#fff3cd");
  } else {
    hojaCompras.getRange(2, 1, 1, 5).setValues([
      ["✅ No hay ingredientes por comprar", "", "", "", ""]
    ]).setBackground("#d4edda");
  }
}

/**
 * Crear menú personalizado en Google Sheets
 */
function onOpen() {
  const ui = SpreadsheetApp.getUi();
  ui.createMenu('🍕 Gestión de Inventario')
    .addItem('📦 Actualizar Inventario', 'actualizarInventario')
    .addItem('🛒 Generar Lista de Compras', 'generarListaCompras')
    .addItem('📊 Reporte de Inventario', 'reporteInventario')
    .addSeparator()
    .addItem('ℹ️ Ayuda', 'mostrarAyuda')
    .addToUi();
}

/**
 * Muestra un reporte del estado actual del inventario
 */
function reporteInventario() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const hojaInventario = ss.getSheetByName("Inventario");
  const datosInventario = hojaInventario.getRange(2, 1, hojaInventario.getLastRow() - 1, 5).getValues();
  
  let totalIngredientes = datosInventario.length;
  let ingredientesOK = 0;
  let ingredientesBajos = 0;
  let ingredientesComprar = 0;
  
  datosInventario.forEach(row => {
    const estado = row[4];
    if (estado.includes("OK")) ingredientesOK++;
    else if (estado.includes("Bajo")) ingredientesBajos++;
    else if (estado.includes("COMPRAR")) ingredientesComprar++;
  });
  
  const mensaje = `📊 REPORTE DE INVENTARIO\n\n` +
                  `Total de ingredientes: ${totalIngredientes}\n\n` +
                  `✅ En buen estado: ${ingredientesOK}\n` +
                  `⚠️ Stock bajo: ${ingredientesBajos}\n` +
                  `🔴 Necesitan comprarse: ${ingredientesComprar}\n\n` +
                  (ingredientesComprar > 0 ? 
                   `¡Revisa la hoja "Lista_Compras" para ver qué comprar!` : 
                   `¡Todo el inventario está en buen estado! 🎉`);
  
  SpreadsheetApp.getUi().alert(mensaje);
}

/**
 * Muestra ayuda sobre cómo usar el sistema
 */
function mostrarAyuda() {
  const mensaje = `📖 CÓMO USAR EL SISTEMA\n\n` +
                  `1️⃣ REGISTRAR RECETAS:\n` +
                  `   • Ve a la hoja "Recetas"\n` +
                  `   • Agrega cada plato con sus ingredientes\n\n` +
                  `2️⃣ CONFIGURAR INVENTARIO:\n` +
                  `   • Ve a la hoja "Inventario"\n` +
                  `   • Ingresa el stock inicial de cada ingrediente\n` +
                  `   • Define el stock mínimo (cuando debes comprar)\n\n` +
                  `3️⃣ REGISTRAR VENTAS:\n` +
                  `   • Ve a la hoja "Ventas"\n` +
                  `   • Agrega la fecha, plato y cantidad vendida\n` +
                  `   • Usa el menú "Gestión de Inventario → Actualizar"\n\n` +
                  `4️⃣ REVISAR LISTA DE COMPRAS:\n` +
                  `   • Ve a la hoja "Lista_Compras"\n` +
                  `   • Ahí verás qué ingredientes necesitas comprar\n\n` +
                  `💡 TIP: El sistema se actualiza automáticamente\n` +
                  `cuando registras ventas!`;
  
  SpreadsheetApp.getUi().alert(mensaje);
}
