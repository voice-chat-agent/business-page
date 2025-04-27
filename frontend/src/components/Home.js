// import React, { useState, useEffect, useRef } from "react";
// import Video from "./images/video3.mp4";
// import "../styles/Home.css";

// const messages = [
//   "Welcome to Helix AI Assistant!",
//   "Enhancing business automation.",
//   "Providing intelligent insights.",
//   "Seamless AI-powered interactions.",
// ];

// const Home = () => {
//   const [text, setText] = useState("");
//   const [index, setIndex] = useState(0);
//   const [subIndex, setSubIndex] = useState(0);
//   const [isDeleting, setIsDeleting] = useState(false);
//   const [scrollProgress, setScrollProgress] = useState(0);
//   const scrollRef = useRef(null);
//   const autoScrollInterval = useRef(null);

//   // Typing effect logic
//   useEffect(() => {
//     if (subIndex === messages[index].length + 1 && !isDeleting) {
//       setTimeout(() => setIsDeleting(true), 500);
//       return;
//     }
//     if (subIndex === 0 && isDeleting) {
//       setIsDeleting(false);
//       setIndex((prev) => (prev + 1) % messages.length);
//       return;
//     }

//     const timeout = setTimeout(() => {
//       setText(messages[index].substring(0, subIndex));
//       setSubIndex((prev) => prev + (isDeleting ? -1 : 1));
//     }, isDeleting ? 50 : 80);

//     return () => clearTimeout(timeout);
//   }, [subIndex, index, isDeleting]);

//   // Scroll-based animation logic
//   useEffect(() => {
//     const handleScroll = () => {
//       const cards = document.querySelectorAll(".card");
//       const triggerPoint = window.innerHeight * 0.8;

//       cards.forEach((card, index) => {
//         const cardTop = card.getBoundingClientRect().top;

//         if (cardTop < triggerPoint) {
//           setTimeout(() => {
//             card.classList.add("show");
//           }, index * 200); // Gradual appearance
//         } else {
//           card.classList.remove("show");
//         }
//       });

//       // Fading effect for video container
//       const scrollTop = window.scrollY;
//       const maxScroll = window.innerHeight;
//       setScrollProgress(Math.min(scrollTop / maxScroll, 1));
//     };

//     window.addEventListener("scroll", handleScroll);
//     return () => window.removeEventListener("scroll", handleScroll);
//   }, []);

//   // Auto-scrolling logic for cards
//   useEffect(() => {
//     const startAutoScroll = () => {
//       autoScrollInterval.current = setInterval(() => {
//         if (scrollRef.current) {
//           scrollRef.current.scrollLeft += 1.5; // Adjust speed
//         }
//       }, 20);
//     };

//     startAutoScroll();

//     return () => clearInterval(autoScrollInterval.current);
//   }, []);

//   // Pause scrolling on hover
//   const handleMouseEnter = () => clearInterval(autoScrollInterval.current);
//   const handleMouseLeave = () => {
//     autoScrollInterval.current = setInterval(() => {
//       if (scrollRef.current) {
//         scrollRef.current.scrollLeft += 1.5;
//       }
//     }, 20);
//   };

//   return (
//     <>
//       {/* Background Video Section */}
//       <div className="video-container" style={{ opacity: 1 - scrollProgress }}>
//         <video autoPlay loop muted className="video-bg">
//           <source src={Video} type="video/mp4" />
//           Your browser does not support the video tag.
//         </video>
//         <div className="typing-container">
//           <h4>{text + "|"}</h4>
//         </div>
//         <div className="bottom-right-text">
//           <h4>{text + "|"}</h4>
//         </div>
//       </div>

//       {/* Content Section with Animated Cards */}
//       <div className="content-placeholder">
//         <div
//           className="card-container"
//           ref={scrollRef}
//           onMouseEnter={handleMouseEnter}
//           onMouseLeave={handleMouseLeave}
//         >
//           {[
//             { icon: "fas fa-brain", title: "Smart Insights", desc: "Enhancing decision-making with AI." },
//             { icon: "fas fa-robot", title: "Automation", desc: "Seamless AI-powered interactions." },
//             { icon: "fas fa-chart-line", title: "Performance", desc: "Optimizing business operations efficiently." },
//             { icon: "fas fa-lock", title: "Security", desc: "Ensuring data protection and compliance." },
//             { icon: "fas fa-cogs", title: "Customization", desc: "Flexible AI solutions for every business." },
//             { icon: "fas fa-chart-pie", title: "Analytics", desc: "Detailed AI-driven data insights." },
//           ].map((card, index) => (
//             <div key={index} className="card">
//               <i className={card.icon}></i>
//               <h3>{card.title}</h3>
//               <p>{card.desc}</p>
//             </div>
//           ))}
//         </div>
//       </div>
//     </>
//   );
// };

