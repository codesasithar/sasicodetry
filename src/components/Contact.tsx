import { useState } from "react";
import { Mail, Phone, MapPin, Send, Github, Linkedin, MessageSquare } from "lucide-react";
import { useToast } from "@/hooks/use-toast";


const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Replace with your actual EmailJS IDs and PUBLIC_KEY!
    const SERVICE_ID = "service_yeeprqz";
    const TEMPLATE_ID = "template_j0yjswr";
    const PUBLIC_KEY = "3bZTmspU8KIyv9k7q"; // Should now be called "Public Key"

    try {
      await emailjs.send(
        SERVICE_ID,
        TEMPLATE_ID,
        {
          from_name: formData.name,
          from_email: formData.email,
          message: formData.message,
        },
        PUBLIC_KEY
      );

      toast({
        title: "Message Sent!",
        description: "Thank you for reaching out. I'll get back to you soon!",
      });
      setFormData({ name: "", email: "", message: "" });
    } catch (error) {
      toast({
        title: "Oops, something went wrong!",
        description: "Sorry, we couldn't send your message. Please try again later.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="contact-section">
      <h2>Contact Me</h2>
      <div className="contact-content">
        <form onSubmit={handleSubmit} className="contact-form">
          <label>
            Name
            <input
              name="name"
              type="text"
              value={formData.name}
              onChange={handleInputChange}
              required
              disabled={isSubmitting}
            />
          </label>
          <label>
            Email
            <input
              name="email"
              type="email"
              value={formData.email}
              onChange={handleInputChange}
              required
              disabled={isSubmitting}
            />
          </label>
          <label>
            Message
            <textarea
              name="message"
              value={formData.message}
              onChange={handleInputChange}
              required
              disabled={isSubmitting}
            />
          </label>
          <button type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Sending..." : <><Send size={16} /> Send</>}
          </button>
        </form>
        <div className="contact-details">
          <div><Mail size={18}/> your@email.com</div>
          <div><Phone size={18}/> +91 12345 67890</div>
          <div><MapPin size={18}/> Your City, Country</div>
          <div>
            <a href="https://github.com/YOUR_GITHUB" target="_blank" rel="noopener noreferrer"><Github size={18} /></a>
            <a href="https://linkedin.com/in/YOUR_LINKEDIN" target="_blank" rel="noopener noreferrer"><Linkedin size={18} /></a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
