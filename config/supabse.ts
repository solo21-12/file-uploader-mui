import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://bchgffgveogimckuijpl.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJjaGdmZmd2ZW9naW1ja3VpanBsIiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODgzODExMjQsImV4cCI6MjAwMzk1NzEyNH0.pLaPpWAgV8GyiLcRlR9ZVC2EoiGk-ZiIh2IUcHZwyW0";
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
