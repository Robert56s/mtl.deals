import { redirect } from "@sveltejs/kit";

/** @type {import('./$types').PageServerLoad} */
export async function load({ locals }) {

    if (!locals.session) {
        throw redirect(303, '/')
    }
}