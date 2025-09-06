import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { courses } from '@/data/mockData';
import { Course } from '@/types';
import { 
  ArrowLeft, 
  Star, 
  Users, 
  Clock, 
  Award, 
  Globe, 
  CheckCircle2, 
  Play,
  BookOpen,
  Download,
  Heart,
  Share2,
  Sparkles
} from 'lucide-react';

const CourseDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [course, setCourse] = useState<Course | null>(null);
  const [isEnrolled, setIsEnrolled] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const foundCourse = courses.find(c => c.id === id);
    if (foundCourse) {
      setCourse(foundCourse);
    }
    setIsLoading(false);
  }, [id]);

  const handleEnroll = () => {
    setIsEnrolled(true);
    // Simulate enrollment process
    setTimeout(() => {
      alert('Enrollment successful! You can now access the course content.');
    }, 500);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center animate-fade-in">
          <div className="w-16 h-16 gradient-primary rounded-full flex items-center justify-center mb-6 pulse-glow mx-auto">
            <Sparkles className="w-8 h-8 text-white animate-spin" />
          </div>
          <h2 className="text-2xl font-bold">Loading Course Details</h2>
        </div>
      </div>
    );
  }

  if (!course) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Course Not Found</h2>
          <Button onClick={() => navigate('/courses')}>
            Browse Courses
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <main className="max-w-6xl mx-auto px-4 py-12">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Hero Section */}
            <Card className="gradient-card overflow-hidden animate-fade-in">
              <div className="aspect-video bg-gradient-secondary flex items-center justify-center relative">
                <div className="text-8xl">📚</div>
                <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
                  <Button size="lg" className="bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white border-white/30">
                    <Play className="w-6 h-6 mr-2" />
                    Preview Course
                  </Button>
                </div>
              </div>
              
              <CardContent className="p-8">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <Badge className="gradient-primary text-white border-0 mb-3">
                      {course.platform}
                    </Badge>
                    <h2 className="text-3xl font-bold mb-2">{course.title}</h2>
                    <p className="text-muted-foreground leading-relaxed">
                      {course.description}
                    </p>
                  </div>
                </div>

                {/* Course Stats */}
                <div className="flex items-center gap-6 text-sm text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <Star className="w-4 h-4 text-yellow-500 fill-current" />
                    <span className="font-medium">{course.rating}</span>
                    <span>({course.reviewCount.toLocaleString()} reviews)</span>
                  </div>
                  
                  <div className="flex items-center gap-1">
                    <Users className="w-4 h-4" />
                    <span>{course.enrollmentCount.toLocaleString()} students</span>
                  </div>
                  
                  <div className="flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    <span>{course.duration}</span>
                  </div>
                  
                  <div className="flex items-center gap-1">
                    <Globe className="w-4 h-4" />
                    <span>{course.language}</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Course Content */}
            <Card className="glass-card animate-fade-in">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BookOpen className="w-5 h-5" />
                  What You'll Learn
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-4">
                  {course.curriculum.map((topic, index) => (
                    <div key={index} className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-success mt-0.5 flex-shrink-0" />
                      <span className="text-muted-foreground">{topic}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Instructor Info */}
            <Card className="glass-card animate-fade-in">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="w-5 h-5" />
                  Instructor
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-start gap-4">
                  <Avatar className="w-16 h-16">
                    <AvatarImage src="/placeholder-avatar.jpg" />
                    <AvatarFallback className="text-lg font-bold bg-primary text-white">
                      {course.instructor.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                  
                  <div className="flex-1">
                    <h4 className="text-xl font-semibold mb-2">{course.instructor}</h4>
                    <p className="text-muted-foreground mb-4">
                      Expert instructor with over 10 years of industry experience. 
                      Passionate about teaching and helping students achieve their career goals.
                    </p>
                    
                    <div className="flex items-center gap-4 text-sm">
                      <div className="flex items-center gap-2">
                        <Star className="w-4 h-4 text-yellow-500 fill-current" />
                        <span>4.8 Instructor Rating</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Users className="w-4 h-4" />
                        <span>50,000+ Students</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <BookOpen className="w-4 h-4" />
                        <span>15 Courses</span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Course Features */}
            <Card className="glass-card animate-fade-in">
              <CardHeader>
                <CardTitle>This Course Includes</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="flex items-center gap-3">
                    <Play className="w-5 h-5 text-primary" />
                    <span>On-demand video content</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Download className="w-5 h-5 text-primary" />
                    <span>Downloadable resources</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Award className="w-5 h-5 text-primary" />
                    <span>Certificate of completion</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Globe className="w-5 h-5 text-primary" />
                    <span>Lifetime access</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Enrollment Card */}
            <Card className="glass-card animate-fade-in">
              <CardContent className="p-6">
                <div className="text-center mb-6">
                  {course.isFree ? (
                    <div className="text-3xl font-bold text-success mb-2">Free</div>
                  ) : (
                    <div className="text-3xl font-bold text-primary mb-2">${course.price}</div>
                  )}
                  <p className="text-muted-foreground">One-time payment</p>
                </div>

                <div className="space-y-4">
                  <Button 
                    onClick={handleEnroll}
                    className="w-full gradient-primary text-white py-3 text-lg"
                    disabled={isEnrolled}
                  >
                    {isEnrolled ? 'Enrolled' : course.isFree ? 'Enroll for Free' : 'Enroll Now'}
                  </Button>
                  
                  {!isEnrolled && (
                    <Button variant="outline" className="w-full">
                      Add to Wishlist
                    </Button>
                  )}
                  
                  <div className="flex items-center gap-2">
                    <Button variant="ghost" size="sm" className="flex-1">
                      <Heart className="w-4 h-4 mr-1" />
                      Save
                    </Button>
                    <Button variant="ghost" size="sm" className="flex-1">
                      <Share2 className="w-4 h-4 mr-1" />
                      Share
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Course Info */}
            <Card className="glass-card animate-fade-in">
              <CardHeader>
                <CardTitle>Course Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Level</span>
                  <Badge variant="secondary">{course.level}</Badge>
                </div>
                
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Duration</span>
                  <span className="font-medium">{course.duration}</span>
                </div>
                
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Language</span>
                  <span className="font-medium">{course.language}</span>
                </div>
                
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Certificate</span>
                  <span className="font-medium">
                    {course.certificate ? 'Yes' : 'No'}
                  </span>
                </div>
                
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Students</span>
                  <span className="font-medium">{course.enrollmentCount.toLocaleString()}</span>
                </div>
              </CardContent>
            </Card>

            {/* Rating Breakdown */}
            <Card className="glass-card animate-fade-in">
              <CardHeader>
                <CardTitle>Rating Breakdown</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {[5, 4, 3, 2, 1].map(rating => (
                  <div key={rating} className="flex items-center gap-3">
                    <div className="flex items-center gap-1 w-12">
                      <Star className="w-4 h-4 text-yellow-500 fill-current" />
                      <span className="text-sm">{rating}</span>
                    </div>
                    <Progress 
                      value={rating === 5 ? 70 : rating === 4 ? 20 : rating === 3 ? 8 : 2} 
                      className="flex-1" 
                    />
                    <span className="text-sm text-muted-foreground w-8">
                      {rating === 5 ? '70%' : rating === 4 ? '20%' : rating === 3 ? '8%' : '2%'}
                    </span>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
};

export default CourseDetail;