import type { Route } from "./+types/about";
import Layout from "../components/Layout";
import HeroBanner from "../components/HeroBanner";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "About - Luton Town Islamic Center" },
    { name: "description", content: "Learn about Luton Town Islamic Center's history, mission, and services" },
  ];
}

export default function About() {
  return (
    <Layout>
      <HeroBanner title="About Us" showCarousel={false} showNotifications={false} height="h-[20vh] md:h-[20vh]" />
      <main className="container mx-auto px-8 py-16">
        <div className="grid md:grid-cols-2 gap-8">
          <div className="bg-white rounded-2xl p-8 shadow-sm hover:shadow-md transition-shadow">
            <h2 className="text-2xl font-semibold text-emerald-800 mb-6">Our Mission</h2>
            <div className="prose prose-emerald">
              <p className="text-gray-700">
              Our mission is to spread the authentic teachings of Islam as conveyed by the final
                Messenger of Allah, Muhammad (peace and blessings be upon him).
                As part of this mission, we rely solely on evidence from the Quran and authentic Hadith,
                as verified by scholars of Hadith, while excluding weak and fabricated narrations.
                Furthermore, all proofs are understood in accordance with the interpretations of the
                Prophet’s companions, the scholars of the first three generations, and those who
                followed their correct beliefs and methodology.
                With this mission, we extend to you the call of all the messengers and prophets:
                <strong>&quot;Worship Allah alone and do not associate any partners with Him.&quot;</strong>
              </p>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-8 shadow-sm hover:shadow-md transition-shadow">
            <h2 className="text-2xl font-semibold text-emerald-800 mb-6">Our Vision</h2>
            <div className="prose prose-emerald">
              <p className="text-gray-700">
                To foster a vibrant Muslim community that upholds Islamic values according to the teachings of the Quran and Sunnah while actively 
                contributing to the broader society through education, charity, and community service.
              </p>
            </div>
          </div>
        </div>
      </main>
    </Layout>
  );
} 