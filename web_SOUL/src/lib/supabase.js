
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://obowxitwowkvomzauuye.supabase.co'
const supabaseAnonKey = 'sb_publishable_yWvxUV9spGHeD0blx8nOgQ_YYUR_Bu0'

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
  },
})