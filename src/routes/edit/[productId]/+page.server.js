import { redirect } from "@sveltejs/kit";
export async function load({ locals, params }) {

    const getOffer = async (id) => {
        let { data: offers, error: err1 } = await locals.sb
            .from('offers')
            .select('*')
            .eq('id', id)
        
        if (offers[0].user_id != locals.session.user.id) {
            throw redirect(303, '/')
        }


        return offers[0]
    }

    return {
        product: getOffer(params.productId)
    }

}