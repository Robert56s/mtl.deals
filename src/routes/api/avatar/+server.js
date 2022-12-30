import { error, redirect } from "@sveltejs/kit";

export const POST = async ({ request, locals }) => {

    const body = await request.json();
    
    let { data: profiles, error: err } = await locals.sb
        .from('profiles')
        .update({ "avatar_base64": body.image })
        .eq('id', locals.session.user.id)

    
    return new Response(profiles)

}