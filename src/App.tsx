/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { 
  Search, 
  Menu, 
  Moon, 
  Sun, 
  ChevronRight, 
  TrendingUp, 
  Facebook, 
  Twitter, 
  Instagram, 
  Youtube,
  ArrowRight,
  Clock,
  User,
  Share2,
  Bookmark
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

// --- Types ---
interface Post {
  id: number;
  title: string;
  category: string;
  excerpt: string;
  author: string;
  date: string;
  imageUrl: string;
  readTime: string;
}

// --- Mock Data ---
const FEATURED_POSTS: Post[] = [
  {
    id: 1,
    title: "The Future of Sustainable Architecture in Modern Cities",
    category: "Architecture",
    excerpt: "How architects are integrating vertical gardens and renewable energy into high-rise developments to combat urban heat islands.",
    author: "Elena Rossi",
    date: "May 12, 2024",
    imageUrl: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=1200",
    readTime: "8 min read"
  },
  {
    id: 2,
    title: "Quantum Computing: Breaking the Efficiency Barrier",
    category: "Tech",
    excerpt: "New breakthroughs in silicon-based quantum processors bring us closer to practical applications.",
    author: "Marcus Chen",
    date: "May 10, 2024",
    imageUrl: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=80&w=600",
    readTime: "5 min read"
  },
  {
    id: 3,
    title: "The Renaissance of Analog Photography in a Digital Age",
    category: "lifestyle",
    excerpt: "Why Gen Z is ditching high-end DSLRs for the grain and charm of vintage 35mm film cameras.",
    author: "Sophie Miller",
    date: "May 08, 2024",
    imageUrl: "https://images.unsplash.com/photo-1495121553079-4c61bbbc19ef?auto=format&fit=crop&q=80&w=600",
    readTime: "6 min read"
  },
  {
    id: 4,
    title: "Mediterranean Diet 2.0: The Science of Longevity",
    category: "Health",
    excerpt: "Exploring the specific micronutrients that make this ancient eating pattern so effective for heart health.",
    author: "Dr. Julian Hart",
    date: "May 05, 2024",
    imageUrl: "https://images.unsplash.com/photo-1490645935967-10de6ba17061?auto=format&fit=crop&q=80&w=600",
    readTime: "4 min read"
  }
];

const RECENT_POSTS: Post[] = [
  {
    id: 5,
    title: "Electric Aviation: Are We Ready for Takeoff?",
    category: "Tech",
    excerpt: "Prototype electric planes are successfully completing cross-country flights. Here is what's next for zero-emission travel.",
    author: "Liam Vance",
    date: "May 04, 2024",
    imageUrl: "https://images.unsplash.com/photo-1559136555-9303baea8ebd?auto=format&fit=crop&q=80&w=600",
    readTime: "7 min read"
  },
  {
    id: 6,
    title: "The Hidden Art of Coffee Roasting",
    category: "Lifestyle",
    excerpt: "A deep dive into the chemical reactions that transform green beans into the complex flavors of your morning cup.",
    author: "Sarah Jenks",
    date: "May 02, 2024",
    imageUrl: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&q=80&w=600",
    readTime: "5 min read"
  },
  {
    id: 7,
    title: "Minimalist Workspaces: Productivity or Perfectionism?",
    category: "Design",
    excerpt: "Does a clean desk really lead to a clear mind, or are we obsessing too much over aesthetics?",
    author: "Thomas Wright",
    date: "May 01, 2024",
    imageUrl: "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=600",
    readTime: "4 min read"
  },
  {
    id: 8,
    title: "Cybersecurity Trends for Small Businesses in 2024",
    category: "Business",
    excerpt: "Protecting your data doesn't have to cost a fortune. Essential steps every entrepreneur should take.",
    author: "Nina Gupta",
    date: "Apr 28, 2024",
    imageUrl: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=600",
    readTime: "9 min read"
  }
];

// --- Components ---

const Badge = ({ children, className = "" }: { children: React.ReactNode, className?: string }) => (
  <span className={`px-2 py-0.5 text-[10px] font-bold uppercase tracking-widest bg-brand-primary text-white rounded-sm ${className}`}>
    {children}
  </span>
);

const SectionHeading = ({ children }: { children: React.ReactNode }) => (
  <div className="flex items-center gap-4 mb-8">
    <h2 className="text-lg font-black uppercase tracking-tight text-slate-900 dark:text-white whitespace-nowrap">
      {children}
    </h2>
    <div className="h-px w-full bg-slate-200 dark:bg-white/10" />
  </div>
);

const PostCard = ({ post, variant = 'grid' }: { post: Post, variant?: 'grid' | 'list' | 'mini' }) => {
  if (variant === 'mini') {
    return (
      <div className="flex gap-4 items-center group">
        <div className="w-20 h-20 shrink-0 overflow-hidden bg-gray-200">
          <img 
            src={post.imageUrl} 
            alt={post.title} 
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
            loading="lazy"
          />
        </div>
        <div>
          <Badge className="mb-1 text-[8px]">{post.category}</Badge>
          <h4 className="text-sm font-semibold leading-tight group-hover:text-brand-primary transition-colors cursor-pointer line-clamp-2">
            {post.title}
          </h4>
          <span className="text-[10px] opacity-60 uppercase">{post.date}</span>
        </div>
      </div>
    );
  }

  if (variant === 'list') {
    return (
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="flex flex-col md:flex-row gap-6 pb-6 border-b border-black/5 dark:border-white/5 group"
      >
        <div className="md:w-1/3 aspect-[4/3] overflow-hidden bg-gray-200">
          <img 
            src={post.imageUrl} 
            alt={post.title} 
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
          />
        </div>
        <div className="md:w-2/3 flex flex-col justify-center">
          <Badge className="w-fit mb-2">{post.category}</Badge>
          <h3 className="text-xl md:text-2xl font-heading font-bold mb-3 group-hover:text-brand-primary transition-colors cursor-pointer italic">
            {post.title}
          </h3>
          <p className="text-sm opacity-70 mb-4 line-clamp-2 leading-relaxed">
            {post.excerpt}
          </p>
          <div className="flex items-center gap-4 text-[10px] uppercase font-bold tracking-wider opacity-60">
            <span className="flex items-center gap-1"><User size={12} /> {post.author}</span>
            <span className="flex items-center gap-1"><Clock size={12} /> {post.readTime}</span>
          </div>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="group"
    >
      <div className="relative aspect-[16/10] overflow-hidden bg-gray-200 mb-4">
        <img 
          src={post.imageUrl} 
          alt={post.title} 
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
        />
        <div className="absolute top-4 left-4">
          <Badge>{post.category}</Badge>
        </div>
        <div className="absolute top-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
          <button className="p-2 bg-white/10 backdrop-blur-md rounded-full text-white hover:bg-brand-primary transition-colors">
            <Bookmark size={14} />
          </button>
        </div>
      </div>
      <h3 className="text-lg font-heading font-bold mb-2 group-hover:text-brand-primary transition-colors cursor-pointer line-clamp-2">
        {post.title}
      </h3>
      <p className="text-sm opacity-70 mb-4 line-clamp-2 leading-relaxed">
        {post.excerpt}
      </p>
      <div className="flex items-center justify-between text-[10px] uppercase font-bold tracking-wider opacity-60">
        <span>{post.date}</span>
        <button className="flex items-center gap-1 group/btn">
          Read More <ChevronRight size={12} className="group-hover/btn:translate-x-1 transition-transform" />
        </button>
      </div>
    </motion.div>
  );
};

export default function App() {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    document.body.classList.toggle('dark');
  };

  return (
    <div className="min-h-screen Selection:bg-brand-primary Selection:text-white relative">
      {/* Mesh Gradient Background Elements */}
      <div className="fixed top-[-10%] left-[-10%] w-[400px] h-[400px] bg-blue-200 dark:bg-blue-900/20 rounded-full blur-[120px] opacity-40 pointer-events-none z-0" />
      <div className="fixed bottom-[10%] right-[-5%] w-[350px] h-[350px] bg-purple-200 dark:bg-purple-900/20 rounded-full blur-[100px] opacity-30 pointer-events-none z-0" />
      <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-indigo-100 dark:bg-indigo-900/10 rounded-full blur-[150px] opacity-20 pointer-events-none z-0" />

      {/* Content Wrapper to ensure visibility over blobs */}
      <div className="relative z-10 flex flex-col">
        {/* Top Banner / Social */}
        <div className="hidden lg:block border-b border-white/20 dark:border-white/5 py-2 backdrop-blur-sm bg-white/20 dark:bg-black/20">
          <div className="container mx-auto px-4 flex justify-between items-center text-[10px] uppercase font-bold tracking-widest text-slate-500 dark:text-slate-400">
            <div className="flex gap-4">
              <span>Tuesday, May 12, 2024</span>
              <span className="text-brand-primary animate-pulse flex items-center gap-1">
                <TrendingUp size={10} /> Trending: Sustainable Architecture
              </span>
            </div>
            <div className="flex gap-4">
              <Facebook size={12} className="cursor-pointer hover:text-brand-primary transition-colors" />
              <Twitter size={12} className="cursor-pointer hover:text-brand-primary transition-colors" />
              <Instagram size={12} className="cursor-pointer hover:text-brand-primary transition-colors" />
              <Youtube size={12} className="cursor-pointer hover:text-brand-primary transition-colors" />
            </div>
          </div>
        </div>

        {/* Header */}
        <header className={`sticky-nav transition-all duration-300 ${scrolled ? 'py-2 shadow-lg' : 'py-5'}`}>
          <div className="container mx-auto px-4 flex justify-between items-center">
            <div className="flex items-center gap-6">
              <button 
                className="lg:hidden p-2 text-slate-600 dark:text-slate-300"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
              >
                <Menu size={24} />
              </button>
              <div className="flex items-center gap-2">
                <div className="w-10 h-10 bg-brand-primary rounded-xl flex items-center justify-center shadow-lg shadow-brand-primary/30">
                  <span className="text-white font-black text-xl italic">T</span>
                </div>
                <div className="flex flex-col">
                  <h1 className="text-2xl font-black tracking-tighter uppercase leading-none text-slate-900 dark:text-white">
                    Trend<span className="text-brand-primary">Vibe</span>
                  </h1>
                  <span className="text-[8px] uppercase tracking-[0.3em] font-bold text-slate-400 dark:text-slate-500 ml-0.5">Premium Magazine</span>
                </div>
              </div>
            </div>

            <nav className="hidden lg:flex items-center gap-8">
              {['Tech', 'Lifestyle', 'Design', 'Health', 'Business'].map((link) => (
                <a 
                  key={link} 
                  href="#" 
                  className="text-[11px] font-bold uppercase tracking-widest text-slate-600 dark:text-slate-300 hover:text-brand-primary transition-colors relative group py-2"
                >
                  {link}
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-brand-primary group-hover:w-full transition-all duration-300" />
                </a>
              ))}
            </nav>

            <div className="flex items-center gap-4">
              <div className="hidden sm:flex items-center bg-white/40 dark:bg-slate-800/40 border border-white/60 dark:border-white/10 px-3 py-1.5 rounded-full group focus-within:bg-white dark:focus-within:bg-slate-800 focus-within:ring-2 focus-within:ring-brand-primary/20 transition-all backdrop-blur-sm shadow-inner">
                <Search size={16} className="text-slate-400" />
                <input 
                  type="text" 
                  placeholder="Search articles..." 
                  className="bg-transparent border-none outline-none text-xs ml-2 w-32 focus:w-48 transition-all dark:text-white"
                />
              </div>
              <button 
                onClick={toggleDarkMode}
                className="w-10 h-10 flex items-center justify-center bg-slate-900 dark:bg-white rounded-full text-white dark:text-slate-900 shadow-xl hover:scale-110 active:scale-95 transition-all"
              >
                {isDarkMode ? <Sun size={18} /> : <Moon size={18} />}
              </button>
            </div>
          </div>
        </header>

        <main className="container mx-auto px-4 py-8">
          {/* --- Hero Section --- */}
          <section className="mb-16">
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
              {/* Featured Post */}
              <motion.div 
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                className="lg:col-span-2 relative h-[400px] lg:h-[600px] group overflow-hidden rounded-2xl border border-white/40 dark:border-white/10 shadow-2xl"
              >
                <img 
                  src={FEATURED_POSTS[0].imageUrl} 
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                  alt="Main post"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent z-10" />
                <div className="absolute bottom-0 left-0 p-8 text-white w-full z-20">
                  <Badge className="mb-4">{FEATURED_POSTS[0].category}</Badge>
                  <h2 className="text-3xl lg:text-5xl font-black italic leading-tight mb-4 group-hover:underline underline-offset-8 transition-all decoration-brand-primary">
                    {FEATURED_POSTS[0].title}
                  </h2>
                  <p className="text-sm text-slate-200 mb-6 max-w-xl line-clamp-2">
                    {FEATURED_POSTS[0].excerpt}
                  </p>
                  <div className="flex items-center gap-4 text-[10px] font-bold uppercase tracking-widest text-slate-300">
                    <span className="flex items-center gap-1 font-medium"><User size={14} className="text-brand-primary" /> {FEATURED_POSTS[0].author}</span>
                    <span className="w-1 h-1 bg-white/30 rounded-full" />
                    <span className="flex items-center gap-1 font-medium"><Clock size={14} className="text-brand-primary" /> {FEATURED_POSTS[0].readTime}</span>
                  </div>
                </div>
              </motion.div>

              {/* Side Hero Column */}
              <div className="lg:col-span-2 grid grid-cols-1 gap-4">
                {FEATURED_POSTS.slice(1).map((post, idx) => (
                  <motion.div 
                    key={post.id}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 * (idx + 1) }}
                    className="relative flex-1 group overflow-hidden glass-panel rounded-2xl p-6 flex flex-col justify-end"
                  >
                    <div className="absolute inset-0 opacity-20 group-hover:opacity-40 transition-opacity">
                      <img 
                        src={post.imageUrl} 
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                        alt={post.title}
                      />
                    </div>
                    <div className="relative z-10">
                      <span className="text-[9px] font-bold text-brand-primary uppercase tracking-widest mb-2 block">{post.category}</span>
                      <h3 className="text-lg lg:text-xl font-bold leading-tight text-slate-800 dark:text-white group-hover:text-brand-primary transition-colors line-clamp-2">
                        {post.title}
                      </h3>
                      <div className="mt-4 text-[10px] text-slate-400 dark:text-slate-500 uppercase font-bold tracking-wider">{post.date} — {post.readTime}</div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>

          {/* --- Main Content Layout --- */}
          <div className="flex flex-col lg:grid lg:grid-cols-12 lg:gap-12">
            
            {/* Left Column: Latest News & Categories */}
            <div className="lg:col-span-8">
              <SectionHeading>Latest Articles</SectionHeading>
              <div className="space-y-8">
                {RECENT_POSTS.map((post) => (
                  <PostCard key={post.id} post={post} variant="list" />
                ))}
              </div>

              <div className="mt-12 flex justify-center">
                <button className="group px-10 py-4 bg-slate-900 dark:bg-white text-white dark:text-slate-900 border border-white/20 text-[11px] font-bold uppercase tracking-[0.2em] rounded-full shadow-2xl hover:scale-105 active:scale-95 transition-all flex items-center gap-2">
                  Explore More Articles
                  <ArrowRight size={14} className="group-hover:translate-x-2 transition-transform" />
                </button>
              </div>
            </div>

            {/* Right Column: Sidebar */}
            <aside className="lg:col-span-4 mt-20 lg:mt-0 space-y-8">
              
              {/* Popular Posts */}
              <div className="glass-panel border-white/60 dark:border-white/10 rounded-3xl p-6">
                <h4 className="text-xs font-black uppercase tracking-widest text-slate-900 dark:text-white mb-6 flex items-center gap-2">
                  <TrendingUp size={16} className="text-brand-primary" /> Trending Now
                </h4>
                <div className="space-y-6">
                  {RECENT_POSTS.map((post) => (
                    <PostCard key={`popular-${post.id}`} post={post} variant="mini" />
                  ))}
                </div>
              </div>

              {/* Newsletter */}
              <div className="p-8 bg-slate-950 dark:bg-white text-white dark:text-slate-900 rounded-3xl relative overflow-hidden group shadow-2xl border border-white/10 dark:border-slate-200">
                <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                  <TrendingUp size={120} />
                </div>
                <h3 className="text-2xl font-black italic mb-2 leading-tight uppercase relative z-10">
                  METRO<span className="text-brand-primary">INSIDER</span>
                </h3>
                <p className="text-xs opacity-70 mb-6 relative z-10 leading-relaxed">
                  Join 15,000+ creators receiving the weekly digest on the future of design and technology.
                </p>
                <form className="space-y-3 relative z-10">
                  <div className="relative">
                    <input 
                      type="email" 
                      placeholder="email@example.com" 
                      className="w-full bg-white/10 dark:bg-slate-100 border-white/20 dark:border-slate-200 border text-white dark:text-slate-900 placeholder:text-white/40 dark:placeholder:text-slate-400 px-4 py-3 outline-none focus:ring-2 focus:ring-brand-primary/50 transition-all rounded-xl text-xs"
                    />
                  </div>
                  <button className="w-full py-3 bg-brand-primary text-white font-bold uppercase text-[10px] tracking-widest hover:bg-blue-700 transition-all rounded-xl shadow-lg shadow-brand-primary/30">
                    Get Weekly Digest
                  </button>
                </form>
              </div>

              {/* Tags */}
              <div className="glass-panel rounded-3xl p-6">
                <h4 className="text-xs font-black uppercase tracking-widest text-slate-900 dark:text-white mb-6">Popular Labels</h4>
                <div className="flex flex-wrap gap-2">
                  {['AI', 'Future', 'UI/UX', 'Startup', 'Health', 'Photography', 'Business', 'Lifestyle'].map((label) => (
                    <a 
                      key={label} 
                      href="#" 
                      className="px-3 py-1.5 bg-white/60 dark:bg-slate-700/60 text-[9px] font-bold uppercase tracking-wider text-slate-600 dark:text-slate-300 rounded-md border border-white/40 dark:border-white/10 hover:bg-brand-primary hover:text-white dark:hover:bg-brand-primary dark:hover:text-white hover:scale-105 transition-all"
                    >
                      {label}
                    </a>
                  ))}
                </div>
              </div>

              {/* Ad Spot */}
              <div className="h-40 bg-slate-950 dark:bg-slate-100 rounded-3xl flex flex-col items-center justify-center p-6 text-center border border-white/10 dark:border-slate-200">
                <span className="text-[8px] text-white/40 dark:text-slate-400 uppercase tracking-widest mb-2 font-bold">Advertisement</span>
                <p className="text-white dark:text-slate-800 font-bold text-sm leading-tight mb-4 italic">Join the Global Design Summit 2024</p>
                <button className="px-5 py-2 bg-brand-primary text-white text-[9px] font-bold rounded-full shadow-lg shadow-brand-primary/20">Learn More</button>
              </div>

            </aside>
          </div>
        </main>

        {/* Footer */}
        <footer className="mt-20 bg-white/40 dark:bg-slate-900/40 backdrop-blur-xl border-t border-white/20 dark:border-white/10 py-12">
          <div className="container mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-6 text-[10px] text-slate-400 dark:text-slate-500 uppercase font-bold tracking-[0.2em]">
            <div className="flex flex-col md:flex-row items-center gap-6 italic">
              <span className="text-slate-600 dark:text-slate-400">© 2024 TrendVibe Media Group</span>
              <a href="#" className="hover:text-brand-primary transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-brand-primary transition-colors">Terms of Service</a>
            </div>
            <div className="flex gap-8 text-slate-600 dark:text-slate-300">
              <a href="#" className="hover:text-brand-primary transition-colors">INSTAGRAM</a>
              <a href="#" className="hover:text-brand-primary transition-colors">TWITTER</a>
              <a href="#" className="hover:text-brand-primary transition-colors">DRIBBBLE</a>
            </div>
          </div>
        </footer>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-slate-900/80 dark:bg-slate-950/90 backdrop-blur-2xl flex flex-col p-8 text-white"
          >
            <div className="flex justify-between items-center mb-12">
              <h1 className="text-2xl font-black tracking-tighter uppercase">
                Trend<span className="text-brand-primary">Vibe</span>
              </h1>
              <button 
                className="p-3 bg-white/10 rounded-full hover:bg-brand-primary transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                <ChevronRight size={20} className="rotate-90" />
              </button>
            </div>
            <nav className="flex flex-col gap-8 text-4xl font-black uppercase italic border-l-4 border-brand-primary pl-8">
              <a href="#" className="hover:text-brand-primary transition-colors" onClick={() => setIsMenuOpen(false)}>Technology</a>
              <a href="#" className="hover:text-brand-primary transition-colors" onClick={() => setIsMenuOpen(false)}>Lifestyle</a>
              <a href="#" className="hover:text-brand-primary transition-colors" onClick={() => setIsMenuOpen(false)}>Architecture</a>
              <a href="#" className="hover:text-brand-primary transition-colors" onClick={() => setIsMenuOpen(false)}>Design</a>
              <a href="#" className="hover:text-brand-primary transition-colors" onClick={() => setIsMenuOpen(false)}>Business</a>
            </nav>
            <div className="mt-auto pt-8 border-t border-white/10 flex gap-8 justify-center">
              <Facebook size={24} className="hover:text-brand-primary transition-colors cursor-pointer" />
              <Twitter size={24} className="hover:text-brand-primary transition-colors cursor-pointer" />
              <Instagram size={24} className="hover:text-brand-primary transition-colors cursor-pointer" />
              <Youtube size={24} className="hover:text-brand-primary transition-colors cursor-pointer" />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

