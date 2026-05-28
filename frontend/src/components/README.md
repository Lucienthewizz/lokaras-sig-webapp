# Shared Components

Folder ini hanya untuk komponen UI yang reusable lintas fitur.

```txt
components/
└── ui/              # Button, Input, Modal, Badge, EmptyState, dll.
```

Komponen yang spesifik fitur sebaiknya masuk ke `features/<nama-fitur>/components`.

Contoh:

- `components/ui/Button.jsx` untuk tombol umum.
- `features/place/components/PlaceCard.jsx` untuk card khusus data tempat.
- `features/map/components/MapControls.jsx` untuk kontrol khusus peta.
