export const load = async ({ locals }) => {    

    const getReicept = async () => {   
        
        let { data: receipts } = await locals.sbs
        .from('receipts')
        .select(`*, offers (*), seller_id(*)`)
        .eq('buyer_id', locals.session.user.id)
        .eq('active', true)
        return receipts
    }

    return {
        receipts: getReicept()
    }
}