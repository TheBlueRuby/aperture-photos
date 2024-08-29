export default function supabaseLoader({ src, width, quality }) {
  const url = new URL(`${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/images/${src}`)
  url.searchParams.set('width', width.toString())
  url.searchParams.set('quality', (quality || 75).toString())
  return url.href;
}
