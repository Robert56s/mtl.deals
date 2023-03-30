/** @type {import('./$types').PageLoad} */
export async function load({ locals, params }) {
    
    const getProfile = async (id) => {
        let { data: profiles } = await locals.sbs
            .from('profiles')
            .select('*')
            .eq('id', id)

        return profiles[0]
    }

    const getOffers = async (id) => {
        let { data: offers } = await locals.sbs
            .from('offers')
            .select('*')
            .eq('user_id', id)
            .eq('active', true)

        return offers
    }

    return {
        profile: getProfile(params.userId),
        offers: getOffers(params.userId)
    }
}