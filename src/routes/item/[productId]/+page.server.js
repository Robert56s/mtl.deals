/** @type {import('./$types').PageLoad} */
export async function load({ locals, params }) {
    //fix
    const getOffer = async (id) => {
        let { data: offers, error: err1 } = await locals.sbs
            .from('offers')
            .select('*')
            .eq('id', id)
        
        let obj = offers[0]

        let { data: profiles, error:err2 } = await locals.sbs
            .from('profiles')
            .select('avatar_link, username, id')
            .eq('id', obj.user_id)

        obj["avatar"] = profiles[0].avatar_link
        obj["username"] = profiles[0].username
        obj["seller_id"] = profiles[0].id

        return obj
    }

    return {
        product: getOffer(params.productId) 
    }

}