// export default Home;


import React, { useState, useEffect, useRef } from "react";
import Video from "./images/video3.mp4";
import "../styles/Home.css";

const messages = [
  "Welcome to Helix AI Assistant!",
  "Enhancing business automation.",
  "Providing intelligent insights.",
  "Seamless AI-powered interactions.",
];

const Home = () => {
  const [text, setText] = useState("");
  const [index, setIndex] = useState(0);
  const [subIndex, setSubIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const scrollRef = useRef(null);
  const autoScrollInterval = useRef(null);

  // Typing effect logic
  useEffect(() => {
    if (subIndex === messages[index].length + 1 && !isDeleting) {
      setTimeout(() => setIsDeleting(true), 500);
      return;
    }
    if (subIndex === 0 && isDeleting) {
      setIsDeleting(false);
      setIndex((prev) => (prev + 1) % messages.length);
      return;
    }

    const timeout = setTimeout(() => {
      setText(messages[index].substring(0, subIndex));
      setSubIndex((prev) => prev + (isDeleting ? -1 : 1));
    }, isDeleting ? 50 : 80);

    return () => clearTimeout(timeout);
  }, [subIndex, index, isDeleting]);

  // Scroll-based animation logic
  useEffect(() => {
    const handleScroll = () => {
      const cards = document.querySelectorAll(".card");
      const triggerPoint = window.innerHeight * 0.8;

      cards.forEach((card, index) => {
        const cardTop = card.getBoundingClientRect().top;

        if (cardTop < triggerPoint) {
          setTimeout(() => {
            card.classList.add("show");
          }, index * 200); // Gradual appearance
        } else {
          card.classList.remove("show");
        }
      });

      // Fading effect for video container
      const scrollTop = window.scrollY;
      const maxScroll = window.innerHeight;
      setScrollProgress(Math.min(scrollTop / maxScroll, 1));
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Auto-scrolling logic for cards
  useEffect(() => {
    const startAutoScroll = () => {
      autoScrollInterval.current = setInterval(() => {
        if (scrollRef.current) {
          scrollRef.current.scrollLeft += 1.5; // Adjust speed
        }
      }, 20);
    };

    startAutoScroll();

    return () => clearInterval(autoScrollInterval.current);
  }, []);

  // Pause scrolling on hover
  const handleMouseEnter = () => clearInterval(autoScrollInterval.current);
  const handleMouseLeave = () => {
    autoScrollInterval.current = setInterval(() => {
      if (scrollRef.current) {
        scrollRef.current.scrollLeft += 1.5;
      }
    }, 20);
  };

  return (
    <>
      {/* Background Video Section */}
      <div className="video-container" style={{ opacity: 1 - scrollProgress }}>
        <video autoPlay loop muted className="video-bg">
          <source src={Video} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        <div className="typing-container">
          <h4>{text + "|"}</h4>
        </div>
        <div className="bottom-right-text">
          <h4>{text + "|"}</h4>
        </div>
      </div>

      {/* Content Section with Animated Cards */}
      <div className="content-placeholder">
        <div
          className="card-container"
          ref={scrollRef}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          {[
  
  {
    icon: "fas fa-robot",
    title: "Girish",
    img: "/images/girish.jpeg",
    desc: "Automates repetitive tasks such as answering customer queries, scheduling appointments, and processing requests, saving you valuable time and effort."
  },
  {
    icon: "fas fa-lock",
    title: "Aaditya Gaurav",
    img: "/images/aadi3.jpeg",  // 👈 Image path from public folder
    desc: "Implements advanced data encryption, multi-layer authentication, and compliance checks to safeguard your business data and user privacy."
  }
  ,
  {
    icon: "fas fa-chart-line",
    title: "Performance",
    desc: "Monitors business operations using intelligent tracking systems to ensure smooth workflows, identify bottlenecks, and boost overall productivity."
  },
  
  {
    icon: "fas fa-cogs",
    title: "Customization",
    img: "/images/deepanshu.jpeg",
    desc: "Provides highly adaptable AI modules tailored to your specific business model, customer base, and operational requirements."
  },
  {
    icon: "fas fa-chart-pie",
    title: "Analytics",
    desc: "Delivers clear, interactive dashboards and predictive analytics powered by machine learning to help you strategize for growth and success."
  }
].map((card, index) => (
  <div key={index} className="card">
  {card.img && (
    <img src={card.img} alt={card.title} className="card-banner" />
  )}
  <h3 className="card-title">{card.title}</h3>
  <p className="card-desc">{card.desc}</p>
</div>



))}
        </div>
      </div>
    </>
  );
};

export default Home;