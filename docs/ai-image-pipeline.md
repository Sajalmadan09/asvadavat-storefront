# AI Image Pipeline (Gemini)

## Goal
Generate representative placeholder images for products until real photography is available.

## Steps
1. Generate product prompts:
   - `npm run images:prompts`
   - Output: `data/ai/image-prompts.json`
2. Use Gemini image generation (Gemini API, Bana AI, or Studio UI) with each prompt.
3. Review generated images manually:
   - Remove misleading visuals
   - Ensure labels are generic (no fake certification claims)
4. Upload approved assets to Supabase Storage bucket: `product-images`.
5. Insert metadata into `product_images` table:
   - `product_id`
   - `image_url`
   - `alt_text`
   - `source = 'ai'`
   - `prompt_version = 'v1'`
   - `is_primary`

## Prompt Guardrails
- Keep brand-safe packaging style
- Avoid fake logos and medical claims
- Avoid text-heavy labels unless manually verified
- Prefer neutral backgrounds and accurate color cues

## Replacement Strategy
- Mark AI images as temporary
- Replace with real photography as soon as available
- Keep source and prompt version for auditability
