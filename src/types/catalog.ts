export type CategoryKey = "tea" | "spices";

export type PackSizeLabel =
  | "10g"
  | "30g"
  | "50g"
  | "100g"
  | "200g"
  | "250g"
  | "500g";

export type ProductPrice = {
  packSize: PackSizeLabel;
  netPriceInr: number;
};

export type Product = {
  id: string;
  slug: string;
  category: CategoryKey;
  nameEn: string;
  nameHi?: string;
  description: string;
  tags: string[];
  prices: ProductPrice[];
  imagePrompt: string;
  ingredients?: string[];
};

export type EnquiryItem = {
  productId: string;
  productSlug: string;
  productName: string;
  packSize: PackSizeLabel;
  netPriceInr: number;
  qty: number;
};

export type EnquiryPayload = {
  customerName: string;
  phone: string;
  city: string;
  notes?: string;
  items: EnquiryItem[];
};
