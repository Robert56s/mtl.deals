import adapter from '@sveltejs/adapter-node'

const config = {
  kit: {
    adapter: adapter(),
    csrf: {
      checkOrigin: false,  //remove in prod
    }
  },
}

export default config