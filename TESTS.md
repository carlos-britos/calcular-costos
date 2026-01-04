# Pruebas

## Tests Unitarios

Ejecuta los tests unitarios con:

```bash
npm run test
```

Los tests cubren:
- Componentes: Login, Navbar
- Contextos: AuthContext, ThemeContext, ProtectedRoute
- Utilidades: logout

**Nota**: El test de Dashboard está deshabilitado temporalmente debido a problemas de memoria en el entorno de testing. El componente funciona correctamente en desarrollo.

## Tests E2E (Pendiente)

Los tests e2e requieren configuración adicional de Playwright y mocks de Firebase para entornos de testing. Se recomienda probar manualmente los flujos en el navegador.

### Flujos de usuario a probar manualmente

1. **Registro de usuario**:
   - Ir a /login
   - Hacer clic en "Regístrate"
   - Completar email y contraseña
   - Verificar mensaje de aprobación

2. **Inicio de sesión**:
   - Ir a /login
   - Ingresar credenciales válidas
   - Verificar redirección al dashboard

3. **Dashboard**:
   - Ver título "Dashboard de Gastos"
   - Ver formulario de agregar gasto (input con min-width 300px, select con min-width 300px)
   - Ver lista de gastos recientes como cards
   - Ver gráfico de torta y resumen mensual

4. **Cambiar tema**:
   - Hacer clic en botón con iconos SVG de sol/luna
   - Verificar cambio visual y persistencia

5. **Panel admin** (usuario con role admin):
   - Acceder a /admin
   - Gestionar usuarios pendientes
   - Agregar/editar/eliminar categorías

6. **Logout**:
   - Hacer clic en "Cerrar Sesión"
   - Verificar redirección a login

## Cobertura de flujos

### Unitarios
- ✅ Renderizado de componentes básicos
- ✅ Interacciones de autenticación
- ✅ Estados de contexto
- ⏳ Dashboard (problemas de memoria en tests)

### Manual/E2E (por implementar)
- ⏳ Navegación completa
- ⏳ Interacciones complejas
- ⏳ Integración con Firebase