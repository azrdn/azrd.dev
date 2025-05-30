import { loadEnv } from "vite";
import { defineConfig } from "astro/config";
import { rehypeHeadingIds } from '@astrojs/markdown-remark';

import heading_links from 'rehype-autolink-headings'
import sitemap from "@astrojs/sitemap";

const env = loadEnv('production', process.cwd(), "");

export default defineConfig({
	site: env.SITE,
	integrations: [sitemap()],
	trailingSlash: 'always',
	server: {
		host: true,
	},
	markdown: {
		rehypePlugins: [
			rehypeHeadingIds,
			[heading_links, {
				behavior: "append",
				content: { type: "text", value: "#" },
				properties: { tabIndex: -1 }
			}]
		],
		shikiConfig: {
			theme: 'catppuccin-macchiato'
		}
	},
	experimental: {
		fonts: [
			{
				provider: "local",
				name: "gitlabmono",
				variants: [{
					weight: "100 800",
					style: "normal",
					src: ["./src/styles/GitLabMono.woff2"],
				}],
				fallbacks: ["monospace"],
				cssVariable: "--font-subset",
			},
			{
				provider: "local",
				name: "gitlabmono-ital",
				variants: [{
					weight: "100 800",
					style: "italic",
					src: ["./src/styles/GitLabMono-Italic.woff2"]
				}],
				fallbacks: ["monospace"],
				cssVariable: "--font-subset-ital"
			}
		]
	}
});
