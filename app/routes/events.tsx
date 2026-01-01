import { useState } from "react";
import type { Route } from "./+types/events";
import Layout from "../components/Layout";
import HeroBanner from "../components/HeroBanner";

interface Event {
  title: string;
  date: string;
  time: string;
  description: string;
  location: string;
  category: string;
  image?: string;
}

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Events - Luton Town Islamic Center" },
    { name: "description", content: "Upcoming events and programs at Luton Town Islamic Center" },
  ];
}

export default function Events() {
  const [activeTab, setActiveTab] = useState<'upcoming' | 'past'>('upcoming');

  const upcomingEvents: Event[] = [
    /*
    {
      title: "Ramadhan Preparation Workshop",
      date: "March 1, 2024",
      time: "6:30 PM",
      description: "Get ready for Ramadhan with our comprehensive preparation workshop.",
      location: "Main Prayer Hall",
      category: "Workshop",
    },
    {
      title: "Community Iftar",
      date: "March 15, 2024",
      time: "Sunset",
      description: "Join us for a community iftar during Ramadhan.",
      location: "Community Hall",
      category: "Community",
    },
    {
      title: "Eid Prayer",
      date: "April 10, 2024",
      time: "7:30 AM",
      description: "Eid-ul-Fitr prayer and celebration.",
      location: "Main Prayer Hall",
      category: "Prayer",
    },
    */
  ];

  const pastEvents: Event[] = [
    {
      title: "Building a Community",
      date: "July 19, 2023",
      time: "7:00 PM",
      description: "The conference topic is Building a Community and it’s Benefits.",
      location: "Main Prayer Hall",
      category: "Conference",
    },
    {
      title: "Winter Islamic Conference",
      date: "December 15, 2023",
      time: "10:00 AM",
      description: "Annual winter conference featuring guest speakers and workshops.",
      location: "Conference Hall",
      category: "Conference",
    },
    {
      title: "Charity Drive",
      date: "January 5, 2024",
      time: "2:00 PM",
      description: "Community charity drive for local causes.",
      location: "Community Center",
      category: "Charity",
    },
  ];

  const EventCard = ({ event, isPast }: { event: Event, isPast: boolean }) => (
    <div className={`bg-white rounded-2xl p-6 shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-1
      ${isPast ? 'opacity-80' : ''}`}>
      <div className="flex justify-between items-start mb-4">
        <h3 className="text-xl font-semibold text-emerald-800">{event.title}</h3>
        <span className={`px-3 py-1 rounded-full text-sm
          ${isPast 
            ? 'bg-gray-100 text-gray-800' 
            : 'bg-emerald-100 text-emerald-800'}`}>
          {event.category}
        </span>
      </div>
      
      <div className="space-y-3 text-gray-600">
        <p className="flex items-center">
          <svg className={`w-5 h-5 mr-2 ${isPast ? 'text-gray-600' : 'text-emerald-600'}`} 
               fill="none" 
               stroke="currentColor" 
               viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                  d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
          {event.date} at {event.time}
        </p>
        <p className="flex items-center">
          <svg className={`w-5 h-5 mr-2 ${isPast ? 'text-gray-600' : 'text-emerald-600'}`} 
               fill="none" 
               stroke="currentColor" 
               viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                  d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                  d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
          {event.location}
        </p>
        <p className="text-sm mt-2">{event.description}</p>
      </div>

      {!isPast && (
        <button 
          className="mt-4 w-full py-2 px-4 border-2 border-emerald-600 text-emerald-600 rounded-lg
                   hover:bg-emerald-600 hover:text-white transition-colors duration-300"
        >
          Register Now
        </button>
      )}
    </div>
  );

  return (
    <Layout>
      <HeroBanner title="Events & Programs" showNotifications={false} height="h-[20vh] md:h-[20vh]"/>
      
      <main className="container mx-auto px-8 py-16">
        {/* Tab Navigation */}
        <div className="flex space-x-4 mb-8">
          <button
            onClick={() => {
              setActiveTab('upcoming');
            }}
            className={`px-6 py-2 rounded-lg font-semibold transition-colors
              ${activeTab === 'upcoming' 
                ? 'bg-emerald-600 text-white' 
                : 'bg-emerald-100 text-emerald-800 hover:bg-emerald-200'}`}
          >
            Upcoming Events ({upcomingEvents.length})
          </button>
          <button
            onClick={() => {
              setActiveTab('past');
            }}
            className={`px-6 py-2 rounded-lg font-semibold transition-colors
              ${activeTab === 'past' 
                ? 'bg-emerald-600 text-white' 
                : 'bg-emerald-100 text-emerald-800 hover:bg-emerald-200'}`}
          >
            Past Events ({pastEvents.length})
          </button>
        </div>

        {/* Events Grid with explicit conditional rendering */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {activeTab === 'upcoming' && (
            <>
              {upcomingEvents.map((event, index) => (
                <EventCard 
                  key={`upcoming-${index}`} 
                  event={event} 
                  isPast={false} 
                />
              ))}
            </>
          )}
          {activeTab === 'past' && (
            <>
              {pastEvents.map((event, index) => (
                <EventCard 
                  key={`past-${index}`} 
                  event={event} 
                  isPast={true} 
                />
              ))}
            </>
          )}
        </div>

        {/* Calendar Download Section */}
        <div className="mt-12 bg-emerald-50 rounded-2xl p-8 text-center">
          <h2 className="text-2xl font-semibold text-emerald-800 mb-4">
            {activeTab === 'upcoming' ? 'Stay Updated' : 'Past Events Archive'}
          </h2>
          <p className="text-emerald-700 mb-6">
            {activeTab === 'upcoming' 
              ? 'Download our events calendar to your device and never miss an important event.'
              : 'Browse through our past events and activities.'}
          </p>
          {activeTab === 'upcoming' && (
            <button className="bg-emerald-600 text-white px-6 py-3 rounded-lg hover:bg-emerald-700 transition-colors">
              Download Calendar
            </button>
          )}
        </div>
      </main>
    </Layout>
  );
} 