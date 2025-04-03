"use client"

import { useState, useRef } from "react"
import { Upload, FileText, X, Loader2 } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { extractInvoiceData } from "@/lib/invoice-parser"
import InvoiceDescription from "./invoice-description"

export default function InvoiceUploader() {
  const [file, setFile] = useState(null)
  const [preview, setPreview] = useState(null)
  const [invoiceData, setInvoiceData] = useState(null)
  const [isProcessing, setIsProcessing] = useState(false)
  const [error, setError] = useState(null)
  const fileInputRef = useRef(null)

  const handleFileChange = (e) => {
    const selectedFile = e.target.files?.[0]
    if (!selectedFile) return

    // Check file type
    const validTypes = ["image/jpeg", "image/png", "image/jpg", "application/pdf"]
    if (!validTypes.includes(selectedFile.type)) {
      setError("Please upload a valid invoice file (JPEG, PNG, or PDF)")
      return
    }

    setError(null)
    setFile(selectedFile)
    setInvoiceData(null)

    // Create preview for images
    if (selectedFile.type.startsWith("image/")) {
      const reader = new FileReader()
      reader.onload = () => {
        setPreview(reader.result)
      }
      reader.readAsDataURL(selectedFile)
    } else if (selectedFile.type === "application/pdf") {
      // For PDFs, just show a placeholder
      setPreview("/placeholder.svg?height=400&width=300")
    }
  }

  const handleDrop = (e) => {
    e.preventDefault()
    const droppedFile = e.dataTransfer.files?.[0]
    if (droppedFile) {
      // Simulate file input change
      const dataTransfer = new DataTransfer()
      dataTransfer.items.add(droppedFile)

      if (fileInputRef.current) {
        fileInputRef.current.files = dataTransfer.files
        const event = new Event("change", { bubbles: true })
        fileInputRef.current.dispatchEvent(event)
      }
    }
  }

  const handleDragOver = (e) => {
    e.preventDefault()
  }

  const processInvoice = async () => {
    if (!file) return

    setIsProcessing(true)
    try {
      // In a real application, you might send the file to a server for processing
      // Here we're simulating the extraction with a timeout
      const data = await extractInvoiceData(file)
      setInvoiceData(data)
    } catch (err) {
      setError("Failed to process the invoice. Please try again.")
      console.error(err)
    } finally {
      setIsProcessing(false)
    }
  }

  const resetUpload = () => {
    setFile(null)
    setPreview(null)
    setInvoiceData(null)
    setError(null)
    if (fileInputRef.current) {
      fileInputRef.current.value = ""
    }
  }

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="grid md:grid-cols-2 gap-6 max-w-4xl w-full">
        <Card>
          <CardHeader>
            <CardTitle>Upload Invoice</CardTitle>
            <CardDescription>Upload an invoice image or PDF to extract information</CardDescription>
          </CardHeader>
          <CardContent>
            <div
              className={`border-2 border-dashed rounded-lg p-6 text-center ${error ? "border-red-400" : "border-gray-300"
                }`}
              onDrop={handleDrop}
              onDragOver={handleDragOver}
            >
              {!file ? (
                <div className="space-y-4">
                  <div className="mx-auto w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                    <Upload className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Drag and drop your invoice, or</p>
                    <Button variant="secondary" onClick={() => fileInputRef.current?.click()}>
                      Browse Files
                    </Button>
                    <input
                      type="file"
                      ref={fileInputRef}
                      onChange={handleFileChange}
                      className="hidden"
                      accept="image/jpeg,image/png,image/jpg,application/pdf"
                    />
                  </div>
                  <p className="text-xs text-muted-foreground">Supported formats: JPEG, PNG, PDF</p>
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="relative mx-auto max-w-xs">
                    {preview && (
                      <img
                        src={preview || "/placeholder.svg"}
                        alt="Invoice preview"
                        className="max-h-[300px] mx-auto object-contain"
                      />
                    )}
                    <Button
                      variant="destructive"
                      size="icon"
                      className="absolute -top-2 -right-2 h-6 w-6"
                      onClick={resetUpload}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                  <div className="flex items-center justify-center gap-2">
                    <FileText className="h-4 w-4" />
                    <span className="text-sm font-medium">{file.name}</span>
                  </div>
                  <Button onClick={processInvoice} disabled={isProcessing} className="w-full">
                    {isProcessing ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Processing...
                      </>
                    ) : (
                      "Extract Invoice Data"
                    )}
                  </Button>
                </div>
              )}
              {error && <p className="text-sm text-red-500 mt-2">{error}</p>}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Hasil Deskripsi Nota</CardTitle>
            <CardDescription>Extracted information from your invoice</CardDescription>
          </CardHeader>
          <CardContent>
            {isProcessing ? (
              <div className="flex flex-col items-center justify-center py-10">
                <Loader2 className="h-8 w-8 animate-spin text-primary mb-4" />
                <p className="text-muted-foreground">Processing your invoice...</p>
              </div>
            ) : invoiceData ? (
              <InvoiceDescription data={invoiceData} image={file}/>
            ) : (
              <div className="text-center py-10 text-muted-foreground">
                <FileText className="h-12 w-12 mx-auto mb-4 opacity-20" />
                <p>Upload and process an invoice to see the extracted information</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

