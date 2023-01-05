/** @type {import('./$types').PageLoad} */
export async function load({ fetch, params}) {
    
    const fetchProduct = async (id) => {
        
    }

    return {
        product: fetchProduct(params.productId)
    }

}