---
title: 'The Creation of this Blog'
description: 'How I created this blog using SvelteKit.'
categories:
  - 'Web Development'
  - 'Svelte'
published: true
---

Creating a blog is something that I've wanted to do for a while now. I've toyed with the idea of using something like
Hugo to create a static site, but after trying it out, I found that it left me wanting more. I wanted to be able to
create a blog that was more dynamic, and that I could easily add new features to. I understand that this is possible
with Hugo, but I felt that if I should invest the time to learn a new tool, I should learn something that I could use
for more than just a blog (ie. a framework).

## Background

Those who have perused [my personal website](https://joshuaibrom.com/) may have noticed that I have experience with
Astro, React, and Vue. I've also dabbled with Svelte and even use a tiny amount of it for reactive components on my
website, but I've never used it for a full project. I've been wanting to learn more about Svelte, so I decided to use
it for this blog.

Of course, before making the decision to build my own custom blog, I did try [Hugo](https://gohugo.io/). I found it
very easy to use and create with, provided that I am comfortable with using the theme that I chose and its
features / limitations. When I'd tried Hugo, I tried it with the [Binario](https://themes.gohugo.io/binario/) theme,
which I found to be very nice. I'd even attempted to deploy it to Vercel, but was unable to get it to work despite
using git submodules and Vercel's claimed support for Hugo. I'm sure that I could have gotten it to work if I'd spent
more time on it, but I decided that I'd rather spend that time learning something new. And so here we are.

Before starting this project, I had a few goals in mind:

- I wanted to use SvelteKit, as I've been wanting to learn more about it.
- I wanted to use TailwindCSS and potentially some version of a UI framework / component library.
- I wanted to use Markdown for my blog posts.
- Blog posts should be able to contain:
  - Images
  - Code blocks with syntax highlighting
  - Links
  - Headings
  - Formatted text (bold, italics, etc.)
  - Lists, tables, and blockquotes
  - Most importantly... $\LaTeX$! (I'm a **HUGE** fan of it.)

As such, I set forth to verify that I could accomplish all of these goals with SvelteKit. Once I was satisfied that I
could, I began to create this blog.

## The Process

### SvelteKit

I started by creating a new SvelteKit project using the `create-svelte` template and selecting the options to use
TypeScript. I'd also selected the option to support testing, but I've not yet written any tests (I blame my
university's lack of focus on teaching how to write tests). Once the project was created, I initialized a git
repository and pushed it to GitHub at [sk3p7ic/sk3p7ic-blog-svelte](https://github.com/sk3p7ic/sk3p7ic-blog-svelte).

I then began to work on parsing Markdown files since, should this not work like I'd hoped, then I could always use
Hugo without having put too much time into this project. I'd found a few packages that I could use to parse Markdown
files, and so I installed:

- rehype-katex
- rehype-remark
- rehype-stringify
- remark-frontmatter
- remark-html
- remark-math
- remark-parse
- remark-parse-frontmatter
- remark-rehype
- remark-stringify
- svelte-katex
- to-vfile
- unified

These packages are all used to parse Markdown files and convert them to either HTML or an AST (abstract syntax tree). I'd
figured that my process for parsing Markdown files would be as follows:

1. Read the Markdown file.
2. Parse the Markdown file into an AST.
3. Use the AST for pre-processing (ex. isolate code blocks and replace them with components).
4. Convert the AST to HTML and render.

Thus, I created a test markdown file in `src/content/test-post.md` and began to write the code to parse it.

### Parsing Markdown

With the test markdown file written and the aforementioned packages installed, I began to write the code to parse the
file. I started by creating a new server file at `src/routes/api/load-post/[slug]/+server.ts` and writing the following
code:

```typescript [src/routes/api/load-post/[slug]/+server.ts, //]
import type { RequestHandler } from '@sveltejs/kit';
import { readdirSync, readFileSync, statSync } from 'fs';
import { join } from 'path';
import { unified } from 'unified';
import remarkParse from 'remark-parse';
import remarkMath from 'remark-math';
import remarkRehype from 'remark-rehype';
import remarkStringify from 'remark-stringify';
import remarkFrontmatter from 'remark-frontmatter';
import remarkParseFrontmatter from 'remark-parse-frontmatter';
import rehypeKatex from 'rehype-katex';
import rehypeStringify from 'rehype-stringify';
import type { FrontmatterType } from '$lib/types';

// The base path for all content files.
const basePath = join('./src', 'content');
// Get all of the filenames in the content directory.
const getContentFilenames = (): string[] => readdirSync(basePath);
// Strip the filename extension from a filename.
const stripFilenameExtension = (filename: string) => filename.replace('.md', '');
// Parse a Markdown file.
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
	const ast = unified()
		.use(remarkParse)
		.use(remarkFrontmatter)
		.use(remarkParseFrontmatter)
		.use(remarkMath)
		.use(remarkRehype)
		.use(rehypeKatex)
		.use(rehypeStringify)
		.parse(readFileSync(filename));
	if (frontmatter) ast.children.shift();

	return { dateCreated, dateModified, frontmatter, ast };
};

// GET /api/load-post/:slug
export const GET = (async ({ params }) => {
	const { slug } = params;
	if (!slug || !getContentFilenames().map(stripFilenameExtension).includes(slug))
		return new Response(null, { status: 404 });
	return new Response(JSON.stringify(parseMarkdownFile(slug)));
}) satisfies RequestHandler;
```

This code is a bit messy, but it works. It's also not very efficient, as it parses the Markdown file twice, but I
wasn't sure how else to more efficiently parse the frontmatter. I'd also created a `types.ts` file in the `src/lib`
directory to define the `FrontmatterType` type, which is used to define the type of the frontmatter object.

```typescript [src/lib/types.ts, //]
export type FrontmatterType = {
	title: string;
	description: string;
	published: boolean;
};
```

I'd also used a similar process to create an endpoint to retrieve a list of all of the posts. This endpoint is located
at `src/routes/api/all-posts/+server.ts`. This endpoint parses the frontmatter of all of the Markdown files in the
content directory to return a list of all posts. The relevant types were added to the `types.ts` file, of course.
