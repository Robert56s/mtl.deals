export const load = async ({ locals }) => {

    const getOffers = async () => {   
        
        let { data: offers, error:err } = await locals.sb
            .from('offers')
            .select('*')

        return offers
    }

    return {
       products: getOffers()
    }
}