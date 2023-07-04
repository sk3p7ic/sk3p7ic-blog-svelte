import type { RequestHandler } from '@sveltejs/kit';
import { readdirSync, readFileSync, statSync } from 'fs';
import { join } from 'path';
import { unified } from 'unified';
import remarkParse from 'remark-parse';
import remarkStringify from 'remark-stringify';
import remarkFrontmatter from 'remark-frontmatter';
import remarkParseFrontmatter from 'remark-parse-frontmatter';

const basePath = join('./src', 'content');

const getContentFilenames = (): string[] => readdirSync(basePath);

const stripFilenameExtension = (filename: string) => filename.replace('.md', '');

const parseMarkdownFile = (slug: string) => {
	const filename = join(process.cwd(), basePath, slug + '.md');
	const dateCreated = statSync(filename).birthtime;
	const dateModified = statSync(filename).mtime;
	// TODO: Add type for frontmatter
	const frontmatter = unified()
		.use(remarkParse)
		.use(remarkFrontmatter)
		.use(remarkParseFrontmatter)
		.use(remarkStringify)
		.processSync(readFileSync(filename)).data?.frontmatter;
	const ast = unified()
		.use(remarkParse)
		.use(remarkFrontmatter)
		.use(remarkParseFrontmatter)
		.use(remarkStringify)
		.parse(readFileSync(filename));
	if (frontmatter) ast.children.shift();

	return { dateCreated, dateModified, frontmatter, ast };
};

export const GET = (async ({ params }) => {
	const { slug } = params;
	if (!slug || !getContentFilenames().map(stripFilenameExtension).includes(slug))
		return new Response(null, { status: 404 });
	return new Response(JSON.stringify(parseMarkdownFile(slug)));
}) satisfies RequestHandler;
