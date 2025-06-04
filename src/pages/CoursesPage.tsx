import { useState } from "react";
import { Link } from "react-router-dom";
import { Search, Filter, ArrowUpDown } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export default function CoursesPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [sortOrder, setSortOrder] = useState("popular");

  // Filter and sort courses based on user selections
  const filteredCourses = courses
    .filter((course) => {
      // Apply search filter
      const matchesSearch = course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                            course.description.toLowerCase().includes(searchQuery.toLowerCase());
      
      // Apply category filter
      const matchesCategory = categoryFilter === "all" || course.category === categoryFilter;
      
      return matchesSearch && matchesCategory;
    })
    .sort((a, b) => {
      // Apply sorting
      if (sortOrder === "priceAsc") {
        return parseFloat(a.price.replace("$", "")) - parseFloat(b.price.replace("$", ""));
      } else if (sortOrder === "priceDesc") {
        return parseFloat(b.price.replace("$", "")) - parseFloat(a.price.replace("$", ""));
      } else if (sortOrder === "nameAsc") {
        return a.title.localeCompare(b.title);
      } else if (sortOrder === "nameDesc") {
        return b.title.localeCompare(a.title);
      }
      // Default: sort by popularity
      return b.students - a.students;
    });

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-4">Browse Our Courses</h1>
        <p className="text-gray-600 max-w-3xl">
          Discover our wide range of courses designed to help you acquire new skills, 
          advance your career, and achieve your learning goals.
        </p>
      </div>

      {/* Filters and Search */}
      <div className="mb-8 bg-white p-6 rounded-lg shadow-sm">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Search courses..."
              className="pl-10"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          
          <div className="flex items-center space-x-2">
            <Filter className="h-4 w-4 text-gray-400" />
            <Select value={categoryFilter} onValueChange={setCategoryFilter}>
              <SelectTrigger>
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                <SelectItem value="Programming">Programming</SelectItem>
                <SelectItem value="Data Science">Data Science</SelectItem>
                <SelectItem value="Design">Design</SelectItem>
                <SelectItem value="Business">Business</SelectItem>
                <SelectItem value="Marketing">Marketing</SelectItem>
                <SelectItem value="Personal Development">Personal Development</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="flex items-center space-x-2">
            <ArrowUpDown className="h-4 w-4 text-gray-400" />
            <Select value={sortOrder} onValueChange={setSortOrder}>
              <SelectTrigger>
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="popular">Most Popular</SelectItem>
                <SelectItem value="priceAsc">Price: Low to High</SelectItem>
                <SelectItem value="priceDesc">Price: High to Low</SelectItem>
                <SelectItem value="nameAsc">Name: A to Z</SelectItem>
                <SelectItem value="nameDesc">Name: Z to A</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      {/* Results count */}
      <div className="mb-4">
        <p className="text-gray-600">
          Showing {filteredCourses.length} of {courses.length} courses
        </p>
      </div>

      {/* Course Grid */}
      {filteredCourses.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCourses.map((course) => (
            <Card key={course.id} className="overflow-hidden hover:shadow-md transition-shadow">
              <img 
                src={course.imageUrl} 
                alt={course.title} 
                className="w-full h-48 object-cover"
              />
              <CardHeader>
                <div className="flex justify-between items-start">
                  <CardTitle className="text-xl">{course.title}</CardTitle>
                  <Badge variant="secondary">{course.category}</Badge>
                </div>
                <CardDescription>{course.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex justify-between items-center">
                  <div>
                    <p className="text-sm text-gray-500">{course.duration}</p>
                    <p className="text-sm text-gray-500">{course.level}</p>
                  </div>
                  <p className="text-blue-600 font-bold">{course.price}</p>
                </div>
              </CardContent>
              <CardFooter className="border-t pt-4">
                <Button asChild className="w-full">
                  <Link to={`/courses/${course.id}`}>View Course</Link>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <h3 className="text-xl font-medium mb-2">No courses found</h3>
          <p className="text-gray-600 mb-6">Try adjusting your search or filter criteria</p>
          <Button onClick={() => {
            setSearchQuery("");
            setCategoryFilter("all");
          }}>
            Reset Filters
          </Button>
        </div>
      )}
    </div>
  );
}

// Sample course data
const courses = [
  {
    id: "1",
    title: "Web Development Fundamentals",
    description: "Learn HTML, CSS, and JavaScript to build modern websites.",
    price: "$49.99",
    category: "Programming",
    imageUrl: "https://images.unsplash.com/photo-1547658719-da2b51169166?q=80&w=500&auto=format&fit=crop",
    duration: "10 weeks",
    level: "Beginner",
    students: 1520
  },
  {
    id: "2",
    title: "Data Science Essentials",
    description: "Master the basics of data analysis and visualization.",
    price: "$59.99",
    category: "Data Science",
    imageUrl: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=500&auto=format&fit=crop",
    duration: "8 weeks",
    level: "Intermediate",
    students: 980
  },
  {
    id: "3",
    title: "Digital Marketing Masterclass",
    description: "Learn to create effective digital marketing campaigns.",
    price: "$39.99",
    category: "Marketing",
    imageUrl: "https://images.unsplash.com/photo-1533750349088-cd871a92f312?q=80&w=500&auto=format&fit=crop",
    duration: "6 weeks",
    level: "All Levels",
    students: 2340
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
    students: 870
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
    students: 650
  },
  {
    id: "6",
    title: "Mobile App Development with React Native",
    description: "Build cross-platform mobile apps with React Native.",
    price: "$64.99",
    category: "Programming",
    imageUrl: "https://images.unsplash.com/photo-1551650975-87deedd944c3?q=80&w=500&auto=format&fit=crop",
    duration: "9 weeks",
    level: "Intermediate",
    students: 780
  },
  {
    id: "7",
    title: "Introduction to Machine Learning",
    description: "Learn the fundamentals of machine learning algorithms.",
    price: "$79.99",
    category: "Data Science",
    imageUrl: "https://images.unsplash.com/photo-1515879218367-8466d910aaa4?q=80&w=500&auto=format&fit=crop",
    duration: "10 weeks",
    level: "Intermediate",
    students: 920
  },
  {
    id: "8",
    title: "Personal Finance Management",
    description: "Take control of your finances and build wealth.",
    price: "$34.99",
    category: "Personal Development",
    imageUrl: "https://images.unsplash.com/photo-1579621970795-87facc2f976d?q=80&w=500&auto=format&fit=crop",
    duration: "4 weeks",
    level: "All Levels",
    students: 1850
  },
  {
    id: "9",
    title: "Graphic Design for Beginners",
    description: "Master the basics of graphic design and visual communication.",
    price: "$44.99",
    category: "Design",
    imageUrl: "https://images.unsplash.com/photo-1626785774573-4b799315345d?q=80&w=500&auto=format&fit=crop",
    duration: "6 weeks",
    level: "Beginner",
    students: 1230
  }
];