# FUEGO FIT Club Pereira

Demo web del gimnasio FUEGO FIT, construido con React, Vite y TypeScript.

## Sitio publicado

https://arturoindraw.github.io/GYM/

GitHub Pages publica automáticamente la rama `main` mediante GitHub Actions. Si es el primer despliegue, configura **Settings → Pages → Build and deployment → Source: GitHub Actions**.

### Limitaciones del demo

- Las reservas son una simulación: no se envían ni se guardan y no apartan un cupo. No ingreses datos personales reales.
- El asesor no usa Gemini en GitHub Pages; las respuestas y rutinas son demostrativas.
- El panel de Pixel y analítica solo muestra eventos de ejemplo en el navegador.

## Desarrollo local

**Requisitos:** Bun y Node.js.

```bash
bun install
bun run dev
```

El servidor local usa `server.ts`; `GEMINI_API_KEY` es opcional y solo debe configurarse como variable privada para habilitar Gemini.
