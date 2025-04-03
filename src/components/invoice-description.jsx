import { Card, CardContent } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Button } from "@/components/ui/button"
import { useState } from "react"


export default function InvoiceDescription({ data,image }) {
  const [success,setSuccess] = useState(null)
  const [error,setError] = useState(null)
  const saveNota = async () =>{
    // {"merchantName":"PT ALBANY CORONA LESTARI","datetime":"03:07:15 19:19","items":[{"name":"NISSIN LEMONIA 700GR","price":37500,"total":32500},{"name":"TANGO WFR ROYALE 380","price":27850,"total":22500},{"name":"TANGO WAFER CHOC0385","price":27850,"total":22500},{"name":"NISSIN WFR CHOCO 330","price":26900,"total":16900},{"name":"BIG COLA BTL 3.1L","price":14900,"total":9900},{"name":"QTELA TEMPE R/LAUT60","price":5400,"total":5400},{"name":"TARO SEAWEED 70G","price":7500,"total":7500},{"name":"VISINE ORIGINAL 6ML","price":12500,"total":12500},{"name":"MIZONE CRSP APPL 500","price":5900,"total":5900}],"totalPrice":135600,"tax":15118}

    const base64Image = await new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result.split(',')[1]); // Extract base64 data
      reader.onerror = (error) => reject(error);
      reader.readAsDataURL(image);
    });
    const invoiceData = {
      merchant_name: data.merchantName,
      total_price: parseInt(data.totalPrice),
      tax: parseInt(data.tax),
      invoice_image_base64: base64Image,
      datetime: data.datetime,
    };
    console.log(invoiceData)

    try {
      const response = await fetch('/api/invoices', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(invoiceData),
      });

      const result = await response.json();

      if (response.ok) {
        setSuccess('Invoice created successfully');
        setError(null);
        console.log(response)
      } else {
        setSuccess(null);
        setError(result.error || 'Something went wrong');
      }
    } catch (err) {
      setSuccess(null);
      setError('Error connecting to the server');
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    const invoiceData = {
      merchant_name: merchantName,
      total_price: parseInt(totalPrice),
      tax: parseInt(tax),
      invoice_image_base64: invoiceImage,
      datetime: new Date().toISOString(),
    };

    try {
      const response = await fetch('/api/invoices', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(invoiceData),
      });

      const result = await response.json();

      if (response.ok) {
        setSuccess('Invoice created successfully');
        setError(null);
      } else {
        setSuccess(null);
        setError(result.error || 'Something went wrong');
      }
    } catch (err) {
      setSuccess(null);
      setError('Error connecting to the server');
    }
  };
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

