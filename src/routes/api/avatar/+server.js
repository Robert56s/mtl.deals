export const POST = async ({ request, locals }) => {

    const body = await request.json();

    let { data, error: err } = await locals.sbs
        .from('profiles')
        .update({ "avatar_base64": body.image })
        .eq('id', locals.session.user.id)

    
    return new Response(JSON.stringify({message: "success"}));
    
}