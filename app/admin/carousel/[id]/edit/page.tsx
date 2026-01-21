"use client"

import React, { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { updateCarouselPhoto, getCarouselPhotoById } from "@/lib/admin/actions/carousel-action"
import { toast } from "sonner"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { CarouselImageUploader } from "@/components/cms/carousel-image-uploader"
import { ArrowLeft, Save, Loader2, Link2, Image as ImageIcon, AlertCircle, CalendarIcon } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { format } from "date-fns"
import { id } from "date-fns/locale"
import { cn } from "@/lib/utils"
import { use } from "react"

interface EditPhotoPageProps {
  params: Promise<{
    id: string
  }>
}

export default function EditPhotoPage({ params }: EditPhotoPageProps) {
  const resolvedParams = use(params)
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [useExternalUrl, setUseExternalUrl] = useState(false)
  const [externalUrl, setExternalUrl] = useState("")
  const [imageError, setImageError] = useState(false)
  const [isValidating, setIsValidating] = useState(false)
  const [date, setDate] = useState<Date | undefined>()
  const [dropdown] =
    React.useState<React.ComponentProps<typeof Calendar>["captionLayout"]>(
      "dropdown"
    )
  const [formData, setFormData] = useState({
    caption: "",
    order: "",
    imageUrl: "",
    imageFile: null as File | null,
  })

  useEffect(() => {
    const fetchPhoto = async () => {
      try {
        const carouselPhoto = await getCarouselPhotoById(resolvedParams.id)

        if (!carouselPhoto) {
          toast.error("Foto tidak ditemukan")
          router.push("/admin/carousel")
          return
        }

        setFormData({
          caption: carouselPhoto.caption || "",
          order: carouselPhoto.order.toString(),
          imageUrl: carouselPhoto.imageUrl,
          imageFile: null,
        })


        // Check if it's an external URL
        if (carouselPhoto.imageUrl.startsWith("http")) {
          setUseExternalUrl(true)
          setExternalUrl(carouselPhoto.imageUrl)
        }
      } catch (error) {
        console.error("Error fetching photo:", error)
        toast.error("Gagal memuat data foto")
        router.push("/admin/carousel")
      }
    }

    fetchPhoto()
  }, [resolvedParams.id, router])

  const handleImageChange = (url: string, file?: File) => {
    setFormData(prev => ({
      ...prev,
      imageUrl: url,
      imageFile: file || null,
    }))
    setImageError(false)
  }

  const validateImageUrl = async (url: string) => {
    setIsValidating(true)
    setImageError(false)

    try {
      const validExtensions = ['.jpg', '.jpeg', '.png', '.gif', '.webp', '.bmp', '.svg']
      const hasValidExtension = validExtensions.some(ext => url.toLowerCase().includes(ext))

      if (!hasValidExtension) {
        setImageError(true)
        toast.error("URL harus mengarah ke file gambar (jpg, png, gif, webp, dll)")
        setIsValidating(false)
        return false
      }

      const response = await fetch(url, { method: 'HEAD' })

      if (!response.ok) {
        throw new Error('Failed to fetch image')
      }

      const contentType = response.headers.get('content-type')
      if (!contentType || !contentType.startsWith('image/')) {
        setImageError(true)
        toast.error("URL tidak mengarah ke gambar yang valid")
        setIsValidating(false)
        return false
      }

      setImageError(false)
      toast.success("URL gambar valid")
      setIsValidating(false)
      return true
    } catch (error) {
      console.error("Error validating image URL:", error)
      setImageError(true)
      toast.error("Tidak dapat memvalidasi URL. Pastikan URL dapat diakses secara publik")
      setIsValidating(false)
      return false
    }
  }

  const handleExternalUrlChange = (url: string) => {
    setExternalUrl(url)
    setImageError(false)
    if (url) {
      setFormData(prev => ({
        ...prev,
        imageUrl: url,
        imageFile: null,
      }))
    }
  }

  const handleValidateUrl = async () => {
    if (!externalUrl) {
      toast.error("Masukkan URL terlebih dahulu")
      return
    }

    await validateImageUrl(externalUrl)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!formData.order) {
      toast.error("Harap isi semua field yang wajib")
      return
    }

    if (!formData.imageFile && !formData.imageUrl && !externalUrl) {
      toast.error("Harap unggah gambar atau masukkan URL eksternal")
      return
    }

    if (useExternalUrl && imageError) {
      toast.error("Harap gunakan URL gambar yang valid")
      return
    }

    setIsSubmitting(true)

    try {
      const submitData = new FormData()
      submitData.append("id", resolvedParams.id)
      submitData.append("caption", formData.caption)
      submitData.append("order", formData.order)

      if (formData.imageFile) {
        submitData.append("file", formData.imageFile)
      } else if (externalUrl && useExternalUrl) {
        submitData.append("externalUrl", externalUrl)
      } else if (formData.imageUrl) {
        submitData.append("imageUrl", formData.imageUrl)
      }

      const result = await updateCarouselPhoto(submitData)

      if (!result.success) {
        throw new Error(result.error || "Gagal memperbarui foto")
      }

      toast.success("Foto berhasil diperbarui")
      router.push("/admin/carousel")
      router.refresh()
    } catch (error) {
      console.error("Error updating photo:", error)
      toast.error(error instanceof Error ? error.message : "Gagal memperbarui foto")
    } finally {
      setIsSubmitting(false)
    }
  }


  return (
    <div className="items-stretch w-full min-h-screen p-8 pb-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-6 w-full max-w-4xl mx-auto">
        <div className="flex items-center gap-4">
          <Button variant="outline" size="icon" asChild>
            <Link href="/admin/daftar-foto">
              <ArrowLeft className="h-4 w-4" />
            </Link>
          </Button>
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Edit Foto</h1>
            <p className="text-muted-foreground">Perbarui informasi foto untuk slideshow</p>
          </div>
        </div>

        <form onSubmit={handleSubmit}>
          <Card>
            <CardHeader>
              <CardTitle>Informasi Foto</CardTitle>
              <CardDescription>
                Edit detail foto yang akan ditampilkan
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="photoName">
                  Caption Foto (opsional)
                </Label>
                <Input
                  id="caption"
                  placeholder="Masukkan caption foto"
                  value={formData.caption}
                  onChange={(e) =>
                    setFormData(prev => ({ ...prev, caption: e.target.value }))
                  }
                  disabled={isSubmitting}
                  required
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
                    setFormData(prev => ({ ...prev, order: e.target.value }))
                  }
                  disabled={isSubmitting}
                  required
                  min={1}
                />
              </div>

              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <Label>Sumber Gambar <span className="text-red-500">*</span></Label>
                  <Button
                    type="button"
                    variant={useExternalUrl ? "default" : "outline"}
                    size="sm"
                    onClick={() => {
                      setUseExternalUrl(!useExternalUrl)
                      setExternalUrl("")
                      setImageError(false)
                      if (!useExternalUrl) {
                        setFormData(prev => ({ ...prev, imageFile: null }))
                      }
                    }}
                    disabled={isSubmitting}
                  >
                    {useExternalUrl ? <ImageIcon className="h-4 w-4 mr-2" /> : <Link2 className="h-4 w-4 mr-2" />}
                    {useExternalUrl ? "Gunakan Upload" : "Gunakan URL Eksternal"}
                  </Button>
                </div>
                {!useExternalUrl ? (
                  <CarouselImageUploader
                    value={formData.imageUrl}
                    onChange={handleImageChange}
                    folder="slideshow"
                    maxSizeMB={10}
                    disabled={isSubmitting}
                    showUrlInput={true}
                    label="Upload Foto"
                    aspectRatio="auto"
                  />
                ) : (
                  <div className="space-y-3">
                    <div className="flex gap-2">
                      <div className="relative flex-1">
                        <Link2 className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                        <Input
                          placeholder="https://example.com/image.jpg"
                          value={externalUrl}
                          onChange={(e) => handleExternalUrlChange(e.target.value)}
                          className={`pl-9 ${imageError ? 'border-red-500' : ''}`}
                          disabled={isSubmitting || isValidating}
                        />
                      </div>
                      <Button
                        type="button"
                        variant="outline"
                        onClick={handleValidateUrl}
                        disabled={!externalUrl || isSubmitting || isValidating}
                      >
                        {isValidating ? (
                          <>
                            <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                            Validasi...
                          </>
                        ) : (
                          <>
                            <ImageIcon className="h-4 w-4 mr-2" />
                            Validasi
                          </>
                        )}
                      </Button>
                    </div>

                    {imageError && (
                      <div className="flex items-center gap-2 p-3 bg-red-50 border border-red-200 rounded-md">
                        <AlertCircle className="h-4 w-4 text-red-500 flex-shrink-0" />
                        <p className="text-sm text-red-700">URL gambar tidak valid atau tidak dapat diakses</p>
                      </div>
                    )}

                    {externalUrl && !imageError && !isValidating && (
                      <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
                        <p className="text-xs font-medium text-gray-700 mb-2">Preview Gambar External:</p>
                        <div className="relative w-full h-64 rounded-md overflow-hidden bg-white">
                          <Image
                            src={externalUrl}
                            alt="External URL Preview"
                            fill
                            className="object-contain"
                            unoptimized
                            onError={() => {
                              setImageError(true)
                              toast.error("Gagal memuat gambar dari URL")
                            }}
                            onLoad={() => {
                              setImageError(false)
                            }}
                          />
                        </div>
                        <p className="text-xs text-gray-500 mt-2 break-all">{externalUrl}</p>
                      </div>
                    )}
                  </div>
                )}
              </div>

              <div className="flex items-center gap-4 pt-4">
                <Button
                  type="submit"
                  disabled={isSubmitting || isValidating || (!formData.imageFile && !formData.imageUrl && !externalUrl) || (useExternalUrl && imageError)}
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
                      Simpan Perubahan
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