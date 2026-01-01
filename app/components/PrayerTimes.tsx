import { useState, useEffect } from 'react';
import { getTodayPrayerTimes } from "../data/ramadhanData";

interface PrayerItem {
  name: string;
  time: string;
  isNext: boolean;
}

export default function PrayerTimes() {
  const [prayerTimes, setPrayerTimes] = useState<PrayerItem[]>([]);
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    // Update current time every minute
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 60000);

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    // Calculate prayer times for the current day
    const calculatePrayerTimes = () => {
      // This is a simplified example - you would typically fetch this from an API
      // const times: PrayerTime[] = [
      //   { name: 'Fajr', time: '5:30 AM', isNext: false },
      //   { name: 'Sunrise', time: '7:15 AM', isNext: false },
      //   { name: 'Dhuhr', time: '1:30 PM', isNext: false },
      //   { name: 'Asr', time: '4:45 PM', isNext: false },
      //   { name: 'Maghrib', time: '7:15 PM', isNext: false },
      //   { name: 'Isha', time: '8:45 PM', isNext: false },
      // ];

      const todays_times = getTodayPrayerTimes();
      const times: PrayerItem[] = [
        { name: 'Fajr', time: todays_times?.suhoor || "N/A", isNext: false },
        { name: 'Sunrise', time: todays_times?.suhoor || "N/A", isNext: false },
        { name: 'Dhuhr', time: todays_times?.zuhr || "N/A", isNext: false },
        { name: 'Asr', time: todays_times?.asr || "N/A", isNext: false },
        { name: 'Maghrib', time: todays_times?.iftar || "N/A", isNext: false },
        { name: 'Isha', time: todays_times?.isha || "N/A", isNext: false },
      ];

      // Mark the next prayer time
      const now = currentTime.getHours() * 60 + currentTime.getMinutes();
      let nextPrayerFound = false;

      times.forEach(prayer => {
        const [hour, minute] = prayer.time.split(':');
        const ampm = prayer.time.split(' ')[1];
        let prayerHour = parseInt(hour);
        if (ampm === 'PM' && prayerHour !== 12) prayerHour += 12;
        const prayerMinutes = prayerHour * 60 + parseInt(minute);

        if (!nextPrayerFound && prayerMinutes > now) {
          prayer.isNext = true;
          nextPrayerFound = true;
        }
      });

      return times;
    };

    setPrayerTimes(calculatePrayerTimes());
  }, [currentTime]);

  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow">
      <h2 className="text-2xl font-semibold text-emerald-800 mb-4">Prayer Times (Luton)</h2>
      <div className="space-y-3">
        {prayerTimes.map((prayer) => (
          <div 
            key={prayer.name}
            className={`flex justify-between items-center p-2 rounded-lg transition-colors
              ${prayer.isNext ? 'bg-emerald-50 border-l-4 border-emerald-500' : ''}`}
          >
            <span className={`font-medium ${prayer.isNext ? 'text-emerald-800' : 'text-gray-700'}`}>
              {prayer.name}
            </span>
            <span className={prayer.isNext ? 'text-emerald-600 font-semibold' : 'text-gray-600'}>
              {prayer.time}
            </span>
          </div>
        ))}
      </div>
      <div className="mt-4 pt-4 border-t text-sm text-gray-500 text-center">
        Current time: {currentTime.toLocaleTimeString()}
      </div>
    </div>
  );
} 