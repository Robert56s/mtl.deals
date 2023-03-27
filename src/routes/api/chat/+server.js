import { z } from 'zod';

const schema = z.object({
    sender_id: z
        .string({ required_error: 'sender_id is required' }),
    chat_id: z
        .string({ required_error: "chat_id is required"}),
    message: z
        .string({ required_error: 'A message is required' })
        .max(500, { message: 'Message must be less than 500 charachters' }),
})

export const POST = async ({ request, locals }) => {

    const body = await request.json();
    
    try {
        const result = schema.parse(body)
    } catch (err) {
        const { fieldErrors: errors} = err.flatten()
        return new Response(JSON.stringify({ data: body, errors, message: "error"}));
    }

    await locals.sbs
        .from('chats')
        .insert([
            { sender_id: body.sender_id, chat_id: body.chat_id, message: body.message },
        ])


    return new Response(JSON.stringify({message: "success"}));
}