import { useState } from "react";
import Layout from "../components/Layout";
import HeroBanner from "../components/HeroBanner";
import { jsPDF } from "jspdf";
import autoTable from 'jspdf-autotable';
import { marchTimetable, ramadhanInfo, getTodayPrayerTimes, quranReadingSchedule } from "../data/ramadhanData";

// Add type declaration for autoTable
declare module 'jspdf' {
  interface jsPDF {
    autoTable: (options: any) => jsPDF;
  }
}

interface PrayerTime {
  hijriDate: string;
  day: string;
  date: number;
  suhoor: string;
  zuhr: string;
  asr: string;
  iftar: string;
  isha: string;
}

export default function Ramadhan() {
  const todayTimes = getTodayPrayerTimes();

  const handleDownloadPDF = () => {
    const doc = new jsPDF();
    
    // Add title
    doc.setFontSize(16);
    doc.text("LTICC Ramadhan 1446 (2025) Prayer Timetable (for Luton)", 14, 20);
    
    // Add the timetable
    doc.autoTable({
      head: [["Hijri", "Day", "Date", "Suhoor/Fajr", "Zuhr", "Asr", "Iftar/Maghrib", "Isha"]],
      body: marchTimetable.map(time => [
        time.hijriDate,
        time.day,
        time.date,
        time.suhoor,
        time.zuhr,
        time.asr,
        time.iftar,
        time.isha
      ]),
      startY: 30,
      styles: { fontSize: 8 },
      headStyles: { fillColor: [76, 175, 80] },
    });
    
    // Add footnote
    doc.setFontSize(8);
    doc.text("*Clocks go back 1 hour on Sunday 30th March", 14, doc.internal.pageSize.height - 20);
    doc.text("*Beginning/end of Ramadhan is subject to the sighting of the moon", 14, doc.internal.pageSize.height - 25);
    
    doc.save("LTICC-ramadhan-timetable-2025.pdf");
  };

  return (
    <Layout>
      {/* Hero Banner */}
      <HeroBanner 
        title="Ramadhan 1446 (2025)" 
        showNotifications={false}
        height="h-[20vh] md:h-[20vh]"
      />
      
      <main className="container mx-auto px-8 py-16">
        {/* Prayer Times Table */}
        <div className="mb-16">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-semibold text-emerald-800">Ramadhan 1446 (2025) Prayer Timetable (for Luton)</h2>
            <button
              onClick={handleDownloadPDF}
              className="bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded-lg flex items-center gap-2"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
              </svg>
              Download PDF
            </button>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full bg-white rounded-xl shadow-sm">
              <thead className="bg-emerald-50">
                <tr>
                  <th className="px-4 py-3 pl-16 text-left text-emerald-800">Ramadhan</th>
                  <th className="px-4 py-3 text-left text-emerald-800">Day</th>
                  <th className="px-4 py-3 text-left text-emerald-800">Date</th>
                  <th className="px-4 py-3 text-left text-emerald-800">Suhoor/Fajr</th>
                  <th className="px-4 py-3 text-left text-emerald-800">Zuhr</th>
                  <th className="px-4 py-3 text-left text-emerald-800">Asr</th>
                  <th className="px-4 py-3 text-left text-emerald-800">Iftar/Maghrib</th>
                  <th className="px-4 py-3 text-left text-emerald-800">Isha</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-emerald-100">
                {marchTimetable.map((time, index) => (
                  <tr 
                    key={index} 
                    className={`hover:bg-emerald-50/50 ${time.day === 'FRI' ? 'bg-emerald-900/10 font-bold' : ''}`}
                  >
                    <td className="px-4 py-3 pl-16 text-emerald-800">{time.hijriDate}</td>
                    <td className="px-4 py-3 text-emerald-800">{time.day}</td>
                    <td className="px-4 py-3 text-emerald-800">{time.date}</td>
                    <td className="px-4 py-3 text-emerald-700">{time.suhoor}</td>
                    <td className="px-4 py-3 text-emerald-700">{time.zuhr}</td>
                    <td className="px-4 py-3 text-emerald-700">{time.asr}</td>
                    <td className="px-4 py-3 text-emerald-700">{time.iftar}</td>
                    <td className="px-4 py-3 text-emerald-700">{time.isha}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          <p className="mt-4 text-sm text-emerald-600 italic">
            <span className="font-bold">Note:</span>
            <br />
            <span className="italic">*Clocks go back 1 hour on Sunday30th March</span>
            <br />
            <span className="italic">*Beginning/end of Ramadhan is subject to the sighting of the moon</span>
          </p>
        </div>

        {/* Quran Reading Schedule */}
        <div className="mt-16">
          <h2 className="text-2xl font-semibold text-emerald-800 mb-6">
            Complete the Quran in Ramadhan
          </h2>
          
          <div className="overflow-x-auto">
            <table className="w-full bg-white rounded-xl shadow-sm">
              <thead className="bg-emerald-50">
                <tr>
                  <th className="px-4 py-3 text-left text-emerald-800">Day</th>
                  <th className="px-4 py-3 text-left text-emerald-800">Surahs to Read</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-emerald-100">
                {quranReadingSchedule.map((schedule, index) => (
                  <tr 
                    key={index}
                    className={`hover:bg-emerald-50/50 ${
                      new Date().getDate() === schedule.day ? 'bg-emerald-100/50' : ''
                    }`}
                  >
                    <td className="px-4 py-3 text-emerald-800 font-medium">
                      Day {schedule.day}
                    </td>
                    <td className="px-4 py-3 text-emerald-700">
                      {schedule.surahs}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          {/* Reading Guide */}
          <section id="schedule">
          <div className="mt-4 bg-emerald-50 p-4 rounded-lg">
            <p className="text-emerald-800">
              <span className="font-bold">📖 Reading Guide:</span> This schedule helps you complete the entire Quran during Ramadhan by reading specific portions each day. The current day's reading is highlighted to help you stay on track.
              </p>
            </div>
          </section>
        </div>

        {/* Special Events */}
        {/*
        <div className="grid md:grid-cols-2 gap-8 mb-16">
          <div className="bg-white rounded-xl p-8 shadow-sm">
            <h2 className="text-2xl font-semibold text-emerald-800 mb-6">Daily Programs</h2>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <svg className="w-6 h-6 text-emerald-600 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <div>
                  <h3 className="font-semibold text-emerald-700">Iftar Gathering</h3>
                  <p className="text-emerald-600">Daily community iftar at the mosque</p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <svg className="w-6 h-6 text-emerald-600 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <div>
                  <h3 className="font-semibold text-emerald-700">Taraweeh Prayer</h3>
                  <p className="text-emerald-600">Led by our Hafiz, followed by short reminder</p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <svg className="w-6 h-6 text-emerald-600 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <div>
                  <h3 className="font-semibold text-emerald-700">Quranic Studies</h3>
                  <p className="text-emerald-600">Daily Tafseer sessions after Asr prayer</p>
                </div>
              </li>
            </ul>
          </div>

          <div className="bg-white rounded-xl p-8 shadow-sm">
            <h2 className="text-2xl font-semibold text-emerald-800 mb-6">Special Events</h2>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <svg className="w-6 h-6 text-emerald-600 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <div>
                  <h3 className="font-semibold text-emerald-700">Laylat al-Qadr</h3>
                  <p className="text-emerald-600">Special night prayers during the last 10 nights</p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <svg className="w-6 h-6 text-emerald-600 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <div>
                  <h3 className="font-semibold text-emerald-700">Community Iftars</h3>
                  <p className="text-emerald-600">Special weekend community iftars</p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <svg className="w-6 h-6 text-emerald-600 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <div>
                  <h3 className="font-semibold text-emerald-700">Eid Prayer</h3>
                  <p className="text-emerald-600">Eid prayer and celebration</p>
                </div>
              </li>
            </ul>
          </div>
        </div>
        */}

        {/* Guidelines */}
        {/*
        <div className="bg-emerald-50 rounded-xl p-8 shadow-sm">
          <h2 className="text-2xl font-semibold text-emerald-800 mb-6">Important Guidelines</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <ul className="space-y-3">
              <li className="flex items-center gap-2 text-emerald-700">
                <svg className="w-5 h-5 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                Please arrive early for prayers
              </li>
              <li className="flex items-center gap-2 text-emerald-700">
                <svg className="w-5 h-5 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                Bring your own prayer mat
              </li>
              <li className="flex items-center gap-2 text-emerald-700">
                <svg className="w-5 h-5 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                Maintain cleanliness in the mosque
              </li>
            </ul>
            <ul className="space-y-3">
              <li className="flex items-center gap-2 text-emerald-700">
                <svg className="w-5 h-5 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                Follow social distancing guidelines
              </li>
              <li className="flex items-center gap-2 text-emerald-700">
                <svg className="w-5 h-5 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                Respect prayer times
              </li>
              <li className="flex items-center gap-2 text-emerald-700">
                <svg className="w-5 h-5 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                Silent phones during prayers
              </li>
            </ul>
          </div>
        </div>
        */}
      </main>
    </Layout>
  );
} 