# Locally served typefaces

The existing site's Latin WOFF2 files were copied unchanged from its Next.js development font cache to remove the Google Fonts network dependency during builds. Family/weight mappings were verified against the cached Google Fonts CSS and embedded font metadata.

- Archivo: variable weight 100–900; Copyright 2020 The Archivo Project Authors.
- Source Serif 4: variable weight 200–900; Copyright 2014–2021 Adobe Systems Incorporated, Reserved Font Name Source.
- IBM Plex Mono: normal weights 400, 500 and 600; Copyright 2017 IBM Corp.

The accompanying SIL Open Font License files were downloaded from the official Google Fonts repository:

- https://github.com/google/fonts/blob/main/ofl/archivo/OFL.txt
- https://github.com/google/fonts/blob/main/ofl/sourceserif4/OFL.txt
- https://github.com/google/fonts/blob/main/ofl/ibmplexmono/OFL.txt

No font outlines were edited. `app/layout.tsx` loads these files through `next/font/local`.
