import { useState, useRef } from "react";
import { Mail, Phone, MapPin, Send, Github, Linkedin, MessageSquare, Instagram, Facebook } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import emailjs from "@emailjs/browser";

const Contact = () => {
  const formRef = useRef<HTMLFormElement | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    if (!formRef.current) return;

    try {
      const result = await emailjs.sendForm(
        "service_yeeprqz",     // Replace with your EmailJS service ID
        "template_j0yjswr",    // Replace with your EmailJS template ID
        formRef.current,
        "3bZTmspU8KIyv9k7q"      // Replace with your EmailJS public key
      );

      toast({
        title: "Message Sent!",
        description: "Thank you for reaching out. I'll get back to you soon!",
      });

      setFormData({ name: "", email: "", message: "" });
    } catch (error) {
      console.error("Email sending error:", error);
      toast({
        title: "Something went wrong",
        description: "Message could not be sent. Please try again later.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const contactInfo = [
    {
      icon: Mail,
      label: "Email",
      value: "sasicodes@gmail.com",
      href: "mailto:sasicodes@gmail.com"
    },
    {
      icon: Phone,
      label: "Phone",
      value: "+91 94437 98476",
      href: "tel:+919443798476"
    },
    {
      icon: MapPin,
      label: "Location",
      value: "India",
      href: null
    }
  ];

  const socialLinks = [
    {
      icon: Linkedin,
      label: "LinkedIn",
      href: "https://linkedin.com/in/sasitharcodes",
      color: "hover:text-blue-400"
    },
    {
      icon: Github,
      label: "GitHub",
      href: "https://github.com/codesasithar/Projects",
      color: "hover:text-gray-400"
    },
    {
      icon: Instagram,
      label: "Instagram",
      href: "https://www.instagram.com/sasitharm/",
      color: "hover:text-pink-400"
    },
    {
      icon: Facebook,
      label: "Facebook",
      href: "https://www.facebook.com/snazzy.sasithar",
      color: "hover:text-blue-600"
    },
    {
      icon: MessageSquare,
      label: "WhatsApp",
      href: "https://wa.me/919443798476",
      color: "hover:text-green-400"
    }
  ];

  return (
    <section id="contact" className="section-container px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 sm:mb-6">
            Let's Work <span className="text-primary">Together</span>
          </h2>
          <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto glass-bg inline-block">
            Ready to bring your ideas to life? Get in touch and let's create something amazing together.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-10 sm:gap-12 lg:gap-16">
          {/* Contact Info */}
          <div className="space-y-8">
            <div>
              <h3 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6">Get In Touch</h3>
              <p className="text-base sm:text-lg text-muted-foreground mb-6 sm:mb-8 glass-bg">
                I'm always excited to work on new projects and collaborate with fellow developers and innovators.
              </p>
            </div>

            <div className="space-y-4 sm:space-y-6">
              {contactInfo.map((contact) => (
                <div key={contact.label} className="flex items-center">
                  <div className="p-3 bg-primary/10 rounded-lg mr-4">
                    <contact.icon className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">{contact.label}</p>
                    {contact.href ? (
                      <a
                        href={contact.href}
                        className="text-foreground hover:text-primary transition-colors font-medium"
                      >
                        {contact.value}
                      </a>
                    ) : (
                      <p className="text-foreground font-medium">{contact.value}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>

            <div>
              <h4 className="text-base sm:text-lg font-bold mb-3 sm:mb-4">Connect With Me</h4>
              <div className="flex flex-wrap gap-3 sm:gap-4">
                {socialLinks.map((social) => (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`p-3 sm:p-3.5 bg-secondary rounded-lg text-secondary-foreground ${social.color} transition-colors touch-manipulation min-w-[44px] min-h-[44px] flex items-center justify-center`}
                    title={social.label}
                  >
                    <social.icon className="h-5 w-5 sm:h-6 sm:w-6" />
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Form */}
          <div className="tech-card p-6 sm:p-8">
            <h3 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6">Send Me A Message</h3>
            <form ref={formRef} onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium mb-2">Your Name</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 bg-input border border-border rounded-lg focus:ring-2 focus:ring-primary"
                  placeholder="Enter your name"
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium mb-2">Email Address</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 bg-input border border-border rounded-lg focus:ring-2 focus:ring-primary"
                  placeholder="Enter your email"
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium mb-2">Message</label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  required
                  rows={5}
                  className="w-full px-4 py-3 bg-input border border-border rounded-lg focus:ring-2 focus:ring-primary resize-none"
                  placeholder="Hi buddy! Tell me!"
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full btn-tech group disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? (
                  "Sending..."
                ) : (
                  <>
                    Ping Sasi! Wake him up!
                  </>
                )}
              </button>
            </form>
          </div>
        </div>

        <div className="mt-16 pt-8 border-t border-border text-center">
          <p className="text-muted-foreground">
            © 2025 Sasithar M. Built with passion for technology and innovation.
          </p>
        </div>
      </div>
    </section>
  );
};

export default Contact;
