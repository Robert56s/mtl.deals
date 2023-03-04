export const POST = async ({ request, locals }) => {

    const body = await request.json();
        
    const { data, error:err } = await locals.sbs
        .from('offers')
        .delete()
        .eq('id', body.id)

    if (err) {
        return new Response(JSON.stringify({message: "error"}));
    }

    console.log('ok')
    return new Response(JSON.stringify({message: "success"}));
}