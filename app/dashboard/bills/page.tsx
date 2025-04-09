"use client"
import { useState } from "react"

import type React from "react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Plus, Download, AlertCircle, CheckCircle, Clock } from "lucide-react"
import { Progress } from "@/components/ui/progress"
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

export default function BillsPage() {
  const { bills, addBill, updateBillStatus } = useFinance()
  const [open, setOpen] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    category: "Utilities",
    dueDate: "",
    amount: "",
    status: "pending",
  })
  const { toast } = useToast()

  // Calculate bill statistics
  const totalBillAmount = bills.reduce((sum, bill) => sum + bill.amount, 0)
  const paidBillAmount = bills.filter((bill) => bill.status === "paid").reduce((sum, bill) => sum + bill.amount, 0)
  const pendingBillAmount = bills
    .filter((bill) => bill.status === "pending")
    .reduce((sum, bill) => sum + bill.amount, 0)
  const overdueBillAmount = bills
    .filter((bill) => bill.status === "overdue")
    .reduce((sum, bill) => sum + bill.amount, 0)

  const paidPercentage = totalBillAmount > 0 ? (paidBillAmount / totalBillAmount) * 100 : 0
  const pendingPercentage = totalBillAmount > 0 ? (pendingBillAmount / totalBillAmount) * 100 : 0
  const overduePercentage = totalBillAmount > 0 ? (overdueBillAmount / totalBillAmount) * 100 : 0

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
    if (!formData.name || !formData.dueDate || !formData.amount) {
      toast({
        title: "Validation Error",
        description: "Please fill in all required fields.",
        variant: "destructive",
      })
      return
    }

    // Add new bill
    addBill({
      name: formData.name,
      category: formData.category,
      dueDate: formData.dueDate,
      amount: Number.parseFloat(formData.amount),
      status: formData.status as "paid" | "pending" | "overdue",
    })

    // Reset form and close dialog
    setFormData({
      name: "",
      category: "Utilities",
      dueDate: "",
      amount: "",
      status: "pending",
    })
    setOpen(false)

    toast({
      title: "Bill Added",
      description: "Your new bill has been added successfully.",
    })
  }

  const handleStatusChange = (id: string, status: "paid" | "pending" | "overdue") => {
    updateBillStatus(id, status)

    toast({
      title: "Status Updated",
      description: `Bill status has been updated to ${status}.`,
    })
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Bills & Utilities</h2>
          <p className="text-muted-foreground">Manage your recurring bills and utility payments</p>
        </div>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button className="bg-purple-600 hover:bg-purple-700">
              <Plus className="mr-2 h-4 w-4" />
              Add New Bill
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add New Bill</DialogTitle>
              <DialogDescription>Enter the details for your new bill.</DialogDescription>
            </DialogHeader>
            <form onSubmit={handleSubmit}>
              <div className="grid gap-4 py-4">
                <div className="grid gap-2">
                  <Label htmlFor="name">Bill Name</Label>
                  <Input
                    id="name"
                    name="name"
                    placeholder="e.g., Electricity"
                    value={formData.name}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="category">Category</Label>
                  <Select value={formData.category} onValueChange={(value) => handleSelectChange("category", value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Utilities">Utilities</SelectItem>
                      <SelectItem value="Rent">Rent</SelectItem>
                      <SelectItem value="Subscription">Subscription</SelectItem>
                      <SelectItem value="Insurance">Insurance</SelectItem>
                      <SelectItem value="Other">Other</SelectItem>
                    </SelectContent>
                  </Select>
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
                      <SelectItem value="paid">Paid</SelectItem>
                      <SelectItem value="overdue">Overdue</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <DialogFooter>
                <Button type="submit">Add Bill</Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Total Bills</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${totalBillAmount.toFixed(2)}</div>
            <p className="text-xs text-muted-foreground">All your bills for this period</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Paid</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${paidBillAmount.toFixed(2)}</div>
            <p className="text-xs text-muted-foreground">{paidPercentage.toFixed(0)}% of total bills</p>
            <Progress value={paidPercentage} className="mt-2 h-2" />
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Pending</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${pendingBillAmount.toFixed(2)}</div>
            <p className="text-xs text-muted-foreground">{pendingPercentage.toFixed(0)}% of total bills</p>
            <Progress value={pendingPercentage} className="mt-2 h-2" />
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Overdue</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${overdueBillAmount.toFixed(2)}</div>
            <p className="text-xs text-muted-foreground">{overduePercentage.toFixed(0)}% of total bills</p>
            <Progress value={overduePercentage} className="mt-2 h-2" />
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Upcoming Bills</CardTitle>
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
                <TableHead>Bill Name</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Due Date</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {bills.map((bill) => (
                <TableRow key={bill.id}>
                  <TableCell className="font-medium">{bill.name}</TableCell>
                  <TableCell>{bill.category}</TableCell>
                  <TableCell>{bill.dueDate}</TableCell>
                  <TableCell>${bill.amount.toFixed(2)}</TableCell>
                  <TableCell>
                    <div className="flex items-center">
                      {bill.status === "pending" ? (
                        <Clock className="mr-2 h-4 w-4 text-yellow-500" />
                      ) : bill.status === "paid" ? (
                        <CheckCircle className="mr-2 h-4 w-4 text-green-500" />
                      ) : (
                        <AlertCircle className="mr-2 h-4 w-4 text-red-500" />
                      )}
                      <span>{bill.status.charAt(0).toUpperCase() + bill.status.slice(1)}</span>
                    </div>
                  </TableCell>
                  <TableCell className="text-right">
                    {bill.status !== "paid" ? (
                      <Button variant="ghost" size="sm" onClick={() => handleStatusChange(bill.id, "paid")}>
                        Pay Now
                      </Button>
                    ) : (
                      <Button variant="ghost" size="sm">
                        View
                      </Button>
                    )}
                  </TableCell>
                </TableRow>
              ))}
              {bills.length === 0 && (
                <TableRow>
                  <TableCell colSpan={6} className="text-center py-4 text-muted-foreground">
                    No bills found. Add a new bill to get started.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}
