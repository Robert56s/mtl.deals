export async function load({ locals, params }) {
    //fix
    const getMessages = async (id) => {
        let { data: chats, error: err } = await locals.sbs
        .from('chats')
        .select(`*, sender_id(*)`)
        .eq('chat_id', id)

        return chats
        console.log(err)
    }

    const getReicept = async (id) => {   
        let { data: receipts, error } = await locals.sbs
        .from('receipts')
        .select(`*, offers (*), buyer_id(*), seller_id (*)`)
        .eq('chat_id', id)

        return receipts[0]
    }

    const getProfile = async () => {

        let { data: profiles, error } = await locals.sbs
        .from('profiles')
        .select('*')
        .eq('id', locals.session.user.id)

        return profiles[0]
    }

    return {
        messages: getMessages(params.chatId),
        receipt: getReicept(params.chatId),
        profile: getProfile()
    }

}