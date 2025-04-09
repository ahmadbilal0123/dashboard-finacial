"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect } from "react"

// Define types for our financial data
export type Invoice = {
  id: string
  client: string
  issueDate: string
  dueDate: string
  amount: number
  status: "paid" | "pending" | "overdue"
}

export type TaxFiling = {
  id: string
  type: string
  period: string
  dueDate: string
  amount: number
  status: "filed" | "pending" | "overdue"
}

export type Bill = {
  id: string
  name: string
  category: string
  dueDate: string
  amount: number
  status: "paid" | "pending" | "overdue"
}

export type SalesData = {
  month: string
  total: number
}

export type FinancialMetrics = {
  totalSales: number
  totalOrders: number
  completed: number
  newCustomers: number
  totalRevenue: number
  expenses: number
  profit: number
  profitMargin: number
}

export type FinanceContextType = {
  invoices: Invoice[]
  taxFilings: TaxFiling[]
  bills: Bill[]
  salesData: SalesData[]
  metrics: FinancialMetrics
  customerSatisfaction: { month: string; satisfaction: number }[]
  targetVsReality: { name: string; target: number; actual: number }[]
  visitorData: { name: string; newVisitors: number; returningVisitors: number; uniqueVisitors: number }[]
  addInvoice: (invoice: Omit<Invoice, "id">) => void
  addTaxFiling: (taxFiling: Omit<TaxFiling, "id">) => void
  addBill: (bill: Omit<Bill, "id">) => void
  updateInvoiceStatus: (id: string, status: Invoice["status"]) => void
  updateTaxFilingStatus: (id: string, status: TaxFiling["status"]) => void
  updateBillStatus: (id: string, status: Bill["status"]) => void
  uploadTaxData: (data: any) => void
  uploadFinancialData: (data: any) => void
  isLoading: boolean
}

// Create the context with default values
const FinanceContext = createContext<FinanceContextType | undefined>(undefined)

// Sample initial data
const initialInvoices: Invoice[] = [
  {
    id: "INV-001",
    client: "Acme Inc.",
    issueDate: "01/05/2023",
    dueDate: "15/05/2023",
    amount: 1250,
    status: "paid",
  },
  {
    id: "INV-002",
    client: "Globex Corp.",
    issueDate: "15/05/2023",
    dueDate: "30/05/2023",
    amount: 2500,
    status: "pending",
  },
  {
    id: "INV-003",
    client: "Stark Industries",
    issueDate: "01/06/2023",
    dueDate: "15/06/2023",
    amount: 3750,
    status: "overdue",
  },
  {
    id: "INV-004",
    client: "Wayne Enterprises",
    issueDate: "15/06/2023",
    dueDate: "30/06/2023",
    amount: 4250,
    status: "paid",
  },
  {
    id: "INV-005",
    client: "Oscorp",
    issueDate: "01/07/2023",
    dueDate: "15/07/2023",
    amount: 1800,
    status: "pending",
  },
]

const initialTaxFilings: TaxFiling[] = [
  {
    id: "TX-2023-Q1",
    type: "Income Tax",
    period: "Q1 2023",
    dueDate: "15/04/2023",
    amount: 4250,
    status: "filed",
  },
  {
    id: "TX-2023-Q2",
    type: "Income Tax",
    period: "Q2 2023",
    dueDate: "15/07/2023",
    amount: 5120,
    status: "pending",
  },
  {
    id: "TX-2023-VAT-1",
    type: "VAT",
    period: "Jan-Mar 2023",
    dueDate: "30/04/2023",
    amount: 2340,
    status: "filed",
  },
]

