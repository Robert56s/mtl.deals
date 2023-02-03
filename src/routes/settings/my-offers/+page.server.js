export const load = async ({ locals }) => {

    const getOffers = async () => {   
        
        let { data: offers, error:err } = await locals.sb
            .from('offers')
            .select('*')
            .eq('user_id',locals.session.user.id)

        return offers
    }

    return {
       products: getOffers(),
    }
}