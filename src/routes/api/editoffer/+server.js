import { z } from 'zod';

const registerSchema = z.object({
    title: z
        .string()
        .min(5, { message: 'Title must be at least 5 charachters'})
        .max(100, { message: 'Title must be less than 100 charachters' }),
    description: z
        .string()
        .min(20, { message: 'Description must be at least 20 charachters'})
        .max(2000, { message: 'Description must be less than 2000 charachters' }),
    price: z
        .number({ invalid_type_error: "Price must be a number"})
        .positive({ message: "Price must be at least 0.01$"})
        .max(1000000000, { message: "Price must be less than 1 000 000$" }),
    image: z
        .string()
})

export const POST = async ({ request, locals }) => {

    const body = await request.json();

    console.log(body)

    try {
        const result = registerSchema.parse(body)
    } catch (err) {
        const { fieldErrors: errors} = err.flatten()
        return new Response(JSON.stringify({ data: body, errors, message: "error"}));
    }

    
    const { data, error } = await locals.sbs
        .from('offers')
        .update({ img_base64: body.image, title: body.title, description: body.description, price: body.price })
        .eq('id', body.id)


    return new Response(JSON.stringify({message: "success"}));
    
}