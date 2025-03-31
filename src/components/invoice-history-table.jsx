"use client"

import { useState } from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight, MoreHorizontal, FileText, Download, Eye } from "lucide-react"
import { Badge } from "@/components/ui/badge"

// Mock data for invoice history
const invoices = [
  {
    id: "INV-2023-0042",
    date: "2023-11-15",
    vendor: "Tech Solutions Inc.",
    amount: 4914.0,
    status: "Processed",
    category: "Services",
  },
  {
    id: "INV-2023-0041",
    date: "2023-11-10",
    vendor: "Office Supplies Co.",
    amount: 1250.0,
    status: "Processed",
    category: "Supplies",
  },
  {
    id: "INV-2023-0040",
    date: "2023-11-05",
    vendor: "Web Hosting Ltd.",
    amount: 3200.0,
    status: "Processed",
    category: "IT",
  },
  {
    id: "INV-2023-0039",
    date: "2023-11-01",
    vendor: "Marketing Agency",
    amount: 5600.0,
    status: "Processed",
    category: "Marketing",
  },
  {
    id: "INV-2023-0038",
    date: "2023-10-28",
    vendor: "Consulting Group",
    amount: 2800.0,
    status: "Processed",
    category: "Consulting",
  },
  {
    id: "INV-2023-0037",
    date: "2023-10-25",
    vendor: "Office Rent LLC",
    amount: 3500.0,
    status: "Processed",
    category: "Rent",
  },
  {
    id: "INV-2023-0036",
    date: "2023-10-20",
    vendor: "Utility Company",
    amount: 450.0,
    status: "Processed",
    category: "Utilities",
  },
  {
    id: "INV-2023-0035",
    date: "2023-10-15",
    vendor: "Catering Services",
    amount: 850.0,
    status: "Processed",
    category: "Food",
  },
]

export default function InvoiceHistoryTable() {
  const [page, setPage] = useState(1)
  const rowsPerPage = 5
  const totalPages = Math.ceil(invoices.length / rowsPerPage)

  const paginatedInvoices = invoices.slice((page - 1) * rowsPerPage, page * rowsPerPage)

  const getStatusColor = (status) => {
    switch (status) {
      case "Processed":
        return "bg-green-100 text-green-800"
      case "Pending":
        return "bg-yellow-100 text-yellow-800"
      case "Failed":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <div className="space-y-4">
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Invoice ID</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Vendor</TableHead>
              <TableHead>Category</TableHead>
              <TableHead className="text-right">Amount</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {paginatedInvoices.map((invoice) => (
              <TableRow key={invoice.id}>
                <TableCell className="font-medium">
                  <div className="flex items-center gap-2">
                    <FileText className="h-4 w-4 text-muted-foreground" />
                    {invoice.id}
                  </div>
                </TableCell>
                <TableCell>{invoice.date}</TableCell>
                <TableCell>{invoice.vendor}</TableCell>
                <TableCell>{invoice.category}</TableCell>
                <TableCell className="text-right">${invoice.amount.toFixed(2)}</TableCell>
                <TableCell>
                  <Badge variant="outline" className={getStatusColor(invoice.status)}>
                    {invoice.status}
                  </Badge>
                </TableCell>
                <TableCell className="text-right">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" className="h-8 w-8 p-0">
                        <span className="sr-only">Open menu</span>
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuLabel>Actions</DropdownMenuLabel>
                      <DropdownMenuItem>
                        <Eye className="mr-2 h-4 w-4" />
                        <span>View details</span>
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <Download className="mr-2 h-4 w-4" />
                        <span>Download PDF</span>
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem>
                        <span>Archive</span>
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <div className="flex items-center justify-end space-x-2 py-4">
        <Button variant="outline" size="sm" onClick={() => setPage(Math.max(1, page - 1))} disabled={page === 1}>
          <ChevronLeft className="h-4 w-4" />
          Previous
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => setPage(Math.min(totalPages, page + 1))}
          disabled={page === totalPages}
        >
          Next
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>
    </div>
  )
}

