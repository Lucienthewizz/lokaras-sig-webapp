# Map Feature

```txt
map/
├── MapView.jsx          # Container utama map/table
├── index.js             # Export publik fitur map
├── components/          # Component kecil khusus map
└── config/              # Konfigurasi Leaflet dan icon marker
```

Component penting:

- `MapCanvas.jsx`: canvas Leaflet utama.
- `MapControls.jsx`: tombol focus, zoom in, zoom out.
- `MapFlyTo.jsx`: efek fly-to saat place dipilih.
- `PlacesMarkerLayer.jsx`: marker dan cluster.
- `PlacePopup.jsx`: isi popup marker.
- `PlacesTableView.jsx`: tampilan tabel.
