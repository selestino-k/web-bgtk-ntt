"use client";

import { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Loader2, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { useToast } from "@/hooks/use-toast";
import Image from "next/image";
import { LexicalComposer } from "@lexical/react/LexicalComposer";
import { RichTextPlugin } from "@lexical/react/LexicalRichTextPlugin";
import { ContentEditable } from "@lexical/react/LexicalContentEditable";
import { HistoryPlugin } from "@lexical/react/LexicalHistoryPlugin";
import { AutoFocusPlugin } from "@lexical/react/LexicalAutoFocusPlugin";
import { HeadingNode, QuoteNode } from "@lexical/rich-text";
import { ListItemNode, ListNode } from "@lexical/list";
import { CodeNode } from "@lexical/code";
import { LinkNode } from "@lexical/link";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { $getRoot, $insertNodes, SerializedEditorState } from "lexical";
import { $generateNodesFromDOM } from "@lexical/html";
import { useEffect } from "react";
import { Prisma } from "@/lib/generated/prisma/client";
import { MultiSelect } from "@/components/ui/multi-select";
import { LexicalErrorBoundary } from "@lexical/react/LexicalErrorBoundary";
import { updatePost } from "@/lib/admin/actions/post-action";

type Post = {
  id: string;
  title: string;
  content: Prisma.JsonValue | null;
  thumbnail: string | null;
  published: boolean;
  tags: Array<{
    tag: {
      id: number;
      name: string;
      slug: string;
    };
  }>;
};

type Tag = {
  id: number;
  name: string;
  slug: string;
};

// Plugin to load initial content
function LoadInitialContentPlugin({ content }: { content: string | null }) {
  const [editor] = useLexicalComposerContext();
  const isInitialized = useRef(false);

  useEffect(() => {
    if (!content || isInitialized.current) return;

    try {
      const parsedContent = JSON.parse(content);
      editor.setEditorState(editor.parseEditorState(parsedContent));
      isInitialized.current = true;
    } catch (error) {
      console.error("Gagal memuat konten:", error);
    }
  }, [editor, content]);

  return null;
}

// Plugin to track editor changes
function OnChangePlugin({
  onChange,
}: {
  onChange: (editorState: SerializedEditorState) => void;
}) {
  const [editor] = useLexicalComposerContext();

  useEffect(() => {
    return editor.registerUpdateListener(({ editorState }) => {
      onChange(editorState.toJSON());
    });
  }, [editor, onChange]);

  return null;
}

export default function EditPostForm({
  post,
  availableTags,
}: {
  post: Post;
  availableTags: Tag[];
}) {
  const router = useRouter();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [title, setTitle] = useState(post.title);
  const [thumbnail, setThumbnail] = useState(post.thumbnail || "");
  const [thumbnailFile, setThumbnailFile] = useState<File | null>(null);
  const [thumbnailPreview, setThumbnailPreview] = useState(post.thumbnail || "");
  const [published, setPublished] = useState(post.published);
  const [selectedTags, setSelectedTags] = useState<string[]>(
    post.tags.map((t) => t.tag.id.toString())
  );
  
  // Generate slug from title
  const generateSlug = (text: string) => {
    return text
      .toLowerCase()
      .replace(/[^\w\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .trim();
  };

  // Use ref to store editor state to avoid re-renders
  const editorStateRef = useRef<string | null>(
    post.content ? JSON.stringify(post.content) : null
  );

  const initialConfig = {
    namespace: "EditPostEditor",
    theme: {
      paragraph: "mb-2",
      text: {
        bold: "font-bold",
        italic: "italic",
        underline: "underline",
      },
    },
    onError: (error: Error) => {
      console.error(error);
    },
    nodes: [HeadingNode, QuoteNode, ListNode, ListItemNode, CodeNode, LinkNode],
  };

  const handleThumbnailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setThumbnailFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setThumbnailPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleEditorChange = (editorState: SerializedEditorState) => {
    editorStateRef.current = JSON.stringify(editorState);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const formData = new FormData();
      formData.append("title", title);
      formData.append("slug", generateSlug(title));
      formData.append("content", editorStateRef.current || "{}");
      formData.append("published", published.toString());
      formData.append("existingThumbnail", thumbnail);
      
      // Add thumbnail file if changed
      if (thumbnailFile) {
        formData.append("thumbnail", thumbnailFile);
      }
      
      // Add tags as comma-separated string
      const tagNames = selectedTags
        .map((tagId) => availableTags.find((t) => t.id.toString() === tagId)?.name)
        .filter(Boolean)
        .join(",");
      formData.append("tags", tagNames);

      const result = await updatePost(post.id, formData);

      if (!result.success) {
        throw new Error(result.error || "Gagal memperbarui postingan");
      }

      toast({
        title: "Sukses",
        description: result.message || "Postingan berhasil diperbarui",
      });

      router.push("/admin/posts");
      router.refresh();
    } catch (error) {
      console.error("Gagal memperbarui postingan:", error);
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Gagal memperbarui postingan. Silakan coba lagi.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="flex items-center gap-4">
        <Link href="/admin/posts">
          <Button type="button" variant="outline" size="icon">
            <ArrowLeft className="h-4 w-4" />
          </Button>
        </Link>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Detail Postingan</CardTitle>
          <CardDescription>Update informasi postingan</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="title">Judul</Label>
            <Input
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Masukkan judul postingan"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="thumbnail">Thumbnail</Label>
            <Input
              id="thumbnail"
              type="file"
              accept="image/*"
              onChange={handleThumbnailChange}
            />
            {thumbnailPreview && (
              <div className="mt-2">
                <Image
                  src={thumbnailPreview}
                  alt="Thumbnail preview"
                  width={200}
                  height={150}
                  className="rounded-md object-cover"
                />
              </div>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="tags">Kategori</Label>
            <MultiSelect
              options={availableTags.map((tag) => ({
                label: tag.name,
                value: tag.id.toString(),
              }))}
              selected={selectedTags}
              onChange={setSelectedTags}
              placeholder="Pilih kategori"
            />
          </div>

          <div className="space-y-2">
            <Label>Konten</Label>
            <LexicalComposer initialConfig={initialConfig}>
              <div className="relative border rounded-md">
                <RichTextPlugin
                  contentEditable={
                    <ContentEditable className="min-h-[300px] p-4 outline-none" />
                  }
                  placeholder={
                    <div className="absolute top-4 left-4 text-gray-400 pointer-events-none">
                      Tulis konten postingan...
                    </div>
                  }
                  ErrorBoundary={LexicalErrorBoundary}
                />
                <HistoryPlugin />
                <AutoFocusPlugin />
                <LoadInitialContentPlugin content={editorStateRef.current} />
                <OnChangePlugin onChange={handleEditorChange} />
              </div>
            </LexicalComposer>
          </div>

          <div className="flex items-center space-x-2">
            <Switch
              id="published"
              checked={published}
              onCheckedChange={setPublished}
            />
            <Label htmlFor="published">Publikasikan</Label>
          </div>
        </CardContent>
      </Card>

      <div className="flex justify-end gap-4">
        <Link href="/admin/posts">
          <Button type="button" variant="outline" disabled={isLoading}>
            Batal
          </Button>
        </Link>
        <Button type="submit" disabled={isLoading}>
          {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          Update Postingan
        </Button>
      </div>
    </form>
  );
}