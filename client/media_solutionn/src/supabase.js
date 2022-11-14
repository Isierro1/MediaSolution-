import { createClient } from '@supabase/supabase-js'



const supabaseUrl = 'https://crgsxyjielzvqsapfafs.supabase.co'
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNyZ3N4eWppZWx6dnFzYXBmYWZzIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NjgzODA1OTUsImV4cCI6MTk4Mzk1NjU5NX0.7IFpQmPN5FfC-LNL52c-QwwNKwjO0Q3kWzCWWL1KOkM"
const supabase = createClient(supabaseUrl, supabaseKey)

export default supabase; 
