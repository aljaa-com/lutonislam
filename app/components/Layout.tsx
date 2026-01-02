import { Link } from "react-router-dom";
import Footer from "./Footer";
import StudentReviews from "./StudentReviews";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col bg-emerald-50">
      <nav className="bg-emerald-800 text-white p-4 shadow-lg">
        <div className="container mx-auto flex justify-between items-center">
          <Link to="/" className="text-2xl font-arabic">Luton Town Islamic Center</Link>
          <div className="space-x-6">
            <Link to="/about" className="hover:text-emerald-200 transition-colors">About</Link>
            <Link to="/classes" className="hover:text-emerald-200 transition-colors">Classes</Link>
            <Link to="/events" className="hover:text-emerald-200 transition-colors">Events</Link>
            <Link to="/donate" className="hover:text-emerald-200 transition-colors">Donate</Link>            
          </div>
        </div>
      </nav>
      
      <main className="flex-grow bg-gradient-to-b from-emerald-50 to-emerald-200/50">
        {children}
      </main>

      <StudentReviews />
      <Footer />
    </div>
  );
} 