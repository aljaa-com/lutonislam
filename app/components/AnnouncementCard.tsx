import { useState } from 'react';

interface Announcement {
  title: string;
  date: string;
  description: string;
}

export default function AnnouncementCard() {
  const [activeIndex, setActiveIndex] = useState(0);
  
  const announcements: Announcement[] = [
    {
      title: "Friday Prayer",
      date: "Every Friday",
      description: "Join us for Jumu'ah khutbah at 1 PM."
    },
    {
      title: "Learn Arabic",
      date: "Weekly",
      description: "Join us for Arabic classes for all age groups."
    },
    {
      title: "Community Iftar",
      date: "Coming Soon",
      description: "Join us for community iftars during Ramadhan."
    }
  ];

  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-md transition-all">
      <h2 className="text-2xl font-semibold text-emerald-800 mb-4">Announcements</h2>
      
      <div className="space-y-4">
        {announcements.map((announcement, index) => (
          <div
            key={announcement.title}
            className={`cursor-pointer p-4 rounded-lg transition-all duration-300
                       ${activeIndex === index 
                         ? 'bg-emerald-50 border-l-4 border-emerald-500' 
                         : 'hover:bg-gray-50'}`}
            onClick={() => setActiveIndex(index)}
          >
            <div className="flex justify-between items-center">
              <h3 className="font-medium text-emerald-900">{announcement.title}</h3>
              <span className="text-sm text-emerald-600">{announcement.date}</span>
            </div>
            
            <div className={`mt-2 text-gray-600 transition-all duration-300
                            ${activeIndex === index ? 'max-h-20 opacity-100' : 'max-h-0 opacity-0 overflow-hidden'}`}>
              {announcement.description}
            </div>
          </div>
        ))}
      </div>

      {/* Navigation Dots */}
      <div className="flex justify-center gap-2 mt-4">
        {announcements.map((_, index) => (
          <button
            key={index}
            className={`w-2 h-2 rounded-full transition-all duration-300
                       ${activeIndex === index ? 'bg-emerald-500 w-4' : 'bg-emerald-200'}`}
            onClick={() => setActiveIndex(index)}
          />
        ))}
      </div>
    </div>
  );
} 