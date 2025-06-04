import { useParams, Link } from "react-router-dom";
import { useState } from "react";
import { 
  Clock, 
  Users, 
  BarChart, 
  Award, 
  CheckCircle, 
  Star, 
  ChevronDown, 
  ChevronUp, 
  Calendar 
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";

export default function CourseDetailPage() {
  const { id } = useParams<{ id: string }>();
  const [expanded, setExpanded] = useState(false);
  
  // Find the course with the matching ID
  const course = courseData.find(c => c.id === id);
  
  if (!course) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <h1 className="text-2xl font-bold mb-4">Course Not Found</h1>
        <p className="mb-8">The course you're looking for doesn't exist or has been removed.</p>
        <Button asChild>
          <Link to="/courses">Browse All Courses</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Course Header */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white rounded-lg p-8 mb-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <h1 className="text-3xl font-bold mb-4">{course.title}</h1>
            <p className="text-lg mb-6">{course.description}</p>
            
            <div className="flex flex-wrap gap-4 mb-6">
              <div className="flex items-center">
                <Clock className="h-5 w-5 mr-2" />
                <span>{course.duration}</span>
              </div>
              <div className="flex items-center">
                <Users className="h-5 w-5 mr-2" />
                <span>{course.students.toLocaleString()} students</span>
              </div>
              <div className="flex items-center">
                <BarChart className="h-5 w-5 mr-2" />
                <span>{course.level}</span>
              </div>
              <div className="flex items-center">
                <Calendar className="h-5 w-5 mr-2" />
                <span>Last updated {course.lastUpdated}</span>
              </div>
            </div>
            
            <div className="flex items-center mb-6">
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <Star 
                    key={i}
                    className={`h-5 w-5 ${i < Math.floor(course.rating) ? "text-yellow-300 fill-yellow-300" : "text-gray-300"}`}
                  />
                ))}
              </div>
              <span className="ml-2">{course.rating} ({course.reviews} reviews)</span>
            </div>
            
            <div className="flex items-center">
              <Avatar className="h-10 w-10 mr-3">
                <AvatarImage src={course.instructor.avatar} />
                <AvatarFallback>{course.instructor.name.charAt(0)}</AvatarFallback>
              </Avatar>
              <div>
                <p className="font-medium">Instructor: {course.instructor.name}</p>
                <p className="text-sm text-blue-200">{course.instructor.title}</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white text-gray-900 p-6 rounded-lg shadow-lg">
            <img 
              src={course.imageUrl} 
              alt={course.title}
              className="w-full h-48 object-cover rounded-md mb-4"
            />
            <div className="text-3xl font-bold mb-4">{course.price}</div>
            <Button className="w-full mb-3">Enroll Now</Button>
            <Button variant="outline" className="w-full mb-6">Add to Wishlist</Button>
            
            <div className="space-y-3 text-sm">
              <p className="flex items-center">
                <CheckCircle className="h-4 w-4 mr-2 text-green-500" />
                Full lifetime access
              </p>
              <p className="flex items-center">
                <CheckCircle className="h-4 w-4 mr-2 text-green-500" />
                Access on mobile and desktop
              </p>
              <p className="flex items-center">
                <CheckCircle className="h-4 w-4 mr-2 text-green-500" />
                Certificate of completion
              </p>
              <p className="flex items-center">
                <CheckCircle className="h-4 w-4 mr-2 text-green-500" />
                30-day money-back guarantee
              </p>
            </div>
          </div>
        </div>
      </div>
      
      {/* Course Content Tabs */}
      <Tabs defaultValue="overview" className="mb-8">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="curriculum">Curriculum</TabsTrigger>
          <TabsTrigger value="instructor">Instructor</TabsTrigger>
          <TabsTrigger value="reviews">Reviews</TabsTrigger>
        </TabsList>
        
        <TabsContent value="overview" className="mt-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <h2 className="text-2xl font-bold mb-4">About This Course</h2>
              <div className={`prose max-w-none ${!expanded && "line-clamp-6"}`}>
                <p>{course.longDescription}</p>
              </div>
              <button 
                onClick={() => setExpanded(!expanded)}
                className="text-blue-600 mt-2 flex items-center hover:underline"
              >
                {expanded ? "Show Less" : "Show More"}
                {expanded ? <ChevronUp className="ml-1 h-4 w-4" /> : <ChevronDown className="ml-1 h-4 w-4" />}
              </button>
              
              <h3 className="text-xl font-bold mt-8 mb-4">What You'll Learn</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {course.learningOutcomes.map((outcome, index) => (
                  <div key={index} className="flex items-start">
                    <CheckCircle className="h-5 w-5 mr-2 text-green-500 flex-shrink-0 mt-0.5" />
                    <span>{outcome}</span>
                  </div>
                ))}
              </div>
              
              <h3 className="text-xl font-bold mt-8 mb-4">Requirements</h3>
              <ul className="list-disc pl-5 space-y-2">
                {course.requirements.map((req, index) => (
                  <li key={index}>{req}</li>
                ))}
              </ul>
            </div>
            
            <div>
              <h3 className="text-xl font-bold mb-4">This Course Includes</h3>
              <div className="bg-gray-50 p-6 rounded-lg space-y-4">
                {course.features.map((feature, index) => (
                  <div key={index} className="flex items-center">
                    <feature.icon className="h-5 w-5 mr-3 text-blue-600" />
                    <span>{feature.text}</span>
                  </div>
                ))}
              </div>
              
              <h3 className="text-xl font-bold mt-8 mb-4">Skills You'll Gain</h3>
              <div className="flex flex-wrap gap-2">
                {course.skills.map((skill, index) => (
                  <div key={index} className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">
                    {skill}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="curriculum" className="mt-6">
          <h2 className="text-2xl font-bold mb-4">Course Curriculum</h2>
          <div className="mb-4">
            <p className="text-gray-600">{course.modules.length} modules • {course.lessons} lessons • {course.duration} total</p>
          </div>
          
          <Accordion type="single" collapsible className="space-y-4">
            {course.modules.map((module, index) => (
              <AccordionItem key={index} value={`module-${index}`} className="border rounded-lg overflow-hidden">
                <AccordionTrigger className="px-4 py-3 hover:no-underline hover:bg-gray-50">
                  <div className="flex justify-between items-center w-full">
                    <div className="text-left">
                      <h3 className="font-medium">{module.title}</h3>
                      <p className="text-sm text-gray-500">{module.lessons} lessons • {module.duration}</p>
                    </div>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="px-4">
                  <div className="space-y-3 py-2">
                    {module.lessonsList.map((lesson, i) => (
                      <div key={i} className="flex items-center py-2 border-b last:border-0">
                        {lesson.icon}
                        <div className="ml-3">
                          <p className="font-medium">{lesson.title}</p>
                          <p className="text-sm text-gray-500">{lesson.duration}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </TabsContent>
        
        <TabsContent value="instructor" className="mt-6">
          <div className="flex flex-col md:flex-row gap-8">
            <div className="md:w-1/3">
              <Avatar className="h-32 w-32 mb-4">
                <AvatarImage src={course.instructor.avatar} />
                <AvatarFallback>{course.instructor.name.charAt(0)}</AvatarFallback>
              </Avatar>
              <h2 className="text-2xl font-bold">{course.instructor.name}</h2>
              <p className="text-gray-600 mb-4">{course.instructor.title}</p>
              
              <div className="flex items-center space-x-4 mb-6">
                {course.instructor.socialLinks.map((link, index) => (
                  <a 
                    key={index}
                    href={link.url}
                    className="text-gray-600 hover:text-blue-600"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {link.icon}
                  </a>
                ))}
              </div>
              
              <div className="space-y-3 mb-6">
                <div>
                  <p className="text-sm text-gray-500">Total Students</p>
                  <p className="font-medium">{course.instructor.stats.students.toLocaleString()}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Courses</p>
                  <p className="font-medium">{course.instructor.stats.courses}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Reviews</p>
                  <p className="font-medium">{course.instructor.stats.reviews.toLocaleString()}</p>
                </div>
              </div>
            </div>
            
            <div className="md:w-2/3">
              <h3 className="text-xl font-bold mb-4">About the Instructor</h3>
              <div className="prose max-w-none">
                <p>{course.instructor.bio}</p>
              </div>
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="reviews" className="mt-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div>
              <h2 className="text-2xl font-bold mb-4">Student Reviews</h2>
              <div className="bg-gray-50 p-6 rounded-lg">
                <div className="flex items-center mb-4">
                  <div className="text-5xl font-bold mr-4">{course.rating}</div>
                  <div>
                    <div className="flex mb-1">
                      {[...Array(5)].map((_, i) => (
                        <Star 
                          key={i}
                          className={`h-5 w-5 ${i < Math.floor(course.rating) ? "text-yellow-400 fill-yellow-400" : "text-gray-300"}`}
                        />
                      ))}
                    </div>
                    <p className="text-sm text-gray-600">Course Rating • {course.reviews} Reviews</p>
                  </div>
                </div>
                
                <div className="space-y-2">
                  {course.ratingBreakdown.map((rating, index) => (
                    <div key={index} className="flex items-center">
                      <span className="w-6 text-sm">{rating.stars}</span>
                      <Star className="h-4 w-4 text-yellow-400 fill-yellow-400 mr-2" />
                      <Progress value={rating.percentage} className="h-2 flex-1" />
                      <span className="ml-2 text-sm w-8">{rating.percentage}%</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            
            <div className="lg:col-span-2">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-bold">Recent Reviews</h3>
                <Select value="recent">
                  <SelectTrigger className="w-[160px]">
                    <SelectValue placeholder="Sort by" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="recent">Most Recent</SelectItem>
                    <SelectItem value="highest">Highest Rated</SelectItem>
                    <SelectItem value="lowest">Lowest Rated</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-6">
                {course.reviewsList.map((review, index) => (
                  <div key={index} className="border-b pb-6 last:border-0">
                    <div className="flex justify-between items-start mb-2">
                      <div className="flex items-center">
                        <Avatar className="h-10 w-10 mr-3">
                          <AvatarImage src={review.avatar} />
                          <AvatarFallback>{review.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-medium">{review.name}</p>
                          <p className="text-sm text-gray-500">{review.date}</p>
                        </div>
                      </div>
                      <div className="flex">
                        {[...Array(5)].map((_, i) => (
                          <Star 
                            key={i}
                            className={`h-4 w-4 ${i < review.rating ? "text-yellow-400 fill-yellow-400" : "text-gray-300"}`}
                          />
                        ))}
                      </div>
                    </div>
                    <p>{review.comment}</p>
                  </div>
                ))}
              </div>
              
              <div className="mt-6 text-center">
                <Button variant="outline">Load More Reviews</Button>
              </div>
            </div>
          </div>
        </TabsContent>
      </Tabs>
      
      {/* Related Courses */}
      <div className="mt-12">
        <h2 className="text-2xl font-bold mb-6">You Might Also Like</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {courseData
            .filter(c => c.id !== id && c.category === course.category)
            .slice(0, 3)
            .map(relatedCourse => (
              <div key={relatedCourse.id} className="bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow">
                <img 
                  src={relatedCourse.imageUrl} 
                  alt={relatedCourse.title}
                  className="w-full h-48 object-cover"
                />
                <div className="p-6">
                  <h3 className="font-bold text-lg mb-2">{relatedCourse.title}</h3>
                  <p className="text-gray-600 text-sm mb-4 line-clamp-2">{relatedCourse.description}</p>
                  <div className="flex justify-between items-center">
                    <span className="text-blue-600 font-bold">{relatedCourse.price}</span>
                    <Button size="sm" variant="outline" asChild>
                      <Link to={`/courses/${relatedCourse.id}`}>View Course</Link>
                    </Button>
                  </div>
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}

// Mock course data
const courseData = [
  {
    id: "1",
    title: "Web Development Fundamentals",
    description: "Learn HTML, CSS, and JavaScript to build modern websites.",
    longDescription: "This comprehensive course will take you from beginner to proficient in web development. You'll start with the basics of HTML structure, move on to styling with CSS, and then add interactivity with JavaScript. By the end of the course, you'll have built several real-world projects including a portfolio website, interactive forms, and a simple web application. Whether you're looking to start a career in web development or enhance your current skills, this course provides everything you need to create responsive, accessible, and modern websites.",
    price: "$49.99",
    category: "Programming",
    imageUrl: "https://images.unsplash.com/photo-1547658719-da2b51169166?q=80&w=500&auto=format&fit=crop",
    duration: "10 weeks",
    level: "Beginner",
    students: 1520,
    lessons: 42,
    lastUpdated: "March 2023",
    rating: 4.7,
    reviews: 328,
    instructor: {
      name: "David Johnson",
      title: "Senior Web Developer",
      avatar: "https://randomuser.me/api/portraits/men/32.jpg",
      bio: "David has over 10 years of experience in web development and has worked with companies like Google and Facebook. He specializes in front-end technologies and is passionate about teaching the next generation of developers. His practical approach to teaching has helped thousands of students launch successful careers in tech.",
      socialLinks: [
        { icon: <Facebook size={20} />, url: "#" },
        { icon: <Twitter size={20} />, url: "#" },
        { icon: <Mail size={20} />, url: "#" },
      ],
      stats: {
        students: 15420,
        courses: 8,
        reviews: 4280
      }
    },
    learningOutcomes: [
      "Build responsive websites using HTML5 and CSS3",
      "Create interactive web pages with JavaScript",
      "Understand web development best practices",
      "Deploy websites to live servers",
      "Implement modern CSS frameworks",
      "Debug common web development issues",
      "Optimize websites for performance",
      "Create forms with validation"
    ],
    requirements: [
      "Basic computer skills",
      "No prior programming experience required",
      "A computer with internet access",
      "Text editor (recommendations provided)"
    ],
    features: [
      { icon: Clock, text: "42 hours of video content" },
      { icon: Users, text: "Access to student community" },
      { icon: Award, text: "Certificate of completion" },
      { icon: Calendar, text: "Lifetime access" }
    ],
    skills: ["HTML5", "CSS3", "JavaScript", "Responsive Design", "Web Hosting", "Git", "SEO Basics"],
    modules: [
      {
        title: "Introduction to Web Development",
        lessons: 5,
        duration: "3 hours",
        lessonsList: [
          { title: "Course Overview", duration: "15 min", icon: <Clock className="h-4 w-4 text-blue-500" /> },
          { title: "Setting Up Your Development Environment", duration: "30 min", icon: <Clock className="h-4 w-4 text-blue-500" /> },
          { title: "Understanding How the Web Works", duration: "45 min", icon: <Clock className="h-4 w-4 text-blue-500" /> },
          { title: "Web Development Career Paths", duration: "45 min", icon: <Clock className="h-4 w-4 text-blue-500" /> },
          { title: "Your First Web Page", duration: "45 min", icon: <Clock className="h-4 w-4 text-blue-500" /> },
        ]
      },
      {
        title: "HTML Fundamentals",
        lessons: 8,
        duration: "6 hours",
        lessonsList: [
          { title: "HTML Document Structure", duration: "45 min", icon: <Clock className="h-4 w-4 text-blue-500" /> },
          { title: "Working with Text", duration: "45 min", icon: <Clock className="h-4 w-4 text-blue-500" /> },
          { title: "HTML Lists", duration: "30 min", icon: <Clock className="h-4 w-4 text-blue-500" /> },
          { title: "Adding Links", duration: "45 min", icon: <Clock className="h-4 w-4 text-blue-500" /> },
          { title: "Working with Images", duration: "45 min", icon: <Clock className="h-4 w-4 text-blue-500" /> },
          { title: "HTML Tables", duration: "1 hour", icon: <Clock className="h-4 w-4 text-blue-500" /> },
          { title: "HTML Forms", duration: "1 hour", icon: <Clock className="h-4 w-4 text-blue-500" /> },
          { title: "HTML5 Semantic Elements", duration: "30 min", icon: <Clock className="h-4 w-4 text-blue-500" /> },
        ]
      },
      {
        title: "CSS Styling",
        lessons: 10,
        duration: "8 hours",
        lessonsList: [
          { title: "Introduction to CSS", duration: "45 min", icon: <Clock className="h-4 w-4 text-blue-500" /> },
          { title: "CSS Selectors", duration: "1 hour", icon: <Clock className="h-4 w-4 text-blue-500" /> },
          { title: "Colors and Backgrounds", duration: "45 min", icon: <Clock className="h-4 w-4 text-blue-500" /> },
          { title: "Typography and Text Styling", duration: "45 min", icon: <Clock className="h-4 w-4 text-blue-500" /> },
          { title: "The Box Model", duration: "1 hour", icon: <Clock className="h-4 w-4 text-blue-500" /> },
        ]
      }
    ],
    ratingBreakdown: [
      { stars: 5, percentage: 78 },
      { stars: 4, percentage: 15 },
      { stars: 3, percentage: 5 },
      { stars: 2, percentage: 1 },
      { stars: 1, percentage: 1 }
    ],
    reviewsList: [
      {
        name: "Sarah Thompson",
        avatar: "https://randomuser.me/api/portraits/women/44.jpg",
        date: "2 months ago",
        rating: 5,
        comment: "This course exceeded my expectations. The instructor explains complex concepts in an easy-to-understand way, and the projects were fun and challenging. I now feel confident in my web development skills."
      },
      {
        name: "Michael Rodriguez",
        avatar: "https://randomuser.me/api/portraits/men/75.jpg",
        date: "3 months ago",
        rating: 4,
        comment: "Great introduction to web development. The content is well-structured and the instructor is knowledgeable. Would have liked more advanced JavaScript topics, but overall a solid course."
      },
      {
        name: "Emily Chen",
        avatar: "https://randomuser.me/api/portraits/women/63.jpg",
        date: "1 month ago",
        rating: 5,
        comment: "As someone with no prior coding experience, this course was perfect. Step-by-step instructions, clear explanations, and practical projects. I've already landed my first freelance gig thanks to what I learned!"
      }
    ]
  },
  {
    id: "2",
    title: "Data Science Essentials",
    description: "Master the basics of data analysis and visualization.",
    longDescription: "This comprehensive course covers all the essential concepts and tools needed to start a career in data science. From statistical analysis to machine learning basics, you'll learn how to extract insights from data and communicate them effectively. The course includes hands-on projects with real-world datasets to build your portfolio and practical skills that employers are looking for.",
    price: "$59.99",
    category: "Data Science",
    imageUrl: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=500&auto=format&fit=crop",
    duration: "8 weeks",
    level: "Intermediate",
    students: 980,
    lessons: 36,
    lastUpdated: "January 2023",
    rating: 4.8,
    reviews: 215,
    instructor: {
      name: "Jennifer Lee",
      title: "Data Scientist at TechCorp",
      avatar: "https://randomuser.me/api/portraits/women/44.jpg",
      bio: "Jennifer has a Ph.D. in Statistics and over 8 years of experience in the field of data science. She has worked on projects in healthcare, finance, and e-commerce, applying machine learning to solve real-world problems. Jennifer is passionate about making data science accessible to everyone.",
      socialLinks: [
        { icon: <Twitter size={20} />, url: "#" },
        { icon: <Mail size={20} />, url: "#" },
      ],
      stats: {
        students: 8940,
        courses: 4,
        reviews: 2150
      }
    },
    learningOutcomes: [
      "Understand the data science workflow",
      "Clean and preprocess data effectively",
      "Perform exploratory data analysis",
      "Create compelling data visualizations",
      "Apply statistical methods to analyze data",
      "Build basic machine learning models",
      "Communicate insights from data analysis",
      "Use Python for data analysis"
    ],
    requirements: [
      "Basic understanding of mathematics (high school level)",
      "Some programming experience is helpful but not required",
      "Computer with internet access",
      "Enthusiasm for working with data"
    ],
    features: [
      { icon: Clock, text: "36 hours of video content" },
      { icon: Users, text: "Access to student community" },
      { icon: Award, text: "Certificate of completion" },
      { icon: Calendar, text: "Lifetime access" }
    ],
    skills: ["Python", "Data Analysis", "Statistics", "Data Visualization", "Pandas", "NumPy", "Matplotlib"],
    modules: [
      {
        title: "Introduction to Data Science",
        lessons: 4,
        duration: "3 hours",
        lessonsList: [
          { title: "What is Data Science?", duration: "45 min", icon: <Clock className="h-4 w-4 text-blue-500" /> },
          { title: "The Data Science Workflow", duration: "45 min", icon: <Clock className="h-4 w-4 text-blue-500" /> },
          { title: "Setting Up Your Environment", duration: "45 min", icon: <Clock className="h-4 w-4 text-blue-500" /> },
          { title: "Introduction to Python for Data Science", duration: "45 min", icon: <Clock className="h-4 w-4 text-blue-500" /> },
        ]
      },
      {
        title: "Data Manipulation with Python",
        lessons: 6,
        duration: "5 hours",
        lessonsList: [
          { title: "Introduction to NumPy", duration: "45 min", icon: <Clock className="h-4 w-4 text-blue-500" /> },
          { title: "Working with Pandas", duration: "1 hour", icon: <Clock className="h-4 w-4 text-blue-500" /> },
          { title: "Data Cleaning Techniques", duration: "1 hour", icon: <Clock className="h-4 w-4 text-blue-500" /> },
          { title: "Handling Missing Data", duration: "45 min", icon: <Clock className="h-4 w-4 text-blue-500" /> },
          { title: "Data Transformation", duration: "45 min", icon: <Clock className="h-4 w-4 text-blue-500" /> },
          { title: "Working with Time Series Data", duration: "45 min", icon: <Clock className="h-4 w-4 text-blue-500" /> },
        ]
      },
      {
        title: "Data Visualization",
        lessons: 5,
        duration: "4 hours",
        lessonsList: [
          { title: "Principles of Data Visualization", duration: "45 min", icon: <Clock className="h-4 w-4 text-blue-500" /> },
          { title: "Creating Visualizations with Matplotlib", duration: "1 hour", icon: <Clock className="h-4 w-4 text-blue-500" /> },
          { title: "Advanced Visualizations with Seaborn", duration: "1 hour", icon: <Clock className="h-4 w-4 text-blue-500" /> },
          { title: "Interactive Visualizations", duration: "45 min", icon: <Clock className="h-4 w-4 text-blue-500" /> },
          { title: "Creating Dashboards", duration: "30 min", icon: <Clock className="h-4 w-4 text-blue-500" /> },
        ]
      }
    ],
    ratingBreakdown: [
      { stars: 5, percentage: 82 },
      { stars: 4, percentage: 14 },
      { stars: 3, percentage: 3 },
      { stars: 2, percentage: 1 },
      { stars: 1, percentage: 0 }
    ],
    reviewsList: [
      {
        name: "Robert Garcia",
        avatar: "https://randomuser.me/api/portraits/men/34.jpg",
        date: "1 month ago",
        rating: 5,
        comment: "Excellent course! I had some programming experience but was new to data science. The instructor breaks down complex concepts into understandable chunks, and the projects helped me apply what I learned."
      },
      {
        name: "Lisa Wang",
        avatar: "https://randomuser.me/api/portraits/women/22.jpg",
        date: "2 months ago",
        rating: 5,
        comment: "This course changed my career trajectory. The content is comprehensive and up-to-date. I especially appreciated the section on data visualization, which helped me create compelling stories with data."
      },
      {
        name: "James Wilson",
        avatar: "https://randomuser.me/api/portraits/men/62.jpg",
        date: "3 months ago",
        rating: 4,
        comment: "Great introduction to data science. The course covers all the essential topics and tools. Would have liked more advanced machine learning content, but it's perfect for beginners and intermediates."
      }
    ]
  },
  {
    id: "3",
    title: "Digital Marketing Masterclass",
    description: "Learn to create effective digital marketing campaigns.",
    longDescription: "This comprehensive digital marketing course covers everything you need to know to promote products and services online. From social media marketing to SEO, email campaigns to content creation, you'll learn practical strategies that get results. By the end of this course, you'll be able to create and implement effective digital marketing campaigns across multiple platforms.",
    price: "$39.99",
    category: "Marketing",
    imageUrl: "https://images.unsplash.com/photo-1533750349088-cd871a92f312?q=80&w=500&auto=format&fit=crop",
    duration: "6 weeks",
    level: "All Levels",
    students: 2340,
    lessons: 30,
    lastUpdated: "April 2023",
    rating: 4.6,
    reviews: 412,
    instructor: {
      name: "Alex Morgan",
      title: "Digital Marketing Consultant",
      avatar: "https://randomuser.me/api/portraits/women/32.jpg",
      bio: "Alex has helped over 100 businesses grow their online presence through effective digital marketing strategies. With 12 years of experience in the field, she specializes in social media marketing, SEO, and content strategy. Alex previously worked as a marketing director for several tech startups before becoming a full-time consultant and educator.",
      socialLinks: [
        { icon: <Facebook size={20} />, url: "#" },
        { icon: <Twitter size={20} />, url: "#" },
        { icon: <Instagram size={20} />, url: "#" },
        { icon: <Mail size={20} />, url: "#" },
      ],
      stats: {
        students: 24680,
        courses: 6,
        reviews: 5840
      }
    },
    learningOutcomes: [
      "Create comprehensive digital marketing strategies",
      "Build effective social media campaigns",
      "Optimize websites for search engines (SEO)",
      "Create and manage paid advertising campaigns",
      "Develop email marketing sequences that convert",
      "Analyze marketing performance using key metrics",
      "Create compelling content for different platforms",
      "Understand digital marketing analytics"
    ],
    requirements: [
      "No prior marketing experience required",
      "Computer with internet access",
      "Willingness to create accounts on various platforms",
      "Basic computer literacy"
    ],
    features: [
      { icon: Clock, text: "30 hours of video content" },
      { icon: Users, text: "Access to student community" },
      { icon: Award, text: "Certificate of completion" },
      { icon: Calendar, text: "Lifetime access" }
    ],
    skills: ["Social Media Marketing", "SEO", "Content Marketing", "Email Marketing", "Google Analytics", "Facebook Ads", "Google Ads"],
    modules: [
      {
        title: "Digital Marketing Fundamentals",
        lessons: 4,
        duration: "3 hours",
        lessonsList: [
          { title: "Introduction to Digital Marketing", duration: "45 min", icon: <Clock className="h-4 w-4 text-blue-500" /> },
          { title: "Building a Digital Marketing Strategy", duration: "45 min", icon: <Clock className="h-4 w-4 text-blue-500" /> },
          { title: "Understanding Your Target Audience", duration: "45 min", icon: <Clock className="h-4 w-4 text-blue-500" /> },
          { title: "Digital Marketing Channels Overview", duration: "45 min", icon: <Clock className="h-4 w-4 text-blue-500" /> },
        ]
      },
      {
        title: "Social Media Marketing",
        lessons: 6,
        duration: "5 hours",
        lessonsList: [
          { title: "Social Media Strategy Development", duration: "45 min", icon: <Clock className="h-4 w-4 text-blue-500" /> },
          { title: "Facebook Marketing", duration: "1 hour", icon: <Clock className="h-4 w-4 text-blue-500" /> },
          { title: "Instagram Marketing", duration: "1 hour", icon: <Clock className="h-4 w-4 text-blue-500" /> },
          { title: "Twitter Marketing", duration: "45 min", icon: <Clock className="h-4 w-4 text-blue-500" /> },
          { title: "LinkedIn Marketing", duration: "45 min", icon: <Clock className="h-4 w-4 text-blue-500" /> },
          { title: "Social Media Content Creation", duration: "45 min", icon: <Clock className="h-4 w-4 text-blue-500" /> },
        ]
      },
      {
        title: "Search Engine Optimization (SEO)",
        lessons: 5,
        duration: "4 hours",
        lessonsList: [
          { title: "SEO Fundamentals", duration: "45 min", icon: <Clock className="h-4 w-4 text-blue-500" /> },
          { title: "Keyword Research", duration: "1 hour", icon: <Clock className="h-4 w-4 text-blue-500" /> },
          { title: "On-Page SEO", duration: "45 min", icon: <Clock className="h-4 w-4 text-blue-500" /> },
          { title: "Off-Page SEO", duration: "45 min", icon: <Clock className="h-4 w-4 text-blue-500" /> },
          { title: "Technical SEO", duration: "45 min", icon: <Clock className="h-4 w-4 text-blue-500" /> },
        ]
      }
    ],
    ratingBreakdown: [
      { stars: 5, percentage: 72 },
      { stars: 4, percentage: 20 },
      { stars: 3, percentage: 6 },
      { stars: 2, percentage: 1 },
      { stars: 1, percentage: 1 }
    ],
    reviewsList: [
      {
        name: "Daniel Brooks",
        avatar: "https://randomuser.me/api/portraits/men/42.jpg",
        date: "1 month ago",
        rating: 5,
        comment: "This course transformed my small business's online presence. The step-by-step guidance on creating social media campaigns and optimizing my website for SEO has already resulted in increased traffic and sales."
      },
      {
        name: "Olivia Martinez",
        avatar: "https://randomuser.me/api/portraits/women/37.jpg",
        date: "2 months ago",
        rating: 4,
        comment: "Very comprehensive course with practical advice. The instructor is knowledgeable and engaging. Would recommend for anyone looking to understand digital marketing fundamentals."
      },
      {
        name: "Thomas Nguyen",
        avatar: "https://randomuser.me/api/portraits/men/19.jpg",
        date: "3 months ago",
        rating: 5,
        comment: "As someone working in traditional marketing looking to transition to digital, this course was exactly what I needed. The content is up-to-date and the instructor provides real-world examples that make the concepts easy to understand."
      }
    ]
  },
  {
    id: "4",
    title: "UX/UI Design Principles",
    description: "Create beautiful and functional user interfaces.",
    price: "$54.99",
    category: "Design",
    imageUrl: "https://images.unsplash.com/photo-1561070791-2526d30994b5?q=80&w=500&auto=format&fit=crop",
    duration: "7 weeks",
    level: "Beginner",
    students: 870,
    rating: 4.5,
    reviews: 178,
    lessons: 32,
    lastUpdated: "February 2023",
    instructor: {
      name: "Maya Patel",
      title: "Senior UX Designer",
      avatar: "https://randomuser.me/api/portraits/women/28.jpg",
      bio: "Maya has over 8 years of experience in UX/UI design, working with major tech companies and startups. She specializes in user-centered design and has helped numerous businesses improve their digital products through thoughtful and intuitive interfaces.",
      socialLinks: [
        { icon: <Twitter size={20} />, url: "#" },
        { icon: <Instagram size={20} />, url: "#" },
      ],
      stats: {
        students: 5680,
        courses: 3,
        reviews: 1240
      }
    },
    ratingBreakdown: [
      { stars: 5, percentage: 65 },
      { stars: 4, percentage: 25 },
      { stars: 3, percentage: 8 },
      { stars: 2, percentage: 1 },
      { stars: 1, percentage: 1 }
    ],
    reviewsList: []
  },
  {
    id: "5",
    title: "Business Strategy and Leadership",
    description: "Develop leadership skills and business acumen.",
    price: "$69.99",
    category: "Business",
    imageUrl: "https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=500&auto=format&fit=crop",
    duration: "12 weeks",
    level: "Advanced",
    students: 650,
    rating: 4.9,
    reviews: 145,
    lessons: 48,
    lastUpdated: "January 2023",
    instructor: {
      name: "Richard Taylor",
      title: "Business Consultant & Former CEO",
      avatar: "https://randomuser.me/api/portraits/men/52.jpg",
      bio: "Richard has 20+ years of experience in business leadership roles, including as CEO of a Fortune 500 company. He now consults with businesses on strategy and leadership development, helping organizations achieve sustainable growth and develop strong leadership pipelines.",
      socialLinks: [
        { icon: <Twitter size={20} />, url: "#" },
        { icon: <Mail size={20} />, url: "#" },
      ],
      stats: {
        students: 3450,
        courses: 2,
        reviews: 980
      }
    },
    ratingBreakdown: [
      { stars: 5, percentage: 92 },
      { stars: 4, percentage: 6 },
      { stars: 3, percentage: 2 },
      { stars: 2, percentage: 0 },
      { stars: 1, percentage: 0 }
    ],
    reviewsList: []
  }
];

import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";