import { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function App() {
  return (
    <div className="font-sans text-gray-800 ">
      <Navbar />
      <Hero />
      <Rooms />
      <Amenities />
      <Gallery />
      <WhyUs />
      <Offers />
      <Testimonials />      
      <FAQ />
      <Contact />
      <Footer />
    </div>
  );
}

/* ================= NAVBAR ================= */

function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState("rooms");
  const [open, setOpen] = useState(false);
  const [offerOpen, setOfferOpen] = useState(false);

  // 🔥 FIX: persist timeout
  const timeoutRef = useRef(null);

  const offerItems = [
    { label: "Weekend Escape", id: "offers" },
    { label: "Honeymoon Package", id: "offers" },
    { label: "Family Deal", id: "offers" },
    { label: "Luxury Suite Offer", id: "offers" },
  ];

  const navLinks = [
    { id: "offers", label: "Special Offers" },
    { id: "wedding", label: "Weddings" },
    { id: "rooms", label: "Rooms" },
    { id: "amenities", label: "Amenities" },
    { id: "gallery", label: "Gallery" },
    { id: "whyus", label: "About Us" },
  ];

  const sections = [
    "rooms",
    "amenities",
    "gallery",
    "whyus",
    "offers",
    "wedding",
    "contact",
  ];

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", onScroll);

    const observers = [];

    sections.forEach((id) => {
      const el = document.getElementById(id);
      if (!el) return;

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setActive(id);
          }
        },
        { threshold: 0.6 }
      );

      observer.observe(el);
      observers.push(observer);
    });

    return () => {
      window.removeEventListener("scroll", onScroll);
      observers.forEach((o) => o.disconnect());
    };
  }, []);

  return (
    <>
      {/* NAVBAR */}
      <div
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
          scrolled
            ? "bg-black/80 backdrop-blur-md shadow-lg"
            : "bg-transparent"
        }`}
      >
        <div className="w-full flex items-center justify-between px-6 py-4 text-white">

          {/* LEFT */}
          <div className="flex items-center gap-3">
            <img
              src="/resort.png"
              alt="Haven Resort Logo"
              className="w-8 h-8 object-contain"
            />
            <h1 className="font-bold text-xl tracking-wide">
              Haven Resort
            </h1>
          </div>

          {/* RIGHT */}
          <div className="hidden md:flex items-center gap-10">

            <div className="flex gap-8 text-sm relative">

              {navLinks.map(({ id, label }) => {

                // 🔥 SPECIAL OFFERS DROPDOWN
                if (id === "offers") {
                  return (
                    <div
                      key={id}
                      className="relative"
                      onMouseEnter={() => {
                        clearTimeout(timeoutRef.current);
                        setOfferOpen(true);
                      }}
                      onMouseLeave={() => {
                        timeoutRef.current = setTimeout(() => {
                          setOfferOpen(false);
                        }, 150);
                      }}
                    >
                      <a
                        href="#offers"
                        className={`relative transition-all duration-300 ${
                          active === "offers"
                            ? "text-white"
                            : "text-gray-400 hover:text-white"
                        }`}
                      >
                        {label}

                        <span
                          className={`absolute left-0 -bottom-1 h-[2px] bg-[#c8a45d] transition-all duration-300 ${
                            active === "offers" ? "w-full" : "w-0"
                          }`}
                        />
                      </a>

                      {/* DROPDOWN */}
                      <AnimatePresence>
                        {offerOpen && (
                          <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: 10 }}
                            transition={{ duration: 0.25 }}
                            className="absolute top-8 left-0 w-56 bg-black/90 backdrop-blur-md rounded-xl shadow-lg border border-gray-800 p-3 z-50"
                          >
                            {offerItems.map((item, i) => (
                              <a
                                key={i}
                                href={`#${item.id}`}
                                className="block px-4 py-2 text-sm text-gray-300 hover:text-white hover:bg-white/10 rounded-md transition"
                              >
                                {item.label}
                              </a>
                            ))}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  );
                }

                // 🔥 NORMAL LINKS
                return (
                  <a
                    key={id}
                    href={`#${id}`}
                    className={`relative transition-all duration-300 ${
                      active === id
                        ? "text-white"
                        : "text-gray-400 hover:text-white"
                    }`}
                  >
                    {label}

                    <span
                      className={`absolute left-0 -bottom-1 h-[2px] bg-[#c8a45d] transition-all duration-300 ${
                        active === id ? "w-full" : "w-0"
                      }`}
                    />
                  </a>
                );
              })}
            </div>

            {/* CTA */}
            <a href="#contact">
              <button
                className={`px-5 py-2 rounded-md font-semibold transition-all duration-300 ${
                  active === "contact"
                    ? "bg-white text-black"
                    : "bg-[#c8a45d] text-black"
                }`}
              >
                BOOK A STAY
              </button>
            </a>
          </div>

          {/* MOBILE */}
          <div className="md:hidden flex items-center gap-4">
            <a href="#contact">
              <button className="bg-[#c8a45d] text-black px-3 py-1 rounded text-xs">
                BOOK
              </button>
            </a>

            <button onClick={() => setOpen(true)}>☰</button>
          </div>
        </div>
      </div>

      {/* BACKDROP */}
      {open && (
        <div
          className="fixed inset-0 bg-black/60 z-40"
          onClick={() => setOpen(false)}
        />
      )}

      {/* MOBILE MENU */}
      <div
        className={`fixed top-0 right-0 h-full w-[70%] bg-black text-white z-50 transform transition-transform duration-300 ${
          open ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="p-6 space-y-6">

          <div className="flex justify-end">
            <button onClick={() => setOpen(false)}>✕</button>
          </div>

          <a href="#contact" onClick={() => setOpen(false)}>
            <button className="w-full bg-[#c8a45d] text-black py-2 rounded">
              Book a Stay
            </button>
          </a>

          {/* 🔥 MOBILE LINKS */}
          {navLinks.map(({ id, label }) => (
            <a
              key={id}
              href={`#${id}`}
              onClick={() => setOpen(false)}
              className="block text-lg text-gray-300 hover:text-white"
            >
              {label}
            </a>
          ))}

          {/* 🔥 MOBILE OFFERS LIST */}
          <div className="pt-4 border-t border-gray-700">
            <p className="text-gray-400 mb-2">Special Offers</p>
            {offerItems.map((item, i) => (
              <a
                key={i}
                href={`#${item.id}`}
                onClick={() => setOpen(false)}
                className="block pl-4 py-1 text-sm text-gray-300 hover:text-white"
              >
                • {item.label}
              </a>
            ))}
          </div>

        </div>
      </div>
    </>
  );
}

