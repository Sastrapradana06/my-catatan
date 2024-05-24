import { supabase } from "./supabase";

export const getCatatanUser = async (id: string | number) => {
  const { data, error } = await supabase
    .from("catatan")
    .select()
    .eq("user_id", id);

  // console.log({ data }, "dari fetch");

  if (error) {
    return { status: false, message: error.message };
  } else {
    return { status: true, data: data };
  }
};

export const getCatatanById = async (id: string | number) => {
  const { data, error } = await supabase.from("catatan").select().eq("id", id);
  if (error) {
    return { status: false, message: error.message };
  } else {
    return { status: true, data: data };
  }
};
