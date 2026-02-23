import { NextResponse } from "next/server";
import { enquirySchema } from "@/lib/enquiry";
import { getSupabaseServerClient } from "@/lib/supabase";

export async function POST(request: Request) {
  try {
    const payload = await request.json();
    const validated = enquirySchema.parse(payload);

    const supabase = getSupabaseServerClient();
    if (!supabase) {
      return NextResponse.json(
        {
          ok: true,
          warning:
            "Supabase server key missing. Enquiry accepted in demo mode but not persisted.",
        },
        { status: 200 },
      );
    }

    const { error } = await supabase.from("enquiries").insert({
      customer_name: validated.customerName,
      phone: validated.phone,
      city: validated.city,
      notes: validated.notes || null,
      items_json: validated.items,
    });

    if (error) {
      return NextResponse.json({ ok: false, error: error.message }, { status: 500 });
    }

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid request payload." }, { status: 400 });
  }
}
