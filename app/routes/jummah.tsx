import Layout from "../components/Layout";
import HeroBanner from "../components/HeroBanner";

export default function JummahPrayer() {
  return (
    <Layout>
      <HeroBanner title="Local Jummah Prayer Facility" showNotifications={false} height="h-[20vh] md:h-[20vh]"/>
      
      <main className="container mx-auto px-8 py-16">
        <div className="max-w-4xl mx-auto">
          {/* Mosque Illustration */}
          <div className="relative mb-12">
            <div className="w-full h-64 bg-gradient-to-b from-emerald-900 to-emerald-800 rounded-2xl overflow-hidden">
              <img 
                src="/jummah.jpg" 
                alt="Decorative Mosque Illustration"
                className="w-full h-full object-cover"
              />
            </div>
            <h1 className="text-4xl md:text-5xl text-center font-arabic text-emerald-800 mt-8">
              JUMMAH PRAYERS
            </h1>
          </div>

          {/* Prayer Times */}
          <div className="text-center mb-12">
            <div className="bg-emerald-50 rounded-xl p-8 shadow-sm">
              <h2 className="text-2xl font-semibold text-emerald-900 mb-6">Prayer Times</h2>
              <div className="space-y-4">
                <p className="text-xl text-emerald-800">
                  <span className="font-semibold">Khutbah Starts at:</span>{" "}
                  <span className="text-emerald-700">1:00 PM</span>
                </p>
                <p className="text-xl text-emerald-800">
                  <span className="font-semibold">Prayer at:</span>{" "}
                  <span className="text-emerald-700">1:30 PM</span>
                </p>
              </div>
            </div>
          </div>

          {/* Location Section */}
          <div className="grid md:grid-cols-2 gap-8 items-start">
            {/* Map */}
            <div className="bg-white rounded-xl shadow-sm overflow-hidden">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2469.8089451779164!2d-0.4141889!3d51.8789576!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x48764144e6252e71%3A0x8088b76bf7e53c40!2s56%20Old%20Bedford%20Rd%2C%20Luton%20LU2%207PA!5e0!3m2!1sen!2suk!4v1709667547749!5m2!1sen!2suk"
                width="100%"
                height="300"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>

            {/* Address and Information */}
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl font-semibold text-emerald-900 mb-2">Address</h2>
                <p className="text-lg text-emerald-800">
                  56 Old Bedford Rd<br />
                  Luton, LU2 7PA
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-semibold text-emerald-900 mb-2">Important Information</h2>
                <ul className="space-y-2 text-emerald-700">
                  <li className="flex items-center gap-2">
                    <svg className="w-5 h-5 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    Facilities for men, and disable access
                  </li>
                  <li className="flex items-center gap-2">
                    <svg className="w-5 h-5 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    Please come with ablution to the hall
                  </li>
                  <li className="flex items-center gap-2">
                    <svg className="w-5 h-5 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    Bring your own prayer mat
                  </li>
                </ul>
              </div>

              <div>
                <h2 className="text-2xl font-semibold text-emerald-900 mb-2">Contact</h2>
                <div className="space-y-2 text-emerald-700">
                  <p>Nurul: 07882277781</p>
                  <p>Abdul Ghani: 07484144842</p>
                  <p>Asif: 07540109810</p>
                </div>
              </div>

              <a 
                href="https://www.lutonislam.com" 
                className="inline-block text-emerald-600 hover:text-emerald-700 transition-colors"
              >
                www.lutonislam.com
              </a>
            </div>
          </div>
        </div>
      </main>
    </Layout>
  );
} 