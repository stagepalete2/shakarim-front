import { Shakarimtanu } from "@/screens/shakarimtanu/shakarimtanu";
import { fetchShakarimtanu } from "@/lib/endpoints/pages";

export const metadata = {
  title: "Шәкәрімтану — Shakarim University",
  description:
    "Шәкәрім Құдайбердіұлының рухани және ғылыми мұрасын зерттейтін ғылыми бағыт.",
};

export default async function ShakarimtanuPage() {
  const data = await fetchShakarimtanu();
  return <Shakarimtanu data={data} />;
}
