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
