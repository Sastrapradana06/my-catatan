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

export const handleIsBookmark = async (id: string | number) => {
  const { data, error: fetchError } = await supabase
    .from("catatan")
    .select("is_bookmark")
    .eq("id", id)
    .single();

  if (fetchError) {
    return { status: false, message: fetchError.message };
  }

  const newIsBookmarkValue = !data.is_bookmark;

  const { error: updateError } = await supabase
    .from("catatan")
    .update({ is_bookmark: newIsBookmarkValue })
    .eq("id", id);

  if (updateError) {
    return { status: false, message: updateError.message };
  } else {
    return { status: true, message: "Berhasil mengupdate catatan" };
  }
};
