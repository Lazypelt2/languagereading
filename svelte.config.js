import adapter from '@sveltejs/adapter-static';

const dev = process.argv.includes('dev');

const config = {
    kit: {
        appDir: 'app', // Required as the default is _app
        adapter: adapter()
    },
	paths: {
		base: dev ? '' : "/languagereading",
	}
};
export default config;
