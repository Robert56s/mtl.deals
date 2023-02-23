import "$lib/supabase"
import { AuthApiError } from '@supabase/supabase-js';
import { fail } from '@sveltejs/kit';
import { z } from 'zod';
import { LTC_WALLET_ID, CALLBACK_KEY} from "$env/static/public"

const registerSchema = z.object({
    username: z
        .string({ required_error: 'Username is required' })
        .min(3, { message: 'Username must be at least 3 charachters'})
        .max(20, { message: 'Username must be less than 20 charachters' })
        .trim(),
    email: z
        .string({ required_error: 'Email is required' })
        .min(1, { message: 'Email is required' })
        .max(64, { message: 'Email must be less than 64 charachters ' })
        .email( {message: 'Email must be a valid email address'} ),
    password: z
        .string({ required_error: 'Password is required' })
        .min(6, { message: 'Password must be at least 6 charachters' })
        .max(64, { message: 'Password must be less than 64 charachters ' })
        .trim(),
    passwordConfirm: z
        .string({ required_error: 'Password confirmation is required' })
        .min(6, { message: 'Password confirmation must be at least 6 charachters' })
        .max(64, { message: 'Password confirmation must be less than 64 charachters ' })
        .trim(),
    tos: z
        .enum(['on'], { required_error: 'You must accept the terms and conditions' })
})

const getAddy = async (locals) => {
    const response = await fetch(`https://apirone.com/api/v2/wallets/${LTC_WALLET_ID}/addresses`, {
        method: 'POST',
        header:{
            'Content-Type': 'application/json'
        },
        body:JSON.stringify({
            "addr-type": "p2sh-p2wpkh",
            "callback": {
                "method": "POST",
                "url": `https://mtldotdeals.loca.lt/api/get-ltc-addy`,
                "data": {
                    "key": `${CALLBACK_KEY}`,
                    "user_id": `${locals.session.user.id}`
                }
            }
        })
    })

    const responseData = await response.json();
    
    


}

/** @type {import('./$types').Actions} */
export const actions = {
    register: async ({ request, locals }) => {

        //convert form entries data to an object
        const body = Object.fromEntries(await request.formData())

        try {
            const result = registerSchema.parse(body)
        } catch (err) {
            console.log(err.flatten());
            const { fieldErrors: errors} = err.flatten()
            const { password, passwordConfirm, ...rest} = body
            return {
                data: rest,
                errors
            }
        }

        if (body.password !== body.passwordConfirm) {
            let passNotMatching = true
            return { passNotMatching }
        }
        
        
        //locals.sb is the supabase client from hooks.server.js
        const {data, error: err} = await locals.sb.auth.signUp({
            email: body.email,
            password: body.password,
            options: {
                data: {
                    username: body.username
                }
            }
        })

        
        
        if (err) {
            if (err instanceof AuthApiError && err.status === 400) {
                console.log("api error")
                return fail(400, {
                    errorSupabase: "Invalid email or password"
                })
            }
            console.log(" server error", err)
            return fail(500, {
                errorSupabase: "Server error. Please try again later."
            })
        } else {
            await getAddy(locals)
            let success = true
            return { success }
        }

    },
};