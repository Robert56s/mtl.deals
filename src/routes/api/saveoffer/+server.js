import { z } from 'zod';

const registerSchema = z.object({
    title: z
        .string({ required_error: 'Title is required' })
        .min(5, { message: 'Title must be at least 5 charachters'})
        .max(30, { message: 'Title must be less than 30 charachters' }),
    description: z
        .string({ required_error: 'Description is required' })
        .min(5, { message: 'Title must be at least 5 charachters'})
        .max(30, { message: 'Title must be less than 30 charachters' }),
    price: z
        .number({ required_error: "Price is required", invalid_type_error: "Price must be a number"})
        .positive({ message: "Price must be a number"})
        .min(1, { messgae: 'Price must be at least 0.01$'})
        .max(1000000000, { message: "Price must be less than 1 000 000$" })

})

export const POST = async ({ request, locals }) => {

    const body = await request.json();

    console.log(body)

    
    return new Response(JSON.stringify({message: "success"}));
    
}