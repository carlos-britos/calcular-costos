# Plan de Rediseño Premium

Este documento detalla la estrategia visual para actualizar la interfaz del proyecto, basándose en la estética moderna y sofisticada de la imagen de referencia (Dark Mode) e imaginando una contraparte igualmente elegante para Light Mode.

## Concepto Visual

El objetivo es pasar de una interfaz funcional básica a una experiencia **Premium**, utilizando:
- **Glastumorfismo**: Uso de transparencias y desenfoque (backdrop-blur) en modo oscuro.
- **Micro-interacciones**: Transiciones suaves y efectos de elevación.
- **Tipografía Nitida**: Enfoque en la jerarquía visual con fuentes sans-serif modernas.
- **Acentos Vibrantes**: Colores que resaltan sobre fondos neutros.

---

## 1. Dark Mode (Basado en la Imagen)

Inspirado en interfaces de alta gama como las de Apple Card o dashboards financieros modernos.

| Elemento | Token / Valor | Nota |
| :--- | :--- | :--- |
| **Fondo Principal** | `#09090B` | Un negro casi puro con un sutil gradiente radial azulado en las esquinas. |
| **Superficie (Cards)** | `#18181B` / `rgba(24, 24, 27, 0.8)` | Con `backdrop-blur-md` y un borde sutil de 1px. |
| **Bordes** | `#27272A` | Muy finos, para dar definición sin cargar la vista. |
| **Texto Primario** | `#FAFAFA` | Blanco puro o gris muy claro para máximo contraste. |
| **Texto Secundario**| `#A1A1AA` | Para etiquetas y descripciones menos importantes. |
| **Acento (Primario)**| `#3B82F6` | El azul eléctrico visto en el gráfico y el botón de suscripción. |
| **Éxito (Green)** | `#10B981` | Un verde esmeralda para estados "Verified". |

---

## 2. Light Mode (Imaginado)

Una versión "Airy" y limpia que mantenga la sofisticación.

| Elemento | Token / Valor | Nota |
| :--- | :--- | :--- |
| **Fondo Principal** | `#F8FAFC` | Gris muy claro (Slate 50) para una sensación de limpieza. |
| **Superficie (Cards)** | `#FFFFFF` | Blanco puro con sombras suaves y multicapa. |
| **Bordes** | `#E2E8F0` | Bordes suaves que delimitan las secciones discretamente. |
| **Texto Primario** | `#0F172A` | Azul muy oscuro (Slate 900) para legibilidad. |
| **Texto Secundario**| `#64748B` | Slate 500 para textos de apoyo. |
| **Acento (Primario)**| `#2563EB` | Un azul un poco más profundo para mejor contraste en fondo claro. |
| **Sombras** | `shadow-xl shadow-blue-500/5` | Sombras con un ligerísimo tinte del color de acento. |

---

## 3. Guía de Componentes

### Cards (Dashboard)
- **Radio de Borde**: `1rem` (16px) como estándar.
- **Padding**: `1.5rem` (24px) para dar aire a los datos.
- **Efecto Hover**: Elevación sutil y aumento de la opacidad del borde.

### Botones
- **Primarios**: Gradientes suaves del color de acento.
- **Secundarios**: Bordes definidos con fondo transparente (Ghost buttons).

### Gráficos
- Utilizar paletas armoniosas (Blue, Teal, Indigo) en lugar de colores primarios básicos.
- En Dark Mode, añadir un brillo suave (`filter: drop-shadow`) a los elementos de datos.

---

## 4. Pasos de Implementación

1.  **Actualización de Configuración**: Modificar `tailwind.config.js` para reflejar estos nuevos tokens.
2.  **Global Styles**: Actualizar `src/index.css` con variables CSS para facilitar cambios rápidos.
3.  **Refactor de Layout**: Ajustar `App.jsx` y `Navbar.jsx` para usar los nuevos colores de fondo y texto.
4.  **Rediseño de Dashboard**: Actualizar los componentes de `Dashboard.jsx` para implementar el estilo de cards y gráficos mejorado.
