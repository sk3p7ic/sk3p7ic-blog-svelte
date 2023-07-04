/// Extracts the filename and comment character from the code meta string.
export const extractCodeMetaFilename = (meta: string): [string, string] => {
	const [filename, commentChar] = meta.replace(/(\[)(.*)(, )(\D+)(\])/, '$2,$4').split(',');
	return [filename, commentChar.split(' ').shift() ?? ''];
};

/// Prepends the filename to the code string.
export const prependFilenameToCode = (code: string, meta: string): string => {
	const [filename, commentChar] = extractCodeMetaFilename(meta);
	return `${commentChar} ${filename}\n${code}`;
};
