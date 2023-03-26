export const POST = async ({ request, locals }) => {

    const body = await request.json();
        
    
    return new Response(JSON.stringify({message: "success"}));
}