import type { Route } from "./+types/classes";
import Layout from "../components/Layout";
import HeroBanner from "../components/HeroBanner";

interface ClassType {
  name: string;
  schedule: string;
  level: string;
  teacher: string;
  description: string;
}

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Islamic Classes - Luton Town Islamic Center" },
    { name: "description", content: "Join our Islamic education programs at Luton Town Islamic Center" },
  ];
}

export default function Classes() {
  const classes: ClassType[] = [
    /*
    {
      name: "Learn to read the Quran",
      schedule: "Saturdays 7:30 - 8:30pm",
      level: "Beginner",
      teacher: "Sheikh Abdullah",
      description: "Starting from the Arabic alphabets. Learn from the comfort of your own home. Focus on practicing each Tajweed rule. Start with Short Surahs. Adopt a recitation style. Practice Arabic every lesson."
    },
    {
      name: "Beginner Arabic Class",
      schedule: "Tuesdays 6pm - 7pm",
      level: "Level 1",
      teacher: "Ustadh Ahmad",
      description: "Arabiyyah Bayna Yadayk – Level 1. Learn to read, write, listen and speak."
    },
    {
      name: "Foundations of Fiqh",
      schedule: "Thursdays 7:30pm-8:30pm",
      level: "All Levels",
      teacher: "Sheikh Muhammad",
      description: "Based on the Qur'an and the authentic ahadith. Topics: Source of Purification • Ablution (Wudhu) • The purificatory Bath (Ghusl) • Dry ablution (Tayammum) • Wiping footgear (Khuffs) • Isthinja • How to perform Salah/Prayer"
    },
    {
      name: "Nawawi's Forty Hadith",
      schedule: "Fridays 7:30pm - 8:30pm",
      level: "All Levels",
      teacher: "Sheikh Abdullah",
      description: "Comprise the main essential and fundamental concepts of Islam. Since having good knowledge of the various fundamental aspects of the religion is key to a Muslim's practice and application of Islam, we attempt to provide simple and practical commentaries to the collection."
    }
      */
  ];

  return (
    <Layout>
      <HeroBanner title="Islamic Classes" showNotifications={false} height="h-[20vh] md:h-[20vh]"/>
      
      <main className="container mx-auto px-8 py-16">
        {/* Class Schedule Section */}
        <div className="grid lg:grid-cols-2 gap-8 mb-16">
          <div className="space-y-6">
            <h2 className="text-3xl font-arabic text-emerald-800">Available Classes</h2>
            <p className="text-emerald-700">
              Join our diverse range of Islamic education programs suitable for all ages and levels.
            </p>
          </div>
          
          {/* Registration CTA */}
          <div className="bg-white p-6 rounded-2xl shadow-sm hover:shadow-md transition-shadow">
            <h3 className="text-2xl font-semibold text-emerald-800 mb-4">Register for Classes</h3>
            <form className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                <input 
                  type="text"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                <input 
                  type="email"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                />
              </div>
              <button 
                type="submit"
                className="w-full bg-emerald-600 text-white py-2 px-4 rounded-lg hover:bg-emerald-700 transition-colors"
              >
                Request Information
              </button>
            </form>
          </div>
        </div>

        {/* Classes Grid */}
        {classes.length > 0 && (
        <div className="grid md:grid-cols-2 gap-6">
          {classes.map((classItem) => (
            <div 
              key={classItem.name}
              className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-1"
            >
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-xl font-semibold text-emerald-800">{classItem.name}</h3>
                <span className="px-3 py-1 bg-emerald-100 text-emerald-800 rounded-full text-sm">
                  {classItem.level}
                </span>
              </div>
              
              <div className="space-y-3 text-gray-600">
                <p className="flex items-center">
                  <svg className="w-5 h-5 mr-2 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  {classItem.schedule}
                </p>
                <p className="flex items-center">
                  <svg className="w-5 h-5 mr-2 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                  {classItem.teacher}
                </p>
                <p className="text-sm mt-2">{classItem.description}</p>
              </div>

              <button 
                className="mt-4 w-full py-2 px-4 border-2 border-emerald-600 text-emerald-600 rounded-lg
                         hover:bg-emerald-600 hover:text-white transition-colors duration-300"
              >
                Enroll Now
              </button>
            </div>
            ))}
          </div>
        )}

        {/* Additional Information */}
        <div className="mt-16 bg-white rounded-2xl p-8 shadow-sm">
          <h2 className="text-2xl font-semibold text-emerald-800 mb-6">Important Information</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div>
              <h3 className="font-semibold text-emerald-700 mb-2">Class Materials</h3>
              <p className="text-gray-600">All necessary materials will be provided. Students should bring their own notebooks and pens.</p>
            </div>
            <div>
              <h3 className="font-semibold text-emerald-700 mb-2">Registration Process</h3>
              <p className="text-gray-600">Fill out the registration form and our team will contact you with further details.</p>
            </div>
            <div>
              <h3 className="font-semibold text-emerald-700 mb-2">Class Structure</h3>
              <p className="text-gray-600">Classes include theory, practical sessions, and regular assessments to track progress.</p>
            </div>
          </div>
        </div>
      </main>
    </Layout>
  );
} 