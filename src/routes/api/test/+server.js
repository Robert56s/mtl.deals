export const POST = async ({ request, locals }) => {

    const body = await request.json();

    console.log(body, locals.session)

    return new Response(JSON.stringify({message: "success", data: body}));
    
}