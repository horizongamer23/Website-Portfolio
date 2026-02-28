import { motion } from "motion/react";
import { Star, Quote } from "lucide-react";

const testimonials = [
  {
    name: "David Miller",
    role: "Owner, The Heritage Inn",
    content: "Growth Grid Media transformed our outdated site into a booking machine. Their professional approach and attention to detail were outstanding.",
    image: "https://i.pravatar.cc/150?u=david",
  },
  {
    name: "Elena Rodriguez",
    role: "Founder, Saffron Bistro",
    content: "The new website has doubled our online reservations. It's beautiful, fast, and our customers love the mobile experience.",
    image: "https://i.pravatar.cc/150?u=elena",
  },
  {
    name: "Marcus Thorne",
    role: "Partner, Thorne Law",
    content: "We needed a site that communicated authority. Growth Grid delivered exactly that, and we've seen a significant uptick in leads.",
    image: "https://i.pravatar.cc/150?u=marcus",
  },
];

export default function Testimonials() {
  return (
    <section id="testimonials" className="py-16 bg-gray-50">
      <div className="container mx-auto px-6">
        <div className="text-center max-w-3xl mx-auto mb-20">
          <span className="text-brand-blue font-bold uppercase tracking-widest text-sm mb-4 block">Testimonials</span>
          <h2 className="text-4xl lg:text-5xl font-bold mb-6">
            What Our <span className="text-brand-blue">Clients Say</span>
          </h2>
          <p className="text-lg text-gray-600">
            Don't just take our word for it. Here's how we've helped other businesses grow their online presence.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.name}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm relative"
            >
              <Quote className="absolute top-6 right-8 w-10 h-10 text-gray-100" />
              <div className="flex gap-1 mb-6">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                ))}
              </div>
              <p className="text-gray-600 italic mb-8 relative z-10">
                "{testimonial.content}"
              </p>
              <div className="flex items-center gap-4">
                <img
                  src={testimonial.image}
                  alt={testimonial.name}
                  className="w-12 h-12 rounded-full object-cover"
                  referrerPolicy="no-referrer"
                />
                <div>
                  <h4 className="font-bold text-brand-dark">{testimonial.name}</h4>
                  <p className="text-xs text-gray-500">{testimonial.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
