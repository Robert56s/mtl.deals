import "$lib/supabase"
import { getSupabase } from "@supabase/auth-helpers-sveltekit"

export const handle = async ({ event, resolve }) => {
    // Stage 1
    const { session, supabaseClient } = await getSupabase(event)

    event.locals.sb = supabaseClient
    event.locals.session = session

    return resolve(event)  // Stage 2
}

