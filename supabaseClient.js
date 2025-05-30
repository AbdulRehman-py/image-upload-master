import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://neajjhzbwmqmhqebdqua.supabase.co"; // replace with your URL
const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5lYWpqaHpid21xbWhxZWJkcXVhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDg0MjIxOTksImV4cCI6MjA2Mzk5ODE5OX0.4Em4GrKmsqLdNEm7woJ_7Z8Xgc15GOV9rE7dRwXCBoY"; // replace with your anon key

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
