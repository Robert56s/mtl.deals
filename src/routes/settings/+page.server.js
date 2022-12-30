import { redirect } from "@sveltejs/kit";
import { randomBytes } from "node:crypto";

/** @type {import('./$types').PageServerLoad} */
export async function load({ locals} ) {

    if (!locals.session) {
        throw redirect(303, '/')
    }

    const getUsername = async () => {
        let { data: username, error } = await locals.sb
        .from('profiles')
        .select('username')
        .eq('id', locals.session.user.id)

        username = username[0].username
        return username

    }

    const getAvatar = async () => {
        
        let { data: avatar, error } = await locals.sb
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
        
        const { data, error: err } = await locals.sb
        .from('profiles')
        .update({ username: body.username })
        .eq('id', locals.session.user.id)

        throw redirect(303, '/settings')
    },

    avatarupdate: async ({ request, locals }) => {
        
        //convert form entries data to an object
        const values = await request.formData()
        const token = randomBytes(24).toString('hex');

        const file = values.get('image');

        console.log(file)

        const { data, error } = await locals.sb.storage
        .from('profiles')
        .upload(`${locals.session.user.id}/${token}.png`, body.avatar)
    }
};

