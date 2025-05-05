"use client";

import Link from "next/link";
import { PageHeader } from "@/components/layout/page-header";
import { ErrorBoundary } from "@/components/ui/error-boundary";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Download, HelpCircle, Headphones, FileText, ArrowRight, Search } from "lucide-react";
import { useState } from "react";

export default function SupportPage() {
  const [searchQuery, setSearchQuery] = useState("");
  
  // Breadcrumb items
  const breadcrumbItems = [
    { label: "Support", href: "/support" },
  ];

  // Mock download data
  const downloadCategories = [
    {
      id: 1,
      name: "Product Manuals",
      items: [
        { id: 1, title: "LY-IPC8000 Series User Manual", fileType: "PDF", fileSize: "2.5 MB", date: "2023-10-15" },
        { id: 2, title: "LY-BOX5000 Series User Manual", fileType: "PDF", fileSize: "3.1 MB", date: "2023-09-22" },
        { id: 3, title: "LY-SBC3000 Series User Manual", fileType: "PDF", fileSize: "1.8 MB", date: "2023-08-10" },
      ]
    },
    {
      id: 2,
      name: "Drivers & Software",
      items: [
        { id: 4, title: "LY-IPC8000 Series Drivers Package", fileType: "ZIP", fileSize: "45.2 MB", date: "2023-10-10" },
        { id: 5, title: "LY-BOX5000 Series Drivers Package", fileType: "ZIP", fileSize: "38.7 MB", date: "2023-09-18" },
        { id: 6, title: "LY-SBC3000 Series Drivers Package", fileType: "ZIP", fileSize: "22.5 MB", date: "2023-08-05" },
      ]
    },
    {
      id: 3,
      name: "Datasheets",
      items: [
        { id: 7, title: "LY-IPC8000 Series Datasheet", fileType: "PDF", fileSize: "1.2 MB", date: "2023-10-12" },
        { id: 8, title: "LY-BOX5000 Series Datasheet", fileType: "PDF", fileSize: "1.5 MB", date: "2023-09-20" },
        { id: 9, title: "LY-SBC3000 Series Datasheet", fileType: "PDF", fileSize: "0.9 MB", date: "2023-08-08" },
      ]
    },
    {
      id: 4,
      name: "Certificates",
      items: [
        { id: 10, title: "CE Certificate", fileType: "PDF", fileSize: "0.5 MB", date: "2023-05-20" },
        { id: 11, title: "FCC Certificate", fileType: "PDF", fileSize: "0.6 MB", date: "2023-05-20" },
        { id: 12, title: "RoHS Compliance", fileType: "PDF", fileSize: "0.4 MB", date: "2023-05-20" },
      ]
    }
  ];

  // Mock FAQ data
  const faqCategories = [
    {
      id: 1,
      name: "General Questions",
      items: [
        {
          id: 1,
          question: "What is the warranty period for Limyee products?",
          answer: "Limyee provides a standard 2-year warranty for all our products. Extended warranty options are available for purchase. Please contact our sales team for more information."
        },
        {
          id: 2,
          question: "How can I check the authenticity of my Limyee product?",
          answer: "All Limyee products come with a unique serial number that can be verified on our website. Go to the Product Verification page and enter your product's serial number to confirm its authenticity."
        },
        {
          id: 3,
          question: "Does Limyee offer customization services?",
          answer: "Yes, we offer customization services for our products to meet specific customer requirements. This includes custom hardware configurations, branding, and software pre-installation. Please contact our sales team to discuss your customization needs."
        }
      ]
    },
    {
      id: 2,
      name: "Technical Support",
      items: [
        {
          id: 4,
          question: "How do I update the BIOS on my Limyee industrial computer?",
          answer: "To update the BIOS on your Limyee industrial computer, download the latest BIOS update from our website, create a bootable USB drive using the provided tool, and follow the instructions in the user manual. Always ensure your system is connected to a stable power source during the BIOS update process."
        },
        {
          id: 5,
          question: "My device is not powering on. What should I check?",
          answer: "If your device is not powering on, please check the following: 1) Ensure the power cable is securely connected, 2) Verify the power source is working, 3) Check if the power button is functioning properly, 4) Inspect for any visible damage to the device. If the issue persists, please contact our technical support team."
        },
        {
          id: 6,
          question: "How can I improve the cooling of my industrial PC in a high-temperature environment?",
          answer: "For high-temperature environments, we recommend: 1) Ensure proper ventilation around the device, 2) Keep air vents clean and unobstructed, 3) Consider additional cooling solutions like external fans, 4) Mount the device away from other heat-generating equipment, 5) For extreme conditions, consider our fanless models specifically designed for high-temperature operations."
        }
      ]
    },
    {
      id: 3,
      name: "Orders & Shipping",
      items: [
        {
          id: 7,
          question: "What shipping methods are available?",
          answer: "We offer various shipping methods including standard shipping, express shipping, and air freight. The available options may vary depending on your location. Shipping details and estimated delivery times will be provided during the checkout process."
        },
        {
          id: 8,
          question: "How can I track my order?",
          answer: "Once your order is shipped, you will receive a confirmation email with tracking information. You can also track your order by logging into your account on our website and viewing your order history."
        },
        {
          id: 9,
          question: "What is your return policy?",
          answer: "We accept returns within 30 days of delivery for products in their original condition. Custom-configured products may not be eligible for return unless they are defective. Please contact our customer service team to initiate a return process."
        }
      ]
    }
  ];

  // Handle search
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real application, this would trigger a search API call
    console.log("Searching for:", searchQuery);
  };

  return (
    <div>
      <ErrorBoundary sectionName="Support Page Header">
        <PageHeader
          title="Support & Resources"
          titleEn="Support & Resources"
          description="Access technical documentation, FAQs, and support services for Limyee products."
          breadcrumbItems={breadcrumbItems}
        />
      </ErrorBoundary>

      <div className="container mx-auto px-4 py-12">
        {/* Search Bar */}
        <ErrorBoundary sectionName="Support Search">
          <div className="mb-12 max-w-2xl mx-auto">
            <form onSubmit={handleSearch} className="relative">
              <input
                type="text"
                placeholder="Search for support resources..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-4 py-3 pl-12 border rounded-md shadow-sm"
              />
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <button
                type="submit"
                className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-primary text-primary-foreground px-4 py-1.5 rounded-md text-sm"
              >
                Search
              </button>
            </form>
          </div>
        </ErrorBoundary>

        {/* Support Categories */}
        <ErrorBoundary sectionName="Support Categories">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {[
              {
                title: "Downloads",
                description: "Access product manuals, drivers, and software",
                icon: <Download className="h-8 w-8" />,
                href: "#downloads",
                color: "bg-blue-50 text-blue-600"
              },
              {
                title: "FAQs",
                description: "Find answers to common questions",
                icon: <HelpCircle className="h-8 w-8" />,
                href: "#faqs",
                color: "bg-green-50 text-green-600"
              },
              {
                title: "Technical Support",
                description: "Get help from our support team",
                icon: <Headphones className="h-8 w-8" />,
                href: "#technical-support",
                color: "bg-purple-50 text-purple-600"
              },
              {
                title: "Documentation",
                description: "Browse technical documentation",
                icon: <FileText className="h-8 w-8" />,
                href: "#documentation",
                color: "bg-amber-50 text-amber-600"
              }
            ].map((category, index) => (
              <a
                key={index}
                href={category.href}
                className="bg-card rounded-lg border p-6 shadow-sm hover:shadow-md transition-all"
              >
                <div className={`${category.color} p-3 rounded-full inline-flex mb-4`}>
                  {category.icon}
                </div>
                <h3 className="text-xl font-semibold mb-2">{category.title}</h3>
                <p className="text-muted-foreground mb-4">{category.description}</p>
                <div className="flex items-center text-primary font-medium">
                  Learn more
                  <ArrowRight className="ml-1 h-4 w-4" />
                </div>
              </a>
            ))}
          </div>
        </ErrorBoundary>

        {/* Tabs Content */}
        <ErrorBoundary sectionName="Support Tabs">
          <Tabs defaultValue="downloads" className="w-full">
            <TabsList className="w-full border-b rounded-none justify-start mb-8">
              <TabsTrigger value="downloads" id="downloads" className="flex items-center gap-1">
                <Download className="h-4 w-4" />
                Downloads
              </TabsTrigger>
              <TabsTrigger value="faqs" id="faqs" className="flex items-center gap-1">
                <HelpCircle className="h-4 w-4" />
                FAQs
              </TabsTrigger>
              <TabsTrigger value="technical-support" id="technical-support" className="flex items-center gap-1">
                <Headphones className="h-4 w-4" />
                Technical Support
              </TabsTrigger>
              <TabsTrigger value="documentation" id="documentation" className="flex items-center gap-1">
                <FileText className="h-4 w-4" />
                Documentation
              </TabsTrigger>
            </TabsList>
            
            {/* Downloads Tab */}
            <TabsContent value="downloads" className="pt-4">
              <h2 className="text-2xl font-bold mb-6">Download Center</h2>
              <p className="text-lg text-muted-foreground mb-8">
                Access the latest product manuals, drivers, software, and documentation for your Limyee products.
              </p>
              
              <div className="space-y-8">
                {downloadCategories.map((category) => (
                  <div key={category.id}>
                    <h3 className="text-xl font-semibold mb-4">{category.name}</h3>
                    <div className="overflow-x-auto">
                      <table className="w-full border-collapse">
                        <thead>
                          <tr className="bg-muted/50">
                            <th className="px-4 py-3 text-left font-medium">File Name</th>
                            <th className="px-4 py-3 text-left font-medium">Type</th>
                            <th className="px-4 py-3 text-left font-medium">Size</th>
                            <th className="px-4 py-3 text-left font-medium">Date</th>
                            <th className="px-4 py-3 text-left font-medium">Action</th>
                          </tr>
                        </thead>
                        <tbody>
                          {category.items.map((item) => (
                            <tr key={item.id} className="border-b">
                              <td className="px-4 py-3">{item.title}</td>
                              <td className="px-4 py-3">{item.fileType}</td>
                              <td className="px-4 py-3">{item.fileSize}</td>
                              <td className="px-4 py-3">{item.date}</td>
                              <td className="px-4 py-3">
                                <a
                                  href="#"
                                  className="inline-flex items-center text-primary hover:underline"
                                >
                                  <Download className="h-4 w-4 mr-1" />
                                  Download
                                </a>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                ))}
              </div>
            </TabsContent>
            
            {/* FAQs Tab */}
            <TabsContent value="faqs" className="pt-4">
              <h2 className="text-2xl font-bold mb-6">Frequently Asked Questions</h2>
              <p className="text-lg text-muted-foreground mb-8">
                Find answers to common questions about our products, services, and policies.
              </p>
              
              <div className="space-y-8">
                {faqCategories.map((category) => (
                  <div key={category.id}>
                    <h3 className="text-xl font-semibold mb-4">{category.name}</h3>
                    <div className="space-y-4">
                      {category.items.map((item) => (
                        <details key={item.id} className="group border rounded-lg">
                          <summary className="flex justify-between items-center cursor-pointer p-4 font-medium">
                            {item.question}
                            <span className="transition-transform group-open:rotate-180">
                              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5">
                                <polyline points="6 9 12 15 18 9"></polyline>
                              </svg>
                            </span>
                          </summary>
                          <div className="p-4 pt-0 text-muted-foreground">
                            {item.answer}
                          </div>
                        </details>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="mt-12 bg-muted/30 rounded-lg p-6 border">
                <h3 className="text-xl font-semibold mb-4">Can't find what you're looking for?</h3>
                <p className="text-muted-foreground mb-4">
                  If you couldn't find the answer to your question, please contact our support team.
                </p>
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                >
                  Contact Support
                </Link>
              </div>
            </TabsContent>
            
            {/* Technical Support Tab */}
            <TabsContent value="technical-support" className="pt-4">
              <h2 className="text-2xl font-bold mb-6">Technical Support</h2>
              <p className="text-lg text-muted-foreground mb-8">
                Get technical assistance from our expert support team for your Limyee products.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
                <div className="bg-card rounded-lg border p-6 shadow-sm">
                  <h3 className="text-xl font-semibold mb-4">Email Support</h3>
                  <p className="text-muted-foreground mb-4">
                    For technical inquiries, please email our support team. We aim to respond within 24 hours during business days.
                  </p>
                  <a
                    href="mailto:support@limyee.com"
                    className="inline-flex items-center text-primary hover:underline"
                  >
                    support@limyee.com
                  </a>
                </div>
                
                <div className="bg-card rounded-lg border p-6 shadow-sm">
                  <h3 className="text-xl font-semibold mb-4">Phone Support</h3>
                  <p className="text-muted-foreground mb-4">
                    For urgent issues, please call our technical support hotline during business hours.
                  </p>
                  <a
                    href="tel:+86-755-1234-5678"
                    className="inline-flex items-center text-primary hover:underline"
                  >
                    +86-755-1234-5678
                  </a>
                  <p className="text-sm text-muted-foreground mt-2">
                    Monday - Friday: 9:00 AM - 6:00 PM (CST)
                  </p>
                </div>
              </div>
              
              <div className="bg-muted/30 rounded-lg p-6 border mb-12">
                <h3 className="text-xl font-semibold mb-4">Remote Support</h3>
                <p className="text-muted-foreground mb-4">
                  For complex issues, our technical team can provide remote assistance. Please contact us to schedule a remote support session.
                </p>
                <Link
                  href="/contact?subject=Remote Support Request"
                  className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                >
                  Request Remote Support
                </Link>
              </div>
              
              <h3 className="text-xl font-semibold mb-4">Support Process</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {[
                  {
                    step: "1",
                    title: "Submit Request",
                    description: "Contact us via email, phone, or the contact form with details about your issue."
                  },
                  {
                    step: "2",
                    title: "Initial Assessment",
                    description: "Our support team will review your request and provide initial troubleshooting steps."
                  },
                  {
                    step: "3",
                    title: "Resolution",
                    description: "We'll work with you until the issue is resolved, providing remote support if necessary."
                  }
                ].map((step, index) => (
                  <div key={index} className="bg-card rounded-lg border p-6 shadow-sm relative">
                    <div className="absolute -top-3 -left-3 h-8 w-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold">
                      {step.step}
                    </div>
                    <h4 className="text-lg font-semibold mb-2 mt-2">{step.title}</h4>
                    <p className="text-muted-foreground">{step.description}</p>
                  </div>
                ))}
              </div>
            </TabsContent>
            
            {/* Documentation Tab */}
            <TabsContent value="documentation" className="pt-4">
              <h2 className="text-2xl font-bold mb-6">Technical Documentation</h2>
              <p className="text-lg text-muted-foreground mb-8">
                Access comprehensive technical documentation for Limyee products, including user guides, technical specifications, and application notes.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
                {[
                  {
                    title: "User Guides",
                    description: "Detailed instructions for setting up and using Limyee products",
                    icon: <FileText className="h-8 w-8 text-primary" />
                  },
                  {
                    title: "Technical Specifications",
                    description: "Detailed technical information about product features and capabilities",
                    icon: <FileText className="h-8 w-8 text-primary" />
                  },
                  {
                    title: "Application Notes",
                    description: "Guides for implementing Limyee products in specific applications",
                    icon: <FileText className="h-8 w-8 text-primary" />
                  },
                  {
                    title: "White Papers",
                    description: "In-depth technical papers on industrial computing topics",
                    icon: <FileText className="h-8 w-8 text-primary" />
                  },
                  {
                    title: "Case Studies",
                    description: "Real-world examples of Limyee products in action",
                    icon: <FileText className="h-8 w-8 text-primary" />
                  },
                  {
                    title: "Video Tutorials",
                    description: "Step-by-step video guides for product setup and troubleshooting",
                    icon: <FileText className="h-8 w-8 text-primary" />
                  }
                ].map((doc, index) => (
                  <div key={index} className="bg-card rounded-lg border p-6 shadow-sm">
                    <div className="mb-4">
                      {doc.icon}
                    </div>
                    <h3 className="text-xl font-semibold mb-2">{doc.title}</h3>
                    <p className="text-muted-foreground mb-4">{doc.description}</p>
                    <Link
                      href="#"
                      className="inline-flex items-center text-primary hover:underline"
                    >
                      Browse {doc.title}
                      <ArrowRight className="ml-1 h-4 w-4" />
                    </Link>
                  </div>
                ))}
              </div>
              
              <div className="bg-muted/30 rounded-lg p-6 border">
                <h3 className="text-xl font-semibold mb-4">Documentation Updates</h3>
                <p className="text-muted-foreground mb-4">
                  Our documentation is regularly updated to reflect the latest product features and improvements. Check back frequently for the most up-to-date information.
                </p>
                <Link
                  href="#"
                  className="inline-flex items-center text-primary hover:underline"
                >
                  Subscribe to documentation updates
                  <ArrowRight className="ml-1 h-4 w-4" />
                </Link>
              </div>
            </TabsContent>
          </Tabs>
        </ErrorBoundary>
      </div>
    </div>
  );
}
