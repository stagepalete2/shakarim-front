import { ImageResponse } from "next/og";

// OG-картинка по умолчанию (1200×630) для главной и разделов без своей обложки.
// Next авто-подхватывает файл opengraph-image в app/ и добавляет og:image/twitter:image.
// Детальные страницы задают свою openGraph.images (обложку записи) — она перекрывает эту.

export const alt = "Шәкәрім Құдайбердіұлы — өмірі, шығармалары және мұрасы";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "72px",
          background: "linear-gradient(135deg, #008B8A 0%, #04635f 100%)",
          color: "#ffffff",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", fontSize: 30, letterSpacing: 2, opacity: 0.9 }}>
          MURA.SHAKARIM.KZ
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ display: "flex", fontSize: 88, fontWeight: 700, lineHeight: 1.05 }}>
            Шәкәрім Құдайбердіұлы
          </div>
          <div style={{ display: "flex", fontSize: 38, marginTop: 24, opacity: 0.92 }}>
            1858–1931 · ақын, философ, аудармашы
          </div>
        </div>

        <div style={{ display: "flex", fontSize: 30, opacity: 0.85 }}>
          Өмірі · Шығармалары · Архив · Шәкәрімтану
        </div>
      </div>
    ),
    { ...size },
  );
}
