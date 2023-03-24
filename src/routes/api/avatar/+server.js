import { SECRET_IMGUR_CLIENT_ID } from "$env/static/private"

export const POST = async ({ request, locals }) => {

    const body = await request.json();

    let img = body.image.split("base64,")[1];
    

    const formData = new FormData()
    formData.append('image', img)


    const response = await fetch('https://api.imgur.com/3/image', {
        method: 'POST',
        headers: {
            "Authorization": `Client-ID ${SECRET_IMGUR_CLIENT_ID}`
        },
        body: formData
    });
    const responseData = await response.json();


    let { data, error: err } = await locals.sbs
        .from('profiles')
        .update({ "avatar_link": responseData.data.link })
        .eq('id', locals.session.user.id)

    
    return new Response(JSON.stringify({message: "success"}));
    
}