"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import InvoiceHistoryTable from "@/components/invoice-history-table"
import ExpenseSummary from "@/components/expense-summary"
import { FileText, CheckCircle, AlertCircle } from "lucide-react"
import { Navbar } from "@/components/navbar"
import { useState, useEffect } from "react"

export default function Dashboard() {
    const [invoices, setInvoices] = useState([]);
    const [expenseSummary, setExpenseSummary] = useState([]);
    const sumInvoices = (invoices, callback) => invoices.reduce(callback, { total: 0, tax: 0, totalWithTax: 0 });

    // Function to sum totals for each invoice
    const sumInvoiceData = (acc, invoice) => {
        acc.total += invoice.total_price;
        acc.tax += invoice.tax;
        acc.totalWithTax += invoice.total_price + invoice.tax;
        return acc;
    };

    // Use the HOF to sum all totals

    useEffect(() => {
        async function fetchInvoices() {
            const res = await fetch("/api/invoices");
            const data = await res.json();
            setInvoices(data);
            const summary = sumInvoices(data, sumInvoiceData);
            setExpenseSummary(summary)
        }
        fetchInvoices();
    }, []);
    return (
        <>
            <Navbar />
            <div className="flex min-h-screen w-full flex-col">
                <div className="flex-1 space-y-4 p-8 pt-6">
                    <div className="flex items-center justify-between space-y-2">
                        <h2 className="text-3xl font-bold tracking-tight">Dashboard Nota</h2>
                    </div>

                    <Tabs defaultValue="overview" className="space-y-4">
                        <TabsContent value="overview" className="space-y-4">
                            <ExpenseSummary summary={expenseSummary} invoices={invoices}/>
                            <div className="grid gap-4 md:grid-cols-1">
                                <Card className="col-span-1">
                                    <CardHeader>
                                        <CardTitle>Riwayat Nota</CardTitle>
                                        <CardDescription>Riwayat Nota yang sudah Anda scan</CardDescription>
                                    </CardHeader>
                                    <CardContent>
                                        <InvoiceHistoryTable invoices={invoices} />
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

