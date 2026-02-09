import React, { useState, useEffect, useRef } from 'react';
import {
  Play,
  Music,
  BookOpen,
  ArrowRight,
  Globe,
  Cpu,
  ExternalLink,
  Menu,
  X,
  Mail,
  MessageCircle,
  User,
  Mic2
} from 'lucide-react';

// --- Assets & Data ---

const PORTFOLIO_DATA = {
  name: "Suman Samanta",
  brand: "SamanTaa",
  roles: ["Music Enthusiast", "Singer", "Knowledge Explorer"],
  about: "A music enthusiast and knowledge explorer. I share musical creations, interesting fact breakdowns and cinematic storytelling that blend creativity with curiosity.",
  partner: "Diganta Pal",
  partnerRole: "Co-Editor",
  channelUrl: "https://www.youtube.com/channel/UCwJBJSNBxLxTZjhcaTudP1A",
  email: "samanny090@gmail.com",
  whatsapp: "7872061471",
  instagram: "https://instagram.com/helosaam",
  videos: [
    {
      id: "6FcVZCyrjDU",
      title: "Varanasi: The City Beyond Life and Death | Kashi Documentary",
      category: "Documentary",
      views: "Cinematic"
    },
    {
      id: "c2j23Fj7GX4",
      title: "MYSTERY OF BHANGARH FORT | WHY IS THIS PLACE SO MYSTERIOUS?",
      category: "Horror / Mystery",
      views: "Featured"
    },
    {
      id: "d9y-aO1cRQk",
      title: "THE GAMBLING OF ELON MUSK",
      category: "Analysis",
      views: "Tech Vision"
    },
    {
      id: "HmHF8GGvVy4",
      title: "The Creator of 'Vande Mataram' | Rishi Bankim Chandra",
      category: "History",
      views: "Educational"
    },
    {
      id: "K-bHj0xKcnE",
      title: "CAN TIME REALLY SLOW DOWN? ⏳ Theory of Relativity",
      category: "Science",
      views: "Physics"
    },
    {
      id: "VSh2XsoZQDE",
      title: "SOCOTRA ISLAND - THE MOST ALIEN PLACE ON EARTH",
      category: "Travel",
      views: "Nature"
    }
  ],
  shorts: [
    {
      id: "yX9iOAuRNuY",
      title: "Shape of You - Laptop x Guitar Jam",
      category: "Music"
    },
    {
      id: "9kJLVD0sul0",
      title: "HUSN - Anuv Jain (Unpluuged)",
      category: "Cover"
    },
    {
      id: "eFdtwY72wsM",
      title: "From My Mind to Music 🎧✨",
      category: "Original"
    }
  ],
  skills: [
    { icon: Music, title: "Music Composition", desc: "Original scores & Soundscapes" },
    { icon: Mic2, title: "Vocals & Singing", desc: "Expressive musical performance" },
    { icon: BookOpen, title: "Storytelling", desc: "Educational narratives" },
    { icon: Cpu, title: "Tech Analysis", desc: "Futurism & breakdown" },
  ]
};

// --- Components ---

const FadeIn = ({ children, delay = 0, className = "" }) => {
  const [isVisible, setVisible] = useState(false);
  const domRef = useRef();

  useEffect(() => {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setVisible(true);
        }
      });
    }, { threshold: 0.1 });

    const currentElement = domRef.current;
    if (currentElement) observer.observe(currentElement);
    return () => {
      if (currentElement) observer.unobserve(currentElement);
    };
  }, []);

  return (
    <div
      ref={domRef}
      style={{ transitionDelay: `${delay}ms` }}
      className={`transition-all duration-1000 ease-out transform ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        } ${className}`}
    >
      {children}
    </div>
  );
};

// Clean "White Apple" Card Style
const CleanCard = ({ children, className = "", hoverEffect = true }) => (
  <div className={`relative overflow-hidden bg-white border border-gray-200 rounded-2xl shadow-sm ${hoverEffect ? 'hover:shadow-xl hover:border-gray-300 transition-all duration-500 hover:-translate-y-1' : ''} ${className}`}>
    {children}
  </div>
);

