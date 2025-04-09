"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Overview } from "@/components/overview"
import { SalesMetrics } from "@/components/sales-metrics"
import { VisitorInsights } from "@/components/visitor-insights"
import { CustomerSatisfaction } from "@/components/customer-satisfaction"
import { TargetReality } from "@/components/target-reality"
import { UploadDataForm } from "@/components/upload-data-form"
import { useFinance } from "@/context/finance-context"

export default function DashboardPage() {
  const { metrics } = useFinance()

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold tracking-tight">Dashboard</h2>
        <p className="text-muted-foreground">Overview of your financial performance and metrics</p>
      </div>

      <SalesMetrics />

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Card className="col-span-2">
          <CardHeader>
            <CardTitle>Total Revenue</CardTitle>
          </CardHeader>
          <CardContent>
            <Overview />
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Customer Satisfaction</CardTitle>
          </CardHeader>
          <CardContent>
            <CustomerSatisfaction />
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Target vs Reality</CardTitle>
          </CardHeader>
          <CardContent>
            <TargetReality />
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Visitor Insights</CardTitle>
          </CardHeader>
          <CardContent>
            <VisitorInsights />
          </CardContent>
        </Card>
      </div>

      <UploadDataForm />
    </div>
  )
}
