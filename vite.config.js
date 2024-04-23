import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';
import adapter from '@sveltejs/adapter-static';
import { vitePreprocess } from '@sveltejs/kit/vite';

const dev = process.argv.includes('dev');

/** @type {import('@sveltejs/kit').Config} */
const config = {
	plugins: [sveltekit()],
    kit: {
        appDir: 'app', // Required as the default is _app
        adapter: adapter(),
		paths: {
            base: dev ? '' : process.env.BASE_PATH,
        }
    },
    preprocess: vitePreprocess()
};
export default config;
