"use client"

import React, { useState } from "react"
import { useRouter } from "next/navigation"
import { createCarouselPhoto } from "@/lib/admin/actions/carousel-action"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Save, Loader2,} from "lucide-react"
import { CarouselImageUploader } from "@/components/cms/carousel-image-uploader"
import { useToast } from "@/hooks/use-toast"





export default function AddCarouselPhotoPage() {
  const router = useRouter()
  const {toast} = useToast()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [useExternalUrl] = useState(false)
  const [externalUrl, setExternalUrl] = useState("")
  const [imageError, setImageError] = useState(false)
  const [isValidating] = useState(false)
  
  const [formData, setFormData] = useState({
    caption: "",
    imageUrl: "",
    order : 0,
    imageFile: null as File | null,
  })

  const handleImageChange = (url: string, file?: File) => {
    setFormData(prev => ({
      ...prev,
      imageUrl: url,
      imageFile: file || null,
    }))
    setImageError(false)
    
    // If using external URL mode, update externalUrl as well
    if (useExternalUrl && url) {
      setExternalUrl(url)
    }
  }

  const handleDeleteChange = () => {
    setFormData(prev => ({
      ...prev,
      imageUrl: "",
      imageFile: null,
    }))
  }

  



  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
   

    if (!formData.imageFile && !externalUrl) {
      toast({
        title: "Error",
        description: "Harap unggah file gambar atau masukkan URL gambar",
        variant: "destructive",
      })
      return
    }

    if (!formData.order && formData.order !== 0) {
      toast({
        title: "Error",
        description: "Harap masukkan urutan gambar",
        variant: "destructive",
      })
      return
    }

    if (useExternalUrl && imageError) {
      toast({
        title: "Error",
        description: "Harap gunakan URL gambar yang valid",
        variant: "destructive",
      })
      return
    }

    setIsSubmitting(true)

    try {
      const submitData = new FormData()
      submitData.append("caption", formData.caption)
      submitData.append ("imageUrl" , formData.imageUrl)
      submitData.append("order", formData.order.toString())
      
      if (formData.imageFile) {
        submitData.append("file", formData.imageFile)
      } else if (externalUrl) {
        submitData.append("externalUrl", externalUrl)
      }

      const result = await createCarouselPhoto(submitData)

      if (!result.success) {
        throw new Error(result.error || "Gagal menambahkan foto carousel")
      }

      toast({
        title: "Sukses",
        description: "Foto carousel berhasil ditambahkan",
      })
      router.push("/admin/carousel")
      router.refresh()
    } catch (error) {
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Gagal menambahkan foto carousel",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="items-stretch w-full min-h-screen p-8 pb-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-6 w-full max-w-4xl mx-auto">
        <div className="grid justify-between items-center gap-6 px-2">
         <h2 className="text-2xl/7 font-geist font-semibold sm:truncate sm:text-5xl sm:tracking-tight text-primary">
          Tambah Carousel Photo
        </h2>
    
        </div>

        <form onSubmit={handleSubmit}>
          <Card>
            <CardHeader>
              <CardTitle>Informasi Foto Carousel</CardTitle>
              <CardDescription>
                Isi detail foto carousel yang akan ditambahkan
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="caption">
                  Caption Foto
                </Label>
                <Input
                  id="caption"
                  placeholder="Masukkan caption foto (opsional)"
                  value={formData.caption}
                  onChange={(e) =>
                    setFormData(prev => ({ ...prev, caption: e.target.value }))
                  }
                  disabled={isSubmitting}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="order">
                  Urutan Tampil <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="order"
                  type="number"
                  placeholder="Masukkan urutan tampil foto (angka)"
                  value={formData.order}
                  onChange={(e) =>
                    setFormData(prev => ({ ...prev, order: parseInt(e.target.value, 10) }))
                  }
                  disabled={isSubmitting}
                  required
                  min={1}
                />
              </div>


              

              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <Label>Sumber Gambar Carousel <span className="text-red-500">*</span></Label>
                
                </div>
                <CarouselImageUploader
                  value={formData.imageUrl}
                  onChange={handleImageChange}
                  onDelete={handleDeleteChange}
                  aspectRatio="video"
                />
              </div>

              <div className="flex items-center gap-4 pt-4">
                <Button
                  type="submit"
                  disabled={isSubmitting || isValidating || (!formData.imageFile && !externalUrl) || (useExternalUrl && imageError)}
                  className="min-w-[150px]"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Menyimpan...
                    </>
                  ) : (
                    <>
                      <Save className="mr-2 h-4 w-4" />
                      Simpan Foto
                    </>
                  )}
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => router.push("/admin/daftar-foto")}
                  disabled={isSubmitting}
                >
                  Batal
                </Button>
              </div>
            </CardContent>
          </Card>
        </form>
      </main>
    </div>
  )
}