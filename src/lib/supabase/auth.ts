import { comparePassword, hashPassword } from "@/utils/utils";
import { supabase } from "./supabase";

interface TypeDataRegister {
  email: string;
  password: string;
}

export const handleRegister = async (data: TypeDataRegister) => {
  const hashPw = await hashPassword(data.password);
  const { error } = await supabase.from("user").insert({
    email: data.email,
    password: hashPw,
  });

  if (error) {
    return { status: false, message: error.message };
  } else {
    return { status: true, message: "Post created successfully" };
  }
};

export const handleLogin = async (data: TypeDataRegister) => {
  const { email, password } = data;
  const { data: user, error } = await supabase
    .from("user")
    .select("id, email, password")
    .eq("email", email);

  console.log({ user }, "dari supabase");

  if (error) {
    return { status: false, message: error.message };
  } else {
    const result = await comparePassword(password, user[0].password);
    if (result) {
      return { status: true, message: "Login success" };
    } else {
      return { status: false, message: "Login failed" };
    }
  }
};
