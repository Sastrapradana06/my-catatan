import { supabase } from "./supabase";

export const deleteMultipleCatatan = async (data: any) => {
  const { error } = await supabase.from("catatan").delete().in("id", data);
  if (error) {
    return { status: false, message: error.message };
  } else {
    return { status: true, message: "Berhasil menghapus catatan" };
  }
};
