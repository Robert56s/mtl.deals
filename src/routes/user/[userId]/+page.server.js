/** @type {import('./$types').PageLoad} */
export async function load({ locals, params }) {
    
    const getProfile = async (id) => {
        let { data: profiles, error: err1 } = await locals.sbs
            .from('profiles')
            .select('*')
            .eq('id', id)

        return profiles[0]
    }

    const getOffers = async (id) => {
        let { data: offers, error: err2 } = await locals.sbs
            .from('offers')
            .select('*')
            .eq('user_id', id)

        return offers
    }

    return {
        profile: getProfile(params.userId),
        offers: getOffers(params.userId)
    }
}