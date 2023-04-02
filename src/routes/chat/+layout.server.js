export const load = async ({ locals }) => {

    const getReicept = async () => {   
        
        let { data: receipts, error } = await locals.sbs
        .from('receipts')
        .select(`*, offers (*), seller_id(*), buyer_id(*)`)
        .eq('active', true)
        
        const result = receipts.filter(receipts => receipts.buyer_id.id == locals.session.user.id || receipts.seller_id.id == locals.session.user.id)
        console.log(result)
        return result
    }

    return {
        receipts: getReicept()
    }
}