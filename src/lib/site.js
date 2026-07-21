// Глобальные константы сайта для SEO (canonical, sitemap, robots, OG, JSON-LD).
// Домен берём из env; фолбэк — прод-адрес, чтобы билд не падал без переменной.
// Задать на проде/локально: NEXT_PUBLIC_SITE_URL=https://mura.shakarim.kz

export const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://mura.shakarim.kz"
).replace(/\/+$/, "");

export const SITE_NAME = "Shakarim";

// Абсолютный URL из относительного пути ("/works" -> "https://.../works").
export function absoluteUrl(path = "") {
  return `${SITE_URL}${path.startsWith("/") ? "" : "/"}${path}`;
}

// OG-локаль по коду языка сайта.
export const OG_LOCALE = { kk: "kk_KZ", ru: "ru_RU", en: "en_US" };

// SEO-заголовок и описание сайта по языкам (для корневого layout / OG).
export const SITE_SEO = {
  kk: {
    title: "Шәкәрім Құдайбердіұлы — өмірі, шығармалары және мұрасы",
    description:
      "Ақын, философ әрі аудармашы Шәкәрім Құдайбердіұлы туралы сандық жинақ: ғұмырнамасы, шығармалары, қолжазба архиві, шәкәрімтану еңбектері мен медиа.",
  },
  ru: {
    title: "Шакарим Кудайбердиев — жизнь, произведения и наследие",
    description:
      "Цифровое собрание о поэте, философе и переводчике Шакариме Кудайбердиеве: биография, произведения, архив рукописей, шакаримоведение и медиа.",
  },
  en: {
    title: "Shakarim Kudaiberdiev — life, works and legacy",
    description:
      "A digital collection about the Kazakh poet, philosopher and translator Shakarim Kudaiberdiev: biography, works, manuscript archive, Shakarim studies and media.",
  },
};
