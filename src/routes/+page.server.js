export const load = async ({ locals }) => {

    const getOffers = async () => {   
        
        let { data: offers, error:err } = await locals.sbs
            .from('offers')
            .select('*')
            .eq('active', true)

        return offers
    }

    return {
       products: getOffers()
    }
}