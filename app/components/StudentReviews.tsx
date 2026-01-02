import { useEffect } from "react";

export default function StudentReviews() {
  useEffect(() => {
    // Check if scripts are already loaded
    const existingScript1 = document.querySelector('script[src="https://fast.wistia.com/player.js"]');
    const existingScript2 = document.querySelector('script[src="https://fast.wistia.com/embed/v0128jq8x0.js"]');
    const existingScript3 = document.querySelector('script[src="https://fast.wistia.com/embed/zz3n4aivk0.js"]');
    const existingStyle = document.querySelector('style[data-wistia-player]');

    // Load Wistia player script
    if (!existingScript1) {
      const script1 = document.createElement("script");
      script1.src = "https://fast.wistia.com/player.js";
      script1.async = true;
      document.body.appendChild(script1);
    }

    if (!existingScript2) {
      const script2 = document.createElement("script");
      script2.src = "https://fast.wistia.com/embed/v0128jq8x0.js";
      script2.async = true;
      script2.type = "module";
      document.body.appendChild(script2);
    }

    if (!existingScript3) {
      const script3 = document.createElement("script");
      script3.src = "https://fast.wistia.com/embed/zz3n4aivk0.js";
      script3.async = true;
      script3.type = "module";
      document.body.appendChild(script3);
    }

    // Add styles
    if (!existingStyle) {
      const style = document.createElement("style");
      style.setAttribute("data-wistia-player", "true");
      style.textContent = `
        wistia-player[media-id='v0128jq8x0']:not(:defined) { 
          background: center / contain no-repeat url('https://fast.wistia.com/embed/medias/v0128jq8x0/swatch'); 
          display: block; 
          filter: blur(5px); 
          padding-top:56.25%; 
        }
        wistia-player[media-id='zz3n4aivk0']:not(:defined) { 
          background: center / contain no-repeat url('https://fast.wistia.com/embed/medias/zz3n4aivk0/swatch'); 
          display: block; 
          filter: blur(5px); 
          padding-top:56.25%; 
        }
      `;
      document.head.appendChild(style);
    }
  }, []);

  return (
    <section className="bg-emerald-50 py-16">
      <div className="container mx-auto px-8">
        <h2 className="text-3xl font-semibold text-emerald-800 mb-8 text-center">
          Student Reviews
        </h2>
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="w-full">
              <wistia-player 
                media-id="v0128jq8x0" 
                aspect="1.7777777777777777"
                className="w-full"
              ></wistia-player>
            </div>
            <div className="w-full">
              <wistia-player 
                media-id="zz3n4aivk0" 
                aspect="1.7777777777777777"
                className="w-full"
              ></wistia-player>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

