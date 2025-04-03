import InvoiceUploader from "@/components/invoice-uploader"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import InvoiceHistoryTable from "@/components/invoice-history-table"
import ExpenseChart from "@/components/expense-chart"
import ExpenseSummary from "@/components/expense-summary"
import { FileText, CheckCircle, AlertCircle } from "lucide-react"
import { Navbar } from "@/components/navbar"

export default function Scan() {

    return (
        <>
            <Navbar />
            <InvoiceUploader />
        </>
    )
}

