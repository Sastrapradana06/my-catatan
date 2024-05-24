import { comparePassword, hashPassword } from "@/utils/utils";
import { supabase } from "./supabase";

interface TypeDataRegister {
  username: string;
  email: string;
  password: string;
}

interface TypeDataLogin {
  email: string;
  password: string;
}

export const handleRegister = async (data: TypeDataRegister) => {
  const hashPw = await hashPassword(data.password);
  const { error } = await supabase.from("user").insert({
    username: data.username,
    email: data.email,
    password: hashPw,
  });

  if (error) {
    return { status: false, message: error.message };
  } else {
    return { status: true, message: "Post created successfully" };
  }
};

export const handleLogin = async (data: TypeDataLogin) => {
  const { email, password } = data;
  const { data: user, error } = await supabase
    .from("user")
    .select("id, email, username, password")
    .eq("email", email);

  if (error) {
    return { status: false, message: error.message };
  } else {
    const result = await comparePassword(password, user[0].password);
    if (result) {
      return { status: true, message: "Login success", user: user[0] };
    } else {
      return { status: false, message: "Login failed" };
    }
  }
};
