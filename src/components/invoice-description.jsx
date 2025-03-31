import { Card, CardContent } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"


export default function InvoiceDescription({ data }) {
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <h3 className="text-sm font-medium text-muted-foreground">Invoice Number</h3>
          <p className="font-medium">{data.invoiceNumber}</p>
        </div>
        <div>
          <h3 className="text-sm font-medium text-muted-foreground">Date</h3>
          <p className="font-medium">{data.date}</p>
        </div>
        <div>
          <h3 className="text-sm font-medium text-muted-foreground">Due Date</h3>
          <p className="font-medium">{data.dueDate}</p>
        </div>
      </div>

      <Separator />

      <div className="grid md:grid-cols-2 gap-4">
        <div>
          <h3 className="text-sm font-medium mb-1">Vendor</h3>
          <Card>
            <CardContent className="p-3">
              <p className="font-medium">{data.vendor.name}</p>
              <p className="text-sm text-muted-foreground whitespace-pre-line">{data.vendor.address}</p>
              <p className="text-sm mt-1">{data.vendor.contact}</p>
            </CardContent>
          </Card>
        </div>
        <div>
          <h3 className="text-sm font-medium mb-1">Customer</h3>
          <Card>
            <CardContent className="p-3">
              <p className="font-medium">{data.customer.name}</p>
              <p className="text-sm text-muted-foreground whitespace-pre-line">{data.customer.address}</p>
            </CardContent>
          </Card>
        </div>
      </div>

      <Separator />

      <div>
        <h3 className="text-sm font-medium mb-2">Items</h3>
        <div className="space-y-2">
          {data.items.map((item, index) => (
            <div key={index} className="grid grid-cols-12 gap-2 text-sm">
              <div className="col-span-6">{item.description}</div>
              <div className="col-span-2 text-right">{item.quantity}</div>
              <div className="col-span-2 text-right">${item.unitPrice.toFixed(2)}</div>
              <div className="col-span-2 text-right font-medium">${item.amount.toFixed(2)}</div>
            </div>
          ))}
        </div>
      </div>

      <Separator />

      <div className="space-y-1">
        <div className="flex justify-between text-sm">
          <span className="text-muted-foreground">Subtotal</span>
          <span>${data.subtotal.toFixed(2)}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-muted-foreground">Tax</span>
          <span>${data.tax.toFixed(2)}</span>
        </div>
        <div className="flex justify-between font-medium">
          <span>Total</span>
          <span>${data.total.toFixed(2)}</span>
        </div>
      </div>
    </div>
  )
}

