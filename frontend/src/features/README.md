# Features

Folder ini berisi fitur/domain utama aplikasi.

```txt
features/
├── map/             # Tampilan peta, marker, popup, table view
└── place/           # Sidebar/list/filter data tempat
```

Pola umum di dalam feature:

```txt
feature/
├── FeatureMain.jsx  # Component utama / container fitur
├── index.js         # Public export fitur
├── components/      # Component kecil khusus fitur tersebut
├── constants/       # Konstanta fitur, jika ada
├── config/          # Konfigurasi fitur, jika ada
├── hooks/           # Custom hook fitur, jika dibutuhkan
└── utils/           # Helper khusus fitur, jika dibutuhkan
```

Contoh import dari page:

```js
import { MapView } from "../features/map";
import { PlaceSidebar } from "../features/place";
```
