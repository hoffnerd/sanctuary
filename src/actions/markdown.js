import fs from "fs";
import matter from "gray-matter";
import path from "path";
import { unified } from "unified";
import remarkGfm from "remark-gfm";
import rehypeSlug from "rehype-slug";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import remarkParse from "remark-parse";
import remarkRehype from "remark-rehype";
import rehypeStringify from "rehype-stringify";
import rehypePrettyCode from "rehype-pretty-code";

const markdownDirectory = path.join(process.cwd(), "src", "_markdown");

const getMarkdownFiles = (endPath="") => {
    const fullPath = path.join(markdownDirectory, endPath);
    return fs.readdirSync(fullPath);
}

const getParser = () => (
    unified()
    .use(remarkParse)
    .use(remarkRehype)
    .use(remarkGfm)
    .use(rehypePrettyCode, { theme: "one-dark-pro" })
    .use(rehypeStringify)
    .use(rehypeStringify)
    .use(rehypeSlug)
    .use(rehypeAutolinkHeadings, {
        content: (arg) => ({
            type: "element",
            tagName: "a",
            properties: {
                href: `#${String(arg.properties?.id)}`,
                style: "margin-right: 10px",
            },
            children: [{ type: "text", value: "#" }],
        }),
    })
)

// small speedup from caching this parser
const parser = getParser();

export const readMarkdownFileById = async (endPath="", id) => {
    const realId = id.replace(/\.md$/, "");
    const fullPath = path.join(markdownDirectory, endPath, `${realId}.md`);
    const { data, content } = matter( await fs.promises.readFile(fullPath, "utf8") );

    const html = await parser.process(content);
    const date = new Date(data.date);

    return {
        ...data,
        title: data.title,
        id: realId,
        date: `${date.toISOString().slice(0, 10)}`,
        html: html.value.toString(),
    };
}

export const readPageMarkdown = async (string_) => {
    const { data, content } = matter( fs.readFileSync(path.join("_pages", string_), "utf8") );
    const html = await parser.process(content);
    return { ...data, html: html.value.toString() }
}

export const readAllMarkdownFiles = async (endPath="") => {
    const markdownFiles = await Promise.all(getMarkdownFiles(endPath).map((id) => readMarkdownFileById(endPath, id)));
    return markdownFiles.sort((file1, file2) => (file1.date > file2.date ? -1 : 1));
}