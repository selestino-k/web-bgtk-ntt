"use client";

import { useState, useEffect } from "react";
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
import { Prisma } from "@/lib/generated/prisma/client";
import { MultiSelect } from "@/components/ui/multi-select";
import { updatePost } from "@/lib/admin/actions/post-action";
import { SimpleEditor } from "@/components/tiptap-templates/simple/simple-editor";
import { JSONContent } from "@tiptap/react";

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
  const [thumbnail] = useState(post.thumbnail || "");
  const [thumbnailFile, setThumbnailFile] = useState<File | null>(null);
  const [thumbnailPreview, setThumbnailPreview] = useState(post.thumbnail || "");
  const [published, setPublished] = useState(post.published);
  const [selectedTags, setSelectedTags] = useState<string[]>(
    post.tags.map((t) => t.tag.id.toString())
  );
  
  // Parse initial content properly
  const parseInitialContent = (): JSONContent => {
    try {
      if (!post.content) {
        return {
          type: "doc",
          content: [],
        };
      }
      
      // Log to debug
      console.log('Raw post.content:', post.content);
      console.log('Type of post.content:', typeof post.content);
      
      // If content is already an object with the right structure
      if (typeof post.content === 'object' && post.content !== null) {
        const content = post.content as JSONContent;
        // Validate it has the doc structure
        if (content.type === 'doc') {
          console.log('Content is valid doc structure:', content);
          return content;
        }
      }
      
      // If content is a string, parse it
      if (typeof post.content === 'string') {
        const parsed = JSON.parse(post.content) as JSONContent;
        console.log('Parsed from string:', parsed);
        return parsed;
      }
      
      console.warn('Content format not recognized, returning empty doc');
      return {
        type: "doc",
        content: [],
      };
    } catch (error) {
      console.error('Error parsing initial content:', error);
      toast({
        title: "Error",
        description: "Gagal memuat konten postingan. Konten akan direset.",
        variant: "destructive",
      });
      return {
        type: "doc",
        content: [],
      };
    }
  };

  // TipTap editor content state
  const [editorContent, setEditorContent] = useState<JSONContent>(parseInitialContent());

  // Force re-parse when post changes
  useEffect(() => {
    const newContent = parseInitialContent();
    setEditorContent(newContent);
  }, [post.id]);

  // Generate slug from title
  const generateSlug = (text: string) => {
    return text
      .toLowerCase()
      .replace(/[^\w\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .trim();
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

  const handleEditorChange = (content: JSONContent) => {
    setEditorContent(content);
  };

  const hasContent = (content: JSONContent): boolean => {
    try {
      if (!content || !content.content || !Array.isArray(content.content)) {
        return false;
      }
      
      // Check if there's any non-empty content
      return content.content.some((node) => {
        if (node.type === "paragraph" && node.content && Array.isArray(node.content)) {
          return node.content.some((child) => 
            child.type === "text" && child.text && child.text.trim().length > 0
          );
        }
        return node.content && Array.isArray(node.content) && node.content.length > 0;
      });
    } catch (error) {
      console.error('Error validating content:', error);
      return false;
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validation
    if (!title.trim()) {
      toast({
        title: "Error",
        description: "Judul wajib diisi",
        variant: "destructive",
      });
      return;
    }

    if (!hasContent(editorContent)) {
      toast({
        title: "Error",
        description: "Konten postingan wajib diisi",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);

    try {
      const formData = new FormData();
      formData.append("title", title);
      formData.append("slug", generateSlug(title));
      formData.append("content", JSON.stringify(editorContent));
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
        <h2 className="text-2xl font-semibold text-primary">Edit Postingan</h2>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Detail Postingan</CardTitle>
          <CardDescription>Update informasi postingan</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="title">Judul *</Label>
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
            <Label>Konten *</Label>
            <Card className="flex flex-col" style={{ height: '400px' }}>
              <CardContent className="flex-1 overflow-hidden p-0">
                <SimpleEditor 
                  key={post.id} // Add key to force re-render with new content
                  initialContent={editorContent}
                  onChange={handleEditorChange}
                />
              </CardContent>
            </Card>
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