import InvoiceUploader from "@/components/invoice-uploader"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import InvoiceHistoryTable from "@/components/invoice-history-table"
import ExpenseChart from "@/components/expense-chart"
import ExpenseSummary from "@/components/expense-summary"
import { FileText, CheckCircle, AlertCircle } from "lucide-react"

export default function Home() {

const recentActivity = [
  {
    description: "Invoice #INV-2023-0042 processed",
    timestamp: "2 hours ago",
    icon: CheckCircle,
    bgColor: "bg-green-100",
    iconColor: "text-green-600",
    amount: "$4,914.00",
  },
  {
    description: "Invoice #INV-2023-0041 processed",
    timestamp: "5 hours ago",
    icon: CheckCircle,
    bgColor: "bg-green-100",
    iconColor: "text-green-600",
    amount: "$1,250.00",
  },
  {
    description: "Failed to process invoice",
    timestamp: "Yesterday",
    icon: AlertCircle,
    bgColor: "bg-red-100",
    iconColor: "text-red-600",
  },
  {
    description: "Invoice #INV-2023-0040 processed",
    timestamp: "Yesterday",
    icon: FileText,
    bgColor: "bg-blue-100",
    iconColor: "text-blue-600",
    amount: "$3,200.00",
  },
]

  return (
    <main className="container mx-auto py-10 px-4">
      <h1 className="text-3xl font-bold mb-8 text-center">NotaScan</h1>
      <p className="text-center">Scan & Simpan Nota dengan AI</p>
      <InvoiceUploader />
      <div className="flex min-h-screen w-full flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <div className="flex items-center justify-between space-y-2">
          <h2 className="text-3xl font-bold tracking-tight">Invoice Dashboard</h2>
        </div>

        <Tabs defaultValue="overview" className="space-y-4">
          <TabsList>
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-4">
            <ExpenseSummary />

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
              <Card className="col-span-4">
                <CardHeader>
                  <CardTitle>Today's Expenses</CardTitle>
                  <CardDescription>Hourly breakdown of expenses for today</CardDescription>
                </CardHeader>
                <CardContent className="pl-2">
                  <ExpenseChart />
                </CardContent>
              </Card>

              <Card className="col-span-3">
                <CardHeader>
                  <CardTitle>Recent Activity</CardTitle>
                  <CardDescription>Recent invoice processing activity</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-8">
                    {recentActivity.map((activity, index) => (
                      <div className="flex items-center" key={index}>
                        <div className={`mr-4 rounded-full p-2 ${activity.bgColor}`}>
                          <activity.icon className={`h-4 w-4 ${activity.iconColor}`} />
                        </div>
                        <div className="space-y-1">
                          <p className="text-sm font-medium leading-none">{activity.description}</p>
                          <p className="text-sm text-muted-foreground">{activity.timestamp}</p>
                        </div>
                        {activity.amount && <div className="ml-auto font-medium">{activity.amount}</div>}
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="grid gap-4 md:grid-cols-1">
              <Card className="col-span-1">
                <CardHeader>
                  <CardTitle>Invoice History</CardTitle>
                  <CardDescription>All processed invoices from your scans</CardDescription>
                </CardHeader>
                <CardContent>
                  <InvoiceHistoryTable />
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="analytics" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Analytics</CardTitle>
                <CardDescription>Detailed analytics will be available soon.</CardDescription>
              </CardHeader>
              <CardContent className="h-[400px] flex items-center justify-center">
                <p className="text-muted-foreground">Analytics dashboard coming soon...</p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
    </main>
  )
}

