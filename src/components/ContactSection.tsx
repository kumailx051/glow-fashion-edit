import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Instagram, Twitter, Linkedin } from 'lucide-react';

interface ContactSectionProps {
  isAdminMode?: boolean;
  onEditText?: (element: HTMLElement) => void;
}

export default function ContactSection({ isAdminMode, onEditText }: ContactSectionProps) {
  const handleTextEdit = (e: React.MouseEvent<HTMLElement>) => {
    if (isAdminMode && onEditText) {
      e.preventDefault();
      e.stopPropagation();
      onEditText(e.currentTarget);
    }
  };

  const contactInfo = [
    {
      icon: Mail,
      label: "Email",
      value: "hello@arshmabatool.com",
      link: "mailto:hello@arshmabatool.com"
    },
    {
      icon: Phone,
      label: "Phone",
      value: "+1 (555) 123-4567",
      link: "tel:+15551234567"
    },
    {
      icon: MapPin,
      label: "Studio",
      value: "New York, NY",
      link: "#"
    }
  ];

  const socialLinks = [
    { icon: Instagram, href: "#", label: "Instagram" },
    { icon: Twitter, href: "#", label: "Twitter" },
    { icon: Linkedin, href: "#", label: "LinkedIn" }
  ];

  return (
    <section id="contact" className="py-20 px-6 bg-card/30">
      <div className="container mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 
            className={`text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent ${
              isAdminMode ? 'editable' : ''
            }`}
            onDoubleClick={handleTextEdit}
            data-editable="true"
          >
            Let's Create Together
          </h2>
          <p 
            className={`text-xl text-muted-foreground max-w-2xl mx-auto ${
              isAdminMode ? 'editable' : ''
            }`}
            onDoubleClick={handleTextEdit}
            data-editable="true"
          >
            Ready to bring your fashion vision to life? I'd love to hear about your project 
            and explore how we can collaborate to create something extraordinary.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">First Name</label>
                <input
                  type="text"
                  className="w-full px-4 py-3 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all duration-300"
                  placeholder="Your first name"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Last Name</label>
                <input
                  type="text"
                  className="w-full px-4 py-3 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all duration-300"
                  placeholder="Your last name"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground mb-2">Email</label>
              <input
                type="email"
                className="w-full px-4 py-3 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all duration-300"
                placeholder="your.email@example.com"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground mb-2">Project Type</label>
              <select className="w-full px-4 py-3 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all duration-300">
                <option>Custom Design</option>
                <option>Collection Collaboration</option>
                <option>Styling Consultation</option>
                <option>Brand Partnership</option>
                <option>Other</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground mb-2">Message</label>
              <textarea
                rows={6}
                className="w-full px-4 py-3 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all duration-300 resize-none"
                placeholder="Tell me about your project vision..."
              ></textarea>
            </div>

            <motion.button
              whileHover={{ scale: 1.02, y: -2 }}
              whileTap={{ scale: 0.98 }}
              className="w-full py-4 bg-gradient-to-r from-primary to-secondary text-primary-foreground rounded-lg font-medium hover:shadow-lg transition-all duration-300 glow-border"
            >
              Send Message
            </motion.button>
          </motion.div>

          {/* Contact Information */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <div>
              <h3 
                className={`text-2xl font-bold mb-6 text-foreground ${
                  isAdminMode ? 'editable' : ''
                }`}
                onDoubleClick={handleTextEdit}
                data-editable="true"
              >
                Get in Touch
              </h3>
              
              <div className="space-y-4">
                {contactInfo.map((item, index) => (
                  <motion.a
                    key={index}
                    href={item.link}
                    whileHover={{ x: 10 }}
                    className="flex items-center space-x-4 p-4 rounded-lg bg-background/50 hover:bg-background transition-all duration-300 group"
                  >
                    <div className="p-3 bg-primary/10 rounded-full group-hover:bg-primary/20 transition-colors duration-300">
                      <item.icon className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">{item.label}</p>
                      <p 
                        className={`font-medium text-foreground ${
                          isAdminMode ? 'editable' : ''
                        }`}
                        onDoubleClick={handleTextEdit}
                        data-editable="true"
                      >
                        {item.value}
                      </p>
                    </div>
                  </motion.a>
                ))}
              </div>
            </div>

            <div>
              <h3 
                className={`text-2xl font-bold mb-6 text-foreground ${
                  isAdminMode ? 'editable' : ''
                }`}
                onDoubleClick={handleTextEdit}
                data-editable="true"
              >
                Follow My Journey
              </h3>
              
              <div className="flex space-x-4">
                {socialLinks.map((social, index) => (
                  <motion.a
                    key={index}
                    href={social.href}
                    whileHover={{ scale: 1.1, y: -2 }}
                    whileTap={{ scale: 0.9 }}
                    className="p-4 bg-background/50 rounded-full hover:bg-gradient-to-r hover:from-primary/20 hover:to-secondary/20 transition-all duration-300 glow-border"
                    aria-label={social.label}
                  >
                    <social.icon className="w-6 h-6 text-primary" />
                  </motion.a>
                ))}
              </div>
            </div>

            <div className="p-6 bg-background/50 rounded-lg border border-primary/20">
              <h4 
                className={`text-lg font-semibold mb-2 text-foreground ${
                  isAdminMode ? 'editable' : ''
                }`}
                onDoubleClick={handleTextEdit}
                data-editable="true"
              >
                Studio Hours
              </h4>
              <div className="space-y-1 text-muted-foreground">
                <p 
                  className={isAdminMode ? 'editable' : ''}
                  onDoubleClick={handleTextEdit}
                  data-editable="true"
                >
                  Monday - Friday: 9:00 AM - 6:00 PM
                </p>
                <p 
                  className={isAdminMode ? 'editable' : ''}
                  onDoubleClick={handleTextEdit}
                  data-editable="true"
                >
                  Saturday: 10:00 AM - 4:00 PM
                </p>
                <p 
                  className={isAdminMode ? 'editable' : ''}
                  onDoubleClick={handleTextEdit}
                  data-editable="true"
                >
                  Sunday: By Appointment
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}