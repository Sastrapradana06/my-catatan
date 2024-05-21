// lib/supabaseClient.js
import { createClient } from "@supabase/supabase-js";

const url = "https://cmabxcbenlursxhlwyqm.supabase.co";
const key =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNtYWJ4Y2Jlbmx1cnN4aGx3eXFtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTYyMTE0OTMsImV4cCI6MjAzMTc4NzQ5M30.9PfbKgBSaWW1erw6wIyRywv9-4YQ5uZ_aSJd7PU5cR8";

const supabaseUrl = url;
const supabaseAnonKey = key;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
