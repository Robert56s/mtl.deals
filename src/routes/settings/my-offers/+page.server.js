export const load = async ({ locals }) => {

    const getOffers = async () => {   
        
        let { data: offers, error:err } = await locals.sbs
            .from('offers')
            .select('*')
            .eq('user_id',locals.session.user.id)

        return offers
    }

    const getReceipts = async () => {
        let { data: receipts, error } = await locals.sbs
        .from('receipts')
        .select(`*, offers (*), seller_id(*), buyer_id(*)`)
        .eq('seller_id', locals.session.user.id)
        .eq('active', true)
        return receipts
    }

    return {
       products: getOffers(),
       receipts: getReceipts()
    }
}