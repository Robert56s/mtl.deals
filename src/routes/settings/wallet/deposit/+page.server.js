export const load = async ({ locals }) => {

    const getWalAmt = async () => {   
        
        let { data: profiles, error } = await locals.sbs
        .from('profiles')
        .select('ltc_amount')
        .eq('id', locals.session.user.id)

        return profiles[0].ltc_amount

    }

    return {
       walAmt: getWalAmt()
    }
}