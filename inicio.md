# Plan Final para Proyecto de Seguimiento de Gastos

## Descripción del Proyecto
Aplicación web para seguimiento mensual de gastos personales, construida con Vite + React, Firebase (Auth, Firestore, Hosting), Tailwind CSS con modo claro/oscuro, y Recharts para gráficos. Incluye autenticación de usuarios, panel admin para gestión de usuarios y categorías, y despliegue en Firebase.

## Características Principales
- **Autenticación**: Registro/login con Firebase Auth. Usuarios pendientes de aprobación por admin.
- **Dashboard Usuario**: Formulario para agregar gastos (monto, categoría), lista de gastos recientes, tabla de sumas mensuales por categoría, gráfico de torta con porcentajes.
- **Panel Admin**: Acceso restringido a `/admin`. Gestión de usuarios (aprobar/rechazar registros) y categorías (agregar/editar/eliminar).
- **Modo Oscuro/Claro**: Toggle con paleta azul/verde aplicada a ambos modos, persistido en localStorage.
- **Categorías Iniciales**: Comida, Transporte, Ahorros.

## Tecnologías
- **Frontend**: Vite + React, React Router, Tailwind CSS, Recharts, date-fns.
- **Backend**: Firebase (Auth, Firestore, Hosting).
- **Testing**: Firebase Emulator Suite, Vitest.

## Estructura de Datos en Firestore
- `users`: { role: 'user'|'admin', approved: boolean }
- `categories`: { name: string } (globales, iniciales: Comida, Transporte, Ahorros)
- `expenses`: Subcolección por userId, { amount: number, category: ref, date: timestamp }

## Pasos de Implementación
1. Configuración del proyecto y dependencias.
2. Configuración de Firebase y Tailwind.
3. Estructura de datos y reglas de seguridad.
4. Autenticación y routing.
5. Dashboard y panel admin.
6. Testing y despliegue.

## Notas Adicionales
- Acceso a `/admin` solo para usuarios con rol 'admin'.
- Categorías globales para todos los usuarios.
- Despliegue final en Firebase Hosting.