import { supabase } from "@/lib/supabase";

export async function GET() {
  const { data, error } = await supabase.from("invoices").select("*");

  if (error) {
    return new Response(JSON.stringify({ error: error.message }), { status: 500 });
  }

  return new Response(JSON.stringify(data), { status: 200 });
}

export async function POST(req) {
    const body = await req.json();
    const { data, error } = await supabase.from("invoices").insert([body]);
  
    if (error) {
      return new Response(JSON.stringify({ error: error.message }), { status: 500 });
    }
  
    return new Response(JSON.stringify(data), { status: 201 });
  }
  