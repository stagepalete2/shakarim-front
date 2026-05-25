// Единый источник статей для биографической страницы и /biography/[slug].
// body — это HTML из CKEditor; на проде придёт с бэкенда.

const SAMPLE_BODY = `
<p>Lead-параграф со вступлением. Чуть длиннее обычной строки, чтобы дать читателю краткое введение в тему статьи и понять, о чём пойдёт речь дальше.</p>
<h2>Первая часть</h2>
<p>Основной текст с разбором конкретного аспекта. Здесь могут встречаться <a href="#">ссылки</a>, <strong>выделения</strong> и <em>курсив</em> — всё, что обычно даёт CKEditor.</p>
<blockquote><p>Цитата исследователя или самого Шакарима, выделенная как блок.</p></blockquote>
<h3>Подраздел</h3>
<p>Ещё немного контекста. Иногда нужно перечислить:</p>
<ul>
  <li>первый пункт списка;</li>
  <li>второй пункт;</li>
  <li>третий пункт.</li>
</ul>
<h2>Вторая часть</h2>
<p>Развитие темы. Здесь авторская позиция и связь с современностью.</p>
<p>Заключительный абзац — короткий вывод, к которому пришёл автор.</p>
`;

const USH_ANYQ_BODY = `
<p>«Үш анық» — ключевое философское сочинение Шакарима Кудайбердиева, в котором поэт-мыслитель сформулировал три истины, лежащие, по его мнению, в основе человеческой природы и общественного порядка.</p>

<h2>Три понятия</h2>
<p>В центре учения — три категории: <strong>ынсап</strong> (совесть), <strong>ұят</strong> (стыд) и <strong>әділет</strong> (справедливость). Каждая из них — не просто моральная норма, а онтологическое основание, без которого невозможно ни внутреннее единство личности, ни справедливое устройство общества.</p>

<blockquote><p>«Ынсап, ұят, әділет — иманның көзі.»</p></blockquote>

<h2>Контекст эпохи</h2>
<p>Сочинение создано в 1920-х годах, в период уединения Шакарима в горах Чингизтау. Это время, когда автор отдаляется от шумной политической жизни и сосредотачивается на главных метафизических вопросах.</p>

<h3>Источники</h3>
<ul>
  <li>восточная философская традиция (суфизм, классическая персидская поэзия);</li>
  <li>казахская акынская и бийская этика;</li>
  <li>русская и европейская мысль конца XIX века.</li>
</ul>

<h2>Значение для современности</h2>
<p>Учение «Үш анық» остаётся актуальным как нравственный ориентир. В эпоху, когда категории совести и стыда часто кажутся устаревшими, попытка Шакарима опереть на них всю социальную ткань выглядит почти полемически.</p>

<p>Именно поэтому «Үш анық» продолжает изучаться — и как памятник эпохи, и как живое философское высказывание.</p>
`;

export const ARTICLES = [
  {
    id: 1,
    slug: "ush-anyq-three-truths",
    title: "«Үш анық»: три истины Шакарима и их философский смысл",
    tags: ["Философия", "Үш анық"],
    author: "А. Каирбекова",
    date: "2026-04-22",
    cover: "/images/articles/ush-anyq.jpg",
    body: USH_ANYQ_BODY,
  },
  {
    id: 2,
    slug: "abay-shakarim-family",
    title: "Семейные узы: как Абай повлиял на становление Шакарима",
    tags: ["Биография", "Абай"],
    author: "Б. Серикулы",
    date: "2026-04-10",
    cover: "/images/articles/abay-shakarim.jpg",
    body: SAMPLE_BODY,
  },
  {
    id: 3,
    slug: "hajj-1898",
    title: "Хадж 1898 года: путешествие, изменившее мысль",
    tags: ["История", "Путешествия"],
    author: "А. Сарсенбаев",
    date: "2026-03-28",
    cover: "/images/articles/hajj.jpg",
    body: SAMPLE_BODY,
  },
  {
    id: 4,
    slug: "poetry-school-seclusion",
    title: "Жыр Шәкәрім: поэтическая школа уединения",
    tags: ["Поэзия", "Литература"],
    author: "Г. Бакитова",
    date: "2026-03-14",
    cover: "/images/articles/poetry.jpg",
    body: SAMPLE_BODY,
  },
  {
    id: 5,
    slug: "musical-heritage",
    title: "Музыкальное наследие: песни и кюи Шакарима",
    tags: ["Музыка", "Наследие"],
    author: "З. Жумабекова",
    date: "2026-02-26",
    cover: "/images/articles/music.jpg",
    body: SAMPLE_BODY,
  },
  {
    id: 6,
    slug: "qalqaman-mamyr-tragedy",
    title: "«Қалқаман — Мамыр»: трагедия любви и чести",
    tags: ["Литература", "Поэма"],
    author: "Н. Сапарбаев",
    date: "2026-02-11",
    cover: "/images/articles/qalqaman.jpg",
    body: SAMPLE_BODY,
  },
  {
    id: 7,
    slug: "rehabilitation-1988",
    title: "Реабилитация 1988: возвращение запрещённого имени",
    tags: ["История", "XX век"],
    author: "М. Алимова",
    date: "2026-01-30",
    cover: "/images/articles/rehabilitation.jpg",
    body: SAMPLE_BODY,
  },
  {
    id: 8,
    slug: "shakarim-jadidism",
    title: "Шакарим и джадидизм: реформаторская мысль в степи",
    tags: ["Философия", "Эпоха"],
    author: "Д. Турсунов",
    date: "2026-01-17",
    cover: "/images/articles/jadid.jpg",
    body: SAMPLE_BODY,
  },
  {
    id: 9,
    slug: "genealogy-how-to-read",
    title: "«Родословная»: как читать главный исторический труд Шакарима",
    tags: ["История", "Книги"],
    author: "А. Каирбекова",
    date: "2025-12-22",
    cover: "/images/articles/genealogy.jpg",
    body: SAMPLE_BODY,
  },
];

// Хелперы — мокаем то, что потом будет приходить с бэкенда.

export function articleHref(slug) {
  return `/biography/${slug}`;
}

export function getArticleBySlug(slug) {
  return ARTICLES.find((a) => a.slug === slug);
}

export function getRelatedArticles(slug, limit = 3) {
  const current = getArticleBySlug(slug);
  if (!current) return [];
  const currentTags = new Set(current.tags ?? []);
  return ARTICLES.filter((a) => a.slug !== slug)
    .filter((a) => a.tags?.some((t) => currentTags.has(t)))
    .slice(0, limit);
}
