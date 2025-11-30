# Solución: Error al Iniciar Google Apps Script 🛠️

[![Solución al error de Google Apps Script](https://img.youtube.com/vi/78hsIb5pwtg/0.jpg)](https://www.youtube.com/watch?v=78hsIb5pwtg)

## El Problema

Al intentar acceder a Google Apps Script, podrías encontrarte con el siguiente mensaje de error:

> "No se puede abrir el archivo en estos momentos, comprueba la dirección e inténtalo de nuevo"

## Causa del Error

Este problema ocurre típicamente cuando tienes **múltiples cuentas de Google** con sesión activa en tu navegador. El editor de Google Apps Script puede confundirse al intentar determinar con qué cuenta debe trabajar.

## Solución Paso a Paso

1. **Cierra todas las sesiones de Google** en tu navegador
2. **Cierra completamente el navegador** para asegurar que todas las sesiones se hayan cerrado
3. **Vuelve a abrir tu navegador** e inicia sesión **solo con la cuenta** con la que deseas trabajar
4. **Vuelve a tu hoja de cálculo** de Google
5. Ve a `Extensiones > Apps Script`

## ¿Por qué funciona?

Google Apps Script necesita una sesión de navegador limpia para funcionar correctamente. Cuando hay múltiples cuentas activas, puede haber conflictos de autenticación que impiden que el editor se cargue correctamente.

## Consejos Adicionales

- Si el problema persiste, intenta usar una ventana de incógnito
- Asegúrate de que tu navegador esté actualizado
- Si usas varios perfiles de navegador, verifica que estés en el perfil correcto

## Video Explicativo

Si necesitas una guía visual, sigue los pasos en este video:

[Ver video de solución](https://www.youtube.com/watch?v=78hsIb5pwtg)

---

¿Neitas más ayuda? Consulta nuestra [guía completa de solución de problemas](TROUBLESHOOTING.md) para otros problemas comunes.