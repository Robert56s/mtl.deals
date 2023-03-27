export const load = async ({ locals }) => {

    const getReicept = async () => {   
        
        let { data: receipts, error } = await locals.sbs
        .from('receipts')
        .select(`*, offers (*), seller_id(*), buyer_id(*)`)
        .eq('active', true)

        return receipts
        // if(receipts)
        
        // const result = 
    }

    return {
        receipts: getReicept()
    }
}