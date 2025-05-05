"use client";

import Image from "next/image";
import Link from "next/link";
import { PageHeader } from "@/components/layout/page-header";
import { ErrorBoundary } from "@/components/ui/error-boundary";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CheckCircle, Users, History, Award, BookOpen } from "lucide-react";

export default function AboutPage() {
  // Breadcrumb items
  const breadcrumbItems = [
    { label: "About", href: "/about" },
  ];

  return (
    <div>
      <ErrorBoundary sectionName="About Page Header">
        <PageHeader
          title="About Limyee"
          titleEn="About Limyee"
          description="Learn more about our company, our mission, and our commitment to innovation."
          breadcrumbItems={breadcrumbItems}
          backgroundImage="https://source.unsplash.com/random/1920x400/?technology,company"
        />
      </ErrorBoundary>

      <div className="container mx-auto px-4 py-12">
        <ErrorBoundary sectionName="About Tabs">
          <Tabs defaultValue="company" className="w-full">
            <TabsList className="w-full border-b rounded-none justify-start mb-8">
              <TabsTrigger value="company" className="flex items-center gap-1">
                <Users className="h-4 w-4" />
                Company
              </TabsTrigger>
              <TabsTrigger value="history" className="flex items-center gap-1">
                <History className="h-4 w-4" />
                History
              </TabsTrigger>
              <TabsTrigger value="achievements" className="flex items-center gap-1">
                <Award className="h-4 w-4" />
                Achievements
              </TabsTrigger>
              <TabsTrigger value="culture" className="flex items-center gap-1">
                <BookOpen className="h-4 w-4" />
                Culture
              </TabsTrigger>
            </TabsList>
            
            {/* Company Overview Tab */}
            <TabsContent value="company" className="pt-4">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
                <div>
                  <h2 className="text-3xl font-bold mb-6">Our Company</h2>
                  <p className="text-lg text-muted-foreground mb-6">
                    Limyee is a leading provider of industrial computing solutions with over 15 years of experience in the industry. We specialize in designing and manufacturing high-quality, reliable computing products for various industries, including manufacturing, healthcare, transportation, and more.
                  </p>
                  <p className="text-lg text-muted-foreground mb-6">
                    Our comprehensive product portfolio includes industrial panel PCs, embedded box PCs, single board computers, and human-machine interfaces, all designed to meet the demanding requirements of industrial environments.
                  </p>
                  <p className="text-lg text-muted-foreground">
                    With a strong focus on innovation, quality, and customer satisfaction, we strive to provide cutting-edge solutions that help our clients improve their operational efficiency and stay competitive in the digital era.
                  </p>
                </div>
                <div className="relative h-[400px] rounded-lg overflow-hidden shadow-lg">
                  <Image
                    src="https://source.unsplash.com/random/800x600/?office,technology"
                    alt="Limyee Headquarters"
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                </div>
              </div>
              
              <div className="mb-16">
                <h2 className="text-3xl font-bold mb-6 text-center">Our Mission & Vision</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="bg-card rounded-lg p-8 border shadow-sm">
                    <h3 className="text-xl font-semibold mb-4">Our Mission</h3>
                    <p className="text-muted-foreground">
                      To provide innovative and reliable industrial computing solutions that empower our customers to achieve operational excellence and digital transformation in their respective industries.
                    </p>
                  </div>
                  <div className="bg-card rounded-lg p-8 border shadow-sm">
                    <h3 className="text-xl font-semibold mb-4">Our Vision</h3>
                    <p className="text-muted-foreground">
                      To be the global leader in industrial computing solutions, recognized for our innovation, quality, and commitment to customer success in the era of Industry 4.0 and beyond.
                    </p>
                  </div>
                </div>
              </div>
              
              <div>
                <h2 className="text-3xl font-bold mb-6 text-center">Our Core Values</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  {[
                    {
                      title: "Innovation",
                      description: "We continuously strive to develop new and improved solutions that address the evolving needs of our customers."
                    },
                    {
                      title: "Quality",
                      description: "We are committed to delivering products of the highest quality, ensuring reliability and durability in demanding environments."
                    },
                    {
                      title: "Customer Focus",
                      description: "We put our customers at the center of everything we do, working closely with them to understand and meet their unique requirements."
                    },
                    {
                      title: "Integrity",
                      description: "We conduct our business with honesty, transparency, and ethical standards, building trust with our customers, partners, and employees."
                    }
                  ].map((value, index) => (
                    <div key={index} className="bg-card rounded-lg p-6 border shadow-sm">
                      <h3 className="text-xl font-semibold mb-3">{value.title}</h3>
                      <p className="text-muted-foreground">{value.description}</p>
                    </div>
                  ))}
                </div>
              </div>
            </TabsContent>
            
            {/* History Tab */}
            <TabsContent value="history" className="pt-4">
              <div className="mb-12">
                <h2 className="text-3xl font-bold mb-6">Our Journey</h2>
                <p className="text-lg text-muted-foreground mb-8">
                  Since our founding in 2008, Limyee has grown from a small team of passionate engineers to a global provider of industrial computing solutions. Here's a look at our journey over the years:
                </p>
              </div>
              
              <div className="relative border-l border-muted-foreground/20 pl-8 ml-4 space-y-12 mb-16">
                {[
                  {
                    year: "2008",
                    title: "Foundation",
                    description: "Limyee was founded by a team of engineers with a vision to create reliable computing solutions for industrial applications.",
                    image: "https://source.unsplash.com/random/600x400/?startup"
                  },
                  {
                    year: "2012",
                    title: "First Product Line",
                    description: "Launched our first line of industrial panel PCs, establishing our presence in the industrial computing market.",
                    image: "https://source.unsplash.com/random/600x400/?computer"
                  },
                  {
                    year: "2015",
                    title: "International Expansion",
                    description: "Expanded our operations to international markets, opening our first overseas office in Europe.",
                    image: "https://source.unsplash.com/random/600x400/?global"
                  },
                  {
                    year: "2018",
                    title: "Industry 4.0 Solutions",
                    description: "Introduced our Industry 4.0 solution suite, helping customers embrace digital transformation in manufacturing.",
                    image: "https://source.unsplash.com/random/600x400/?industry"
                  },
                  {
                    year: "2020",
                    title: "R&D Center",
                    description: "Established our state-of-the-art R&D center to accelerate innovation and product development.",
                    image: "https://source.unsplash.com/random/600x400/?laboratory"
                  },
                  {
                    year: "2023",
                    title: "Global Presence",
                    description: "Expanded our global footprint with new offices in Asia and North America, serving customers in over 50 countries.",
                    image: "https://source.unsplash.com/random/600x400/?global,office"
                  }
                ].map((milestone, index) => (
                  <div key={index} className="relative">
                    <div className="absolute -left-12 mt-1.5 h-6 w-6 rounded-full border border-muted-foreground/20 bg-background flex items-center justify-center">
                      <div className="h-3 w-3 rounded-full bg-primary"></div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      <div className="md:col-span-1">
                        <div className="text-2xl font-bold text-primary mb-2">{milestone.year}</div>
                        <h3 className="text-xl font-semibold mb-4">{milestone.title}</h3>
                      </div>
                      <div className="md:col-span-2 flex flex-col md:flex-row gap-6">
                        <p className="text-muted-foreground flex-1">{milestone.description}</p>
                        <div className="relative h-48 w-full md:w-64 rounded-lg overflow-hidden shadow-md flex-shrink-0">
                          <Image
                            src={milestone.image}
                            alt={milestone.title}
                            fill
                            className="object-cover"
                            sizes="(max-width: 768px) 100vw, 33vw"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </TabsContent>
            
            {/* Achievements Tab */}
            <TabsContent value="achievements" className="pt-4">
              <div className="mb-12">
                <h2 className="text-3xl font-bold mb-6">Our Achievements</h2>
                <p className="text-lg text-muted-foreground mb-8">
                  Over the years, Limyee has received numerous awards and recognitions for our innovative products, business excellence, and contributions to the industry.
                </p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
                {[
                  {
                    year: "2023",
                    award: "Industry Innovation Award",
                    organization: "Industrial Technology Association",
                    description: "Recognized for our groundbreaking edge computing solutions for industrial applications."
                  },
                  {
                    year: "2022",
                    award: "Best Industrial Computing Provider",
                    organization: "Manufacturing Technology Expo",
                    description: "Awarded for excellence in providing reliable computing solutions for manufacturing environments."
                  },
                  {
                    year: "2021",
                    award: "Product of the Year",
                    organization: "Industrial Automation Magazine",
                    description: "Our LY-IPC7000 series was named Product of the Year in the HMI category."
                  },
                  {
                    year: "2020",
                    award: "Technology Innovation Award",
                    organization: "Smart Factory Summit",
                    description: "Recognized for our contributions to advancing smart manufacturing technologies."
                  },
                  {
                    year: "2019",
                    award: "Export Excellence Award",
                    organization: "International Trade Council",
                    description: "Honored for our success in expanding into international markets."
                  },
                  {
                    year: "2017",
                    award: "Quality Excellence Certificate",
                    organization: "Industrial Quality Standards Institute",
                    description: "Certified for meeting the highest quality standards in industrial product manufacturing."
                  }
                ].map((achievement, index) => (
                  <div key={index} className="bg-card rounded-lg p-6 border shadow-sm">
                    <div className="flex items-start gap-4">
                      <Award className="h-8 w-8 text-primary flex-shrink-0 mt-1" />
                      <div>
                        <div className="text-sm text-muted-foreground mb-1">{achievement.year}</div>
                        <h3 className="text-xl font-semibold mb-2">{achievement.award}</h3>
                        <div className="text-sm font-medium mb-3">{achievement.organization}</div>
                        <p className="text-muted-foreground">{achievement.description}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="bg-muted/30 rounded-lg p-8 border">
                <h3 className="text-2xl font-bold mb-6 text-center">Key Milestones</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                  {[
                    { value: "15+", label: "Years in Business" },
                    { value: "500+", label: "Clients Worldwide" },
                    { value: "50+", label: "Countries Served" },
                    { value: "25+", label: "Industry Awards" }
                  ].map((stat, i) => (
                    <div key={i} className="bg-card rounded-lg p-6 text-center shadow-sm border">
                      <div className="text-3xl font-bold text-primary mb-2">{stat.value}</div>
                      <div className="text-muted-foreground">{stat.label}</div>
                    </div>
                  ))}
                </div>
              </div>
            </TabsContent>
            
            {/* Culture Tab */}
            <TabsContent value="culture" className="pt-4">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
                <div className="order-2 lg:order-1">
                  <h2 className="text-3xl font-bold mb-6">Our Culture</h2>
                  <p className="text-lg text-muted-foreground mb-6">
                    At Limyee, we believe that our people are our greatest asset. We foster a culture of innovation, collaboration, and continuous learning, where every team member is empowered to contribute to our shared success.
                  </p>
                  <p className="text-lg text-muted-foreground mb-6">
                    Our workplace is built on mutual respect, open communication, and a shared commitment to excellence. We celebrate diversity and believe that different perspectives drive innovation and better solutions for our customers.
                  </p>
                  <p className="text-lg text-muted-foreground">
                    We invest in our people's growth and development, providing opportunities for professional advancement and encouraging a healthy work-life balance.
                  </p>
                </div>
                <div className="relative h-[400px] rounded-lg overflow-hidden shadow-lg order-1 lg:order-2">
                  <Image
                    src="https://source.unsplash.com/random/800x600/?team,office"
                    alt="Limyee Team"
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                </div>
              </div>
              
              <div className="mb-16">
                <h2 className="text-3xl font-bold mb-8 text-center">What Makes Us Different</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  {[
                    {
                      title: "Innovation-Driven",
                      description: "We encourage creative thinking and provide resources for our team to explore new ideas and technologies.",
                      icon: <BookOpen className="h-8 w-8 text-primary" />
                    },
                    {
                      title: "Customer-Centric",
                      description: "We put our customers at the heart of everything we do, focusing on building long-term relationships based on trust and value.",
                      icon: <Users className="h-8 w-8 text-primary" />
                    },
                    {
                      title: "Quality-Focused",
                      description: "We maintain the highest standards in our products and services, with rigorous quality control processes at every stage.",
                      icon: <CheckCircle className="h-8 w-8 text-primary" />
                    }
                  ].map((value, index) => (
                    <div key={index} className="bg-card rounded-lg p-8 border shadow-sm text-center">
                      <div className="flex justify-center mb-4">
                        {value.icon}
                      </div>
                      <h3 className="text-xl font-semibold mb-3">{value.title}</h3>
                      <p className="text-muted-foreground">{value.description}</p>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="bg-muted/30 rounded-lg p-8 border">
                <h3 className="text-2xl font-bold mb-6 text-center">Join Our Team</h3>
                <p className="text-center text-lg text-muted-foreground mb-8">
                  We're always looking for talented individuals who share our passion for innovation and excellence. Explore career opportunities at Limyee and be part of our journey.
                </p>
                <div className="flex justify-center">
                  <Link
                    href="/careers"
                    className="inline-flex items-center justify-center rounded-md bg-primary px-6 py-3 text-base font-medium text-primary-foreground shadow hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                  >
                    View Open Positions
                  </Link>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </ErrorBoundary>
      </div>
    </div>
  );
}
