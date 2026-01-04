# Plan de Ajustes de Estilo (Detallado)

Este documento detalla las mejoras de estilo específicas solicitadas.

## 1. Barra de Navegación (Navbar)
- **Alineación**: Mover el título "Dashboard de gastos" del centro a la izquierda.
- **Botones**: 
  - Abandonar el estilo `ghost` (borde transparente).
  - Implementar estilo `tonal`: un fondo muy suave del color de acento (azul) con texto en azul sólido.
  - Aplicar esto a: Inicio de Sesión, Cierre de Sesión y el conmutador de tema.

## 2. Gastos Recientes
- **Scrollbar**: 
  - Estilo minimalista y redondeado.
  - Color sutil para el "thumb" (agarre) y transparente para el "track" (pista).
  - **Sin flechas** de navegación.
- **Items de la lista**: 
  - Eliminar la sombra (`box-shadow`) que tienen actualmente.
  - Mantener el borde sutil y el fondo de tarjeta para diferenciar los elementos.

## 3. Distribución de Gastos (Gráfico)
- **Dimensionamiento**: Ajustar el contenedor para que el gráfico de torta se estire verticalmente y aproveche todo el alto de la tarjeta lateral.

## 4. Modo Oscuro
- **Fondo General**: Cambiar el gris oscuro/negro actual por un tono Azul Noche profundo (`Slate 950`).
- **Tarjetas (Glass Cards)**: 
  - Cambiar el fondo de las tarjetas a un azul oscuro traslúcido (`Slate 800` con opacidad).
  - Esto creará una estética más integrada con el nuevo fondo.

## Tareas Técnicas
- [ ] Modificar `src/index.css` para agregar clases `.btn-premium-tonal`, `.modern-scrollbar` y actualizar variables `.dark`.
- [ ] Actualizar `src/components/Navbar.jsx` para cambiar alineación y clases de botones.
- [ ] Actualizar `src/pages/Dashboard.jsx` para la alineación del título, scrollbar de gastos y altura del gráfico.
