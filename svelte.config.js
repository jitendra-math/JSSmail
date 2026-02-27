import adapter from '@sveltejs/adapter-vercel';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

const config = {
  preprocess: vitePreprocess(),
  kit: {
    adapter: adapter({
      runtime: 'nodejs20.x'
    }),
    alias: {
      $components: 'src/lib/components',
      $db: 'src/lib/server/db',
      $utils: 'src/lib/utils',
      $services: 'src/lib/server/services'
    }
  }
};

export default config;
