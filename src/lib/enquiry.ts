import { z } from "zod";

const enquiryItemSchema = z.object({
  productId: z.string().min(1),
  productSlug: z.string().min(1),
  productName: z.string().min(1),
  packSize: z.string().min(1),
  netPriceInr: z.number().int().positive(),
  qty: z.number().int().positive().max(99),
});

export const enquirySchema = z.object({
  customerName: z.string().trim().min(2).max(80),
  phone: z.string().trim().min(8).max(20),
  city: z.string().trim().min(2).max(80),
  notes: z.string().trim().max(500).optional().or(z.literal("")),
  items: z.array(enquiryItemSchema).min(1),
});

export type EnquiryRequest = z.infer<typeof enquirySchema>;

export function formatWhatsappMessage(payload: EnquiryRequest): string {
  const header = `New enquiry from ${payload.customerName}`;
  const contact = `Phone: ${payload.phone}, City: ${payload.city}`;

  const lines = payload.items.map(
    (item, index) =>
      `${index + 1}. ${item.productName} (${item.packSize}) x ${item.qty} - Rs. ${
        item.netPriceInr
      } each`,
  );

  const notes = payload.notes?.trim() ? `Notes: ${payload.notes}` : "";
  return [header, contact, "Items:", ...lines, notes].filter(Boolean).join("\n");
}
