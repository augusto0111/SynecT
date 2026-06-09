# Web SynecT

Landing page de [SynecT](https://synect.io) — stack industrial VISION (planta) y ORION (flotas), con showrooms modulares y modelos 3D.

## Stack

- React 19 + TypeScript + Vite 8
- Tailwind CSS 4
- Framer Motion
- React Router 7
- Three.js + React Three Fiber (modelos `.glb` en `public/models/`)

## Desarrollo

```bash
npm install
npm run dev
```

```bash
npm run build    # tsc + vite build → dist/
npm run preview  # preview de producción local
npm run lint
```

## Estructura principal

```
src/
├── App.tsx                 # Router (/ , /vision, /orion)
├── layouts/SiteLayout.tsx  # Navbar, footer, starfield
├── pages/HomePage.tsx      # Hero + showrooms + contacto
├── components/
│   ├── VisionShowroomSection.tsx
│   ├── OrionShowroomSection.tsx
│   └── hardware/HardwareModelStage.tsx
└── lib/
    ├── copy/               # Textos de UI
    ├── products/catalog.ts # Etapas VISION / ORION
    └── navigation/         # Hashes y scroll
```

## Secciones (hash)

| Hash | Contenido |
|------|-----------|
| `#inicio` | Hero |
| `#synect` | Catálogo VISION |
| `#orion-catalog` | Catálogo ORION |
| `#contacto` | Formulario demo |

Aliases: `#vision`, `#ecosistema` → VISION · `#orion` → ORION.

## Documentación

- [`docs/ESTRUCTURA-CONTENIDO.md`](docs/ESTRUCTURA-CONTENIDO.md) — roles de sección y fuentes de copy
- [`docs/DIAGRAMA-FLUJO.md`](docs/DIAGRAMA-FLUJO.md) — flujos técnicos y de usuario (Mermaid)

## Despliegue

Configurado para Vercel (`vercel.json`). Build estático desde `dist/`.
