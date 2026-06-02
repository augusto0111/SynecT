# Estructura de contenido — Web SynecT

Cada sección tiene **un solo rol**. Si un dato aparece en dos lugares, uno de ellos solo enlaza al otro.

---

## Mapa de la landing

| Sección | ID | Qué responde | Qué NO repite |
|---------|-----|--------------|----------------|
| **Hero** | — | Promesa de marca, CTAs | Detalle de productos |
| **SocialProof** | — | Industrias atendidas | Beneficios, specs |
| **Qué es SynecT** | `#que-es-synect` | Plataforma, roles, arquitectura 4 capas | Ficha de producto |
| **Comparativa** | `#comparativa` | Por qué cambiar (manual vs. aislado vs. SynecT) | Etapas VISION |
| **Productos** | `#ecosistema` | Ficha técnica VISION + ORION | Beneficios narrados |
| **Beneficios** | `#beneficios` | Qué puede aportar la tecnología (sin casos inventados) | Specs, cómo funciona |
| **Confianza** | `#confianza` | Credibilidad, pilares | Productos |
| **Nosotros** | `#nosotros` | Equipo, origen industrial | Stack técnico |
| **Contacto** | `#contacto` | Demo comercial | — |

---

## Beneficios vs. productos

- **Productos:** qué es, cómo funciona, detalle técnico, despliegue.
- **Beneficios:** desafíos operativos habituales + cómo SynecT los aborda + beneficios **potenciales** — sin métricas ni clientes ficticios.

---

## Fuente única de datos

`src/lib/products/catalog.ts` — `technologyBenefits`, `visionStages`, etc.

Enlaces: Productos → `#benefit-*` · Beneficios → `#ecosistema-*`

---

## Fuera de alcance (por ahora)

- Integración PLCs / gateway industrial — no mencionar hasta que exista el producto.
- Casos de uso con clientes, métricas o implementaciones reales — solo cuando haya datos verificables.
