import type { RequestHandler } from '@sveltejs/kit';
import { readdirSync, readFileSync, statSync } from 'fs';
import { join } from 'path';
import { unified } from 'unified';
import remarkParse from 'remark-parse';
import remarkStringify from 'remark-stringify';
import remarkFrontmatter from 'remark-frontmatter';
import remarkParseFrontmatter from 'remark-parse-frontmatter';
import type { FrontmatterType } from '$lib/types';

const basePath = join('./src', 'content');

const getContentFilenames = (): string[] => readdirSync(basePath);

const stripFilenameExtension = (filename: string) => filename.replace('.md', '');

const parseMarkdownFile = (slug: string) => {
	const filename = join(process.cwd(), basePath, slug + '.md');
	const dateCreated = statSync(filename).birthtime;
	const dateModified = statSync(filename).mtime;
	const frontmatter = unified()
		.use(remarkParse)
		.use(remarkFrontmatter)
		.use(remarkParseFrontmatter)
		.use(remarkStringify)
		.processSync(readFileSync(filename)).data?.frontmatter as FrontmatterType;
	return { dateCreated, dateModified, frontmatter };
};

export const GET = (async () => {
	const filenames = getContentFilenames();
	const posts = filenames.map(stripFilenameExtension).map(parseMarkdownFile);
	return new Response(JSON.stringify(posts));
}) satisfies RequestHandler;
