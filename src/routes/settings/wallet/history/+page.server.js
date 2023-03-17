export const load = async ({ locals }) => {

    const getHistory = async () => {   
        
        let { data } = await locals.sbs
        .from('wallets_activity')
        .select('*')
        .eq('user_id',locals.session.user.id)

        return data
    }

    return {
       history: getHistory()
    }
}