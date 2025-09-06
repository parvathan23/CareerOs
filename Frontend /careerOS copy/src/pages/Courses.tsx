import { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { courses } from '@/data/mockData';
import { Course } from '@/types';
import {
    Search,
    Filter,
    Star,
    Users,
    Clock,
    BookOpen,
    Sparkles,
    SlidersHorizontal
} from 'lucide-react';

const Courses = () => {
    const navigate = useNavigate();
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedPlatform, setSelectedPlatform] = useState('all');
    const [selectedLevel, setSelectedLevel] = useState('all');
    const [selectedPrice, setSelectedPrice] = useState('all');
    const [filteredCourses, setFilteredCourses] = useState<Course[]>(courses);

    // Get unique platforms for filter
    const platforms = Array.from(new Set(courses.map(course => course.platform)));

    const filterCourses = useCallback(() => {
        let filtered = courses.filter(course => {
            const matchesSearch = course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                course.description.toLowerCase().includes(searchQuery.toLowerCase());
            const matchesPlatform = selectedPlatform === 'all' || course.platform === selectedPlatform;
            const matchesLevel = selectedLevel === 'all' || course.level === selectedLevel;
            const matchesPrice = selectedPrice === 'all' ||
                (selectedPrice === 'free' && course.isFree) ||
                (selectedPrice === 'paid' && !course.isFree);

            return matchesSearch && matchesPlatform && matchesLevel && matchesPrice;
        });

        setFilteredCourses(filtered);
    }, [searchQuery, selectedPlatform, selectedLevel, selectedPrice]);

    // Apply filters whenever any filter changes
    useEffect(() => {
        filterCourses();
    }, [filterCourses]);

    return (
        <div className="min-h-screen bg-background">
            <main className="max-w-6xl mx-auto px-4 py-12">
                {/* Hero Section */}
                <div className="text-center mb-12 animate-fade-in">
                    <h2 className="text-4xl font-bold mb-4">
                        Level Up Your Skills
                    </h2>
                    <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                        Choose from thousands of online courses from top instructors and universities.
                        Start building the skills you need for your dream career.
                    </p>
                </div>

                {/* Search and Filters */}
                <Card className="glass-card mb-8 animate-fade-in">
                    <CardContent className="p-6">
                        <div className="flex flex-col lg:flex-row gap-4">
                            {/* Search */}
                            <div className="flex-1 relative">
                                <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
                                <Input
                                    placeholder="Search courses, skills, or instructors..."
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    className="pl-10"
                                />
                            </div>

                            {/* Filters */}
                            <div className="flex flex-wrap gap-3">
                                <Select value={selectedPlatform} onValueChange={setSelectedPlatform}>
                                    <SelectTrigger className="w-40">
                                        <SelectValue placeholder="Platform" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="all">All Platforms</SelectItem>
                                        {platforms.map(platform => (
                                            <SelectItem key={platform} value={platform}>{platform}</SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>

                                <Select value={selectedLevel} onValueChange={setSelectedLevel}>
                                    <SelectTrigger className="w-40">
                                        <SelectValue placeholder="Level" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="all">All Levels</SelectItem>
                                        <SelectItem value="Beginner">Beginner</SelectItem>
                                        <SelectItem value="Intermediate">Intermediate</SelectItem>
                                        <SelectItem value="Advanced">Advanced</SelectItem>
                                    </SelectContent>
                                </Select>

                                <Select value={selectedPrice} onValueChange={setSelectedPrice}>
                                    <SelectTrigger className="w-32">
                                        <SelectValue placeholder="Price" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="all">All Prices</SelectItem>
                                        <SelectItem value="free">Free</SelectItem>
                                        <SelectItem value="paid">Paid</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>

                        <div className="flex items-center justify-between mt-4">
                            <p className="text-muted-foreground">
                                Showing {filteredCourses.length} of {courses.length} courses
                            </p>
                            <Button variant="ghost" size="sm">
                                <SlidersHorizontal className="w-4 h-4 mr-2" />
                                Advanced Filters
                            </Button>
                        </div>
                    </CardContent>
                </Card>

                {/* Courses Grid */}
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredCourses.map((course, index) => (
                        <Card
                            key={course.id}
                            className="glass-card-hover animate-fade-in cursor-pointer overflow-hidden"
                            style={{ animationDelay: `${index * 100}ms` }}
                            onClick={() => navigate(`/course/${course.id}`)}
                        >
                            <div className="aspect-video bg-gradient-secondary rounded-t-lg flex items-center justify-center">
                                <div className="text-6xl">📚</div>
                            </div>

                            <CardContent className="p-6">
                                <div className="flex items-start justify-between mb-3">
                                    <Badge className="gradient-primary text-white border-0">
                                        {course.platform}
                                    </Badge>
                                    <div className="flex items-center gap-1">
                                        {course.isFree && (
                                            <Badge variant="outline" className="text-success border-success">
                                                Free
                                            </Badge>
                                        )}
                                        <Badge variant="secondary" className="text-xs">
                                            {course.level}
                                        </Badge>
                                    </div>
                                </div>

                                <h3 className="font-semibold text-lg mb-2 line-clamp-2 min-h-[3.5rem]">
                                    {course.title}
                                </h3>

                                <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
                                    {course.description}
                                </p>

                                <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
                                    <div className="flex items-center gap-1">
                                        <Star className="w-4 h-4 text-yellow-500 fill-current" />
                                        <span>{course.rating}</span>
                                        <span className="text-xs">({course.reviewCount.toLocaleString()})</span>
                                    </div>

                                    <div className="flex items-center gap-1">
                                        <Clock className="w-4 h-4" />
                                        <span>{course.duration}</span>
                                    </div>
                                </div>

                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                        <Users className="w-4 h-4" />
                                        <span>{course.enrollmentCount.toLocaleString()}</span>
                                    </div>

                                    <div className="text-right">
                                        {course.isFree ? (
                                            <span className="text-lg font-bold text-success">Free</span>
                                        ) : (
                                            <span className="text-lg font-bold text-primary">${course.price}</span>
                                        )}
                                    </div>
                                </div>

                                <div className="mt-4 pt-4 border-t">
                                    <div className="flex items-center justify-between text-sm">
                                        <span className="text-muted-foreground">By {course.instructor}</span>
                                        {course.certificate && (
                                            <div className="flex items-center gap-1 text-primary">
                                                <Sparkles className="w-3 h-3" />
                                                <span className="text-xs">Certificate</span>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>

                {/* Empty State */}
                {filteredCourses.length === 0 && (
                    <div className="text-center py-16 animate-fade-in">
                        <div className="w-20 h-20 gradient-secondary rounded-full flex items-center justify-center mx-auto mb-6">
                            <Search className="w-10 h-10 text-muted-foreground" />
                        </div>
                        <h3 className="text-2xl font-bold mb-2">No courses found</h3>
                        <p className="text-muted-foreground mb-6">
                            Try adjusting your search or filter criteria
                        </p>
                        <Button onClick={() => {
                            setSearchQuery('');
                            setSelectedPlatform('all');
                            setSelectedLevel('all');
                            setSelectedPrice('all');
                        }}>
                            Clear Filters
                        </Button>
                    </div>
                )}

                {/* Load More Button */}
                {filteredCourses.length > 0 && (
                    <div className="text-center mt-12">
                        <Button variant="outline" size="lg">
                            Load More Courses
                        </Button>
                    </div>
                )}
            </main>
        </div>
    );
};

export default Courses;