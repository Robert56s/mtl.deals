export const POST = async ({ request, locals }) => {

    const body = await request.json();
    console.log(body)
    if (body.withAmt < 0.02) {
        return new Response(JSON.stringify({ err: true, message: "You need to withdraw at least 0.02 ltc"}));
    }

    let { data: ltcAmt, error } = await locals.sbs
        .from('profiles')
        .select('ltc_amount')
        .eq('id', locals.session.user.id)
        
    ltcAmt = (ltcAmt[0].ltc_amount)/100000000

    if (body.withAmt > ltcAmt) {
        return new Response(JSON.stringify({ err: true, message: "You can't withdraw more then you have"}))
    }

    

    return new Response(JSON.stringify({message: "success"}));
    
}