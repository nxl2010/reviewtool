export default {
  async fetch(request, env, ctx) {
    if (env.ASSETS) {
      return env.ASSETS.fetch(request);
    }
    return new Response("Kuchen Review Tool Worker Active");
  }
};
