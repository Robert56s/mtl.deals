import { createClient } from "@supabase/auth-helpers-sveltekit"
import { PUBLIC_SUPABASE_URL } from "$env/static/public"
import { SECRET_SUPABASE_SERVICE_KEY } from "$env/static/private"

export const getServiceSupabase = () => createClient(PUBLIC_SUPABASE_URL, SECRET_SUPABASE_SERVICE_KEY)
