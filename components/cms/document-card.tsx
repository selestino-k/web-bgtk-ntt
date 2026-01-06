"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { FileText, X, Edit } from "lucide-react"

interface DocumentCardProps {
  documentUrl: string | null
  onAdd: () => void
  onRemove: () => void
  disabled?: boolean
}

export function DocumentCard({ 
  documentUrl, 
  onAdd, 
  onRemove, 
  disabled = false
}: DocumentCardProps) {
  const hasDocument = !!documentUrl

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>Lampiran Dokumen</CardTitle>
            <p className="text-xs text-muted-foreground mt-1">
              Hanya dapat melampirkan 1 dokumen Google Drive
            </p>
          </div>
          {hasDocument ? (
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={onAdd}
              disabled={disabled}
            >
              <Edit className="h-4 w-4 mr-2" />
              Ubah
            </Button>
          ) : (
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={onAdd}
              disabled={disabled}
            >
              <FileText className="h-4 w-4 mr-2" />
              Tambah Dokumen
            </Button>
          )}
        </div>
      </CardHeader>
      <CardContent>
        {!hasDocument ? (
          <div className="text-center py-8 text-sm text-muted-foreground">
            Belum ada dokumen dilampirkan
          </div>
        ) : (
          <div className="flex items-center justify-between p-3 border rounded-lg bg-muted/50 hover:bg-muted transition-colors">
            <div className="flex items-center gap-3 flex-1 min-w-0">
              <FileText className="h-5 w-5 text-primary flex-shrink-0" />
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium">Dokumen Terlampir</p>
                <a
                  href={documentUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs text-blue-600 hover:underline truncate block"
                >
                  {documentUrl}
                </a>
              </div>
            </div>
            <Button
              type="button"
              variant="ghost"
              size="icon"
              onClick={onRemove}
              disabled={disabled}
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  )
}