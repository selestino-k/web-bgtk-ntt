"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { toast } from "sonner"

interface DocumentDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onConfirm: (driveUrl: string) => void
  initialValue?: string | null
}

export function DocumentDialog({ open, onOpenChange, onConfirm, initialValue }: DocumentDialogProps) {
  const [driveUrl, setDriveUrl] = useState("")

  const handleSubmit = () => {
    if (!driveUrl.trim()) {
      toast.error('Harap masukkan link Google Drive')
      return
    }

    if (!driveUrl.includes('drive.google.com') && !driveUrl.includes('docs.google.com')) {
      toast.error('Harap masukkan URL Google Drive yang valid')
      return
    }

    onConfirm(driveUrl.trim())
    
    // Reset form
    setDriveUrl("")
    onOpenChange(false)
  }

  const handleClose = () => {
    setDriveUrl("")
    onOpenChange(false)
  }

  return (
    <Dialog open={open} onOpenChange={(isOpen) => {
      if (isOpen && initialValue) {
        setDriveUrl(initialValue)
      } else if (!isOpen) {
        setDriveUrl("")
      }
      onOpenChange(isOpen)
    }}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>{initialValue ? 'Ubah Dokumen' : 'Tambah Dokumen'}</DialogTitle>
          <DialogDescription>
            Masukkan link Google Drive untuk dokumen yang akan dilampirkan pada berita ini.
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="drive-url">Link Google Drive *</Label>
            <Input
              id="drive-url"
              value={driveUrl}
              onChange={(e) => setDriveUrl(e.target.value)}
              placeholder="https://drive.google.com/file/d/..."
              autoFocus
            />
            <p className="text-xs text-muted-foreground">
              Pastikan link dapat diakses publik atau siapapun yang memiliki link
            </p>
          </div>
        </div>
        <DialogFooter>
          <Button
            type="button"
            variant="outline"
            onClick={handleClose}
          >
            Batal
          </Button>
          <Button
            onClick={handleSubmit}
            disabled={!driveUrl.trim()}
          >
            {initialValue ? 'Ubah' : 'Tambah'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}