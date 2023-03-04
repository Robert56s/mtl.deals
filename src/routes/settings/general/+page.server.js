/** @type {import('./$types').PageServerLoad} */
export async function load({ locals }) {

    const getUsername = async () => {
        let { data: username, error } = await locals.sbs
        .from('profiles')
        .select('username')
        .eq('id', locals.session.user.id)

        username = username[0].username
        return username

    }

    const getAvatar = async () => {
        
        let { data: avatar, error } = await locals.sbs
            .from('profiles')
            .select('avatar_base64')
            .eq('id', locals.session.user.id)
        
        avatar = avatar[0].avatar_base64
        return avatar
    }

    return {
        username: getUsername(),
        avatar: getAvatar()
    }

}

/** @type {import('./$types').Actions} */
export const actions = {

    accupdate: async ({ request, locals }) => {

        //convert form entries data to an object
        const body = Object.fromEntries(await request.formData())
        
        const { data, error: err } = await locals.sbs
        .from('profiles')
        .update({ username: body.username })
        .eq('id', locals.session.user.id)

        return { success: true }
    }
};

