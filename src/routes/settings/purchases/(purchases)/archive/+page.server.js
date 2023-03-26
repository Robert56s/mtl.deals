export const load = async ({ locals }) => {

    const getReicept = async () => {   
        
        let { data: receipts, error } = await locals.sbs
        .from('receipts')
        .select(`*, offers (*), seller_id(*)`)
        .eq('buyer_id', locals.session.user.id)
        .eq('active', false)
        return receipts
    }



    return {
        receipts: getReicept()
    }
}