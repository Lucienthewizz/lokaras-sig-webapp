import { useState } from "react";
import { X } from "lucide-react";
import Swal from "sweetalert2";

import { usePlaceStore } from "../../../store/usePlaceStore";
import { placeCategories } from "../constants/placeCategories";

const initialForm = {
  name: "",
  category: "restaurant",
  description: "",
  address: "",
  latitude: "",
  longitude: "",
  opening_hours: "",
  phone: "",
  rating: "",
  price_level: "",
  is_halal: false,
  is_featured: false,
  marker_icon: "",
};

const categories = placeCategories.filter(
  (category) => category.label !== "Semua",
);

const inputClass =
  "w-full rounded-xl border border-zinc-200 bg-white px-3.5 py-2.5 text-sm text-(--neutral) outline-none transition placeholder:text-zinc-400 focus:border-(--primary) focus:ring-3 focus:ring-rose-100";

const Field = ({ label, children, className = "" }) => (
  <div className={className}>
    <label className="mb-1.5 block text-sm font-medium text-zinc-700">
      {label}
    </label>
    {children}
  </div>
);

const AddPlaceModal = ({ isOpen, onClose }) => {
  const [form, setForm] = useState(initialForm);
  const [image, setImage] = useState(null);

  const { addPlace, loading } = usePlaceStore();

  if (!isOpen) {
    return null;
  }

  const handleChange = (event) => {
    const { name, value, type, checked } = event.target;

    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleImageChange = (event) => {
    const file = event.target.files?.[0];
    setImage(file || null);
  };

  const resetForm = () => {
    setForm(initialForm);
    setImage(null);
  };

  const handleClose = () => {
    if (loading) {
      return;
    }

    resetForm();
    onClose();
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const formData = new FormData();

    formData.append("name", form.name);
    formData.append("category", form.category);
    formData.append("description", form.description);
    formData.append("address", form.address);
    formData.append("latitude", form.latitude);
    formData.append("longitude", form.longitude);
    formData.append("opening_hours", form.opening_hours);
    formData.append("phone", form.phone);
    formData.append("is_halal", String(form.is_halal));
    formData.append("is_featured", String(form.is_featured));

    if (form.rating) {
      formData.append("rating", form.rating);
    }

    if (form.price_level) {
      formData.append("price_level", form.price_level);
    }

    if (form.marker_icon) {
      formData.append("marker_icon", form.marker_icon);
    }

    if (image) {
      formData.append("image", image);
    }

    const result = await addPlace(formData);

    if (result.success) {
      await Swal.fire({
        icon: "success",
        title: "Berhasil",
        text: result.message || "Tempat berhasil ditambahkan",
        confirmButtonColor: "#e11d48",
      });

      resetForm();
      onClose();
      return;
    }

    Swal.fire({
      icon: "error",
      title: "Gagal",
      text: result.message || "Tempat gagal ditambahkan",
      confirmButtonColor: "#e11d48",
    });
  };

  return (
    <div className="fixed inset-0 z-9999 flex items-center justify-center bg-black/40 px-4 py-6 backdrop-blur-sm">
      <div className="flex max-h-[90vh] w-full max-w-3xl flex-col overflow-hidden rounded-3xl bg-white shadow-2xl">
        <div className="flex items-start justify-between gap-4 border-b border-zinc-100 px-5 py-4">
          <div>
            <h2 className="text-lg font-bold text-(--neutral)">
              Tambah Marker Baru
            </h2>
            <p className="mt-1 text-sm text-zinc-500">
              Isi data tempat kuliner yang akan ditampilkan di peta.
            </p>
          </div>

          <button
            type="button"
            onClick={handleClose}
            disabled={loading}
            aria-label="Tutup modal tambah marker"
            className="rounded-xl p-2 text-zinc-400 transition hover:bg-zinc-100 hover:text-zinc-700 disabled:cursor-not-allowed disabled:opacity-50"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="overflow-y-auto">
          <div className="space-y-5 px-5 py-5">
            <div className="grid gap-4 md:grid-cols-2">
              <Field label="Nama Tempat">
                <input
                  type="text"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  required
                  placeholder="Contoh: Warung Bu Made"
                  className={inputClass}
                />
              </Field>

              <Field label="Kategori">
                <select
                  name="category"
                  value={form.category}
                  onChange={handleChange}
                  required
                  className={inputClass}
                >
                  {categories.map((category) => (
                    <option key={category.label} value={category.label}>
                      {category.displayLabel}
                    </option>
                  ))}
                </select>
              </Field>
            </div>

            <Field label="Deskripsi">
              <textarea
                name="description"
                value={form.description}
                onChange={handleChange}
                rows="3"
                placeholder="Deskripsi singkat tempat kuliner..."
                className={`${inputClass} resize-none`}
              />
            </Field>

            <Field label="Alamat">
              <input
                type="text"
                name="address"
                value={form.address}
                onChange={handleChange}
                required
                placeholder="Masukkan alamat lengkap"
                className={inputClass}
              />
            </Field>

            <div className="grid gap-4 md:grid-cols-2">
              <Field label="Latitude">
                <input
                  type="number"
                  step="any"
                  name="latitude"
                  value={form.latitude}
                  onChange={handleChange}
                  required
                  placeholder="-8.7906"
                  className={inputClass}
                />
              </Field>

              <Field label="Longitude">
                <input
                  type="number"
                  step="any"
                  name="longitude"
                  value={form.longitude}
                  onChange={handleChange}
                  required
                  placeholder="115.1785"
                  className={inputClass}
                />
              </Field>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <Field label="Jam Buka">
                <input
                  type="text"
                  name="opening_hours"
                  value={form.opening_hours}
                  onChange={handleChange}
                  placeholder="08.00 - 22.00"
                  className={inputClass}
                />
              </Field>

              <Field label="Nomor Telepon">
                <input
                  type="text"
                  name="phone"
                  value={form.phone}
                  onChange={handleChange}
                  placeholder="08123456789"
                  className={inputClass}
                />
              </Field>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <Field label="Rating">
                <input
                  type="number"
                  step="0.1"
                  min="0"
                  max="5"
                  name="rating"
                  value={form.rating}
                  onChange={handleChange}
                  placeholder="4.5"
                  className={inputClass}
                />
              </Field>

              <Field label="Price Level">
                <select
                  name="price_level"
                  value={form.price_level}
                  onChange={handleChange}
                  className={inputClass}
                >
                  <option value="">Pilih level harga</option>
                  <option value="1">Murah</option>
                  <option value="2">Sedang</option>
                  <option value="3">Mahal</option>
                </select>
              </Field>
            </div>

            <Field label="Gambar Tempat">
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="w-full rounded-xl border border-zinc-200 bg-white px-3.5 py-2.5 text-sm text-zinc-600 file:mr-3 file:rounded-lg file:border-0 file:bg-zinc-100 file:px-3 file:py-1.5 file:text-sm file:font-medium file:text-zinc-600 hover:file:bg-zinc-200"
              />
              {image && (
                <p className="mt-1.5 truncate text-xs text-zinc-500">
                  File dipilih: {image.name}
                </p>
              )}
            </Field>

            <div className="flex flex-wrap gap-x-5 gap-y-3 rounded-2xl bg-zinc-50 px-4 py-3">
              <label className="flex items-center gap-2 text-sm text-zinc-600">
                <input
                  type="checkbox"
                  name="is_halal"
                  checked={form.is_halal}
                  onChange={handleChange}
                  className="h-4 w-4 accent-(--primary)"
                />
                Halal
              </label>

              <label className="flex items-center gap-2 text-sm text-zinc-600">
                <input
                  type="checkbox"
                  name="is_featured"
                  checked={form.is_featured}
                  onChange={handleChange}
                  className="h-4 w-4 accent-(--primary)"
                />
                Featured
              </label>
            </div>
          </div>

          <div className="flex justify-end gap-3 border-t border-zinc-100 bg-white px-5 py-4">
            <button
              type="button"
              onClick={handleClose}
              disabled={loading}
              className="rounded-xl bg-zinc-100 px-4 py-2.5 text-sm font-semibold text-zinc-600 transition hover:bg-zinc-200 disabled:cursor-not-allowed disabled:opacity-60"
            >
              Batal
            </button>

            <button
              type="submit"
              disabled={loading}
              className="rounded-xl bg-(--primary) px-4 py-2.5 text-sm font-semibold text-white transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading ? "Menyimpan..." : "Simpan Tempat"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddPlaceModal;
