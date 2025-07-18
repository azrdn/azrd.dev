import { rehypeHeadingIds } from "@astrojs/markdown-remark";
import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";
import { defineConfig } from "astro/config";
import heading_links from "rehype-autolink-headings";

export default defineConfig({
	site: "https://azrd.dev",
	integrations: [sitemap(), mdx()],
	scopedStyleStrategy: "class",
	server: { host: true },
	build: {
		format: "preserve",
		assets: "static",
		concurrency: 2,
	},
	devToolbar: { enabled: false },
	markdown: {
		rehypePlugins: [
			rehypeHeadingIds,
			[
				heading_links,
				{
					behavior: "append",
					content: { type: "text", value: "#" },
					properties: { tabIndex: -1 },
				},
			],
		],
		shikiConfig: {
			defaultColor: false,
			themes: {
				dark: "catppuccin-macchiato",
				light: "github-light",
			},
		},
	},
	experimental: {
		contentIntellisense: true,
		fonts: [
			{
				provider: "local",
				name: "gitlabmono",
				variants: [
					{
						weight: "100 800",
						style: "normal",
						src: ["./src/styles/GitLabMono.woff2"],
					},
					{
						weight: "100 800",
						style: "italic",
						src: ["./src/styles/GitLabMono-Italic.woff2"],
					},
				],
				fallbacks: ["monospace"],
				cssVariable: "--font-subset",
			},
		],
	},
});
