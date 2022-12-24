import { AuthApiError } from '@supabase/supabase-js';
import { fail, redirect } from '@sveltejs/kit';



/** @type {import('./$types').Actions} */
export const actions = {
    register: async ({ request, locals }) => {
        console.log("hit")

        //convert form entries data to an object
        const body = Object.fromEntries(await request.formData())

        //locals.sb is the supabase client from hooks.server.js
        const {data, error: err} = await locals.sb.auth.signUp({
            email: body.email,
            password: body.password
        })
        
        if (err) {
            if (err instanceof AuthApiError && err.status === 400) {
                console.log("api error")
                return fail(400, {
                    error: "Invalid email or password"
                })
            }
            console.log(" server error", err)
            return fail(500, {
                error: "Server error. Please try again later."
            })
        }

        throw redirect(303, '/')
    },
};