const initialBills: Bill[] = [
  {
    id: "BILL-001",
    name: "Electricity",
    category: "Utilities",
    dueDate: "15/07/2023",
    amount: 125,
    status: "pending",
  },
  {
    id: "BILL-002",
    name: "Water",
    category: "Utilities",
    dueDate: "20/07/2023",
    amount: 85,
    status: "pending",
  },
  {
    id: "BILL-003",
    name: "Internet",
    category: "Utilities",
    dueDate: "05/07/2023",
    amount: 79.99,
    status: "paid",
  },
  {
    id: "BILL-004",
    name: "Office Rent",
    category: "Rent",
    dueDate: "01/07/2023",
    amount: 1200,
    status: "paid",
  },
  {
    id: "BILL-005",
    name: "Phone",
    category: "Utilities",
    dueDate: "25/06/2023",
    amount: 45,
    status: "overdue",
  },
]

const initialSalesData: SalesData[] = [
  { month: "Jan", total: 1800 },
  { month: "Feb", total: 2200 },
  { month: "Mar", total: 1100 },
  { month: "Apr", total: 2800 },
  { month: "May", total: 900 },
  { month: "Jun", total: 1700 },
  { month: "Jul", total: 2600 },
  { month: "Aug", total: 1900 },
  { month: "Sep", total: 2300 },
  { month: "Oct", total: 2100 },
  { month: "Nov", total: 2500 },
  { month: "Dec", total: 2900 },
]

const initialCustomerSatisfaction = [
  { month: "Jan", satisfaction: 85 },
  { month: "Feb", satisfaction: 82 },
  { month: "Mar", satisfaction: 87 },
  { month: "Apr", satisfaction: 84 },
  { month: "May", satisfaction: 89 },
  { month: "Jun", satisfaction: 92 },
  { month: "Jul", satisfaction: 90 },
  { month: "Aug", satisfaction: 88 },
  { month: "Sep", satisfaction: 91 },
  { month: "Oct", satisfaction: 93 },
  { month: "Nov", satisfaction: 94 },
  { month: "Dec", satisfaction: 95 },
]

const initialTargetVsReality = [
  { name: "Jan", target: 2000, actual: 1800 },
  { name: "Feb", target: 2200, actual: 2400 },
  { name: "Mar", target: 2400, actual: 2200 },
  { name: "Apr", target: 2600, actual: 2800 },
  { name: "May", target: 2800, actual: 2600 },
  { name: "Jun", target: 3000, actual: 3200 },
]

const initialVisitorData = [
  { name: "Jan", newVisitors: 400, returningVisitors: 240, uniqueVisitors: 320 },
  { name: "Feb", newVisitors: 300, returningVisitors: 290, uniqueVisitors: 280 },
  { name: "Mar", newVisitors: 500, returningVisitors: 300, uniqueVisitors: 400 },
  { name: "Apr", newVisitors: 700, returningVisitors: 400, uniqueVisitors: 550 },
  { name: "May", newVisitors: 400, returningVisitors: 380, uniqueVisitors: 390 },
  { name: "Jun", newVisitors: 500, returningVisitors: 450, uniqueVisitors: 480 },
]

const initialMetrics: FinancialMetrics = {
  totalSales: 1000,
  totalOrders: 300,
  completed: 5,
  newCustomers: 8,
  totalRevenue: 45231.89,
  expenses: 12345,
  profit: 32886.89,
  profitMargin: 72.7,
}

