import { Shakarimtanu } from "@/screens/shakarimtanu/shakarimtanu";
import { fetchShakarimtanu } from "@/lib/endpoints/pages";

const title = "Шәкәрімтану";
const description =
  "Шәкәрім Құдайбердіұлының рухани және ғылыми мұрасын зерттейтін ғылыми бағыт.";

export const metadata = {
  title,
  description,
  alternates: { canonical: "/shakarimtanu" },
  openGraph: { title, description, url: "/shakarimtanu" },
};

export default async function ShakarimtanuPage() {
  const data = await fetchShakarimtanu();
  return <Shakarimtanu data={data} />;
}
