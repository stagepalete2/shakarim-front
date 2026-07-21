// Готовые объекты Schema.org (JSON-LD) для страниц.
// Факты о Шәкәріме проверены по Wikidata Q4244342 и Wikipedia (kk/ru/en):
// 1858-07-11 — 1931-10-02, казахский поэт, философ, историк, переводчик,
// композитор; ученик и племянник Абая.
import { SITE_URL, SITE_NAME, absoluteUrl } from "./site";

// Текст для description/keywords: снять HTML-теги, схлопнуть пробелы, обрезать.
// Возвращает undefined для пустого входа — чтобы не класть пустое поле в схему.
export function clean(input, max = 200) {
  if (!input) return undefined;
  const text = String(input)
    .replace(/<[^>]*>/g, " ")
    .replace(/&[a-z]+;/gi, " ")
    .replace(/\s+/g, " ")
    .trim();
  if (!text) return undefined;
  return text.length > max ? `${text.slice(0, max - 1).trimEnd()}…` : text;
}

const shakarimNode = (lang) => ({
  "@type": "Person",
  name: PERSON_NAME[lang] ?? PERSON_NAME.kk,
});

const websiteNode = { "@type": "WebSite", name: SITE_NAME, url: SITE_URL };

const PERSON_NAME = {
  kk: "Шәкәрім Құдайбердіұлы",
  ru: "Шакарим Кудайбердиев",
  en: "Shakarim Qudayberdiuli",
};

const PERSON_JOB = {
  kk: "Ақын, философ, аудармашы, композитор",
  ru: "Поэт, философ, переводчик, композитор",
  en: "Poet, philosopher, translator, composer",
};

const PERSON_DESC = {
  kk: "Қазақ ақыны, философ, тарихшы, аудармашы әрі композитор (1858–1931). Абайдың шәкірті және немере інісі.",
  ru: "Казахский поэт, философ, историк, переводчик и композитор (1858–1931). Ученик и племянник Абая.",
  en: "Kazakh poet, philosopher, historian, translator and composer (1858–1931). A disciple and nephew of Abai.",
};

// Основной субъект сайта — Шәкәрім Құдайбердіұлы.
export function shakarimPersonSchema(lang = "kk") {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    name: PERSON_NAME[lang] ?? PERSON_NAME.kk,
    alternateName: [PERSON_NAME.kk, PERSON_NAME.ru, PERSON_NAME.en],
    birthDate: "1858-07-11",
    deathDate: "1931-10-02",
    jobTitle: PERSON_JOB[lang] ?? PERSON_JOB.kk,
    description: PERSON_DESC[lang] ?? PERSON_DESC.kk,
    url: `${SITE_URL}/biography`,
    sameAs: [
      "https://kk.wikipedia.org/wiki/Шәкәрім_Құдайбердіұлы",
      "https://ru.wikipedia.org/wiki/Кудайбердиев,_Шакарим",
      "https://en.wikipedia.org/wiki/Shakarim_Qudayberdiuli",
      "https://www.wikidata.org/wiki/Q4244342",
    ],
  };
}

// Хлебные крошки. items: [{ name, path }] от корня к текущей странице.
export function breadcrumbSchema(items) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((it, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: it.name,
      item: absoluteUrl(it.path),
    })),
  };
}

// Произведение Шәкәріма (/works/{slug}). Автор — Шәкәрім.
export function creativeWorkSchema(work, lang = "kk") {
  const description = clean(work.description ?? work.excerpt);
  return {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name: work.title,
    ...(description && { description }),
    ...(work.cover && { image: work.cover }),
    ...(work.year && { dateCreated: String(work.year) }),
    ...(work.category && { genre: work.category }),
    inLanguage: lang,
    author: shakarimNode(lang),
    url: absoluteUrl(`/works/${work.slug}`),
    isPartOf: websiteNode,
  };
}

// Книга/издание (/books/{slug}).
export function bookSchema(book, lang = "kk") {
  const description = clean(book.description);
  return {
    "@context": "https://schema.org",
    "@type": "Book",
    name: book.title,
    ...(book.author && { author: { "@type": "Person", name: book.author } }),
    ...(description && { description }),
    ...(book.cover && { image: book.cover }),
    ...(book.year && { datePublished: String(book.year) }),
    inLanguage: lang,
    url: absoluteUrl(`/books/${book.slug}`),
    isPartOf: websiteNode,
  };
}

// Автор/исследователь (/authors/{slug}) — обычная Person (не Шәкәрім).
export function authorPersonSchema(author) {
  const description = clean(author.fullBio ?? author.bio);
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    name: author.name,
    ...(author.role && { jobTitle: author.role }),
    ...(description && { description }),
    ...(author.photo && { image: author.photo }),
    url: absoluteUrl(`/authors/${author.slug}`),
  };
}

// Статья биографии (/biography/{slug}, питается из /articles/).
export function articleSchema(article, lang = "kk") {
  const tags = Array.isArray(article.tags) ? article.tags.filter(Boolean) : [];
  const url = absoluteUrl(`/biography/${article.slug}`);
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: article.title,
    ...(article.date && { datePublished: article.date }),
    ...(article.author && { author: { "@type": "Person", name: article.author } }),
    ...(article.cover && { image: article.cover }),
    ...(tags.length && { keywords: tags.join(", ") }),
    inLanguage: lang,
    about: shakarimNode(lang),
    mainEntityOfPage: url,
    url,
    publisher: { "@type": "Organization", name: SITE_NAME },
  };
}

// Архивная запись (/archive/{slug}): рукопись/фото/письмо и т.д.
export function archiveSchema(item, lang = "kk") {
  const description = clean(item.description);
  return {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name: item.title,
    ...(description && { description }),
    ...(item.cover && { image: item.cover }),
    ...(item.year && { dateCreated: String(item.year) }),
    ...(item.location && {
      locationCreated: { "@type": "Place", name: item.location },
    }),
    inLanguage: lang,
    about: shakarimNode(lang),
    url: absoluteUrl(`/archive/${item.slug}`),
    isPartOf: websiteNode,
  };
}