// Create the provider component
export function FinanceProvider({ children }: { children: React.ReactNode }) {
  const [invoices, setInvoices] = useState<Invoice[]>(initialInvoices)
  const [taxFilings, setTaxFilings] = useState<TaxFiling[]>(initialTaxFilings)
  const [bills, setBills] = useState<Bill[]>(initialBills)
  const [salesData, setSalesData] = useState<SalesData[]>(initialSalesData)
  const [customerSatisfaction, setCustomerSatisfaction] = useState(initialCustomerSatisfaction)
  const [targetVsReality, setTargetVsReality] = useState(initialTargetVsReality)
  const [visitorData, setVisitorData] = useState(initialVisitorData)
  const [metrics, setMetrics] = useState<FinancialMetrics>(initialMetrics)
  const [isLoading, setIsLoading] = useState(false)

  // Load data from localStorage on component mount
  useEffect(() => {
    const savedInvoices = localStorage.getItem("invoices")
    const savedTaxFilings = localStorage.getItem("taxFilings")
    const savedBills = localStorage.getItem("bills")
    const savedSalesData = localStorage.getItem("salesData")
    const savedMetrics = localStorage.getItem("metrics")
    const savedCustomerSatisfaction = localStorage.getItem("customerSatisfaction")
    const savedTargetVsReality = localStorage.getItem("targetVsReality")
    const savedVisitorData = localStorage.getItem("visitorData")

    if (savedInvoices) setInvoices(JSON.parse(savedInvoices))
    if (savedTaxFilings) setTaxFilings(JSON.parse(savedTaxFilings))
    if (savedBills) setBills(JSON.parse(savedBills))
    if (savedSalesData) setSalesData(JSON.parse(savedSalesData))
    if (savedMetrics) setMetrics(JSON.parse(savedMetrics))
    if (savedCustomerSatisfaction) setCustomerSatisfaction(JSON.parse(savedCustomerSatisfaction))
    if (savedTargetVsReality) setTargetVsReality(JSON.parse(savedTargetVsReality))
    if (savedVisitorData) setVisitorData(JSON.parse(savedVisitorData))
  }, [])

  // Save data to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("invoices", JSON.stringify(invoices))
    localStorage.setItem("taxFilings", JSON.stringify(taxFilings))
    localStorage.setItem("bills", JSON.stringify(bills))
    localStorage.setItem("salesData", JSON.stringify(salesData))
    localStorage.setItem("metrics", JSON.stringify(metrics))
    localStorage.setItem("customerSatisfaction", JSON.stringify(customerSatisfaction))
    localStorage.setItem("targetVsReality", JSON.stringify(targetVsReality))
    localStorage.setItem("visitorData", JSON.stringify(visitorData))
  }, [invoices, taxFilings, bills, salesData, metrics, customerSatisfaction, targetVsReality, visitorData])

  // Function to add a new invoice
  const addInvoice = (invoice: Omit<Invoice, "id">) => {
    const newInvoice = {
      ...invoice,
      id: `INV-${String(invoices.length + 1).padStart(3, "0")}`,
    }
    setInvoices([...invoices, newInvoice])

    // Update metrics
    updateMetricsAfterInvoice(newInvoice)
  }

  // Function to add a new tax filing
  const addTaxFiling = (taxFiling: Omit<TaxFiling, "id">) => {
    const newTaxFiling = {
      ...taxFiling,
      id: `TX-${new Date().getFullYear()}-${String(taxFilings.length + 1).padStart(2, "0")}`,
    }
    setTaxFilings([...taxFilings, newTaxFiling])
  }

  // Function to add a new bill
  const addBill = (bill: Omit<Bill, "id">) => {
    const newBill = {
      ...bill,
      id: `BILL-${String(bills.length + 1).padStart(3, "0")}`,
    }
    setBills([...bills, newBill])

    // Update metrics
    if (bill.status === "paid") {
      setMetrics({
        ...metrics,
        expenses: metrics.expenses + bill.amount,
        profit: metrics.profit - bill.amount,
        profitMargin: ((metrics.profit - bill.amount) / metrics.totalRevenue) * 100,
      })
    }
  }

  // Function to update invoice status
  const updateInvoiceStatus = (id: string, status: Invoice["status"]) => {
    setInvoices(
      invoices.map((invoice) => {
        if (invoice.id === id) {
          return { ...invoice, status }
        }
        return invoice
      }),
    )

    // Update metrics based on status change
    const invoice = invoices.find((inv) => inv.id === id)
    if (invoice && status === "paid" && invoice.status !== "paid") {
      updateMetricsAfterPayment(invoice.amount)
    }
  }

  // Function to update tax filing status
  const updateTaxFilingStatus = (id: string, status: TaxFiling["status"]) => {
    setTaxFilings(
      taxFilings.map((filing) => {
        if (filing.id === id) {
          return { ...filing, status }
        }
        return filing
      }),
    )
  }

  // Function to update bill status
  const updateBillStatus = (id: string, status: Bill["status"]) => {
    setBills(
      bills.map((bill) => {
        if (bill.id === id) {
          return { ...bill, status }
        }
        return bill
      }),
    )

    // Update expenses if bill is paid
    const bill = bills.find((b) => b.id === id)
    if (bill && status === "paid" && bill.status !== "paid") {
      setMetrics({
        ...metrics,
        expenses: metrics.expenses + bill.amount,
        profit: metrics.profit - bill.amount,
        profitMargin: ((metrics.profit - bill.amount) / metrics.totalRevenue) * 100,
      })
    }
  }

  // Helper function to update metrics after a new invoice
  const updateMetricsAfterInvoice = (invoice: Invoice) => {
    if (invoice.status === "paid") {
      updateMetricsAfterPayment(invoice.amount)
    }

    setMetrics({
      ...metrics,
      totalOrders: metrics.totalOrders + 1,
    })
  }

  // Helper function to update metrics after payment
  const updateMetricsAfterPayment = (amount: number) => {
    setMetrics({
      ...metrics,
      totalSales: metrics.totalSales + amount,
      totalRevenue: metrics.totalRevenue + amount,
      profit: metrics.profit + amount,
      profitMargin: ((metrics.profit + amount) / (metrics.totalRevenue + amount)) * 100,
      completed: metrics.completed + 1,
    })

    // Update sales data for current month
    const currentMonth = new Date().toLocaleString("default", { month: "short" })
    setSalesData(
      salesData.map((data) => {
        if (data.month === currentMonth) {
          return { ...data, total: data.total + amount }
        }
        return data
      }),
    )
  }

  // Function to upload and process tax data
  const uploadTaxData = (data: any) => {
    setIsLoading(true)

    // Simulate processing delay
    setTimeout(() => {
      try {
        // Process tax filings
        if (data.taxFilings && Array.isArray(data.taxFilings)) {
          const newTaxFilings = data.taxFilings.map((filing: any, index: number) => ({
            id: `TX-UPLOAD-${String(index + 1).padStart(3, "0")}`,
            type: filing.type || "Income Tax",
            period: filing.period || `Q${Math.floor(Math.random() * 4) + 1} ${new Date().getFullYear()}`,
            dueDate: filing.dueDate || new Date().toLocaleDateString(),
            amount: filing.amount || Math.floor(Math.random() * 5000) + 1000,
            status: filing.status || "pending",
          }))

          setTaxFilings([...taxFilings, ...newTaxFilings])
        }

        // Update metrics if tax data includes summary
        if (data.taxSummary) {
          const { totalTaxes, pendingTaxes, filedTaxes } = data.taxSummary

          // Update expenses to include taxes
          if (totalTaxes) {
            setMetrics({
              ...metrics,
              expenses: metrics.expenses + totalTaxes,
              profit: metrics.profit - totalTaxes,
              profitMargin: ((metrics.profit - totalTaxes) / metrics.totalRevenue) * 100,
            })
          }
        }

        setIsLoading(false)
      } catch (error) {
        console.error("Error processing tax data:", error)
        setIsLoading(false)
      }
    }, 1500)
  }

  // Function to upload and process financial data
  const uploadFinancialData = (data: any) => {
    setIsLoading(true)

    // Simulate processing delay
    setTimeout(() => {
      try {
        // Process invoices
        if (data.invoices && Array.isArray(data.invoices)) {
          const newInvoices = data.invoices.map((invoice: any, index: number) => ({
            id: `INV-UPLOAD-${String(index + 1).padStart(3, "0")}`,
            client: invoice.client || "New Client",
            issueDate: invoice.issueDate || new Date().toLocaleDateString(),
            dueDate: invoice.dueDate || new Date(Date.now() + 15 * 24 * 60 * 60 * 1000).toLocaleDateString(),
            amount: invoice.amount || Math.floor(Math.random() * 5000) + 500,
            status: invoice.status || "pending",
          }))

          setInvoices([...invoices, ...newInvoices])

          // Update metrics based on new invoices
          const paidInvoices = newInvoices.filter((inv) => inv.status === "paid")
          const totalPaidAmount = paidInvoices.reduce((sum, inv) => sum + inv.amount, 0)

          if (totalPaidAmount > 0) {
            updateMetricsAfterPayment(totalPaidAmount)
          }

          setMetrics({
            ...metrics,
            totalOrders: metrics.totalOrders + newInvoices.length,
            completed: metrics.completed + paidInvoices.length,
          })
        }

        // Process bills
        if (data.bills && Array.isArray(data.bills)) {
          const newBills = data.bills.map((bill: any, index: number) => ({
            id: `BILL-UPLOAD-${String(index + 1).padStart(3, "0")}`,
            name: bill.name || "New Bill",
            category: bill.category || "Utilities",
            dueDate: bill.dueDate || new Date(Date.now() + 15 * 24 * 60 * 60 * 1000).toLocaleDateString(),
            amount: bill.amount || Math.floor(Math.random() * 500) + 50,
            status: bill.status || "pending",
          }))

          setBills([...bills, ...newBills])

          // Update expenses for paid bills
          const paidBills = newBills.filter((bill) => bill.status === "paid")
          const totalPaidAmount = paidBills.reduce((sum, bill) => sum + bill.amount, 0)

          if (totalPaidAmount > 0) {
            setMetrics({
              ...metrics,
              expenses: metrics.expenses + totalPaidAmount,
              profit: metrics.profit - totalPaidAmount,
              profitMargin: ((metrics.profit - totalPaidAmount) / metrics.totalRevenue) * 100,
            })
          }
        }

        // Update sales data if provided
        if (data.salesData && Array.isArray(data.salesData)) {
          const newSalesData = [...salesData]

          data.salesData.forEach((item: any) => {
            const existingIndex = newSalesData.findIndex((d) => d.month === item.month)
            if (existingIndex >= 0) {
              newSalesData[existingIndex].total += item.total || 0
            }
          })

          setSalesData(newSalesData)
        }

        // Update customer satisfaction if provided
        if (data.customerSatisfaction && Array.isArray(data.customerSatisfaction)) {
          const newSatisfactionData = [...customerSatisfaction]

          data.customerSatisfaction.forEach((item: any) => {
            const existingIndex = newSatisfactionData.findIndex((d) => d.month === item.month)
            if (existingIndex >= 0 && item.satisfaction) {
              newSatisfactionData[existingIndex].satisfaction =
                (newSatisfactionData[existingIndex].satisfaction + item.satisfaction) / 2
            }
          })

          setCustomerSatisfaction(newSatisfactionData)
        }

        setIsLoading(false)
      } catch (error) {
        console.error("Error processing financial data:", error)
        setIsLoading(false)
      }
    }, 1500)
  }

  // Create the context value
  const contextValue: FinanceContextType = {
    invoices,
    taxFilings,
    bills,
    salesData,
    metrics,
    customerSatisfaction,
    targetVsReality,
    visitorData,
    addInvoice,
    addTaxFiling,
    addBill,
    updateInvoiceStatus,
    updateTaxFilingStatus,
    updateBillStatus,
    uploadTaxData,
    uploadFinancialData,
    isLoading,
  }

  return <FinanceContext.Provider value={contextValue}>{children}</FinanceContext.Provider>
}

// Custom hook to use the finance context
export function useFinance() {
  const context = useContext(FinanceContext)
  if (context === undefined) {
    throw new Error("useFinance must be used within a FinanceProvider")
  }
  return context
}
