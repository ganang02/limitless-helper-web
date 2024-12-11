import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://azvoskpuktggdnfrgdlg.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImF6dm9za3B1a3RnZ2RuZnJnZGxnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzM5MTYyNzcsImV4cCI6MjA0OTQ5MjI3N30.X7UVJRQ0t1Hcq0uSEWzKlMnQgj7F5Qz9B42hoXJ9lVE';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);