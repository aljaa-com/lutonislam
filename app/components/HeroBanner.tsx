import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import HijriDate from 'hijri-date';
import { getTodayPrayerTimes } from "../data/ramadhanData";

interface RamadhanTimes {
  suhoorEnds: string;
  iftarStarts: string;
}

interface HeroBannerProps {
  title: string;
  height?: string;
  showCarousel?: boolean;
  showNotifications?: boolean;
  ramadhanTimes?: RamadhanTimes;
}

export default function HeroBanner({ 
  title,  
  height = "min-h-[60vh] md:h-[60vh]",
  showCarousel = false,
  showNotifications = true,
  ramadhanTimes: propRamadhanTimes 
}: HeroBannerProps) {
  const navigate = useNavigate();
  const [currentTime, setCurrentTime] = useState(new Date());
  const [formattedHijriDate, setFormattedHijriDate] = useState('');
  const [currentSlide, setCurrentSlide] = useState(0);

  // Get times from props or fallback to current day
  const todayTimes = propRamadhanTimes || (() => {
    const times = getTodayPrayerTimes();
    return times ? {
      suhoorEnds: times.suhoor,
      iftarStarts: times.iftar
    } : undefined;
  })();

  // Update time every second
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  // Calculate Hijri date on client side only
  useEffect(() => {
    const hijriMonths = [
      'Muharram', 'Safar', 'Rabi\' al-Awwal', 'Rabi\' al-Thani',
      'Jumada al-Ula', 'Jumada al-Thani', 'Rajab', 'Sha\'ban',
      'Ramadhan', 'Shawwal', 'Dhu al-Qi\'dah', 'Dhu al-Hijjah'
    ];
    
    try {
      const hijriDate = new HijriDate();
      // if the current time is before the time for tha magrhib prayer, then the hijri date is the previous day
      if (currentTime < new Date(`${currentTime.toDateString()} ${todayTimes?.iftarStarts}`)) {
        hijriDate.subtractDay();
      }
      setFormattedHijriDate(
        `${hijriDate.getDate()}${hijriDate.getDate() === 1 ? 'st' : hijriDate.getDate() === 2 ? 'nd' : hijriDate.getDate() === 3 ? 'rd' : 'th'} ${hijriMonths[hijriDate.getMonth() - 1]} ${hijriDate.getFullYear()}`
      );
    } catch (error) {
      console.error('Error calculating Hijri date:', error);
      setFormattedHijriDate('Loading...');
    }
  }, [currentTime]);

  // Update carousel rotation to include new slide
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % 3); // Changed from 2 to 3
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  // Calculate days until Ramadhan 2025
  const ramadhanStart = new Date('2025-03-01');
  const daysUntilRamadhan = Math.ceil((ramadhanStart.getTime() - currentTime.getTime()) / (1000 * 60 * 60 * 24));

  // Format the current date
  const dateOptions: Intl.DateTimeFormatOptions = { 
    weekday: 'long', 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  };
  const currentDate = currentTime.toLocaleDateString('en-GB', dateOptions);
  
  // Format the current time
  const timeOptions: Intl.DateTimeFormatOptions = { 
    hour: '2-digit', 
    minute: '2-digit', 
    second: '2-digit',
    hour12: true 
  };
  const formattedTime = currentTime.toLocaleTimeString('en-GB', timeOptions);

  return (
    <div className={`relative ${height} overflow-hidden bg-gradient-to-r from-emerald-800 to-emerald-600`}>
      {/* Pattern Container */}
      <div className="absolute inset-0">
        <div 
          className="absolute inset-0 bg-[url('/pattern.svg')] bg-repeat opacity-30 animate-slide" 
          style={{ backgroundSize: '200px 200px' }}
        />
        <div 
          className="absolute inset-0 bg-[url('/pattern.svg')] bg-repeat opacity-20 animate-slide-reverse" 
          style={{ backgroundSize: '150px 150px' }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-emerald-800/30" />
      </div>
      
      {/* Date and Time Bar */}
      <div className="relative bg-white/10 backdrop-blur-sm border-b border-white/20">
        <div className="container mx-auto px-4 md:px-8 py-2">
          {/* Mobile Date/Time Display */}
          <div className="md:hidden space-y-1">
            <div className="flex justify-between text-sm">
              <div className="text-emerald-200">Today:</div>
              <div className="text-white">{currentDate}</div>
            </div>
            <div className="flex justify-between text-sm">
              <div className="text-emerald-200">Time:</div>
              <div className="text-white">{formattedTime}</div>
            </div>
            <div className="flex justify-between text-sm">
              <div className="text-emerald-200">Hijri:</div>
              <div className="text-white">{formattedHijriDate}</div>
            </div>
          </div>

          {/* Desktop Date/Time Display */}
          <div className="hidden md:flex justify-between items-center text-white">
            <div className="flex items-center gap-6">
              <div>
                <span className="text-emerald-200">Today: </span>
                <span className="font-medium">{currentDate}</span>
              </div>
              <div>
                <span className="text-emerald-200">Time: </span>
                <span className="font-medium">{formattedTime}</span>
              </div>
            </div>
            <div>
              <span className="text-emerald-200">Hijri: </span>
              <span className="font-medium">{formattedHijriDate}</span>
            </div>
          </div>
        </div>
      </div>
      
      {/* Content */}
      <div className="relative container mx-auto px-4 md:px-8 flex flex-col md:flex-row justify-between items-center py-4 md:py-8">
        {/* Title Section */}
        <div className="space-y-2 md:space-y-4 w-full md:w-auto text-center md:text-left">
          <h1 className="text-3xl md:text-5xl font-arabic text-white leading-tight animate-fade-in">
            {title}
          </h1>
          <div className="w-24 h-1 bg-emerald-400 rounded animate-fade-in-delay mx-auto md:mx-0" />
          
          {/* Carousel */}
          {showCarousel && (
            <div className="hidden md:block md:mt-8 relative h-24 max-w-md mx-auto md:mx-0">
            <div className={`absolute w-full transition-opacity duration-500 ${currentSlide === 0 ? 'opacity-100' : 'opacity-0'}`} style={{ pointerEvents: 'auto' }}>
              <div className="bg-white/20 backdrop-blur-sm rounded-lg p-4">
                <div className="flex flex-col gap-2">
                  <div className="flex items-center gap-3">
                    <div className="bg-emerald-100 p-2 rounded-full">
                      <svg className="w-6 h-6 text-emerald-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                              d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <div className="flex-grow">
                      <h3 className="text-white font-bold">The Blessed Month of Ramadhan</h3>
                      <p className="text-emerald-100">Complete the Quran in Ramadhan</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className={`absolute w-full transition-opacity duration-500 ${currentSlide === 1 ? 'opacity-100' : 'opacity-0'}`}>
              <div className="bg-emerald-500 backdrop-blur-sm rounded-lg p-4">
                  <div className="flex items-center gap-3">
                    <div className="bg-white p-2 rounded-full">
                    <svg className="w-6 h-6 text-emerald-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                            d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-white font-bold">Support Our Cause</h3>
                    <p className="text-emerald-100">Donate Now - Sadaqah Jariyah</p>
                  </div>
                  </div>
              </div>
            </div>

            {/* New WhatsApp Slide */}
            <div className={`absolute w-full transition-opacity duration-500 ${currentSlide === 2 ? 'opacity-100' : 'opacity-0'}`}>
              <div className="bg-green-600 rounded-lg p-4">
                <div className="flex items-center gap-3">
                  <div className="bg-white p-2 rounded-full">
                    <svg className="w-6 h-6 text-green-600" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-white font-bold">Join Our Community</h3>
                    <p className="text-green-100">Scan QR code or click to join WhatsApp group</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Update Carousel Indicators */}
            <div className="absolute -bottom-6 left-1/2 md:left-0 transform -translate-x-1/2 md:translate-x-0 flex space-x-2">
              {[0, 1, 2].map((index) => (
                <button
                  key={index}
                  className={`w-2 h-2 rounded-full transition-colors duration-300 ${
                    currentSlide === index ? 'bg-white' : 'bg-white/50'
                  }`}
                  onClick={() => setCurrentSlide(index)}
                />
              ))}
              </div>
            </div>
          )}
        </div>

        {/* Notifications Section */}
        { showNotifications && (
        <div className="hidden md:block space-y-4 w-96">
          {/* Clickable Ramadhan Notification */}
          {todayTimes && (
            <div 
              onClick={() => navigate('/ramadhan')}
              className="bg-emerald-900/90 backdrop-blur-sm rounded-lg p-4 shadow-lg cursor-pointer 
                       transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
            >
              <div className="flex items-center gap-3">
                <div className="bg-emerald-100 p-3 rounded-full">
                  <svg className="w-6 h-6 text-emerald-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                          d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                          d="M9 10a1 1 0 011-1h4a1 1 0 011 1v4a1 1 0 01-1 1h-4a1 1 0 01-1-1v-4z" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-bold text-lg text-white">Ramadhan</h3>
                  <p className="text-emerald-100 font-medium">Today's times in Luton:</p>
                  <p className="text-emerald-200">Suhoor: {todayTimes.suhoorEnds}</p>
                  <p className="text-emerald-200">Iftar: {todayTimes.iftarStarts}</p>
                </div>
              </div>
            </div>
          )}

          {/* Clickable Jummah Notification */}
          <div 
            onClick={() => navigate('/jummah')}
            className="bg-white/90 backdrop-blur-sm rounded-lg p-4 shadow-lg cursor-pointer 
                     transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
          >
            <div className="flex items-center gap-3">
              <div className="bg-emerald-100 p-3 rounded-full">
                <svg className="w-6 h-6 text-emerald-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                        d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div>
                <h3 className="font-bold text-lg text-emerald-900">Jummah Prayer</h3>
                <p className="text-emerald-800 font-medium">Khutbah starts: 1:00 PM</p>
                <p className="text-emerald-700">Prayer starts: 1:30 PM</p>
              </div>
            </div>
          </div>


          {/* WhatsApp Group Notification */}
          <div 
            onClick={() => window.open('https://chat.whatsapp.com/BY71fsXEynlJuDfewP3Q68', '_blank')}
            className="bg-green-600/90 backdrop-blur-sm rounded-lg p-4 shadow-lg cursor-pointer 
                     transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="bg-white p-3 rounded-full">
                  <svg className="w-6 h-6 text-green-600" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                  </svg>
                </div>
                <div>
                  <h3 className="font-bold text-lg text-white">Join WhatsApp Group</h3>
                  <p className="text-green-100">Stay updated with community news</p>
                </div>
              </div>
              <img 
                src="/whatsapp-qr.jpg" 
                alt="WhatsApp Group QR Code" 
                className="w-24 h-24 rounded-lg bg-white p-1"
              />
            </div>
          </div>
        </div>

        )}

        {/* Mobile Notifications */}
        { showNotifications && (
        <div className="md:hidden w-full mt-8">
          <div className="space-y-4">

            {/* Mobile Ramadhan Notification */}
            {todayTimes && (
              <div 
                onClick={() => navigate('/ramadhan')}
                className="bg-emerald-900/90 backdrop-blur-sm rounded-lg p-4 shadow-lg cursor-pointer"
              >
                <div className="flex items-center gap-3">
                  <div className="bg-emerald-100 p-2 rounded-full shrink-0">
                    <svg className="w-5 h-5 text-emerald-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                            d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                            d="M9 10a1 1 0 011-1h4a1 1 0 011 1v4a1 1 0 01-1 1h-4a1 1 0 01-1-1v-4z" />
                    </svg>
                  </div>
                    <div>
                    <h3 className="font-bold text-lg text-white">Ramadhan</h3>
                    <p className="text-emerald-100 font-medium">Today's times in Luton:</p>
                    <p className="text-emerald-200">Suhoor: {todayTimes.suhoorEnds}</p>
                    <p className="text-emerald-200">Iftar: {todayTimes.iftarStarts}</p>
                  </div>
                </div>
              </div>
            )}

            {/* Mobile Jummah Notification */}
            <div 
              onClick={() => navigate('/jummah')}
              className="bg-white/90 backdrop-blur-sm rounded-lg p-4 shadow-lg cursor-pointer"
            >
              <div className="flex items-center gap-3">
                <div className="bg-emerald-100 p-2 rounded-full shrink-0">
                  <svg className="w-5 h-5 text-emerald-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                          d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-bold text-emerald-900">Jummah Prayer</h3>
                  <p className="text-sm text-emerald-700">Khutbah: 1:00 PM | Prayer: 1:30 PM</p>
                </div>
              </div>
            </div>

                      {/* WhatsApp Group Notification */}
          <div 
            onClick={() => window.open('https://chat.whatsapp.com/BY71fsXEynlJuDfewP3Q68', '_blank')}
            className="bg-green-600/90 backdrop-blur-sm rounded-lg p-4 shadow-lg cursor-pointer 
                     transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="bg-white p-3 rounded-full">
                  <svg className="w-6 h-6 text-green-600" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                  </svg>
                </div>
                <div>
                  <h3 className="font-bold text-lg text-white">Join WhatsApp Group</h3>
                  <p className="text-green-100">Stay updated with community news</p>
                </div>
              </div>
              <img 
                src="/whatsapp-qr.jpg" 
                alt="WhatsApp Group QR Code" 
                className="w-24 h-24 rounded-lg bg-white p-1"
              />
            </div>
          </div>

          </div>
        </div>
        )}
      </div>
    </div>
  );
} 