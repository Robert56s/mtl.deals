import { getServerSession } from '@supabase/auth-helpers-sveltekit';
import { SECRET_LTC_WALLET_ID, SECRET_CALLBACK_KEY } from "$env/static/private"
import axios from 'axios';

const getAddy = async (event) => {
    // const response = await fetch(`https://apirone.com/api/v2/wallets/${SECRET_LTC_WALLET_ID}/addresses`, {
    //     method: 'POST',
    //     headers:{
    //         'Content-Type': 'application/json'
    //     },
    //     body: JSON.stringify({
    //         "addr-type": "p2sh-p2wpkh",
    //         "callback": {
    //             "method": "POST",
    //             "url": `https://b023-69-156-27-138.ngrok.io/api/ltc-callbacks`,
    //             "data": {
    //                 "key": `${SECRET_CALLBACK_KEY}`,
    //                 "user_id": `${event.locals.session.user.id}`,
    //             },
    //         }
    //     })
    // })

    // const responseData = await response.json();
    // console.log(responseData)

    const body = {
        "addr-type": "p2sh-p2wpkh",
        "callback": {
            "method": "POST",
            "url": `https://e402-69-156-27-138.ngrok.io/api/ltc-callbacks`,
            "data": {
                "key": `${SECRET_CALLBACK_KEY}`,
                "user_id": `${event.locals.session.user.id}`,
            },
        }
    }

    let responseData;

    await axios.post(`https://apirone.com/api/v2/wallets/${SECRET_LTC_WALLET_ID}/addresses`, body)
        .then(function (response) {
            console.log(response.data)
            responseData = response.data
        })

    
    const { data, error: err } = await event.locals.sbs
        .from('profiles')
        .update({ ltc_addy: responseData.address })
        .eq('id', event.locals.session.user.id)

    if(err){
        console.log(err)
    }

    return responseData.address
}

/** @type {import('./$types').LayoutServerLoad} */
export const load = async (event) => {

    const session = await getServerSession(event)

    
    const getMoney = async () => {

        if (session) {
            let { data: profiles, error: err } = await event.locals.sbs
            .from('profiles')
            .select('ltc_amount, ltc_addy')
            .eq('id', session.user.id)
            let ltc = profiles[0].ltc_amount
            let addy = profiles[0].ltc_addy

            if(!addy) addy = await getAddy(event);
            
            return {ltc, addy}
            
        }
    }

    const getLtcPrice = async () => {
        if(session) {
            let responce = await fetch('https://min-api.cryptocompare.com/data/price?fsym=LTC&tsyms=USD', {
				method: "GET",
				headers: {
					'Content-Type': 'application/json'
				}
			})

            let responceData = await responce.json()
            return responceData.USD
        }
    }
    
    return {
        session: session,
        money: await getMoney(),
        ltcPrice: await getLtcPrice()
    }
}
