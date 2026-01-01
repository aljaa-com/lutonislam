import type { Route } from "./+types/home";
import Layout from "../components/Layout";
import PrayerTimes from "~/components/PrayerTimes";
import HeroBanner from "../components/HeroBanner";
import AnnouncementCard from "../components/AnnouncementCard";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Luton Town Islamic Center" },
    { name: "description", content: "Welcome to Luton Town Islamic Center - A place of worship, learning and community" },
  ];
}

export default function Home() {
  return (
    <Layout>
      <HeroBanner 
        title="Welcome to Luton Town Islamic Center" 
        showCarousel={true}
      />

      {/* Content Sections */}
      <main className="container mx-auto px-8 py-16">
        <div className="grid md:grid-cols-3 gap-8">     

          {/* Prayer Times Component */}
          <PrayerTimes />

          {/* Upcoming Events */}          
          <div className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow">            
            <h2 className="text-2xl font-semibold text-emerald-800 mb-4">Upcoming Events</h2>
            <div className="space-y-4">
            <div className="border-l-4 border-emerald-500 pl-4 text-emerald-800">
              Coming Soon
              </div>
            </div>
            {/*
            <div className="space-y-4">
              <div className="border-l-4 border-emerald-500 pl-4 text-emerald-800">
                <p className="font-medium">Weekly Qur'an Class</p>
                <p className="text-gray-600">Every Saturday, 10:00 AM</p>
              </div>
              <div className="border-l-4 border-emerald-500 pl-4 text-emerald-800">
                <p className="font-medium">Learn Arabic</p>
                <p className="text-gray-600">Every Sunday, 2:00 PM</p>
              </div>
            </div>
            */}          
          </div>              

          {/* New Interactive Announcements */}
          <AnnouncementCard />
        </div>
      </main>
    </Layout>
  );
}