const VideoCard = ({ video, isShort = false }) => (
  <CleanCard className="group h-full flex flex-col">
    <a href={`https://www.youtube.com/${isShort ? 'shorts' : 'watch?v='}${video.id}`} target="_blank" rel="noopener noreferrer" className="block relative aspect-video overflow-hidden bg-gray-100">
      <img
        src={`https://img.youtube.com/vi/${video.id}/maxresdefault.jpg`}
        alt={video.title}
        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
      />
      <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
        <div className="w-16 h-16 rounded-full bg-white/90 backdrop-blur-sm shadow-lg flex items-center justify-center pl-1">
          <Play className="w-6 h-6 text-black fill-current" />
        </div>
      </div>
      <div className="absolute top-3 right-3 bg-black/70 backdrop-blur-md px-2 py-1 rounded-md text-[10px] text-white font-medium tracking-wide uppercase">
        {video.views}
      </div>
    </a>
    <div className="p-6 flex flex-col flex-grow">
      <div className="text-gray-500 text-xs font-bold tracking-wider uppercase mb-2">{video.category}</div>
      <h3 className="text-gray-900 text-lg font-bold leading-snug mb-3 line-clamp-2">
        {video.title}
      </h3>
      <div className="mt-auto pt-4 border-t border-gray-100 flex items-center text-sm font-medium text-gray-500 group-hover:text-black transition-colors">
        <span>Watch Now</span>
        <ArrowRight className="w-4 h-4 ml-2 transform group-hover:translate-x-1 transition-transform" />
      </div>
    </div>
  </CleanCard>
);

