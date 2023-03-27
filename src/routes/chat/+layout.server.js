export const load = async ({ locals }) => {

    const getReicept = async () => {   
        
        let { data: receipts, error } = await locals.sbs
        .from('receipts')
        .select(`*, offers (*), seller_id(*), buyer_id(*)`)
        .eq('active', true)
        
        const result = receipts.filter(body => body.buyer_id.id || body.seller_id.id == locals.session.user.id)
        
        return result
    }

    return {
        receipts: getReicept()
    }
}