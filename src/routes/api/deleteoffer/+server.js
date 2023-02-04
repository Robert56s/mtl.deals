export const POST = async ({ request, locals }) => {

    const body = await request.json();
        
    const { data, error:err } = await supabase
        .from('offers')
        .delete()
        .eq('some_column', 'someValue')

    if (err) {
        return new Response(JSON.stringify({message: "error"}));
    }

    return new Response(JSON.stringify({message: "success"}));
    
}