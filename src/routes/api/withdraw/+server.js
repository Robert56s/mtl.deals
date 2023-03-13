import { SECRET_LTC_TRANSFER_KEY, SECRET_LTC_WALLET_ID, SECRET_CALLBACK_KEY } from '$env/static/private'
import axios from 'axios';

export const POST = async ({ request, locals }) => {

    const body = await request.json();

    let patern = new RegExp('/^[LM3][a-km-zA-HJ-NP-Z1-9]{26,33}$/')

    if (!patern.test(body.withAddy)) {
        return new Response(JSON.stringify({ err: true, message: "Address is invalid"}));
    }

    if (body.withAmt < 2000000) {
        return new Response(JSON.stringify({ err: true, message: "You need to withdraw at least 0.02 ltc"}));
    }

    let { data: ltcAmt } = await locals.sbs
        .from('profiles')
        .select('ltc_amount')
        .eq('id', locals.session.user.id)
        
    ltcAmt = (ltcAmt[0].ltc_amount)

    if (body.withAmt > (ltcAmt)) {
        return new Response(JSON.stringify({ err: true, message: "You can't withdraw more then you have"}))
    }

    let { data: profiles } = await locals.sbs
        .from('profiles')
        .update({ ltc_amount: (ltcAmt - body.withAmt) })
        .eq('id', locals.session.user.id)


    const withReqBody = {
        "transfer-key": `${SECRET_LTC_TRANSFER_KEY}`,
        "destinations": [
            {
                "address": `${body.withAddy}`,
                "amount": body.withAmt
            }
        ],
        "fee": "normal",
        "subtract-fee-from-amount": true
    }

    let responseData;

    await axios.post(`https://apirone.com/api/v2/wallets/${SECRET_LTC_WALLET_ID}/transfer`, withReqBody)
        .then(function (response) {
            console.log(response.data)
            responseData = response.data
        })

    const walletEventBody = {
        key: SECRET_CALLBACK_KEY,
        user_id: locals.session.user.id,
        ltc_amount: body.withAmt,
        type: "withdraw",
        tx: responseData.txs[0],
        destination: responseData.destinations[0].address,
        created: responseData.created
    }

    // await axios.post(`api/wallet-callbacks`, responseData)
    //     .then(function (response) {
    //         console.log(response.data)
    //         responseData = response.data
    //     })
    
    return new Response(JSON.stringify({message: "success"}));
    
}