# Tour Virtual 360 (React + TS + Three.js + Tailwind)

Demo de tour virtual 3D/360 pensado para promocionar un negocio de cursos de inglés.

Incluye:
- Panorama 360 equirectangular (esfera invertida)
- Hotspots 3D clicables (objetos en 3D) con información turística
- Minijuego de vocabulario en inglés (quiz + progreso + colección)

## Requisitos

- Node.js 18+ (recomendado)

## Ejecutar

```bash
npm install
npm run dev
```

## Personalizar

- Cambia la imagen 360 en `public/assets/panorama.jpg`.
- Edita hotspots, texto turístico y quizzes en `src/tour/hotspots.ts`.
- Ajusta el “branding” y CTA (email, nombre del negocio) en `src/App.tsx`.

## Atribución / Licencia de la imagen 360

La imagen por defecto se descarga de Poly Haven (CC0) como JPG tonemapped:

- Asset: “Royal Esplanade”
- Licencia: CC0 (uso libre)
- Fuente: https://polyhaven.com/a/royal_esplanade