const NavBar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: "Portfolio", href: "#portfolio" },
    { name: "Shorts", href: "#shorts" },
    { name: "About", href: "#about" },
  ];

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'bg-white/90 backdrop-blur-lg border-b border-gray-200 py-3 shadow-sm' : 'bg-transparent py-5'}`}>
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        <div className="text-xl font-extrabold tracking-tight text-black">
          {PORTFOLIO_DATA.brand}
        </div>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center space-x-8">
          {navLinks.map(link => (
            <a key={link.name} href={link.href} className="text-sm font-medium text-gray-600 hover:text-black transition-colors">
              {link.name}
            </a>
          ))}
          <a
            href={PORTFOLIO_DATA.channelUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-2 rounded-full bg-black text-white font-medium text-sm hover:bg-gray-800 transition-all shadow-lg shadow-black/10 hover:shadow-black/20"
          >
            Subscribe
          </a>
        </div>

        {/* Mobile Toggle */}
        <button className="md:hidden text-black p-2" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
          {mobileMenuOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-white border-b border-gray-100 p-6 flex flex-col space-y-4 shadow-xl animate-in slide-in-from-top-5">
          {navLinks.map(link => (
            <a
              key={link.name}
              href={link.href}
              onClick={() => setMobileMenuOpen(false)}
              className="text-lg font-medium text-gray-800"
            >
              {link.name}
            </a>
          ))}
          <a
            href={PORTFOLIO_DATA.channelUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block text-center w-full py-3 rounded-xl bg-black text-white font-medium"
          >
            Subscribe
          </a>
        </div>
      )}
    </nav>
  );
};

export default function App() {
  return (
    <div className="min-h-screen bg-[#F5F5F7] text-gray-900 font-sans selection:bg-black selection:text-white">

      <NavBar />

      <main>

        {/* HERO SECTION */}
        {/* Updated with simple light blue gradient */}
        <section className="min-h-screen flex items-center justify-center px-6 pt-20 bg-gradient-to-b from-blue-50 via-white to-white relative overflow-hidden">
          {/* Subtle Ambient Background */}
          <div className="absolute top-0 left-0 w-full h-full opacity-40 pointer-events-none">
            <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-blue-100/50 rounded-full blur-[120px]" />
          </div>

          <div className="max-w-4xl mx-auto text-center relative z-10">
            <FadeIn delay={100}>
              <div className="inline-block px-4 py-1.5 rounded-full border border-gray-200 bg-white/50 text-[10px] font-bold tracking-widest uppercase text-gray-500 mb-8 shadow-sm backdrop-blur-sm">
                Official Portfolio
              </div>
            </FadeIn>

            <FadeIn delay={300}>
              <h1 className="text-6xl md:text-8xl lg:text-9xl font-extrabold tracking-tighter mb-8 text-black leading-none">
                {PORTFOLIO_DATA.name}
              </h1>
            </FadeIn>

            <FadeIn delay={500}>
              <div className="flex flex-wrap justify-center gap-4 md:gap-8 text-lg md:text-2xl font-light text-gray-500 mb-12 tracking-wide">
                {PORTFOLIO_DATA.roles.map((role, idx) => (
                  <React.Fragment key={idx}>
                    <span className="text-gray-900">{role}</span>
                    {idx !== PORTFOLIO_DATA.roles.length - 1 && <span className="text-gray-300 hidden md:inline">•</span>}
                  </React.Fragment>
                ))}
              </div>
            </FadeIn>

            <FadeIn delay={700} className="flex flex-col md:flex-row items-center justify-center gap-4">
              <a href="#portfolio" className="w-full md:w-auto px-8 py-3.5 rounded-full bg-black text-white font-medium hover:bg-gray-800 transition-all hover:scale-105 flex items-center justify-center gap-2 shadow-xl shadow-black/10">
                <Play className="w-4 h-4 fill-current" />
                <span>Watch Showreel</span>
              </a>
              <a href="#about" className="w-full md:w-auto px-8 py-3.5 rounded-full bg-white text-black border border-gray-200 hover:bg-gray-50 hover:border-gray-300 transition-all font-medium flex items-center justify-center gap-2 shadow-sm">
                <span>Explore Work</span>
              </a>
            </FadeIn>
          </div>
        </section>

        {/* FEATURED VIDEOS GRID */}
        <section id="portfolio" className="py-24 px-6 bg-[#F5F5F7]">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
              <div>
                <h2 className="text-3xl md:text-4xl font-bold mb-3 tracking-tight text-black">Cinematic Showcase</h2>
                <p className="text-gray-500 max-w-lg">
                  Curated selection of documentaries, music, and deep-dive analyses.
                </p>
              </div>
              <a href={PORTFOLIO_DATA.channelUrl} target="_blank" rel="noopener noreferrer" className="flex items-center text-gray-900 hover:text-gray-600 transition-colors gap-2 text-sm font-semibold group">
                View All on YouTube <ExternalLink className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
              </a>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {PORTFOLIO_DATA.videos.map((video, idx) => (
                <FadeIn key={video.id} delay={idx * 100}>
                  <VideoCard video={video} />
                </FadeIn>
              ))}
            </div>
          </div>
        </section>

        {/* SHORTS SECTION */}
        <section id="shorts" className="py-24 px-6 bg-white border-y border-gray-200 overflow-hidden">
          <div className="max-w-7xl mx-auto">
            <div className="flex items-center gap-4 mb-10">
              <div className="w-10 h-10 rounded-full bg-black text-white flex items-center justify-center shadow-lg">
                <Play className="w-5 h-5 fill-current ml-0.5" />
              </div>
              <h2 className="text-3xl font-bold tracking-tight text-black">Shorts & Highlights</h2>
            </div>

            <div className="flex overflow-x-auto pb-12 gap-6 snap-x scrollbar-hide -mx-6 px-6 md:mx-0 md:px-0">
              {PORTFOLIO_DATA.shorts.map((short) => (
                <div key={short.id} className="min-w-[280px] md:min-w-[320px] snap-center">
                  <CleanCard className="h-full group rounded-3xl border-0 shadow-lg hover:shadow-2xl">
                    <a href={`https://www.youtube.com/shorts/${short.id}`} target="_blank" rel="noopener noreferrer" className="block relative aspect-[9/16]">
                      <img
                        src={`https://img.youtube.com/vi/${short.id}/maxresdefault.jpg`}
                        alt={short.title}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60" />
                      <div className="absolute bottom-6 left-6 right-6 text-white">
                        <div className="text-[10px] font-bold mb-2 uppercase tracking-wider opacity-80">{short.category}</div>
                        <h3 className="font-bold text-lg leading-tight shadow-black drop-shadow-md">{short.title}</h3>
                      </div>
                      <div className="absolute top-4 right-4 bg-white/30 backdrop-blur-md p-3 rounded-full border border-white/40 group-hover:bg-white group-hover:text-black transition-all transform group-hover:scale-110">
                        <Play className="w-4 h-4 fill-current" />
                      </div>
                    </a>
                  </CleanCard>
                </div>
              ))}
              <div className="min-w-[200px] snap-center flex items-center justify-center">
                <a href={PORTFOLIO_DATA.channelUrl} target="_blank" rel="noopener noreferrer" className="text-center group">
                  <div className="w-20 h-20 mx-auto rounded-full bg-gray-50 border border-gray-200 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform group-hover:bg-black group-hover:text-white group-hover:shadow-xl">
                    <ArrowRight className="w-8 h-8" />
                  </div>
                  <span className="text-sm font-bold text-gray-500 group-hover:text-black">View More</span>
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* ABOUT & SKILLS */}
        <section id="about" className="py-24 px-6 bg-[#F5F5F7]">
          <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">

            {/* Left: Text */}
            <FadeIn>
              <h2 className="text-xs font-bold tracking-widest text-gray-400 uppercase mb-6">About The Creator</h2>
              <h3 className="text-4xl md:text-5xl font-bold mb-8 leading-tight text-black">
                Creativity blended with <span className="text-gray-400">curiosity.</span>
              </h3>
              <p className="text-xl text-gray-600 leading-relaxed mb-10 font-light">
                {PORTFOLIO_DATA.about}
              </p>

              {/* Partner Block */}
              <div className="flex items-center gap-5 p-6 bg-white rounded-2xl border border-gray-200 shadow-sm w-full md:w-fit hover:shadow-md transition-shadow">
                <div className="w-14 h-14 bg-gray-50 rounded-full flex items-center justify-center text-gray-400 border border-gray-100">
                  <User className="w-6 h-6" />
                </div>
                <div>
                  <div className="text-xs font-bold uppercase text-gray-400 tracking-wider mb-1">{PORTFOLIO_DATA.partnerRole}</div>
                  <div className="text-xl font-bold text-black">{PORTFOLIO_DATA.partner}</div>
                </div>
              </div>
            </FadeIn>

            {/* Right: Skills Grid */}
            <div id="skills">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {PORTFOLIO_DATA.skills.map((skill, idx) => (
                  <FadeIn key={idx} delay={idx * 100}>
                    <CleanCard className="p-8 h-full flex flex-col justify-center items-start group">
                      <div className="w-12 h-12 rounded-xl bg-gray-50 border border-gray-100 flex items-center justify-center mb-6 group-hover:bg-black group-hover:text-white transition-colors duration-300 shadow-sm">
                        <skill.icon className="w-6 h-6" />
                      </div>
                      <h4 className="text-lg font-bold text-gray-900 mb-2">{skill.title}</h4>
                      <p className="text-sm text-gray-500 leading-relaxed">{skill.desc}</p>
                    </CleanCard>
                  </FadeIn>
                ))}
              </div>
            </div>

          </div>
        </section>

        {/* FOOTER */}
        <footer className="py-20 bg-white border-t border-gray-200">
          <div className="max-w-7xl mx-auto px-6">
            <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-12 mb-16">
              <div className="max-w-md">
                <h4 className="text-3xl font-extrabold text-black tracking-tight mb-4">SamanTaa</h4>
                <p className="text-gray-500 text-lg">Creating at the intersection of music and knowledge.</p>
              </div>
              <div className="flex flex-wrap gap-4 w-full lg:w-auto">
                <a href={`mailto:${PORTFOLIO_DATA.email}`} className="flex-1 lg:flex-none justify-center px-8 py-4 rounded-full border border-gray-200 bg-white text-gray-900 font-bold hover:bg-gray-50 transition-colors flex items-center gap-3 shadow-sm hover:shadow-md">
                  <Mail className="w-5 h-5" />
                  <span>Email Me</span>
                </a>
                <a href={`https://wa.me/${PORTFOLIO_DATA.whatsapp}`} target="_blank" rel="noopener noreferrer" className="flex-1 lg:flex-none justify-center px-8 py-4 rounded-full bg-[#25D366] text-white font-bold hover:bg-[#20bd5a] transition-colors flex items-center gap-3 shadow-lg shadow-green-500/20 border-0 hover:shadow-green-500/30">
                  <MessageCircle className="w-5 h-5 fill-white" />
                  <span>WhatsApp</span>
                </a>
              </div>
            </div>

            <div className="pt-8 border-t border-gray-100 flex flex-col md:flex-row justify-between items-center gap-6 text-sm text-gray-400 font-medium">
              <p>© 2026 Suman Samanta. All rights reserved.</p>
              <div className="flex gap-8">
                <a href={PORTFOLIO_DATA.channelUrl} target="_blank" rel="noopener noreferrer" className="hover:text-black transition-colors">
                  YouTube
                </a>
                <a href={PORTFOLIO_DATA.instagram} target="_blank" rel="noopener noreferrer" className="hover:text-black transition-colors">
                  Instagram
                </a>
              </div>
            </div>
          </div>
        </footer>

      </main>
    </div>
  );
}
