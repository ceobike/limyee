"use client";

import { useState } from "react";
import { PageHeader } from "@/components/layout/page-header";
import { ErrorBoundary } from "@/components/ui/error-boundary";
import { Phone, Mail, MapPin, Send, Clock } from "lucide-react";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    subject: "",
    message: "",
  });
  
  const [formStatus, setFormStatus] = useState<{
    status: "idle" | "submitting" | "success" | "error";
    message: string;
  }>({
    status: "idle",
    message: "",
  });

  // Handle form input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate form
    if (!formData.name || !formData.email || !formData.message) {
      setFormStatus({
        status: "error",
        message: "Please fill in all required fields.",
      });
      return;
    }
    
    // Set submitting status
    setFormStatus({
      status: "submitting",
      message: "Sending your message...",
    });
    
    // Simulate API call
    setTimeout(() => {
      // In a real application, this would be an API call
      console.log("Form submitted:", formData);
      
      // Reset form
      setFormData({
        name: "",
        email: "",
        phone: "",
        company: "",
        subject: "",
        message: "",
      });
      
      // Set success status
      setFormStatus({
        status: "success",
        message: "Your message has been sent successfully. We'll get back to you soon!",
      });
      
      // Reset status after 5 seconds
      setTimeout(() => {
        setFormStatus({
          status: "idle",
          message: "",
        });
      }, 5000);
    }, 1500);
  };

  // Breadcrumb items
  const breadcrumbItems = [
    { label: "Contact", href: "/contact" },
  ];

  return (
    <div>
      <ErrorBoundary sectionName="Contact Page Header">
        <PageHeader
          title="Contact Us"
          titleEn="Contact Us"
          description="Get in touch with our team for inquiries, support, or partnership opportunities."
          breadcrumbItems={breadcrumbItems}
        />
      </ErrorBoundary>

      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Contact Information */}
          <div className="lg:col-span-1">
            <ErrorBoundary sectionName="Contact Information">
              <div className="bg-card rounded-lg border p-6 shadow-sm">
                <h2 className="text-2xl font-bold mb-6">Contact Information</h2>
                
                <div className="space-y-6">
                  <div className="flex items-start">
                    <MapPin className="h-5 w-5 text-primary mr-3 mt-1" />
                    <div>
                      <h3 className="font-medium mb-1">Address</h3>
                      <p className="text-muted-foreground">
                        123 Industrial Park Drive<br />
                        Building A, Suite 200<br />
                        Shenzhen, Guangdong 518000<br />
                        China
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <Phone className="h-5 w-5 text-primary mr-3 mt-1" />
                    <div>
                      <h3 className="font-medium mb-1">Phone</h3>
                      <p className="text-muted-foreground">
                        <a href="tel:+86-755-1234-5678" className="hover:text-primary">+86-755-1234-5678</a><br />
                        <span className="text-sm">(Sales & Support)</span>
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <Mail className="h-5 w-5 text-primary mr-3 mt-1" />
                    <div>
                      <h3 className="font-medium mb-1">Email</h3>
                      <p className="text-muted-foreground">
                        <a href="mailto:info@limyee.com" className="hover:text-primary">info@limyee.com</a><br />
                        <a href="mailto:support@limyee.com" className="hover:text-primary">support@limyee.com</a>
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <Clock className="h-5 w-5 text-primary mr-3 mt-1" />
                    <div>
                      <h3 className="font-medium mb-1">Business Hours</h3>
                      <p className="text-muted-foreground">
                        Monday - Friday: 9:00 AM - 6:00 PM (CST)<br />
                        Saturday: 9:00 AM - 12:00 PM<br />
                        Sunday: Closed
                      </p>
                    </div>
                  </div>
                </div>
                
                <div className="mt-8 pt-6 border-t">
                  <h3 className="font-medium mb-3">Global Offices</h3>
                  <div className="space-y-3 text-sm">
                    <div>
                      <strong>North America:</strong><br />
                      <span className="text-muted-foreground">
                        456 Tech Avenue, Suite 300<br />
                        San Jose, CA 95110, USA
                      </span>
                    </div>
                    <div>
                      <strong>Europe:</strong><br />
                      <span className="text-muted-foreground">
                        Industriestraße 45<br />
                        80939 Munich, Germany
                      </span>
                    </div>
                    <div>
                      <strong>Asia Pacific:</strong><br />
                      <span className="text-muted-foreground">
                        10 Anson Road, #10-01<br />
                        Singapore 079903
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </ErrorBoundary>
          </div>
          
          {/* Contact Form */}
          <div className="lg:col-span-2">
            <ErrorBoundary sectionName="Contact Form">
              <div className="bg-card rounded-lg border p-6 shadow-sm">
                <h2 className="text-2xl font-bold mb-6">Send Us a Message</h2>
                
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium mb-1">
                        Name <span className="text-destructive">*</span>
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border rounded-md"
                        required
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium mb-1">
                        Email <span className="text-destructive">*</span>
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border rounded-md"
                        required
                      />
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="phone" className="block text-sm font-medium mb-1">
                        Phone
                      </label>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border rounded-md"
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="company" className="block text-sm font-medium mb-1">
                        Company
                      </label>
                      <input
                        type="text"
                        id="company"
                        name="company"
                        value={formData.company}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border rounded-md"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label htmlFor="subject" className="block text-sm font-medium mb-1">
                      Subject
                    </label>
                    <select
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      className="w-full px-3 py-2 border rounded-md"
                    >
                      <option value="">Please select</option>
                      <option value="General Inquiry">General Inquiry</option>
                      <option value="Product Information">Product Information</option>
                      <option value="Technical Support">Technical Support</option>
                      <option value="Sales">Sales</option>
                      <option value="Partnership">Partnership</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>
                  
                  <div>
                    <label htmlFor="message" className="block text-sm font-medium mb-1">
                      Message <span className="text-destructive">*</span>
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      rows={6}
                      className="w-full px-3 py-2 border rounded-md"
                      required
                    ></textarea>
                  </div>
                  
                  {/* Form status message */}
                  {formStatus.message && (
                    <div
                      className={`p-4 rounded-md ${
                        formStatus.status === "error"
                          ? "bg-destructive/10 text-destructive"
                          : formStatus.status === "success"
                          ? "bg-green-100 text-green-800"
                          : "bg-muted"
                      }`}
                    >
                      {formStatus.message}
                    </div>
                  )}
                  
                  <div>
                    <button
                      type="submit"
                      disabled={formStatus.status === "submitting"}
                      className="inline-flex items-center justify-center rounded-md bg-primary px-6 py-3 text-base font-medium text-primary-foreground shadow hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {formStatus.status === "submitting" ? (
                        <>
                          <div className="h-4 w-4 rounded-full border-2 border-t-primary-foreground border-r-primary-foreground border-b-transparent border-l-transparent animate-spin mr-2"></div>
                          Sending...
                        </>
                      ) : (
                        <>
                          <Send className="h-4 w-4 mr-2" />
                          Send Message
                        </>
                      )}
                    </button>
                  </div>
                </form>
              </div>
            </ErrorBoundary>
          </div>
        </div>
        
        {/* Map */}
        <ErrorBoundary sectionName="Map">
          <div className="mt-12">
            <h2 className="text-2xl font-bold mb-6">Our Location</h2>
            <div className="aspect-video rounded-lg overflow-hidden border shadow-sm">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3691.9259798932!2d114.05786797596333!3d22.54334997939279!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3403f5c785a38537%3A0xddef54e6a1d79f2!2sShenzhen%20Hi-Tech%20Industrial%20Park!5e0!3m2!1sen!2sus!4v1683890142322!5m2!1sen!2sus"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>
          </div>
        </ErrorBoundary>
      </div>
    </div>
  );
}
