import type { Root } from 'remark-parse/lib';

export type FrontmatterType = {
	title: string;
	description: string;
	published: boolean;
};

export type PostListingType = {
	dateCreated: string;
	dateModified: string;
	frontmatter: FrontmatterType;
};

export type PostType = {
	dateCreated: string;
	dateModified: string;
	frontmatter: FrontmatterType;
	ast: Root;
};

export type AST = Root;
