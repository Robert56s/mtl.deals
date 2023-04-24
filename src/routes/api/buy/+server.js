
import { SECRET_CALLBACK_KEY } from '$env/static/private'
import { PUBLIC_SERVER_URL } from '$env/static/public'

const getLtcPrice = async () => {
    
    let responce = await fetch('https://min-api.cryptocompare.com/data/price?fsym=LTC&tsyms=USD', {
        method: "GET",
        headers: {
            'Content-Type': 'application/json'
        }
    })
    let responceData = await responce.json()
    return responceData.USD
    
}

const sendCallback = async (money, buyer, seller) => {
    let responce = await fetch(`${PUBLIC_SERVER_URL}/buy-callbacks`, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            secret: SECRET_CALLBACK_KEY,
            amount: money,
            id: [
                buyer,
                seller
            ],
        })
    })
    let responceData = await responce.json()
}

export const POST = async ({ request, locals }) => {

    const body = await request.json();
    
    if (locals.session.user.id == body.seller_id){
        return new Response(JSON.stringify({message: "You cannot buy your own offer"}))
    }

    const ltcPrice = await getLtcPrice()
    const ltcAmount = Number(((body.price/ltcPrice)*100000000).toFixed(0))
    
    //update buyer ltc amount
    const { data: buyer } = await locals.sbs
    .from('profiles')
    .select('ltc_amount')
    .eq('id', locals.session.user.id)

    if (ltcAmount > buyer[0].ltc_amount){
        return new Response(JSON.stringify({message: "You do not have enough funds"}))
    }
    
    await locals.sbs
    .from('profiles')
    .update({ ltc_amount: (buyer[0].ltc_amount - ltcAmount)})
    .eq('id', locals.session.user.id)

    //update seller ltc amount
    const { data: seller } = await locals.sbs
    .from('profiles')
    .select('ltc_amount')
    .eq('id', body.seller_id)
    
    await locals.sbs
    .from('profiles')
    .update({ ltc_amount: (seller[0].ltc_amount + ltcAmount)})
    .eq('id', body.seller_id)

    //create receipt
    await locals.sbs
    .from('receipts')
    .insert([
    { offer_id: body.id, amount_ltc: ltcAmount, buyer_id: locals.session.user.id, seller_id: body.seller_id },
    ])

    //deactivate offer
    await locals.sbs
    .from('offers')
    .update({ active: false })
    .eq('id', body.id)

    sendCallback(Number(body.price), locals.session.user.id, body.seller_id)
        
    return new Response(JSON.stringify({message: "success", amount: ltcAmount}));
}