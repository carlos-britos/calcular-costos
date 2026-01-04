# AGENTS.md - Comandos para Desarrollo

Este archivo documenta los comandos importantes para el desarrollo del proyecto de Seguimiento de Gastos.

## Idea del Proyecto
Crear un sitio web donde los usuarios puedan registrar sus gastos mensuales. El sistema calculará automáticamente las sumas por categoría, mostrando una tabla con los montos y un gráfico de torta con porcentajes. Incluye un panel de administración para gestionar usuarios y categorías, con autenticación y modo claro/oscuro.

## Cómo Planeamos Resolverlo
- **Tecnologías**: Vite + React para el frontend, Firebase (Auth, Firestore, Hosting) para backend y despliegue, Tailwind CSS para estilos con paleta azul/verde en modo claro/oscuro.
- **Autenticación**: Firebase Auth con roles (usuario/admin), usuarios pendientes de aprobación.
- **Base de Datos**: Firestore con reglas de seguridad para acceso restringido.
- **Funcionalidades**: Formulario de gastos, cálculos en tiempo real, gráfico con Recharts, panel admin para gestión.
- **Despliegue**: Firebase Hosting para frontend estático.

## Comandos Principales

### Desarrollo
- `npm run dev`: Inicia el servidor de desarrollo local (requiere Node.js 20+).

### Build
- `npm run build`: Construye el proyecto para producción.

### Testing
- `npm run test`: Ejecuta pruebas unitarias (si configurado con Vitest).

### Linting
- `npm run lint`: Ejecuta ESLint para verificar código (si configurado).

### Firebase
- `firebase login`: Inicia sesión en Firebase.
- `firebase init`: Inicializa Firebase en el proyecto.
- `firebase deploy --only firestore:rules`: Despliega reglas de Firestore.
- `firebase deploy --only hosting`: Despliega el frontend en Hosting.

### Git
- `git add . && git commit -m "mensaje"`: Agrega cambios y hace commit.
- `git push`: Sube cambios al repositorio remoto.

## Instrucciones para Agentes
- Siempre hacer todas las preguntas necesarias antes de comenzar a desglozar una tarea.
- Siempre desglozar la tarea en tareas más pequeñas antes de realizarla. Después de terminar, revisar si esas tareas se pueden desglozar más.
- Una vez identificadas todas las subtareas, generar un archivo .md en la carpeta docs/issues/ (crearla si no existe).
- Crear los tests necesarios antes de implementar una tarea. Si ya existen tests para lo que se modifica, modificar los existentes en lugar de crear nuevos.
- Una vez terminados todos los puntos, correr los tests hasta que pasen.
- Siempre responder en español.
- Todas las tareas deben hacerse paso a paso.
- Siempre debes tratar de entrar a http://localhost:5173/ para ver si el sitio funciona correctamente. No quiero que trates de correrlo con npm run dev. 
- Si el sitio no esta levantado, quiero que me avises y lo levantare en una terminal diferente.

## Notas
- Asegúrate de tener Node.js 20+ instalado.
- Configura Firebase antes de desplegar.
- Ejecuta `npm run build` antes de `firebase deploy --only hosting`.