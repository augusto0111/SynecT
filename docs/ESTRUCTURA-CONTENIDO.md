# Estructura de contenido — Web SynecT

Landing single-page con **cuatro secciones de contenido** y layout compartido (navbar, footer, fondo).

Cada bloque tiene un rol claro. Los textos viven en `src/lib/copy/`; los datos de etapas de producto en `src/lib/products/catalog.ts`.

---

## Mapa de la landing (actual)

| Sección | ID / hash | Componente | Qué responde |
|---------|-----------|------------|--------------|
| **Hero** | `#inicio` | `Hero` | Marca, promesa, enlace al catálogo |
| **Catálogo VISION** | `#synect` | `VisionShowroomSection` | 3 módulos VISION + modelo 3D |
| **Catálogo ORION** | `#orion-catalog` | `OrionShowroomSection` | 4 módulos ORION + modelo 3D |
| **Contacto** | `#contacto` | `Contact` | Formulario demo → `mailto:` |

**Layout global:** `SiteLayout` — `TechShell` (starfield), `Navbar`, `Footer`.

---

## Showrooms modulares

Cada catálogo usa un **rail de módulos** (`ShowroomModularRail`) y paneles compactos debajo del visor 3D.

### VISION (`#synect`)

| Módulo | ID interno | Strip visual |
|--------|------------|--------------|
| 01 SynecT Vision | `synect-vision` | `VisionHardwareCompact` |
| 02 Connect + Insight | `connect-insight` | `ConnectInsightCompact` |
| 03 SynecT Intell | `synect-intell` | `IntellCompact` |

### ORION (`#orion-catalog`)

| Módulo | ID interno | Strip visual |
|--------|------------|--------------|
| 01 Field Unit | `field-unit` | `OrionFieldUnitStrip` |
| 02 Mapa en vivo | `live-map` | `OrionMapStrip` |
| 03 Telemetría | `telemetry` | `OrionTelemetryStrip` |
| 04 Score IA | `score-ia` | `OrionScoreStrip` |

Navegación dentro del showroom: rail, botones ←/→, teclas ←/→ cuando la sección está visible.

---

## Fuentes de copy

| Archivo | Contenido |
|---------|-----------|
| `src/lib/copy/home.ts` | Hero, labels de catálogo, taglines VISION/ORION |
| `src/lib/products/catalog.ts` | `visionStages`, `orionStages` (texto base por etapa) |
| `src/lib/copy/visionShowroom.ts` | Copy del showroom VISION (derivado de `visionStages`) |
| `src/lib/copy/orionShowroom.ts` | Copy del showroom ORION (derivado de `orionStages`) |

**Regla:** editar narrativa de etapas en `catalog.ts`; metadatos de UI del rail (short, layer, badge extra en ORION) en los archivos `copy/*Showroom.ts`.

---

## Navegación y hashes

Definido en `src/lib/navigation/homeScroll.ts`.

| Hash / alias | Sección destino |
|--------------|-----------------|
| `#inicio` | Hero |
| `#synect`, `#vision`, `#ecosistema` | Catálogo VISION |
| `#orion-catalog`, `#orion` | Catálogo ORION |
| `#contacto` | Contacto |

Rutas legacy (React Router): `/vision` → `/#synect`, `/orion` → `/#orion-catalog`.

---

## Contacto

- Validación en cliente; envío vía `mailto:contacto@synect.io` (sin backend).
- Preselección de producto: hash de URL o `sessionStorage` (`synect-demo-product`).
- Opciones: VISION, ORION, Otro / A medida.

---

## Fuera de alcance (por ahora)

- Integración PLCs / gateway industrial — no mencionar hasta producto real.
- Casos de uso con clientes, métricas o implementaciones inventadas.
- Secciones eliminadas de la landing anterior (beneficios, confianza, nosotros, comparativa, ecosistema monolítico) — **no documentar ni reintroducir** salvo nuevo diseño.
