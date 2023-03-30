export const POST = async ({ request, locals }) => {

    const body = await request.json();
        
    
    await locals.sbs
    .from('receipts')
    .update({ active: false })
    .eq('id', body.id)



    return new Response(JSON.stringify({message: "success"}));
}