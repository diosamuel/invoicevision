"use client"
import InvoiceUploader from "@/components/invoice-uploader"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import InvoiceHistoryTable from "@/components/invoice-history-table"
import ExpenseChart from "@/components/expense-chart"
import ExpenseSummary from "@/components/expense-summary"
import { FileText, CheckCircle, AlertCircle } from "lucide-react"
import { Navbar } from "@/components/navbar"
import { useState, useEffect } from "react"

export default function Dashboard() {

    return (
        <>
            <Navbar />
            <div className="flex min-h-screen w-full flex-col">
                <div className="flex-1 space-y-4 p-8 pt-6">
                    <div className="flex items-center justify-between space-y-2">
                        <h2 className="text-3xl font-bold tracking-tight">Invoice Dashboard</h2>
                    </div>

                    <Tabs defaultValue="overview" className="space-y-4">
                        <TabsContent value="overview" className="space-y-4">
                            <ExpenseSummary />
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
                    </Tabs>
                </div>
            </div>
        </>
    )
}

