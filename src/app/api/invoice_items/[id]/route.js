import { supabase } from "@/lib/supabase";

export async function GET(req, { params }) {
  const { id } = params;

  const { data, error } = await supabase
    .from("invoice_items")
    .select("*")
    .eq("invoice_id", id);

  if (error) {
    return new Response(JSON.stringify({ error: error.message }), { status: 500 });
  }

  return new Response(JSON.stringify(data), { status: 200 });
}
