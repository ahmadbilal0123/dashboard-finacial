"use client"

import { Card, CardContent } from "@/components/ui/card"
import { DollarSign, ShoppingBag, CheckCircle, AlertCircle } from "lucide-react"
import { useFinance } from "@/context/finance-context"

export function SalesMetrics() {
  const { metrics } = useFinance()

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <Card className="bg-pink-50">
        <CardContent className="p-6">
          <div className="flex items-center gap-4">
            <div className="flex items-center justify-center w-12 h-12 rounded-full bg-pink-100">
              <DollarSign className="w-6 h-6 text-pink-500" />
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">Total Sales</p>
              <h3 className="text-2xl font-bold">${metrics.totalSales}</h3>
            </div>
          </div>
        </CardContent>
      </Card>
      <Card className="bg-orange-50">
        <CardContent className="p-6">
          <div className="flex items-center gap-4">
            <div className="flex items-center justify-center w-12 h-12 rounded-full bg-orange-100">
              <ShoppingBag className="w-6 h-6 text-orange-500" />
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">Total Orders</p>
              <h3 className="text-2xl font-bold">{metrics.totalOrders}</h3>
            </div>
          </div>
        </CardContent>
      </Card>
      <Card className="bg-green-50">
        <CardContent className="p-6">
          <div className="flex items-center gap-4">
            <div className="flex items-center justify-center w-12 h-12 rounded-full bg-green-100">
              <CheckCircle className="w-6 h-6 text-green-500" />
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">Completed</p>
              <h3 className="text-2xl font-bold">{metrics.completed}</h3>
            </div>
          </div>
        </CardContent>
      </Card>
      <Card className="bg-purple-50">
        <CardContent className="p-6">
          <div className="flex items-center gap-4">
            <div className="flex items-center justify-center w-12 h-12 rounded-full bg-purple-100">
              <AlertCircle className="w-6 h-6 text-purple-500" />
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">New Customers</p>
              <h3 className="text-2xl font-bold">{metrics.newCustomers}</h3>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
