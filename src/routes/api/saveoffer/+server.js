import { z } from 'zod';
import { SECRET_IMGUR_CLIENT_ID } from "$env/static/private"

const registerSchema = z.object({
    title: z
        .string({ required_error: 'Title is required' })
        .min(5, { message: 'Title must be at least 5 charachters'})
        .max(100, { message: 'Title must be less than 100 charachters' }),
    description: z
        .string({ required_error: 'Description is required' })
        .min(20, { message: 'Description must be at least 20 charachters'})
        .max(2000, { message: 'Description must be less than 2000 charachters' }),
    price: z
        .number({ required_error: "Price is required", invalid_type_error: "Price must be a number"})
        .positive({ message: "Price must be at least 0.01$"})
        .max(1000000000, { message: "Price must be less than 1 000 000$" }),
    image: z
        .string({ required_error: 'Image is requiered' })
})

export const POST = async ({ request, locals }) => {

    const body = await request.json();

    try {
        const result = registerSchema.parse(body)
    } catch (err) {
        const { fieldErrors: errors} = err.flatten()
        return new Response(JSON.stringify({ data: body, errors, message: "error"}));
    }


    let img = body.image.split("base64,")[1];
    const formData = new FormData()
    formData.append('image', img)

    const response = await fetch('https://api.imgur.com/3/image', {
        method: 'POST',
        headers: {
            "Authorization": `Client-ID ${SECRET_IMGUR_CLIENT_ID}`
        },
        body: formData
    });
    const responseData = await response.json();


    const { data, error: errr } = await locals.sbs
        .from('offers')
        .insert([{ user_id: locals.session.user.id, price: body.price, title: body.title, description: body.description, img_link: responseData.data.link },])

    return new Response(JSON.stringify({message: "success"}));
    
}