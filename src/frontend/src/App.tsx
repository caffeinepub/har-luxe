import { Toaster } from "@/components/ui/sonner";
import {
  ArrowRight,
  ChevronRight,
  Heart,
  Search,
  ShoppingBag,
  User,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";
import { SiFacebook, SiInstagram, SiPinterest, SiX } from "react-icons/si";
import { toast } from "sonner";
import type { Product } from "./backend.d";
import {
  formatPrice,
  useGetAllProducts,
  useSeedProducts,
} from "./hooks/useQueries";

const SKELETON_KEYS = ["sk-1", "sk-2", "sk-3", "sk-4"];

// ─── HEADER ───────────────────────────────────────────────────────────────────
function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const navLinks = [
    { label: "SHOP", href: "#collections" },
    { label: "COLLECTIONS", href: "#collections" },
    { label: "BESPOKE", href: "#editorial" },
    { label: "ABOUT", href: "#about" },
    { label: "JOURNAL", href: "#journal" },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "bg-cream shadow-luxury" : "bg-cream"
      }`}
    >
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
        <div className="flex items-center justify-between h-16 lg:h-20">
          <a
            href="#hero"
            className="font-serif text-2xl lg:text-3xl font-light tracking-[0.12em] text-near-black"
            data-ocid="nav.link"
          >
            Har Luxe
          </a>

          <nav className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="text-[10px] font-sans font-medium tracking-[0.2em] text-charcoal hover:text-gold transition-colors duration-200"
                data-ocid="nav.link"
              >
                {link.label}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-4">
            <button
              type="button"
              className="hidden lg:flex p-1 text-charcoal hover:text-gold transition-colors"
              aria-label="Search"
              data-ocid="nav.button"
            >
              <Search size={17} strokeWidth={1.5} />
            </button>
            <button
              type="button"
              className="hidden lg:flex p-1 text-charcoal hover:text-gold transition-colors"
              aria-label="Account"
              data-ocid="nav.button"
            >
              <User size={17} strokeWidth={1.5} />
            </button>
            <button
              type="button"
              className="hidden lg:flex p-1 text-charcoal hover:text-gold transition-colors"
              aria-label="Wishlist"
              data-ocid="nav.button"
            >
              <Heart size={17} strokeWidth={1.5} />
            </button>
            <button
              type="button"
              className="flex items-center gap-1.5 p-1 text-charcoal hover:text-gold transition-colors"
              aria-label="Cart"
              data-ocid="nav.button"
            >
              <ShoppingBag size={17} strokeWidth={1.5} />
              <span className="text-[10px] font-sans tracking-[0.1em] hidden lg:inline">
                Cart-0
              </span>
            </button>
            <button
              type="button"
              className="lg:hidden p-1 text-charcoal"
              onClick={() => setMenuOpen((v) => !v)}
              aria-label="Menu"
              data-ocid="nav.button"
            >
              <div className="w-5 flex flex-col gap-1">
                <span
                  className={`block h-px bg-current transition-all ${menuOpen ? "rotate-45 translate-y-1.5" : ""}`}
                />
                <span
                  className={`block h-px bg-current transition-all ${menuOpen ? "opacity-0" : ""}`}
                />
                <span
                  className={`block h-px bg-current transition-all ${menuOpen ? "-rotate-45 -translate-y-1.5" : ""}`}
                />
              </div>
            </button>
          </div>
        </div>

        <AnimatePresence>
          {menuOpen && (
            <motion.nav
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="lg:hidden overflow-hidden border-t border-border"
            >
              <div className="py-4 flex flex-col gap-4">
                {navLinks.map((link) => (
                  <a
                    key={link.label}
                    href={link.href}
                    onClick={() => setMenuOpen(false)}
                    className="text-[11px] font-sans font-medium tracking-[0.2em] text-charcoal hover:text-gold transition-colors"
                    data-ocid="nav.link"
                  >
                    {link.label}
                  </a>
                ))}
              </div>
            </motion.nav>
          )}
        </AnimatePresence>
      </div>
      <div className="h-px bg-gradient-to-r from-transparent via-gold to-transparent opacity-40" />
    </header>
  );
}

// ─── HERO ─────────────────────────────────────────────────────────────────────
function Hero() {
  return (
    <section
      id="hero"
      className="relative w-full min-h-[90vh] flex items-center pt-20"
      style={{
        backgroundImage: "url('/assets/generated/case-hero.dim_1200x700.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(90deg, rgba(17,17,17,0.82) 0%, rgba(17,17,17,0.55) 45%, rgba(17,17,17,0.1) 100%)",
        }}
      />
      <div className="relative z-10 max-w-[1400px] mx-auto px-6 lg:px-12 w-full">
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-xl"
        >
          <p className="text-[10px] font-sans tracking-[0.35em] text-gold mb-4 uppercase">
            Handcrafted Luxury
          </p>
          <h1 className="font-serif text-5xl lg:text-7xl font-light text-white leading-[1.05] mb-6">
            Elevate Every Detail.
          </h1>
          <p className="font-sans text-sm text-white/75 tracking-wide mb-10 leading-relaxed">
            Discover Har Luxe: Handcrafted Luxury Phone Cases.
          </p>
          <a
            href="#collections"
            className="inline-flex items-center gap-3 border border-white/80 text-white text-[10px] font-sans tracking-[0.25em] px-8 py-4 hover:bg-white hover:text-near-black transition-all duration-300 uppercase"
            data-ocid="hero.primary_button"
          >
            Explore the Collection
            <ArrowRight size={13} strokeWidth={1.5} />
          </a>
        </motion.div>
      </div>
    </section>
  );
}

// ─── PRODUCT CARD ─────────────────────────────────────────────────────────────
function ProductCard({ product, index }: { product: Product; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className="group cursor-pointer"
      data-ocid={`collections.item.${index + 1}`}
    >
      <div className="relative overflow-hidden bg-white aspect-[6/7] mb-4">
        <img
          src={product.imageUrl}
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-near-black/0 group-hover:bg-near-black/10 transition-colors duration-300" />
        <div className="absolute bottom-4 left-0 right-0 flex justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <button
            type="button"
            className="bg-white text-near-black text-[9px] font-sans tracking-[0.25em] px-6 py-3 uppercase hover:bg-near-black hover:text-white transition-colors duration-200"
            data-ocid={`collections.secondary_button.${index + 1}`}
          >
            Quick View
          </button>
        </div>
      </div>
      <div className="px-1">
        <p className="text-[9px] font-sans tracking-[0.2em] text-charcoal uppercase mb-1">
          {product.name}
        </p>
        <div className="flex items-center justify-between">
          <span className="font-serif text-base text-near-black">
            {formatPrice(product.price)}
          </span>
          <a
            href="#collections"
            className="text-[9px] font-sans tracking-[0.15em] text-gold hover:text-near-black transition-colors duration-200 uppercase flex items-center gap-1"
            data-ocid={`collections.link.${index + 1}`}
          >
            Shop Now <ChevronRight size={10} />
          </a>
        </div>
      </div>
    </motion.div>
  );
}

function ProductCardSkeleton({ index }: { index: number }) {
  return (
    <div className="group" data-ocid={`collections.loading_state.${index + 1}`}>
      <div className="aspect-[6/7] mb-4 bg-muted animate-pulse" />
      <div className="px-1 space-y-2">
        <div className="h-2 bg-muted animate-pulse w-24 rounded-sm" />
        <div className="h-4 bg-muted animate-pulse w-16 rounded-sm" />
      </div>
    </div>
  );
}

// ─── FEATURED COLLECTIONS ─────────────────────────────────────────────────────
function FeaturedCollections() {
  const { data: products, isLoading } = useGetAllProducts();

  const displayProducts =
    products && products.length > 0
      ? products.slice(0, 4)
      : [
          {
            name: "Noir Obsidian",
            price: 8900n,
            imageUrl: "/assets/generated/case-black-leather.dim_600x700.jpg",
            description: "",
            category: "featured" as any,
          },
          {
            name: "Ivory Bloom",
            price: 7500n,
            imageUrl: "/assets/generated/case-cream-floral.dim_600x700.jpg",
            description: "",
            category: "featured" as any,
          },
          {
            name: "Emerald Reign",
            price: 9500n,
            imageUrl: "/assets/generated/case-emerald.dim_600x700.jpg",
            description: "",
            category: "bestSeller" as any,
          },
          {
            name: "Rose Luxe",
            price: 7900n,
            imageUrl: "/assets/generated/case-blush-crystal.dim_600x700.jpg",
            description: "",
            category: "bestSeller" as any,
          },
        ];

  return (
    <section id="collections" className="bg-cream py-20 lg:py-28">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <p className="text-[9px] font-sans tracking-[0.35em] text-gold mb-3 uppercase">
            Curated Selection
          </p>
          <h2 className="font-serif text-3xl lg:text-5xl font-light text-near-black tracking-wide">
            Featured Collections
          </h2>
          <div className="mt-4 mx-auto w-12 h-px bg-gold" />
        </motion.div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {isLoading
            ? SKELETON_KEYS.map((sk, i) => (
                <ProductCardSkeleton key={sk} index={i} />
              ))
            : displayProducts.map((product, i) => (
                <ProductCard key={product.name} product={product} index={i} />
              ))}
        </div>
      </div>
    </section>
  );
}

// ─── EDITORIAL MID-BAND ───────────────────────────────────────────────────────
function EditorialBand() {
  const { data: products } = useGetAllProducts();
  const bestsellers = products
    ? products.filter((p) => String(p.category) === "bestSeller").slice(0, 4)
    : [
        {
          name: "Emerald Reign",
          price: 9500n,
          imageUrl: "/assets/generated/case-emerald.dim_600x700.jpg",
          description: "",
          category: "bestSeller" as any,
        },
        {
          name: "Rose Luxe",
          price: 7900n,
          imageUrl: "/assets/generated/case-blush-crystal.dim_600x700.jpg",
          description: "",
          category: "bestSeller" as any,
        },
        {
          name: "Noir Obsidian",
          price: 8900n,
          imageUrl: "/assets/generated/case-black-leather.dim_600x700.jpg",
          description: "",
          category: "featured" as any,
        },
        {
          name: "Ivory Bloom",
          price: 7500n,
          imageUrl: "/assets/generated/case-cream-floral.dim_600x700.jpg",
          description: "",
          category: "featured" as any,
        },
      ];

  return (
    <section id="editorial" className="bg-white py-20 lg:py-28">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
        <div className="grid lg:grid-cols-3 gap-10 lg:gap-12 items-stretch">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="relative overflow-hidden aspect-[5/6]"
          >
            <img
              src="/assets/generated/case-cream-floral.dim_600x700.jpg"
              alt="Har Luxe editorial"
              className="w-full h-full object-cover"
              loading="lazy"
            />
            <div className="absolute bottom-4 left-4">
              <span className="bg-white/90 text-[9px] font-sans tracking-[0.2em] px-3 py-1.5 text-near-black uppercase">
                New Arrivals
              </span>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="flex flex-col justify-center px-0 lg:px-6"
            id="journal"
          >
            <p className="text-[9px] font-sans tracking-[0.3em] text-gold mb-4 uppercase">
              Our Philosophy
            </p>
            <h2 className="font-serif text-3xl lg:text-4xl font-light text-near-black leading-tight mb-6">
              The Art of Elegance
            </h2>
            <p className="font-sans text-[13px] text-charcoal leading-relaxed mb-8">
              Every Har Luxe case is born from a belief that the objects we
              carry daily deserve the same care as the finest accessories. We
              source only the most exquisite materials — full-grain leather,
              polished metals, hand-set stones — and craft each piece with
              unwavering attention to detail.
            </p>
            <p className="font-sans text-[13px] text-charcoal leading-relaxed mb-10">
              Our artisans spend hours on each case, ensuring that protection
              never compromises beauty.
            </p>
            <a
              href="#journal"
              className="self-start inline-flex items-center gap-2 border-b border-near-black text-[10px] font-sans tracking-[0.2em] text-near-black pb-1 hover:border-gold hover:text-gold transition-colors duration-200 uppercase"
              data-ocid="journal.link"
            >
              View Journal <ArrowRight size={11} strokeWidth={1.5} />
            </a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.3 }}
          >
            <p className="text-[9px] font-sans tracking-[0.3em] text-gold mb-2 uppercase">
              Most Loved
            </p>
            <h3 className="font-serif text-2xl font-light text-near-black mb-6">
              Bestsellers
            </h3>
            <div className="grid grid-cols-2 gap-3">
              {bestsellers.slice(0, 4).map((p, i) => (
                <div
                  key={p.name}
                  className="group cursor-pointer"
                  data-ocid={`bestsellers.item.${i + 1}`}
                >
                  <div className="relative overflow-hidden aspect-square mb-2">
                    <img
                      src={p.imageUrl}
                      alt={p.name}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      loading="lazy"
                    />
                  </div>
                  <p className="text-[9px] font-sans tracking-[0.15em] text-charcoal truncate">
                    {p.name}
                  </p>
                  <p className="font-serif text-sm text-near-black">
                    {formatPrice(p.price)}
                  </p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

// ─── TESTIMONIALS ─────────────────────────────────────────────────────────────
const TESTIMONIALS = [
  {
    quote:
      "The quality is extraordinary. My Noir Obsidian case has received more compliments than any bag I own.",
    name: "Isabelle M.",
    location: "Paris",
  },
  {
    quote:
      "Har Luxe redefined what a phone case can be. It feels like wearing a piece of fine jewellery.",
    name: "Sophia R.",
    location: "London",
  },
  {
    quote:
      "From the packaging to the product itself, every detail speaks of exceptional craftsmanship.",
    name: "Amara K.",
    location: "New York",
  },
];

function Testimonials() {
  return (
    <section id="about" className="bg-cream py-20 lg:py-24">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-14"
        >
          <p className="text-[9px] font-sans tracking-[0.35em] text-gold mb-3 uppercase">
            Client Stories
          </p>
          <h2 className="font-serif text-3xl lg:text-4xl font-light text-near-black">
            Voices of Elegance
          </h2>
          <div className="mt-4 mx-auto w-12 h-px bg-gold" />
        </motion.div>

        <div className="grid md:grid-cols-3 gap-10 lg:gap-16">
          {TESTIMONIALS.map((t, i) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.6 }}
              className="text-center"
              data-ocid={`testimonials.item.${i + 1}`}
            >
              <p className="font-serif text-2xl text-gold mb-4">&ldquo;</p>
              <p className="font-serif text-[15px] text-near-black italic leading-relaxed mb-5">
                {t.quote}
              </p>
              <div className="w-8 h-px bg-gold mx-auto mb-4" />
              <p className="text-[10px] font-sans tracking-[0.2em] text-charcoal uppercase">
                {t.name}
              </p>
              <p className="text-[9px] font-sans tracking-[0.15em] text-gold uppercase mt-0.5">
                {t.location}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── NEWSLETTER ───────────────────────────────────────────────────────────────
function Newsletter() {
  const [email, setEmail] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;
    toast.success("Thank you for subscribing to Har Luxe.", {
      description: "Expect curated dispatches of beauty and craft.",
    });
    setEmail("");
  };

  return (
    <section className="bg-white py-20 lg:py-24">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-xl mx-auto text-center"
        >
          <p className="text-[9px] font-sans tracking-[0.35em] text-gold mb-3 uppercase">
            Stay Connected
          </p>
          <h2 className="font-serif text-3xl lg:text-4xl font-light text-near-black mb-3">
            Refined Newsletter
          </h2>
          <p className="font-sans text-[13px] text-charcoal mb-8 leading-relaxed">
            Receive exclusive invitations, new collection launches, and essays
            on the art of beautiful objects.
          </p>

          <form
            onSubmit={handleSubmit}
            className="flex flex-col sm:flex-row gap-0 border border-border"
            data-ocid="newsletter.panel"
          >
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Your email address"
              className="flex-1 bg-transparent px-5 py-4 text-[12px] font-sans text-near-black placeholder:text-charcoal/50 outline-none"
              data-ocid="newsletter.input"
            />
            <button
              type="submit"
              className="bg-near-black text-white text-[10px] font-sans tracking-[0.2em] px-8 py-4 hover:bg-gold transition-colors duration-300 uppercase whitespace-nowrap"
              data-ocid="newsletter.submit_button"
            >
              Sign Up
            </button>
          </form>
        </motion.div>
      </div>
    </section>
  );
}

// ─── FOOTER ───────────────────────────────────────────────────────────────────
function Footer() {
  const year = new Date().getFullYear();
  const hostname =
    typeof window !== "undefined" ? window.location.hostname : "";
  const caffeineUrl = `https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(hostname)}`;

  const shopLinks = [
    { label: "New Arrivals", href: "#collections" },
    { label: "Featured", href: "#collections" },
    { label: "Bestsellers", href: "#editorial" },
    { label: "Bespoke", href: "#editorial" },
    { label: "Gift Cards", href: "#collections" },
  ];
  const aboutLinks = [
    { label: "Our Story", href: "#about" },
    { label: "Craftsmanship", href: "#editorial" },
    { label: "Sustainability", href: "#about" },
    { label: "Journal", href: "#journal" },
    { label: "Press", href: "#about" },
  ];
  const supportLinks = [
    { label: "Contact", href: "#about" },
    { label: "FAQ", href: "#about" },
    { label: "Shipping", href: "#about" },
    { label: "Returns", href: "#about" },
    { label: "Size Guide", href: "#about" },
  ];

  return (
    <footer className="bg-footer-bg text-footer-text">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12 pt-16 pb-8">
        <div className="grid lg:grid-cols-4 gap-12 lg:gap-8 mb-12">
          <div>
            <p className="font-serif text-4xl font-light tracking-[0.1em] text-footer-text mb-4">
              Har Luxe
            </p>
            <p className="font-sans text-[12px] text-footer-text/60 leading-relaxed mb-6">
              Handcrafted luxury phone cases for the discerning few.
            </p>
            <div className="flex items-center gap-4">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="text-footer-text/50 hover:text-gold transition-colors"
                data-ocid="footer.link"
              >
                <SiInstagram size={16} />
              </a>
              <a
                href="https://x.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="X"
                className="text-footer-text/50 hover:text-gold transition-colors"
                data-ocid="footer.link"
              >
                <SiX size={15} />
              </a>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                className="text-footer-text/50 hover:text-gold transition-colors"
                data-ocid="footer.link"
              >
                <SiFacebook size={16} />
              </a>
              <a
                href="https://pinterest.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Pinterest"
                className="text-footer-text/50 hover:text-gold transition-colors"
                data-ocid="footer.link"
              >
                <SiPinterest size={16} />
              </a>
            </div>
          </div>

          <div>
            <p className="text-[9px] font-sans tracking-[0.25em] text-gold uppercase mb-5">
              Shop
            </p>
            <ul className="space-y-3">
              {shopLinks.map((l) => (
                <li key={l.label}>
                  <a
                    href={l.href}
                    className="text-[12px] font-sans text-footer-text/60 hover:text-gold transition-colors"
                    data-ocid="footer.link"
                  >
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="text-[9px] font-sans tracking-[0.25em] text-gold uppercase mb-5">
              About
            </p>
            <ul className="space-y-3">
              {aboutLinks.map((l) => (
                <li key={l.label}>
                  <a
                    href={l.href}
                    className="text-[12px] font-sans text-footer-text/60 hover:text-gold transition-colors"
                    data-ocid="footer.link"
                  >
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="text-[9px] font-sans tracking-[0.25em] text-gold uppercase mb-5">
              Support
            </p>
            <ul className="space-y-3">
              {supportLinks.map((l) => (
                <li key={l.label}>
                  <a
                    href={l.href}
                    className="text-[12px] font-sans text-footer-text/60 hover:text-gold transition-colors"
                    data-ocid="footer.link"
                  >
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="border-t border-footer-text/10 pt-6 flex flex-col md:flex-row items-center justify-between gap-3">
          <p className="text-[11px] font-sans text-footer-text/40">
            &copy; {year} Har Luxe. All rights reserved.
          </p>
          <p className="text-[11px] font-sans text-footer-text/40">
            Built with love using{" "}
            <a
              href={caffeineUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-gold transition-colors"
            >
              caffeine.ai
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}

// ─── APP ──────────────────────────────────────────────────────────────────────
export default function App() {
  const { mutate: seedProducts } = useSeedProducts();
  const { data: products } = useGetAllProducts();

  useEffect(() => {
    if (products !== undefined && products.length === 0) {
      seedProducts();
    }
  }, [products, seedProducts]);

  return (
    <div className="min-h-screen flex flex-col">
      <Toaster position="bottom-right" />
      <Header />
      <main className="flex-1">
        <Hero />
        <FeaturedCollections />
        <EditorialBand />
        <Testimonials />
        <Newsletter />
      </main>
      <Footer />
    </div>
  );
}
