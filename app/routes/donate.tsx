import type { Route } from "./+types/donate";
import Layout from "../components/Layout";
import HeroBanner from "../components/HeroBanner";
import { useState } from "react";

const onlineDonation = false;

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Donate - Luton Town Islamic Center" },
    { name: "description", content: "Support Luton Town Islamic Center through your generous donations" },
  ];
}

export default function Donate() {
  const [selectedAmount, setSelectedAmount] = useState<number | null>(null);
  const [customAmount, setCustomAmount] = useState<string>("");
  const [isProcessing, setIsProcessing] = useState(false);

  const presetAmounts = [10, 20, 50, 100, 500, 1000];

  const handleDonate = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);

    const amount = selectedAmount || Number(customAmount);
    
    try {
      // Here you would integrate with your payment processor (e.g., Stripe)
      // For now, we'll just simulate a delay
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Redirect to payment processor or show success message
      alert("Thank you for your donation!");
    } catch (error) {
      alert("There was an error processing your donation. Please try again.");
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <Layout>
      <HeroBanner title="Support Our Masjid" showNotifications={false} height="h-[20vh] md:h-[20vh]"/>

      <main className="container mx-auto px-8 py-16 space-y-12">
        {/* New Building Fund Section */}
        <section className="text-center max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold text-emerald-800 mb-6">Help Us Build Our New Mosque</h2>
          <p className="text-gray-600 mb-8">
            We are raising funds to build a new mosque that will serve as a cornerstone of our community. 
            This expansion project will allow us to accommodate our growing congregation and expand our services.
          </p>
          {/*
          <div className="bg-emerald-50 rounded-xl p-8 shadow-inner">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="text-2xl font-bold text-emerald-700">£2.5M</div>
                <div className="text-sm text-gray-600">Target Goal</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-emerald-700">£850K</div>
                <div className="text-sm text-gray-600">Raised So Far</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-emerald-700">1000+</div>
                <div className="text-sm text-gray-600">Donors</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-emerald-700">34%</div>
                <div className="text-sm text-gray-600">Progress</div>
              </div>
            </div>
          </div>
          */}
        </section>

        <div className="grid md:grid-cols-2 gap-8">
          <div className="bg-white rounded-2xl p-8 shadow-sm hover:shadow-md transition-shadow">
            <h2 className="text-2xl font-semibold text-emerald-800 mb-6">Ways to Donate</h2>
            <ul className="space-y-4">
              {['Online Transfer', 'Standing Order', 'Cash Donations', 'Zakat'].map((method) => (
                <li key={method} className="flex items-center space-x-3 text-gray-700">
                  <span className="w-2 h-2 bg-emerald-500 rounded-full"></span>
                  <span>{method}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-white rounded-2xl p-8 shadow-sm hover:shadow-md transition-shadow">
            <h2 className="text-2xl font-semibold text-emerald-800 mb-6">Bank Details</h2>
            <div className="prose prose-emerald">
              <p className="text-gray-700">
                Please contact for our bank details or donate securely through our online portal (coming soon).
              </p>
            </div>
          </div>
        </div>

        {/* New Online Donation Section */}
        {onlineDonation && (
          <section className="max-w-2xl mx-auto">
            <div className="bg-white rounded-2xl p-8 shadow-lg">
            <h2 className="text-2xl font-semibold text-emerald-900 mb-6 text-center">Make a Donation</h2>
            
            <form onSubmit={handleDonate} className="space-y-6">
              {/* Preset Amounts */}
              <div className="grid grid-cols-3 gap-4">
                {presetAmounts.map((amount) => (
                  <button
                    key={amount}
                    type="button"
                    onClick={() => {
                      setSelectedAmount(amount);
                      setCustomAmount("");
                    }}
                    className={`py-3 px-4 rounded-lg border-2 transition-all ${
                      selectedAmount === amount
                        ? 'border-emerald-600 bg-emerald-50 text-emerald-700'
                        : 'border-gray-200 hover:border-emerald-600 hover:bg-emerald-50 hover:text-emerald-700 text-emerald-700'
                    }`}
                  >
                    £{amount}
                  </button>
                ))}
              </div>

              {/* Custom Amount */}
              <div className="relative">
                <input
                  type="number"
                  value={customAmount}
                  onChange={(e) => {
                    setCustomAmount(e.target.value);
                    setSelectedAmount(null);
                  }}
                  placeholder="Enter custom amount"
                  className="w-full py-3 px-4 pl-8 rounded-lg border-2 border-gray-200 focus:border-emerald-600 focus:ring-1 focus:ring-emerald-600 outline-none text-emerald-700"
                />
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">£</span>
              </div>

              {/* Donation Frequency */}
              <div className="flex gap-4">
                <label className="flex items-center space-x-2 text-emerald-700">
                  <input type="radio" name="frequency" value="one-time" defaultChecked 
                    className="text-emerald-600 focus:ring-emerald-600" />
                  <span>One-time</span>
                </label>
                <label className="flex items-center space-x-2 text-emerald-700">
                  <input type="radio" name="frequency" value="monthly" 
                    className="text-emerald-600 focus:ring-emerald-600" />
                  <span>Monthly</span>
                </label>
              </div>

              {/* Gift Aid */}
              <div className="bg-gray-50 p-4 rounded-lg">
                <label className="flex items-start space-x-2">
                  <input type="checkbox" className="mt-1 text-emerald-600 focus:ring-emerald-600" />
                  <span className="text-sm text-gray-600">
                    I am a UK taxpayer and I would like Luton Town Islamic Center to treat all donations 
                    I make now and in the future as Gift Aid donations. I understand that if I pay less 
                    Income Tax and/or Capital Gains Tax than the amount of Gift Aid claimed on all my 
                    donations in that tax year, it is my responsibility to pay any difference.
                  </span>
                </label>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isProcessing || (!selectedAmount && !customAmount)}
                className={`w-full py-4 px-6 rounded-lg text-white font-semibold 
                  ${isProcessing || (!selectedAmount && !customAmount)
                    ? 'bg-gray-400 cursor-not-allowed'
                    : 'bg-emerald-600 hover:bg-emerald-700'
                  } transition-colors`}
              >
                {isProcessing ? (
                  <span className="flex items-center justify-center">
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Processing...
                  </span>
                ) : (
                  `Donate ${selectedAmount ? `£${selectedAmount}` : customAmount ? `£${customAmount}` : ''}`
                )}
              </button>
            </form>
          </div>
          </section>
        )}

        {/* New Features Section */}
        <section className="bg-white rounded-2xl p-8 shadow-sm">
          <h2 className="text-2xl font-semibold text-emerald-800 mb-8 text-center">New Mosque Features</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="bg-emerald-50 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"/>
                </svg>
              </div>
              <h3 className="font-semibold text-gray-800 mb-2">Larger Prayer Halls</h3>
              <p className="text-gray-600 text-sm">Separate prayer halls for brothers and sisters with increased capacity</p>
            </div>
            <div className="text-center">
              <div className="bg-emerald-50 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"/>
                </svg>
              </div>
              <h3 className="font-semibold text-gray-800 mb-2">Educational Facilities</h3>
              <p className="text-gray-600 text-sm">Modern classrooms for Islamic studies and community programs</p>
            </div>
            <div className="text-center">
              <div className="bg-emerald-50 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"/>
                </svg>
              </div>
              <h3 className="font-semibold text-gray-800 mb-2">Community Spaces</h3>
              <p className="text-gray-600 text-sm">Multi-purpose halls for events and community gatherings</p>
            </div>
          </div>
        </section>
      </main>
    </Layout>
  );
} 