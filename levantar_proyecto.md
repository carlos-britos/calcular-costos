# Levantar Proyecto - Soluciones para Error de Node.js y NVM

## Explicación del Error
El error "Tool execution aborted" indica que la ejecución del comando bash fue interrumpida, probablemente por un timeout (límite predeterminado de 120 segundos por comando). Esto ocurre porque el comando combina múltiples acciones (cargar NVM, cambiar versión de Node y ejecutar npm run dev), lo que puede exceder el tiempo límite.

## Soluciones para Resolverlo

### 1. Ejecutar Comandos por Separado
   - Carga NVM manualmente en cada sesión: `source ~/.nvm/nvm.sh`
   - Luego: `nvm use 20`
   - Finalmente: `npm run dev`
   - Ventaja: Evita timeouts largos. Desventaja: Requiere intervención manual cada vez.

### 2. Actualizar .zshrc para Cargar NVM Automáticamente
   - Edita `~/.zshrc` y asegura que tenga:
     ```
     export NVM_DIR="$HOME/.nvm"
     [ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"
     ```
   - Reinicia la terminal o ejecuta `source ~/.zshrc`
   - Ventaja: NVM se carga en cada sesión. Desventaja: Requiere configuración inicial.

### 3. Usar Node.js sin NVM
   - Instala Node 20 directamente con el gestor de paquetes del sistema: `sudo apt update && sudo apt install nodejs npm` (verifica versiones disponibles)
   - O descarga e instala desde nodejs.org
   - Ventaja: Más simple para entornos sin NVM. Desventaja: Difícil cambiar versiones.

### 4. Ejecutar en Background o con Timeout Extendido
   - Si es posible, ejecuta `npm run dev` en background: `npm run dev &`
   - O usa timeout personalizado si la herramienta lo permite (aunque no en este caso).
   - Ventaja: Evita bloqueos. Desventaja: No resuelve el problema raíz.

### 5. Verificar Dependencias y Limpiar Cache
   - Borra node_modules: `rm -rf node_modules && npm install`
   - Limpia cache de npm: `npm cache clean --force`
   - Verifica que el proyecto esté en el directorio correcto.
   - Ventaja: Resuelve issues de instalación. Desventaja: No afecta NVM directamente.