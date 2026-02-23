const productImageMap: Record<string, string> = {
  "black-tea-ctc": "/product-images/black-tea-ctc.png",
  "black-tea-premium-ctc": "/product-images/black-tea-premium-ctc.png",
  "organic-green-tea-orthodox-leaves": "/product-images/organic-green-tea-orthodox-leaves.png",
  "black-tea-orthodox-leaves": "/product-images/black-tea-orthodox-leaves.png",
  "dry-mango-powder-amchur": "/product-images/dry-mango-powder-amchur.png",
  "black-pepper-powder": "/product-images/black-pepper-powder.png",
  "black-pepper-whole": "/product-images/black-pepper-whole.png",
  "chana-masala": "/product-images/chana-masala.png",
  "coriander-powder": "/product-images/coriander-powder.png",
  "mixed-spices-powder-garam-masala": "/product-images/mixed-spices-powder-garam-masala.png",
  "turmeric-powder": "/product-images/turmeric-powder.png",
  "cumin-powder": "/product-images/cumin-powder.png",
  "cumin-whole": "/product-images/cumin-whole.png",
  "red-chilli-powder": "/product-images/red-chilli-powder.png",
  "deghi-mirch-powder": "/product-images/deghi-mirch-powder.png",
  "kutti-red-chilli-powder": "/product-images/kutti-red-chilli-powder.png",
  "ginger-powder": "/product-images/ginger-powder.png",
  "carom-seeds-ajwain": "/product-images/carom-seeds-ajwain.png",
  "asafoetida-hing": "/product-images/asafoetida-hing.png",
  "chai-masala": "/product-images/chai-masala.png",
  "clove-laung": "/product-images/clove-laung.png",
  "cardamom-elaichi": "/product-images/cardamom-elaichi.png",
  "cinnamon-dalchini": "/product-images/cinnamon-dalchini.png",
  "fenugreek-seeds-kasuri-methi": "/product-images/fenugreek-seeds-kasuri-methi.png",
  "black-cardamom-moti-elaichi": "/product-images/black-cardamom-moti-elaichi.png",
  "fennel-saunf": "/product-images/fennel-saunf.png",
};

export function getProductImageBySlug(slug: string): string | null {
  return productImageMap[slug] ?? null;
}
