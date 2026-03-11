import type { WriterBook } from "@/data/writer-books";

const SITE_URL = "https://surimstudio.com";

function getBookUrl(isbn: string) {
  return `${SITE_URL}/writer/books/${isbn}`;
}

function getOffers(book: WriterBook) {
  const links = [
    { name: "Official", url: book.officialLink },
    { name: "Kyobo", url: book.purchaseLinks.kyobo },
    { name: "Aladin", url: book.purchaseLinks.aladin },
    { name: "YES24", url: book.purchaseLinks.yes24 },
  ].filter((item): item is { name: string; url: string } => Boolean(item.url));

  if (links.length === 0) {
    return {
      "@type": "Offer",
      price: book.price,
      priceCurrency: "KRW",
      availability: "https://schema.org/InStock",
    };
  }

  return links.map((item) => ({
    "@type": "Offer",
    price: book.price,
    priceCurrency: "KRW",
    availability: "https://schema.org/InStock",
    url: item.url,
    seller: {
      "@type": "Organization",
      name: item.name,
    },
  }));
}

export default function BookJsonLd({ book }: { book: WriterBook }) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Book",
    name: book.title,
    url: getBookUrl(book.isbn),
    author: book.author.split(",").map((name) => ({
      "@type": "Person",
      name: name.trim(),
    })),
    isbn: book.isbn,
    publisher: {
      "@type": "Organization",
      name: book.publisher,
    },
    datePublished: book.publishedAt,
    bookFormat: "https://schema.org/Paperback",
    offers: getOffers(book),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}
