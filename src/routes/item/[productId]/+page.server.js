import { redirect } from '@sveltejs/kit'

/** @type {import('./$types').PageLoad} */
export async function load({ locals, params }) {
    //fix
    const getOffer = async (id) => {
        let { data: offers } = await locals.sbs
            .from('offers')
            .select('*, user_id(*)')
            .eq('id', id)
            .eq('active', true)

        if (!offers[0]) throw new redirect(303,'/')

        return offers[0]
    }

    return {
        product: getOffer(params.productId) 
    }

}