import { supabase } from "./supabase";

export const updateCatatan = async (id: string | number, data: any) => {
  const { error } = await supabase
    .from("catatan")
    .update({
      judul: data.judul,
      teks: data.teks,
      time_update: data.time_update,
    })
    .eq("id", id);

  if (error) {
    return { status: false, message: error.message };
  } else {
    return { status: true, message: "Berhasil mengupdate catatan" };
  }
};
