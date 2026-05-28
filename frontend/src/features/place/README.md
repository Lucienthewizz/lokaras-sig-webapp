# Place Feature

```txt
place/
├── PlaceSidebar.jsx     # Container utama sidebar tempat
├── index.js             # Export publik fitur place
├── components/          # Component kecil khusus place/sidebar
└── constants/           # Data kategori tempat
```

Component penting:

- `PlaceSidebarHeader.jsx`: logo dan judul sidebar.
- `PlaceSearchInput.jsx`: search input.
- `CategoryFilterDropdown.jsx`: dropdown filter kategori.
- `PlaceListHeader.jsx`: heading list tempat.
- `PlaceList.jsx`: daftar tempat dan empty state.
- `PlaceCard.jsx`: card untuk satu tempat.
