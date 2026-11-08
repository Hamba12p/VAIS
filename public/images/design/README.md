# VAIS imagery / source and treatment

Asset record updated 8 November 2026. Original repository files are retained; the WebP assets below are separate presentation derivatives. This record documents provenance and visual treatment, without asserting ownership or licensing rights.

## Original hero artwork

`intelligence-strata.webp` is original AI-generated conceptual artwork created for the first redesign pass on 7 November 2026 using the built-in image generation tool. It remains the home hero and social sharing image.

- Dimensions: 1536 × 1024.
- Optimised WebP: 147,874 bytes.
- Art direction: angular tectonic wings, stratified obsidian, a luminous mineral seam and deep green negative space.
- It depicts no actual location, installation or deployed product.

## Edited project imagery

The current collection uses seven edited assets. The six architectural scenes adapt the repository's existing contour illustrations into a shared visual language. The Parliament scene adapts the repository photograph through AI image editing.

| Presentation asset     | Repository source                              | Treatment and meaning                                                                                           |
| ---------------------- | ---------------------------------------------- | --------------------------------------------------------------------------------------------------------------- |
| `ugems-school.webp`    | `public/images/contour/vignette-school.svg`    | Conceptual education infrastructure, presented as an architectural miniature.                                   |
| `sentect-tower.webp`   | `public/images/contour/vignette-tower.svg`     | Conceptual network infrastructure, presented as a sculptural signal mast.                                       |
| `clinic.webp`          | `public/images/contour/vignette-clinic.svg`    | Conceptual healthcare architecture.                                                                             |
| `field.webp`           | `public/images/contour/vignette-field.svg`     | Conceptual agricultural landscape.                                                                              |
| `bank.webp`            | `public/images/contour/vignette-bank.svg`      | Conceptual financial infrastructure.                                                                            |
| `office.webp`          | `public/images/contour/vignette-office.svg`    | Conceptual institutional and administrative architecture.                                                       |
| `apex-parliament.webp` | `public/parliament.jpg` inside `apexnexus.zip` | AI-adapted editorial image of Parliament of Uganda; identified in the interface as an adapted repository image. |

`lib/projectVisuals.ts` maps these images to projects and sectors. Some projects share a conceptual scene; imagery is not a unique product screenshot. Captions distinguish concept illustrations from the adapted Parliament photograph.

These images do not establish product deployment, institutional endorsement or relationships, measured outcomes, or the existence of the illustrated facilities. The source SVGs, archive photograph and existing VAIS brand files remain the provenance references.

The earlier CSS system compositions remain in `components/ui/SystemArtwork.tsx`. Existing VAIS brand marks remain in `public/brand`.
