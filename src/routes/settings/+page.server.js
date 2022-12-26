import { redirect } from "@sveltejs/kit";

/** @type {import('./$types').PageServerLoad} */
export async function load( { locals } ) {

    if (!locals.session) {
        throw redirect(303, '/')
    }

    let { data: profiles, error } = await locals.sb
    .from('profiles')
    .select('username')
    .eq('id', locals.session.user.id)
    
    profiles = profiles[0]

    return {
        profiles: profiles
    }
}

/** @type {import('./$types').Actions} */
export const actions = {

    accupdate: async ({ request, locals }) => {

        //convert form entries data to an object
        const body = Object.fromEntries(await request.formData())

        console.log(body)
        
        const { data, error: err } = await locals.sb
        .from('profiles')
        .update({ username: body.username })
        .eq('id', locals.session.user.id)

        throw redirect(303, '/settings')
    },
};

