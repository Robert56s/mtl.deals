export const POST = async ({ request, locals }) => {

    const body = await request.json();

    console.log(body)

    
    return new Response(JSON.stringify({message: "success"}));
    
}