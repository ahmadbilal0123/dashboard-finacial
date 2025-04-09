import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { FileText, Download, BarChart2, PieChart, LineChart, Calendar } from "lucide-react"
import { Overview } from "@/components/overview"
import { TargetReality } from "@/components/target-reality"

export default function ReportsPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Reports</h2>
          <p className="text-muted-foreground">View and generate financial reports</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Calendar className="mr-2 h-4 w-4" />
            Select Date Range
          </Button>
          <Button className="bg-purple-600 hover:bg-purple-700">
            <FileText className="mr-2 h-4 w-4" />
            Generate Report
          </Button>
        </div>
      </div>

      <Tabs defaultValue="financial">
        <TabsList>
          <TabsTrigger value="financial">Financial</TabsTrigger>
          <TabsTrigger value="sales">Sales</TabsTrigger>
          <TabsTrigger value="tax">Tax</TabsTrigger>
          <TabsTrigger value="expense">Expense</TabsTrigger>
        </TabsList>
        <TabsContent value="financial" className="space-y-4 mt-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">$45,231.89</div>
                <p className="text-xs text-muted-foreground">+20.1% from last month</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Expenses</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">$12,345.00</div>
                <p className="text-xs text-muted-foreground">+4.5% from last month</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Profit</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">$32,886.89</div>
                <p className="text-xs text-muted-foreground">+15.6% from last month</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Profit Margin</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">72.7%</div>
                <p className="text-xs text-muted-foreground">+2.4% from last month</p>
              </CardContent>
            </Card>
          </div>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
            <Card className="col-span-4">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>Revenue Overview</CardTitle>
                  <Button variant="outline" size="sm">
                    <Download className="mr-2 h-4 w-4" />
                    Download
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <Overview />
              </CardContent>
            </Card>
            <Card className="col-span-3">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>Target vs Reality</CardTitle>
                  <Button variant="outline" size="sm">
                    <Download className="mr-2 h-4 w-4" />
                    Download
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <TargetReality />
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        <TabsContent value="sales" className="space-y-4 mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Sales Reports</CardTitle>
              <CardDescription>View detailed sales reports and analytics</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-3">
                <Card>
                  <CardContent className="p-6">
                    <div className="flex flex-col items-center space-y-2">
                      <BarChart2 className="h-8 w-8 text-purple-500" />
                      <h3 className="text-lg font-medium">Sales by Product</h3>
                      <p className="text-sm text-muted-foreground text-center">
                        Detailed breakdown of sales by product category
                      </p>
                      <Button className="mt-4 w-full">View Report</Button>
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-6">
                    <div className="flex flex-col items-center space-y-2">
                      <PieChart className="h-8 w-8 text-purple-500" />
                      <h3 className="text-lg font-medium">Sales by Region</h3>
                      <p className="text-sm text-muted-foreground text-center">Geographic distribution of your sales</p>
                      <Button className="mt-4 w-full">View Report</Button>
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-6">
                    <div className="flex flex-col items-center space-y-2">
                      <LineChart className="h-8 w-8 text-purple-500" />
                      <h3 className="text-lg font-medium">Sales Trends</h3>
                      <p className="text-sm text-muted-foreground text-center">
                        Historical sales data and future projections
                      </p>
                      <Button className="mt-4 w-full">View Report</Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="tax" className="space-y-4 mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Tax Reports</CardTitle>
              <CardDescription>View and generate tax-related reports</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-3">
                <Card>
                  <CardContent className="p-6">
                    <div className="flex flex-col items-center space-y-2">
                      <FileText className="h-8 w-8 text-purple-500" />
                      <h3 className="text-lg font-medium">Annual Tax Summary</h3>
                      <p className="text-sm text-muted-foreground text-center">
                        Complete overview of your tax obligations for the fiscal year
                      </p>
                      <Button className="mt-4 w-full">Generate Report</Button>
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
                      <Button className="mt-4 w-full">Generate Report</Button>
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-6">
                    <div className="flex flex-col items-center space-y-2">
                      <FileText className="h-8 w-8 text-purple-500" />
                      <h3 className="text-lg font-medium">VAT Report</h3>
                      <p className="text-sm text-muted-foreground text-center">
                        Detailed breakdown of VAT collected and paid
                      </p>
                      <Button className="mt-4 w-full">Generate Report</Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="expense" className="space-y-4 mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Expense Reports</CardTitle>
              <CardDescription>Track and analyze your business expenses</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-3">
                <Card>
                  <CardContent className="p-6">
                    <div className="flex flex-col items-center space-y-2">
                      <BarChart2 className="h-8 w-8 text-purple-500" />
                      <h3 className="text-lg font-medium">Expense by Category</h3>
                      <p className="text-sm text-muted-foreground text-center">
                        Breakdown of expenses by business category
                      </p>
                      <Button className="mt-4 w-full">View Report</Button>
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-6">
                    <div className="flex flex-col items-center space-y-2">
                      <LineChart className="h-8 w-8 text-purple-500" />
                      <h3 className="text-lg font-medium">Monthly Expenses</h3>
                      <p className="text-sm text-muted-foreground text-center">Track your expense trends over time</p>
                      <Button className="mt-4 w-full">View Report</Button>
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-6">
                    <div className="flex flex-col items-center space-y-2">
                      <FileText className="h-8 w-8 text-purple-500" />
                      <h3 className="text-lg font-medium">Expense Summary</h3>
                      <p className="text-sm text-muted-foreground text-center">
                        Complete summary of all business expenses
                      </p>
                      <Button className="mt-4 w-full">View Report</Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
