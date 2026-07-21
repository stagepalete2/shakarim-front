import { Shakarimtanu } from "@/screens/shakarimtanu/shakarimtanu";
import { fetchShakarimtanu } from "@/lib/endpoints/pages";

const title = "Шәкәрімтану";
const description =
  "Шәкәрім Құдайбердіұлының рухани және ғылыми мұрасын зерттейтін ғылыми бағыт.";

export async function generateMetadata({ params }) {
  const { lang } = await params;
  const path = `/${lang}/shakarimtanu`;
  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: { title, description, url: path },
  };
}

export default async function ShakarimtanuPage() {
  const data = await fetchShakarimtanu();
  return <Shakarimtanu data={data} />;
}
