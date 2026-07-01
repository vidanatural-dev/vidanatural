import { sanitizeProductHtml } from '@/lib/productHtml';

export function StoreProductDescription({ html }: { html: string }) {
  const safe = sanitizeProductHtml(html);

  return (
    <section className="mt-10 border-t border-line pt-10">
      <h2 className="font-display text-h2 text-ink">Descripción</h2>
      <div
        className="store-description prose-materia mt-5"
        dangerouslySetInnerHTML={{ __html: safe }}
      />
    </section>
  );
}
