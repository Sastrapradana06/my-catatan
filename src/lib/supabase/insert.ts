import { supabase } from "./supabase";

export const tambahCatatan = async (data: any) => {
  const { error } = await supabase.from("catatan").insert(data);
  if (error) {
    return { status: false, message: error.message };
  } else {
    return { status: true, message: "Berhasil menambah catatan" };
  }
};