/* ================= HERO ================= */

function Hero() {
  return (
    <div className="h-[90vh] relative overflow-hidden">
      <video
        autoPlay
        loop
        muted
        className="absolute w-full h-full object-cover"
        src="/resort1.mp4"
      />

      <div className="absolute inset-0 bg-black/60 flex flex-col justify-center items-center text-white text-center px-4">
        <motion.h1 className="text-5xl md:text-7xl font-bold mb-4">
          Experience Pure Haven
        </motion.h1>

        <p className="mb-6 text-lg max-w-xl">
          Discover world-class hospitality, breathtaking views, and unforgettable experiences crafted just for you.
        </p>

        <div className="flex gap-4">
          <a href="#contact">
            <button className="bg-white text-black px-6 py-3 rounded-xl">
              Book Now
            </button>
          </a>  
          <a href="#rooms">
            <button className="border px-6 py-3 rounded-xl">
              Explore
            </button>
          </a>
        </div>
      </div>
    </div>
  );
}

/* ================= ROOMS ================= */

function Rooms() {
  const [selected, setSelected] = useState(null);

  const rooms = [
    { name: "Ocean Villa", price: "₹12,000", img: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2" },
    { name: "Mountain Suite", price: "₹9,000", img: "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85" },
    { name: "Haven Room", price: "₹7,000", img: "https://images.unsplash.com/photo-1590490360182-c33d57733427" }
  ];

  return (
    <div id="rooms" className="py-20">
      <div className="max-w-6xl mx-auto px-6">
        <h2 className="text-4xl font-bold mb-4 text-center">
          Rooms & Suites
        </h2>

        <p className="text-center text-gray-500 mb-10">
          Choose from a variety of luxurious accommodations designed for comfort and elegance.
        </p>

        <div className="grid md:grid-cols-3 gap-8">
          {rooms.map((room, i) => (
            <motion.div
              key={i}
              whileHover={{ scale: 1.05 }}
              className="rounded-2xl overflow-hidden shadow-lg cursor-pointer"
              onClick={() => setSelected(room)}
            >
              <img src={room.img} className="h-52 w-full object-cover" />
              <div className="p-4">
                <h3 className="text-xl font-semibold">{room.name}</h3>
                <p className="text-gray-500">{room.price} / night</p>
                <p className="text-sm text-gray-400 mt-2">
                  Spacious interiors, premium amenities, and scenic views.
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ================= AMENITIES ================= */

function Amenities() {
  const items = ["Pool", "Spa", "WiFi", "Dining", "Gym", "Beach"];

  return (
    <div id="amenities" className="bg-gray-100 py-20">
      <div className="max-w-5xl mx-auto px-6">
        <h2 className="text-4xl font-bold text-center mb-4">
          Amenities
        </h2>

        <p className="text-center text-gray-500 mb-10">
          Enjoy a wide range of facilities designed to elevate your stay.
        </p>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-6 text-center">
          {items.map((item, i) => (
            <motion.div
              key={i}
              whileHover={{ scale: 1.1 }}
              className="bg-white p-6 rounded-xl shadow"
            >
              <h3 className="font-semibold">{item}</h3>
              <p className="text-sm text-gray-500 mt-2">
                Premium quality service and comfort.
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ================= GALLERY ================= */

function Gallery() {
  const images = [
    "https://images.unsplash.com/photo-1505691938895-1758d7feb511",
    "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4",
    "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb"
  ];

  return (
    <div id="gallery" className="py-20">
      <div className="max-w-6xl mx-auto px-6">
        <h2 className="text-4xl font-bold text-center mb-4">
          Gallery
        </h2>

        <p className="text-center text-gray-500 mb-10">
          A glimpse into the beauty and Haven of our resort.
        </p>

        <div className="grid md:grid-cols-3 gap-6">
          {images.map((img, i) => (
            <motion.img
              key={i}
              whileHover={{ scale: 1.05 }}
              src={img}
              className="rounded-xl h-44 w-full object-cover"
            />
          ))}
        </div>
      </div>
    </div>
  );
}
function WhyUs() {
  const items = [
    { title: "Prime Location", desc: "Located in the heart of nature with stunning views." },
    { title: "Haven Experience", desc: "Premium rooms with world-class comfort." },
    { title: "24/7 Service", desc: "Round-the-clock support for all your needs." },
    { title: "Best Price", desc: "Affordable Haven with exclusive deals." }
  ];

  return (
    <section id="whyus" className="py-20 bg-white">  {/* ✅ ID FIX */}
      <div className="max-w-6xl mx-auto px-6 text-center">
        <h2 className="text-4xl font-bold mb-10">Why Choose Us</h2>

        <div className="grid md:grid-cols-4 gap-6">
          {items.map((item, i) => (
            <motion.div
              key={i}
              whileHover={{ y: -10 }}
              className="p-6 shadow-lg rounded-xl"
            >
              <h3 className="font-semibold text-lg mb-2">{item.title}</h3>
              <p className="text-gray-500 text-sm">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Offers() {
  const offers = [
    { title: "Honeymoon Package", price: "₹20,000", desc: "Romantic stay with candlelight dinner." },
    { title: "Family Deal", price: "₹15,000", desc: "Perfect vacation package for families." },
    { title: "Weekend Escape", price: "₹8,000", desc: "Relax and recharge your weekends." }
  ];

  return (
    <div className="py-20 bg-gray-100">
      <div className="max-w-6xl mx-auto px-6 text-center">
        <h2 className="text-4xl font-bold mb-10">Special Offers</h2>

        <div className="grid md:grid-cols-3 gap-8">
          {offers.map((offer, i) => (
            <motion.div
              key={i}
              whileHover={{ scale: 1.05 }}
              className="bg-white p-6 rounded-xl shadow-lg"
            >
              <h3 className="text-xl font-semibold">{offer.title}</h3>
              <p className="text-gray-500 my-2">{offer.desc}</p>
              <p className="font-bold text-lg">{offer.price}</p>
              <button className="mt-4 bg-black text-white px-4 py-2 rounded-lg">
                Book Now
              </button>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}

function Testimonials() {
  const reviews = [
    {
      name: "Amit Sharma",
      text: "Amazing experience! The rooms were luxurious and service was top-notch."
    },
    {
      name: "Priya Verma",
      text: "Perfect getaway. Loved the ambiance and hospitality."
    },
    {
      name: "Rahul Mehta",
      text: "Best resort I've ever stayed at. Highly recommended!"
    }
  ];

  return (
    <div className="py-20 bg-black text-white">
      <div className="max-w-5xl mx-auto px-6 text-center">
        <h2 className="text-4xl font-bold mb-10">What Our Guests Say</h2>

        <div className="grid md:grid-cols-3 gap-8">
          {reviews.map((r, i) => (
            <motion.div
              key={i}
              whileHover={{ scale: 1.05 }}
              className="bg-white text-black p-6 rounded-xl"
            >
              <p className="text-gray-600 mb-4">"{r.text}"</p>
              <h4 className="font-semibold">{r.name}</h4>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}

function FAQ() {
  const [open, setOpen] = useState(null);

  const faqs = [
    { q: "What is check-in time?", a: "Check-in starts from 2 PM." },
    { q: "Do you offer free WiFi?", a: "Yes, high-speed WiFi is available." },
    { q: "Is breakfast included?", a: "Yes, complimentary breakfast is included." }
  ];

  return (
    <div className="py-20 bg-white">
      <div className="max-w-3xl mx-auto px-6">
        <h2 className="text-4xl font-bold text-center mb-10">FAQ</h2>

        {faqs.map((faq, i) => (
          <div key={i} className="border-b py-4">
            <button
              onClick={() => setOpen(open === i ? null : i)}
              className="w-full text-left font-semibold"
            >
              {faq.q}
            </button>

            {open === i && (
              <p className="text-gray-500 mt-2">{faq.a}</p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}


/* ================= CONTACT ================= */

function Contact() {
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [room, setRoom] = useState("Ocean Villa");
  const [coupon, setCoupon] = useState("");
  const [discount, setDiscount] = useState(0);
  const [showCoupon, setShowCoupon] = useState(false);

  const prices = {
    "Ocean Villa": 12000,
    "Mountain Suite": 9000,
    "Haven Room": 7000,
  };

  const today = new Date().toISOString().split("T")[0];

  // Nights calculation
  const getNights = () => {
    if (!checkIn || !checkOut) return 0;

    const inDate = new Date(checkIn);
    const outDate = new Date(checkOut);

    const diff = (outDate - inDate) / (1000 * 60 * 60 * 24);
    return diff > 0 ? diff : 0;
  };

  const nights = getNights();
  const basePrice = nights * prices[room];

  // GST 18%
  const gst = basePrice * 0.18;

  // Discount
  const discountAmount = (basePrice * discount) / 100;

  const total = basePrice + gst - discountAmount;

  // Coupon logic
  const applyCoupon = () => {
    if (coupon === "HAVEN10") {
      setDiscount(10);
    } else if (coupon === "LUXE20") {
      setDiscount(20);
    } else {
      setDiscount(0);
      alert("Invalid Coupon");
    }
  };

  return (
    <div id="contact" className="bg-black text-white py-24">
      <div className="max-w-6xl mx-auto px-6">

        {/* Heading */}
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Book Your Stay
          </h2>
          <p className="text-gray-400">
            Luxury booking with real-time pricing
          </p>
        </div>

        {/* Booking Card */}
        <div className="bg-white text-black rounded-2xl p-8 grid md:grid-cols-5 gap-6 shadow-2xl">

          {/* Check In */}
          <div>
            <label className="text-sm text-gray-500">Check-In</label>
            <input
              type="date"
              min={today}
              value={checkIn}
              onChange={(e) => {
                setCheckIn(e.target.value);
                if (checkOut && e.target.value > checkOut) {
                  setCheckOut("");
                }
              }}
              className="w-full mt-2 p-3 border rounded-lg"
            />
          </div>

          {/* Check Out */}
          <div>
            <label className="text-sm text-gray-500">Check-Out</label>
            <input
              type="date"
              min={checkIn || today}
              value={checkOut}
              onChange={(e) => setCheckOut(e.target.value)}
              className="w-full mt-2 p-3 border rounded-lg"
            />
          </div>

          {/* Guests */}
          <div>
            <label className="text-sm text-gray-500">Guests</label>
            <select className="w-full mt-2 p-3 border rounded-lg">
              <option>1 Guest</option>
              <option>2 Guests</option>
              <option>3 Guests</option>
              <option>Family</option>
            </select>
          </div>

          {/* Room */}
          <div>
            <label className="text-sm text-gray-500">Room Type</label>
            <select
              value={room}
              onChange={(e) => setRoom(e.target.value)}
              className="w-full mt-2 p-3 border rounded-lg"
            >
              <option>Ocean Villa</option>
              <option>Mountain Suite</option>
              <option>Haven Room</option>
            </select>
          </div>

          {/* Book Button */}
          <div className="flex items-end">
            <button className="w-full bg-[#c8a45d] text-black py-3 rounded-lg font-semibold">
              Book Now
            </button>
          </div>
        </div>

        {/* 🔥 COUPON TOGGLE */}
        <div className="mt-6 text-center">
          {!showCoupon ? (
            <button
              onClick={() => setShowCoupon(true)}
              className="text-[#c8a45d] underline"
            >
              Have a coupon?
            </button>
          ) : (
            <div className="flex gap-4 justify-center">
              <input
                value={coupon}
                onChange={(e) => setCoupon(e.target.value)}
                placeholder="Enter Coupon Code"
                className="p-3 rounded text-black w-64"
              />

              <button
                onClick={applyCoupon}
                className="bg-[#c8a45d] text-black px-4 rounded"
              >
                Apply
              </button>

              {/* optional close */}
              <button
                onClick={() => setShowCoupon(false)}
                className="text-gray-400 text-sm"
              >
                ✕
              </button>
            </div>
          )}
        </div>

        {/* PRICE SUMMARY */}
        <div className="mt-10 bg-gray-900 rounded-2xl p-6 max-w-xl mx-auto">

          <h3 className="text-xl mb-4 text-center">
            Price Breakdown
          </h3>

          {nights > 0 ? (
            <div className="space-y-2 text-gray-300">

              <div className="flex justify-between">
                <span>{nights} Night(s)</span>
                <span>₹{basePrice.toLocaleString()}</span>
              </div>

              <div className="flex justify-between">
                <span>GST (18%)</span>
                <span>₹{gst.toLocaleString()}</span>
              </div>

              {discount > 0 && (
                <div className="flex justify-between text-green-400">
                  <span>Discount ({discount}%)</span>
                  <span>- ₹{discountAmount.toLocaleString()}</span>
                </div>
              )}

              <div className="border-t border-gray-700 pt-2 flex justify-between text-lg font-bold text-white">
                <span>Total</span>
                <span>₹{total.toLocaleString()}</span>
              </div>
            </div>
          ) : (
            <p className="text-center text-gray-500">
              Select dates to see pricing
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

/* ================= FOOTER ================= */

function Footer() {
  return (
    <div className="bg-black text-gray-300 pt-16 pb-8 text-sm">
      <div className="max-w-7xl mx-auto px-6">

        {/* 🔥 TOP SECTION */}
        <div className="grid md:grid-cols-4 gap-10 border-b border-gray-800 pb-10">

          {/* Subscribe */}
          <div>
            <h3 className="text-gray-400 mb-4 uppercase text-xs tracking-widest">
              Subscribe for latest updates
            </h3>

            <div className="flex items-center border-b border-gray-600 pb-2">
              <input
                placeholder="Enter your email Address"
                className="bg-transparent outline-none w-full text-white placeholder-gray-500"
              />
              <button className="bg-gray-700 px-4 py-2 text-xs tracking-widest hover:bg-gray-600">
                SUBSCRIBE
              </button>
            </div>

            <div className="mt-6 space-y-2 text-gray-400">
              <p><strong>For Bookings Contact</strong></p>
              <p className="text-white">+91-9000000000</p>

              <p className="mt-4"><strong>Customer Support</strong></p>
              <p className="text-white">contact@Havenresort.com</p>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-gray-400 mb-4 uppercase text-xs tracking-widest">
              Quick Links
            </h3>
            <ul className="space-y-2">
              <li>Hotels</li>
              <li>Dining</li>
              <li>Wellness</li>
              <li>Weddings</li>
              <li>Event Venues</li>
              <li>Offers</li>
            </ul>
          </div>

          {/* About */}
          <div>
            <h3 className="text-gray-400 mb-4 uppercase text-xs tracking-widest">
              About
            </h3>
            <ul className="space-y-2">
              <li>About Us</li>
              <li>Holidays</li>
              <li>Membership</li>
              <li>Blog</li>
              <li>Careers</li>
            </ul>
          </div>

          {/* Social */}
          <div>
            <h3 className="text-gray-400 mb-4 uppercase text-xs tracking-widest">
              Connect With Us
            </h3>

            <div className="flex gap-4 text-white text-lg">
              <span className="cursor-pointer">F</span>
              <span className="cursor-pointer">X</span>
              <span className="cursor-pointer">IG</span>
              <span className="cursor-pointer">YT</span>
              <span className="cursor-pointer">IN</span>
            </div>
          </div>
        </div>

        {/* 🔥 LOCATION SECTION */}
        <div className="py-10 border-b border-gray-800 grid md:grid-cols-2 gap-8 items-center">

          {/* MAP (LEFT) */}
          <div className="w-full h-[250px] rounded-xl overflow-hidden border border-gray-800">
            <iframe
              title="Haven Resort Location"
              src="https://www.google.com/maps?q=Goa&output=embed"
              className="w-full h-full border-0"
              loading="lazy"
            />
          </div>

          {/* ADDRESS (RIGHT) */}
          <div className="space-y-4">
            <h3 className="text-gray-400 uppercase text-xs tracking-widest">
              Our Location
            </h3>

            <p className="text-white text-sm leading-relaxed">
              Haven Resort, Beachside Road, <br />
              North Goa, India - 403001
            </p>

            <div className="text-gray-400 text-sm space-y-1">
              <p>
                📞 <span className="text-white">+91-9000000000</span>
              </p>
              <p>
                📧 <span className="text-white">contact@havenresort.com</span>
              </p>
            </div>
            <a
              href="https://www.google.com/maps"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block mt-2 text-[#c8a45d] text-sm hover:underline"
            >
              View on Google Maps →
            </a>
            
          </div>

        </div>

        {/* 🔥 BRANDS */}
        <div className="py-10 border-b border-gray-800">
          <h3 className="text-gray-400 mb-6 uppercase text-xs tracking-widest">
            Our Brands
          </h3>

          <div className="flex flex-wrap gap-6 text-white text-sm">
            <span>TAJ</span>
            <span>VIVANTA</span>
            <span>GINGER</span>
            <span>SELECTIONS</span>
            <span>GATEWAY</span>
            <span>AMA STAYS</span>
          </div>
        </div>

        {/* 🔥 BOTTOM BAR */}
        <div className="pt-6 flex flex-col md:flex-row justify-between gap-4 text-gray-500 text-xs">
          <p>© 2026 Haven Resort. All rights reserved.</p>

          <div className="flex flex-wrap gap-4">
            <span>Terms of Service</span>
            <span>Privacy Policy</span>
            <span>Cookies Policy</span>
            <span>Sitemap</span>
          </div>
        </div>
      </div>
    </div>
  );
}