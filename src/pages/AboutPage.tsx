import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CheckCircle, Users, Award, BookOpen, Globe, Mail } from "lucide-react";

export default function AboutPage() {
  return (
    <div>
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">About LearnWell</h1>
          <p className="text-xl mb-8 max-w-3xl mx-auto">
            We're on a mission to make quality education accessible to everyone and help people reach their full potential.
          </p>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-6">Our Story</h2>
              <p className="text-gray-700 mb-4">
                LearnWell was founded in 2018 with a simple but powerful idea: to create a platform where anyone, anywhere could access quality education at an affordable price.
              </p>
              <p className="text-gray-700 mb-4">
                What began as a small collection of programming courses has grown into a diverse marketplace of knowledge, spanning technology, business, creative skills, and personal development.
              </p>
              <p className="text-gray-700">
                Today, we're proud to have helped over 100,000 students worldwide achieve their learning goals, advance their careers, and pursue their passions.
              </p>
            </div>
            <div className="rounded-lg overflow-hidden shadow-lg">
              <img 
                src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=500&auto=format&fit=crop" 
                alt="Team collaboration" 
                className="w-full h-auto"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Our Mission and Values */}
      <section className="py-16 bg-blue-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Our Mission and Values</h2>
            <p className="text-gray-700 max-w-3xl mx-auto">
              Everything we do is guided by our commitment to democratizing education and helping people transform their lives through learning.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="bg-white border-none shadow-md">
              <CardContent className="pt-6">
                <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Users className="h-8 w-8 text-blue-600" />
                </div>
                <h3 className="text-xl font-semibold text-center mb-3">Accessibility</h3>
                <p className="text-gray-600 text-center">
                  We believe that quality education should be accessible to everyone, regardless of their background or financial situation.
                </p>
              </CardContent>
            </Card>
            
            <Card className="bg-white border-none shadow-md">
              <CardContent className="pt-6">
                <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Award className="h-8 w-8 text-blue-600" />
                </div>
                <h3 className="text-xl font-semibold text-center mb-3">Excellence</h3>
                <p className="text-gray-600 text-center">
                  We are committed to maintaining the highest standards of educational content and learning experiences.
                </p>
              </CardContent>
            </Card>
            
            <Card className="bg-white border-none shadow-md">
              <CardContent className="pt-6">
                <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Globe className="h-8 w-8 text-blue-600" />
                </div>
                <h3 className="text-xl font-semibold text-center mb-3">Global Community</h3>
                <p className="text-gray-600 text-center">
                  We foster a supportive global community where learners and educators can connect, collaborate, and grow together.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Our Team</h2>
            <p className="text-gray-700 max-w-3xl mx-auto">
              Meet the passionate educators, technologists, and lifelong learners who make LearnWell possible.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {teamMembers.map((member, index) => (
              <div key={index} className="text-center">
                <img 
                  src={member.avatar} 
                  alt={member.name}
                  className="w-32 h-32 rounded-full mx-auto mb-4 object-cover"
                />
                <h3 className="text-xl font-semibold mb-1">{member.name}</h3>
                <p className="text-blue-600 mb-3">{member.role}</p>
                <p className="text-gray-600 text-sm">{member.bio}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Tabs Section: Impact, Partners, FAQ */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <Tabs defaultValue="impact" className="w-full">
            <TabsList className="w-full max-w-md mx-auto grid grid-cols-3 mb-8">
              <TabsTrigger value="impact">Our Impact</TabsTrigger>
              <TabsTrigger value="partners">Our Partners</TabsTrigger>
              <TabsTrigger value="faq">FAQ</TabsTrigger>
            </TabsList>
            
            <TabsContent value="impact" className="mt-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                <div>
                  <h3 className="text-2xl font-bold mb-4">Making a Difference Through Education</h3>
                  <p className="text-gray-700 mb-4">
                    At LearnWell, we believe education has the power to transform lives and communities. Here's how we're making an impact:
                  </p>
                  <ul className="space-y-3">
                    <li className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                      <span>Over 100,000 students from 150+ countries have taken our courses</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                      <span>Scholarship program has provided free education to 5,000+ students from underserved communities</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                      <span>75% of our graduates report significant career advancement within 6 months</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                      <span>Partnership with 20+ non-profits to provide educational resources worldwide</span>
                    </li>
                  </ul>
                </div>
                <div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-white p-6 rounded-lg shadow-sm text-center">
                      <div className="text-4xl font-bold text-blue-600 mb-2">100K+</div>
                      <p className="text-gray-600">Students Taught</p>
                    </div>
                    <div className="bg-white p-6 rounded-lg shadow-sm text-center">
                      <div className="text-4xl font-bold text-blue-600 mb-2">150+</div>
                      <p className="text-gray-600">Countries Reached</p>
                    </div>
                    <div className="bg-white p-6 rounded-lg shadow-sm text-center">
                      <div className="text-4xl font-bold text-blue-600 mb-2">500+</div>
                      <p className="text-gray-600">Expert Instructors</p>
                    </div>
                    <div className="bg-white p-6 rounded-lg shadow-sm text-center">
                      <div className="text-4xl font-bold text-blue-600 mb-2">1.2M+</div>
                      <p className="text-gray-600">Hours of Learning</p>
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="partners" className="mt-6">
              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold mb-4">Our Trusted Partners</h3>
                <p className="text-gray-700 max-w-3xl mx-auto">
                  We collaborate with leading organizations from various industries to ensure our curriculum remains relevant and meets the needs of today's employers.
                </p>
              </div>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-8 items-center justify-items-center">
                {partners.map((partner, index) => (
                  <div key={index} className="grayscale hover:grayscale-0 transition-all">
                    <img 
                      src={partner.logo} 
                      alt={partner.name}
                      className="h-12 object-contain"
                    />
                  </div>
                ))}
              </div>
              
              <div className="text-center mt-12">
                <h4 className="text-xl font-semibold mb-4">Interested in Partnering With Us?</h4>
                <p className="text-gray-700 mb-6 max-w-2xl mx-auto">
                  We're always looking to collaborate with organizations that share our commitment to quality education and innovation.
                </p>
                <Button>Contact Our Partnership Team</Button>
              </div>
            </TabsContent>
            
            <TabsContent value="faq" className="mt-6">
              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold mb-4">Frequently Asked Questions</h3>
                <p className="text-gray-700 max-w-3xl mx-auto">
                  Find answers to common questions about LearnWell and our courses.
                </p>
              </div>
              
              <div className="max-w-3xl mx-auto">
                <Accordion type="single" collapsible className="space-y-4">
                  {faqs.map((faq, index) => (
                    <AccordionItem key={index} value={`faq-${index}`} className="border rounded-lg overflow-hidden">
                      <AccordionTrigger className="px-4 py-3 hover:no-underline hover:bg-gray-50 font-medium">
                        {faq.question}
                      </AccordionTrigger>
                      <AccordionContent className="px-4 py-3">
                        <p className="text-gray-700">{faq.answer}</p>
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-blue-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">Start Your Learning Journey Today</h2>
          <p className="text-xl mb-8 max-w-3xl mx-auto">
            Join our community of learners and unlock your potential with courses taught by industry experts.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Button size="lg" variant="outline" className="bg-white text-blue-600 hover:bg-blue-50" asChild>
              <Link to="/courses">
                Explore Courses
              </Link>
            </Button>
            <Button size="lg" className="bg-transparent border-2 hover:bg-white/10">
              <Mail className="mr-2 h-5 w-5" /> Contact Us
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}

// Sample data
const teamMembers = [
  {
    name: "Sarah Johnson",
    role: "Founder & CEO",
    avatar: "https://randomuser.me/api/portraits/women/44.jpg",
    bio: "Former tech executive with a passion for democratizing education."
  },
  {
    name: "Michael Chen",
    role: "Chief Learning Officer",
    avatar: "https://randomuser.me/api/portraits/men/32.jpg",
    bio: "PhD in Education with 15 years of experience in curriculum development."
  },
  {
    name: "Aisha Patel",
    role: "Head of Technology",
    avatar: "https://randomuser.me/api/portraits/women/63.jpg",
    bio: "Software engineer and EdTech specialist with a focus on accessibility."
  },
  {
    name: "David Rodriguez",
    role: "Director of Partnerships",
    avatar: "https://randomuser.me/api/portraits/men/75.jpg",
    bio: "Building relationships with organizations that share our mission."
  }
];

const partners = [
  {
    name: "TechCorp",
    logo: "https://via.placeholder.com/150x50?text=TechCorp"
  },
  {
    name: "Global Learning Initiative",
    logo: "https://via.placeholder.com/150x50?text=GLI"
  },
  {
    name: "Future Skills Academy",
    logo: "https://via.placeholder.com/150x50?text=FSA"
  },
  {
    name: "Innovate Inc.",
    logo: "https://via.placeholder.com/150x50?text=Innovate"
  },
  {
    name: "Digital Futures",
    logo: "https://via.placeholder.com/150x50?text=DigitalFutures"
  },
  {
    name: "Education First",
    logo: "https://via.placeholder.com/150x50?text=EduFirst"
  },
  {
    name: "Learning Labs",
    logo: "https://via.placeholder.com/150x50?text=LearningLabs"
  },
  {
    name: "Skills Forward",
    logo: "https://via.placeholder.com/150x50?text=SkillsForward"
  }
];

const faqs = [
  {
    question: "How do LearnWell courses work?",
    answer: "Our courses are delivered online through our platform. They include video lectures, reading materials, quizzes, and practical assignments. You can learn at your own pace and access the content anytime from any device with internet access."
  },
  {
    question: "Are there any prerequisites for taking courses?",
    answer: "Prerequisites vary by course. Some courses are designed for beginners and require no prior knowledge, while others may build on foundational concepts. Each course page clearly lists any prerequisites you should have before enrolling."
  },
  {
    question: "How long do I have access to a course after purchasing?",
    answer: "Once you purchase a course, you have lifetime access to the content. This allows you to learn at your own pace and revisit the material whenever you need a refresher."
  },
  {
    question: "Do you offer certificates upon completion?",
    answer: "Yes, we provide certificates of completion for all our courses. These can be added to your LinkedIn profile or resume to showcase your newly acquired skills."
  },
  {
    question: "What is your refund policy?",
    answer: "We offer a 30-day money-back guarantee. If you're not satisfied with a course, you can request a refund within 30 days of purchase, provided you haven't completed more than 30% of the course content."
  },
  {
    question: "How can I become an instructor on LearnWell?",
    answer: "We're always looking for experienced professionals to join our instructor community. Visit our 'Teach on LearnWell' page to learn about our application process and requirements."
  }
];

import { 
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";