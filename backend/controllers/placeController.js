import { supabase } from "../config/supabase.js";

export const getPlaces = async (req, res) => {
  try {
    const { data, error } = await supabase
      .from("places")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      return res.status(500).json({
        message: "Gagal mengambil data places",
        error: error.message,
      });
    }

    return res.status(200).json({
      message: "Berhasil mengambil data places",
      data,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Internal server error",
      error: error.message,
    });
  }
};

export const getPlaceById = async (req, res) => {
  try {
    const { id } = req.params;

    const { data, error } = await supabase
      .from("places")
      .select("*")
      .eq("id", id)
      .maybeSingle();

    if (error) {
      return res.status(400).json({
        message: "Gagal mengambil place",
        error: error.message,
      });
    }

    if (!data) {
      return res.status(404).json({
        message: "Place tidak ditemukan",
      });
    }

    return res.status(200).json({
      message: "Berhasil mengambil place",
      data,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Internal server error",
      error: error.message,
    });
  }
};

export const createPlace = async (req, res) => {
  try {
    const payload = {
      ...req.body,
      created_by: req.user.id,
    };

    const { data, error } = await supabase
      .from("places")
      .insert(payload)
      .select()
      .single();

    if (error) {
      return res.status(400).json({
        message: "Gagal menambahkan place",
        error: error.message,
      });
    }

    return res.status(201).json({
      message: "Berhasil menambahkan place",
      data,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Internal server error",
      error: error.message,
    });
  }
};

export const updatePlace = async (req, res) => {
  try {
    const { id } = req.params;

    const { data, error } = await supabase
      .from("places")
      .update({
        ...req.body,
        updated_at: new Date().toISOString(),
      })
      .eq("id", id)
      .select()
      .maybeSingle();

    if (error) {
      return res.status(400).json({
        message: "Gagal mengupdate place",
        error: error.message,
      });
    }

    if (!data) {
      return res.status(404).json({
        message: "Place tidak ditemukan",
      });
    }

    return res.status(200).json({
      message: "Berhasil mengupdate place",
      data,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Internal server error",
      error: error.message,
    });
  }
};

export const deletePlace = async (req, res) => {
  try {
    const { id } = req.params;

    const { error } = await supabase.from("places").delete().eq("id", id);

    if (error) {
      return res.status(400).json({
        message: "Gagal menghapus place",
        error: error.message,
      });
    }

    return res.status(200).json({
      message: "Berhasil menghapus place",
    });
  } catch (error) {
    return res.status(500).json({
      message: "Internal server error",
      error: error.message,
    });
  }
};
