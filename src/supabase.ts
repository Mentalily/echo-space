import { createClient} from "@supabase/supabase-js"

const supabaseUrl = import.meta.env.SUBABASE_URL
const supabaseKey = import.meta.env.SUBABASE_KEY

export const supabase = createClient(supabaseUrl, supabaseKey)
