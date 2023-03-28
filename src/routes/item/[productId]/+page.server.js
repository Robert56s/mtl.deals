/** @type {import('./$types').PageLoad} */
export async function load({ locals, params }) {
    //fix
    const getOffer = async (id) => {
        let { data: offers } = await locals.sbs
            .from('offers')
            .select('*, user_id(*)')
            .eq('id', id)

        return offers[0]
    }

    return {
        product: getOffer(params.productId) 
    }

}