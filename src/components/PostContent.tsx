import { useEffect, useState } from "react";
import { TinaMarkdown } from "tinacms/dist/rich-text"
import PlaceInsert from "./PlaceInsert";
import client from "../../tina/__generated__/client";

interface PostContentProps {
    slug: string;
}

const PostContent = (props: PostContentProps) => {
    const [content, setContent] = useState<any | undefined>(undefined);
    const [title, setTitle] = useState<string>('');

    useEffect( () => {
        client.queries.post({ relativePath: `${props.slug}.mdx`}).then((post) => {
            setContent(post.data.post.body);
            setTitle(post.data.post.title)
        });
    }, []);

    return (
        <div className="w-full">
            <h1 className="text-3xl py-6">{title}</h1>
            <article className="prose max-w-none w-full">
                <TinaMarkdown content={content} components={{ place: PlaceInsert }} />
            </article>
        </div>
    )
};

export default PostContent;