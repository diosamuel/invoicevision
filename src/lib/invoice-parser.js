import dotenv from 'dotenv';
import axios from 'axios';

dotenv.config();

// Konfigurasi API Key Google Gemini
const GEMINI_API_KEY = process.env.NEXT_PUBLIC_GEMINI_API_KEY;
const GEMINI_API_URL = `https://generativelanguage.googleapis.com/v1/models/gemini-1.5-flash:generateContent?key=${GEMINI_API_KEY}`;

export async function extractInvoiceData(file) {
  // Convert File to Base64 (Fix: Ensure proper async handling)
  const base64Image = await new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => resolve(reader.result.split(',')[1]); // Extract base64 data
    reader.onerror = (error) => reject(error);
    reader.readAsDataURL(file);
  });

  // Construct API Request Payload
  const requestBody = {
    contents: [
      {
        parts: [
          { text: "Extract invoice details and return as JSON: {merchantName:string, datetime:DD:MM:YY hh:mm:ss, items:[{name:string, price:int, total:int}], totalPrice:int, tax:int}" },
          {
            inlineData: {
              mimeType: "image/jpeg",
              data: base64Image
            }
          }
        ]
      }
    ]
  };

  try {
    // Send Request to Gemini API
    // const response = await axios.post(GEMINI_API_URL, requestBody, {
    //   headers: { "Content-Type": "application/json" }
    // });

    // if (!response.data || !response.data.candidates || response.data.candidates.length === 0) {
    //   throw new Error("No response from Gemini AI");
    // }

    // Extract JSON response
    // const extractedText = response.data.candidates[0].content.parts[0].text;
    // const extractedData = JSON.parse(extractedText.split(/```json|```/)[1]);

    const extractedData =
    {
      "merchantName": "BreadTalk",
      "datetime": "10:05:19 16:32:47",
      "items": [
        {
          "name": "Bread Butter Pudding",
          "price": 11500,
          "total": 11500
        },
        {
          "name": "Cream Bruille",
          "price": 14000,
          "total": 14000
        },
        {
          "name": "Choco Croissant",
          "price": 10500,
          "total": 10500
        },
        {
          "name": "Bank Of Chocolat",
          "price": 7500,
          "total": 7500
        }
      ],
      "totalPrice": 43500,
      "tax": 0
    }
    return extractedData; // ✅ Properly returning the extracted data

  } catch (error) {
    console.error("Error extracting invoice data:", error.response ? error.response.data : error.message);
    return null; // ✅ Return `null` instead of undefined on failure
  }
}
