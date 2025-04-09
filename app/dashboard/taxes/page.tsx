"use client"
import { useState } from "react"

import type React from "react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Plus, Download, FileText, Calculator, Upload } from "lucide-react"
import { useFinance } from "@/context/finance-context"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useToast } from "@/components/ui/use-toast"

export default function TaxesPage() {
  const { taxFilings, addTaxFiling, updateTaxFilingStatus } = useFinance()
  const [open, setOpen] = useState(false)
  const [formData, setFormData] = useState({
    type: "Income Tax",
    period: "",
    dueDate: "",
    amount: "",
    status: "pending",
  })
  const { toast } = useToast()

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value })
  }

  const handleSelectChange = (name: string, value: string) => {
    setFormData({ ...formData, [name]: value })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    // Validate form
    if (!formData.period || !formData.dueDate || !formData.amount) {
      toast({
        title: "Validation Error",
        description: "Please fill in all required fields.",
        variant: "destructive",
      })
      return
    }

    // Add new tax filing
    addTaxFiling({
      type: formData.type,
      period: formData.period,
      dueDate: formData.dueDate,
      amount: Number.parseFloat(formData.amount),
      status: formData.status as "filed" | "pending" | "overdue",
    })

    // Reset form and close dialog
    setFormData({
      type: "Income Tax",
      period: "",
      dueDate: "",
      amount: "",
      status: "pending",
    })
    setOpen(false)

    toast({
      title: "Tax Filing Added",
      description: "Your new tax filing has been added successfully.",
    })
  }

  const handleStatusChange = (id: string, status: "filed" | "pending" | "overdue") => {
    updateTaxFilingStatus(id, status)

    toast({
      title: "Status Updated",
      description: `Tax filing status has been updated to ${status}.`,
    })
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Taxes</h2>
          <p className="text-muted-foreground">Manage your tax filings and payments</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Calculator className="mr-2 h-4 w-4" />
            Tax Calculator
          </Button>
          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
              <Button className="bg-purple-600 hover:bg-purple-700">
                <Plus className="mr-2 h-4 w-4" />
                New Tax Filing
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Add New Tax Filing</DialogTitle>
                <DialogDescription>Enter the details for your new tax filing.</DialogDescription>
              </DialogHeader>
              <form onSubmit={handleSubmit}>
                <div className="grid gap-4 py-4">
                  <div className="grid gap-2">
                    <Label htmlFor="type">Tax Type</Label>
                    <Select value={formData.type} onValueChange={(value) => handleSelectChange("type", value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select tax type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Income Tax">Income Tax</SelectItem>
                        <SelectItem value="VAT">VAT</SelectItem>
                        <SelectItem value="Corporate Tax">Corporate Tax</SelectItem>
                        <SelectItem value="Property Tax">Property Tax</SelectItem>
                        <SelectItem value="Sales Tax">Sales Tax</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="period">Period</Label>
                    <Input
                      id="period"
                      name="period"
                      placeholder="e.g., Q2 2023"
                      value={formData.period}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="dueDate">Due Date</Label>
                    <Input
                      id="dueDate"
                      name="dueDate"
                      placeholder="DD/MM/YYYY"
                      value={formData.dueDate}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="amount">Amount</Label>
                    <Input
                      id="amount"
                      name="amount"
                      type="number"
                      placeholder="0.00"
                      value={formData.amount}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="status">Status</Label>
                    <Select value={formData.status} onValueChange={(value) => handleSelectChange("status", value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="pending">Pending</SelectItem>
                        <SelectItem value="filed">Filed</SelectItem>
                        <SelectItem value="overdue">Overdue</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <DialogFooter>
                  <Button type="submit">Add Tax Filing</Button>
                </DialogFooter>
              </form>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      <Tabs defaultValue="filings">
        <TabsList>
          <TabsTrigger value="filings">Tax Filings</TabsTrigger>
          <TabsTrigger value="payments">Tax Payments</TabsTrigger>
          <TabsTrigger value="reports">Tax Reports</TabsTrigger>
          <TabsTrigger value="upload">Upload Tax Data</TabsTrigger>
        </TabsList>
        <TabsContent value="filings" className="space-y-4 mt-4">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Recent Tax Filings</CardTitle>
                <Button variant="outline" size="sm">
                  <Download className="mr-2 h-4 w-4" />
                  Export
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Filing ID</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Period</TableHead>
                    <TableHead>Due Date</TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {taxFilings.map((filing) => (
                    <TableRow key={filing.id}>
                      <TableCell className="font-medium">{filing.id}</TableCell>
                      <TableCell>{filing.type}</TableCell>
                      <TableCell>{filing.period}</TableCell>
                      <TableCell>{filing.dueDate}</TableCell>
                      <TableCell>${filing.amount.toFixed(2)}</TableCell>
                      <TableCell>
                        <span
                          className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                            filing.status === "filed"
                              ? "bg-green-100 text-green-800"
                              : filing.status === "pending"
                                ? "bg-yellow-100 text-yellow-800"
                                : "bg-red-100 text-red-800"
                          }`}
                        >
                          {filing.status.charAt(0).toUpperCase() + filing.status.slice(1)}
                        </span>
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <Button variant="ghost" size="sm">
                            <FileText className="h-4 w-4 mr-2" />
                            View
                          </Button>
                          {filing.status !== "filed" && (
                            <Button variant="outline" size="sm" onClick={() => handleStatusChange(filing.id, "filed")}>
                              Mark as Filed
                            </Button>
                          )}
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                  {taxFilings.length === 0 && (
                    <TableRow>
                      <TableCell colSpan={7} className="text-center py-4 text-muted-foreground">
                        No tax filings found. Add a new tax filing to get started.
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="payments" className="space-y-4 mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Tax Payments</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Payment ID</TableHead>
                    <TableHead>Tax Type</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead>Method</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Receipt</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell className="font-medium">PAY-2023-001</TableCell>
                    <TableCell>Income Tax</TableCell>
                    <TableCell>15/04/2023</TableCell>
                    <TableCell>$4,250.00</TableCell>
                    <TableCell>Bank Transfer</TableCell>
                    <TableCell>
                      <span className="inline-flex items-center rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-800">
                        Completed
                      </span>
                    </TableCell>
                    <TableCell className="text-right">
                      <Button variant="ghost" size="sm">
                        <Download className="h-4 w-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">PAY-2023-002</TableCell>
                    <TableCell>VAT</TableCell>
                    <TableCell>30/04/2023</TableCell>
                    <TableCell>$2,340.00</TableCell>
                    <TableCell>Credit Card</TableCell>
                    <TableCell>
                      <span className="inline-flex items-center rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-800">
                        Completed
                      </span>
                    </TableCell>
                    <TableCell className="text-right">
                      <Button variant="ghost" size="sm">
                        <Download className="h-4 w-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="reports" className="space-y-4 mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Tax Reports</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                <Card>
                  <CardContent className="p-6">
                    <div className="flex flex-col items-center space-y-2">
                      <FileText className="h-8 w-8 text-purple-500" />
                      <h3 className="text-lg font-medium">Annual Tax Summary</h3>
                      <p className="text-sm text-muted-foreground text-center">
                        Complete overview of your tax obligations for the fiscal year
                      </p>
                      <Button className="mt-4 w-full">Download</Button>
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-6">
                    <div className="flex flex-col items-center space-y-2">
                      <FileText className="h-8 w-8 text-purple-500" />
                      <h3 className="text-lg font-medium">Quarterly Tax Report</h3>
                      <p className="text-sm text-muted-foreground text-center">
                        Detailed breakdown of quarterly tax payments and filings
                      </p>
                      <Button className="mt-4 w-full">Download</Button>
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-6">
                    <div className="flex flex-col items-center space-y-2">
                      <FileText className="h-8 w-8 text-purple-500" />
                      <h3 className="text-lg font-medium">Tax Deductions</h3>
                      <p className="text-sm text-muted-foreground text-center">
                        Summary of all eligible tax deductions and credits
                      </p>
                      <Button className="mt-4 w-full">Download</Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="upload" className="space-y-4 mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Upload Tax Data</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col items-center justify-center p-6 border-2 border-dashed border-gray-300 rounded-lg">
                <Upload className="h-12 w-12 text-gray-400 mb-4" />
                <h3 className="text-lg font-medium mb-2">Upload Tax Data</h3>
                <p className="text-sm text-muted-foreground text-center mb-4">
                  Drag and drop your tax data files here, or click to browse
                </p>
                <Button>
                  <Upload className="mr-2 h-4 w-4" />
                  Browse Files
                </Button>
              </div>
              <div className="mt-6">
                <h3 className="text-sm font-medium mb-2">Supported File Formats</h3>
                <ul className="list-disc list-inside text-sm text-muted-foreground">
                  <li>CSV files (.csv)</li>
                  <li>Excel files (.xlsx, .xls)</li>
                  <li>JSON files (.json)</li>
                </ul>
                <p className="text-sm text-muted-foreground mt-4">
                  After uploading, your tax data will be automatically processed and reflected in your dashboard.
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
