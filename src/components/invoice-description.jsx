import { Card, CardContent } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Button } from "@/components/ui/button"


export default function InvoiceDescription({ data }) {
  const saveNota = () =>{
    console.log(data)
  }
  return (
    <div className="flex flex-col justify-between h-full">
      <p className="text-gray-600">
        <span className="font-semibold">Merchant:</span> {data.merchantName}
      </p>
      <p className="text-gray-600">
        <span className="font-semibold">Date & Time:</span> {data.datetime}
      </p>

      <h3 className="text-sm font-semibold text-gray-800 mt-4">Items</h3>
      <ul className="mt-2 space-y-2">
        {data.items.map((item, index) => (
          <li key={index} className="flex justify-between border-b pb-1 text-gray-700">
            <span>{item.name}</span>
            <span>Rp {item.total.toLocaleString()}</span>
          </li>
        ))}
      </ul>

      <div className="border-t mt-4 pt-2">
        <p className="text-gray-700">
          <span className="font-semibold">Total Price:</span> Rp {data.totalPrice.toLocaleString()}
        </p>
        <p className="text-gray-700">
          <span className="font-semibold">Tax:</span> Rp {data.tax.toLocaleString()}
        </p>
      </div>

      <Button className="w-full mt-5" onClick={saveNota}>Simpan Catatan Nota</Button>
    </div>

  )
}

