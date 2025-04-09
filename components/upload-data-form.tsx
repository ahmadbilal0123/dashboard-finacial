"use client"

import { useState } from "react"

import type { ChangeEvent, FormEvent, File } from "react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/components/ui/use-toast"
import { useFinance } from "@/context/finance-context"
import { Loader2, Upload } from "lucide-react"

export function UploadDataForm() {
  const [taxFile, setTaxFile] = useState<File | null>(null)
  const [financialFile, setFinancialFile] = useState<File | null>(null)
  const [taxData, setTaxData] = useState("")
  const [financialData, setFinancialData] = useState("")
  const { uploadTaxData, uploadFinancialData, isLoading } = useFinance()
  const { toast } = useToast()

  const handleTaxFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setTaxFile(e.target.files[0])

      // Read file content
      const reader = new FileReader()
      reader.onload = (event) => {
        if (event.target?.result) {
          setTaxData(event.target.result as string)
        }
      }
      reader.readAsText(e.target.files[0])
    }
  }

  const handleFinancialFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFinancialFile(e.target.files[0])

      // Read file content
      const reader = new FileReader()
      reader.onload = (event) => {
        if (event.target?.result) {
          setFinancialData(event.target.result as string)
        }
      }
      reader.readAsText(e.target.files[0])
    }
  }

  const handleTaxDataSubmit = (e: FormEvent) => {
    e.preventDefault()

    try {
      // Parse the JSON data
      const parsedData = taxData ? JSON.parse(taxData) : {}

      // Upload the data
      uploadTaxData(parsedData)

      toast({
        title: "Tax data uploaded",
        description: "Your tax data has been successfully processed.",
      })

      // Reset form
      setTaxFile(null)
      setTaxData("")
    } catch (error) {
      console.error("Error parsing tax data:", error)
      toast({
        title: "Error uploading tax data",
        description: "Please check your data format and try again.",
        variant: "destructive",
      })
    }
  }

  const handleFinancialDataSubmit = (e: FormEvent) => {
    e.preventDefault()

    try {
      // Parse the JSON data
      const parsedData = financialData ? JSON.parse(financialData) : {}

      // Upload the data
      uploadFinancialData(parsedData)

      toast({
        title: "Financial data uploaded",
        description: "Your financial data has been successfully processed.",
      })

      // Reset form
      setFinancialFile(null)
      setFinancialData("")
    } catch (error) {
      console.error("Error parsing financial data:", error)
      toast({
        title: "Error uploading financial data",
        description: "Please check your data format and try again.",
        variant: "destructive",
      })
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Upload Data</CardTitle>
        <CardDescription>Upload tax and financial data to update your dashboard</CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="tax">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="tax">Tax Data</TabsTrigger>
            <TabsTrigger value="financial">Financial Data</TabsTrigger>
          </TabsList>
          <TabsContent value="tax">
            <form onSubmit={handleTaxDataSubmit}>
              <div className="grid gap-4 py-4">
                <div className="grid gap-2">
                  <Label htmlFor="tax-file">Upload Tax File (JSON)</Label>
                  <Input id="tax-file" type="file" accept=".json" onChange={handleTaxFileChange} />
                  <p className="text-sm text-muted-foreground">
                    Upload a JSON file with your tax data or paste it below
                  </p>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="tax-data">Tax Data (JSON)</Label>
                  <Textarea
                    id="tax-data"
                    placeholder='{"taxFilings": [{"type": "Income Tax", "period": "Q2 2023", "amount": 5000, "status": "pending"}]}'
                    value={taxData}
                    onChange={(e) => setTaxData(e.target.value)}
                    className="min-h-[200px]"
                  />
                </div>
              </div>
              <Button type="submit" disabled={isLoading || !taxData}>
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Processing
                  </>
                ) : (
                  <>
                    <Upload className="mr-2 h-4 w-4" />
                    Upload Tax Data
                  </>
                )}
              </Button>
            </form>
          </TabsContent>
          <TabsContent value="financial">
            <form onSubmit={handleFinancialDataSubmit}>
              <div className="grid gap-4 py-4">
                <div className="grid gap-2">
                  <Label htmlFor="financial-file">Upload Financial File (JSON)</Label>
                  <Input id="financial-file" type="file" accept=".json" onChange={handleFinancialFileChange} />
                  <p className="text-sm text-muted-foreground">
                    Upload a JSON file with your financial data or paste it below
                  </p>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="financial-data">Financial Data (JSON)</Label>
                  <Textarea
                    id="financial-data"
                    placeholder='{"invoices": [{"client": "New Corp", "amount": 2500, "status": "paid"}], "bills": [{"name": "Internet", "amount": 100, "status": "pending"}]}'
                    value={financialData}
                    onChange={(e) => setFinancialData(e.target.value)}
                    className="min-h-[200px]"
                  />
                </div>
              </div>
              <Button type="submit" disabled={isLoading || !financialData}>
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Processing
                  </>
                ) : (
                  <>
                    <Upload className="mr-2 h-4 w-4" />
                    Upload Financial Data
                  </>
                )}
              </Button>
            </form>
          </TabsContent>
        </Tabs>
      </CardContent>
      
    </Card>
  )
}
