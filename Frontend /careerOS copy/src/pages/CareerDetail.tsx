
// src/pages/CareerDetail.tsx

import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useLazyQuery } from '@apollo/client';
import { GET_CAREER_DETAIL_BY_NAME } from '@/graphql/career-queries';
import { CareerDetail as CareerDetailType, Course } from '@/Models/career';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { courses } from '@/data/mockData';
import {
    ArrowLeft,
    MapPin,
    DollarSign,
    Briefcase,
    TrendingUp,
    Users,
    Globe,
    BookOpen,
    Star,
    Clock,
    Award,
    CheckCircle2,
    Sparkles,
} from 'lucide-react';

const CareerDetail = () => {
    const { id: careerName } = useParams<{ id: string }>();
    const navigate = useNavigate();

    const [career, setCareer] = useState<CareerDetailType | null>(null);
    const [relatedCourses, setRelatedCourses] = useState<Course[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    const [getCareerDetails] = useLazyQuery(GET_CAREER_DETAIL_BY_NAME);
    useEffect(() => {
        if (careerName) {
            getCareerDetails({
                variables: { careerName },
                onCompleted: (data) => {
                    setCareer(data.getCareerDetailByName);
                    setRelatedCourses(courses.slice(0, 3)); // mock related courses
                    setIsLoading(false);
                },
                onError: (error) => {
                    console.error('Error fetching career details:', error);
                    setIsLoading(false);
                },
            });
        } else {
            setIsLoading(false);
        }
    }, [careerName, getCareerDetails]);

    if (isLoading) {
        return (
            <div className="min-h-screen bg-background flex items-center justify-center">
                <div className="text-center animate-fade-in">
                    <div className="w-16 h-16 gradient-primary rounded-full flex items-center justify-center mb-6 pulse-glow mx-auto">
                        <Sparkles className="w-8 h-8 text-white animate-spin" />
                    </div>
                    <h2 className="text-2xl font-bold">Loading Career Details</h2>
                </div>
            </div>
        );
    }

    if (!career) {
        return (
            <div className="min-h-screen bg-background flex items-center justify-center">
                <div className="text-center">
                    <h2 className="text-2xl font-bold mb-4">Career Not Found</h2>
                    <Button onClick={() => navigate('/results')}>
                        Back to Results
                    </Button>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-background">
            <main className="max-w-6xl mx-auto px-4 py-12">
                {/* Hero Section */}
                <div className="gradient-card rounded-2xl p-8 mb-8 animate-fade-in">
                    <div className="flex items-start justify-between mb-6">
                        <div>
                            <h2 className="text-4xl font-bold mb-2">{career.predictedCareer}</h2>
                            <p className="text-xl text-primary font-medium mb-4">{career.careerOpportunities}</p>
                            <Badge className="gradient-primary text-white border-0 text-sm px-4 py-2">
                                High Demand
                            </Badge>
                        </div>
                        <div className="text-right">
                            <div className="text-sm text-muted-foreground mb-1">Career Match Score</div>
                            <div className="text-3xl font-bold text-success">94%</div>
                            <Progress value={94} className="w-24 mt-2" />
                        </div>
                    </div>
                </div>

                <div className="grid lg:grid-cols-3 gap-8">
                    {/* Main Content */}
                    <div className="lg:col-span-2 space-y-8">
                        {/* Description */}
                        <Card className="glass-card animate-fade-in">
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    <BookOpen className="w-5 h-5" />
                                    Career Overview
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="text-muted-foreground leading-relaxed mb-6">
                                    {career.careerDescription}
                                </p>

                                <h4 className="font-semibold mb-3">What You'll Do:</h4>
                                <ul className="space-y-2 text-muted-foreground">
                                    <li className="flex items-start gap-2">
                                        <CheckCircle2 className="w-5 h-5 text-success mt-0.5 flex-shrink-0" />
                                        {career.careerOpportunities || 'Opportunity details not available'}
                                    </li>
                                </ul>
                            </CardContent>
                        </Card>

                        {/* Skills Required */}
                        <Card className="glass-card animate-fade-in">
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    <Award className="w-5 h-5" />
                                    Skills & Qualifications
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-4">
                                    <div>
                                        <h4 className="font-semibold mb-3">Essential Skills</h4>
                                        <div className="grid grid-cols-2 gap-2">
                                            {career.skills?.map((skill) => (
                                                <Badge key={skill} variant="secondary" className="px-3 py-2 justify-center">
                                                    {skill}
                                                </Badge>
                                            ))}
                                        </div>
                                    </div>

                                    <div>
                                        <h4 className="font-semibold mb-3">Education Requirements</h4>
                                        <ul className="space-y-2 text-muted-foreground">
                                            <li className="flex items-center gap-2">
                                                <CheckCircle2 className="w-4 h-4 text-success" />
                                                {career.educationRequirement}
                                            </li>
                                            <li className="flex items-center gap-2">
                                                <CheckCircle2 className="w-4 h-4 text-success" />
                                                Continuous learning and skill development
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </div>

                    {/* Sidebar */}
                    <div className="space-y-6">
                        {/* Career Stats */}
                        <Card className="glass-card animate-fade-in">
                            <CardHeader>
                                <CardTitle>Career Statistics</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <InfoBox icon={<DollarSign className="w-5 h-5 text-success" />} label="Local Salary" value={career.slMonthlySalary} />
                                <InfoBox icon={<Globe className="w-5 h-5 text-primary" />} label="International Salary" value={career.foreignMonthlySalary} />
                                <InfoBox icon={<MapPin className="w-5 h-5 text-purple-500" />} label="Local Location" value={career.slLocation} />
                                <InfoBox icon={<Globe className="w-5 h-5 text-purple-500" />} label="Foreign Location" value={career.foreignLocation} />
                                <InfoBox icon={<Briefcase className="w-5 h-5 text-blue-500" />} label="Work Type" value={career.workType} />
                            </CardContent>
                        </Card>

                        {/* Action Buttons */}
                        {/*<div className="space-y-3 animate-fade-in">*/}
                        {/*    <Button className="w-full gradient-primary text-white" onClick={() => navigate('/courses')}>*/}
                        {/*        Start Learning Path*/}
                        {/*    </Button>*/}
                        {/*    <Button variant="outline" className="w-full" onClick={() => navigate('/results')}>*/}
                        {/*        Explore Other Careers*/}
                        {/*    </Button>*/}
                        {/*</div>*/}
                    </div>
                </div>

                {/* Related Courses */}
                {/*<div className="mt-16">*/}
                {/*    <div className="flex items-center justify-between mb-8">*/}
                {/*        <div>*/}
                {/*            <h3 className="text-3xl font-bold mb-2">Recommended Learning Path</h3>*/}
                {/*            <p className="text-muted-foreground">*/}
                {/*                Courses to help you build the skills for this career*/}
                {/*            </p>*/}
                {/*        </div>*/}
                {/*    </div>*/}

                {/*    <div className="grid md:grid-cols-3 gap-6">*/}
                {/*        {relatedCourses.map((course, index) => (*/}
                {/*            <Card*/}
                {/*                key={course.id}*/}
                {/*                className="glass-card-hover animate-fade-in cursor-pointer overflow-hidden"*/}
                {/*                style={{ animationDelay: `${index * 150}ms` }}*/}
                {/*                onClick={() => navigate(`/course/${course.id}`)}*/}
                {/*            >*/}
                {/*                <div className="aspect-video bg-gradient-secondary rounded-t-lg flex items-center justify-center">*/}
                {/*                    <div className="text-6xl">📚</div>*/}
                {/*                </div>*/}

                {/*                <CardContent className="p-6">*/}
                {/*                    <div className="flex items-start justify-between mb-3">*/}
                {/*                        <Badge className="gradient-primary text-white border-0">{course.platform}</Badge>*/}
                {/*                        {course.isFree && (*/}
                {/*                            <Badge variant="outline" className="text-success border-success">*/}
                {/*                                Free*/}
                {/*                            </Badge>*/}
                {/*                        )}*/}
                {/*                    </div>*/}

                {/*                    <h4 className="font-semibold text-lg mb-2 line-clamp-2">{course.title}</h4>*/}

                {/*                    <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">*/}
                {/*                        <div className="flex items-center gap-1">*/}
                {/*                            <Star className="w-4 h-4 text-yellow-500 fill-current" />*/}
                {/*                            <span>{course.rating}</span>*/}
                {/*                        </div>*/}
                {/*                        <div className="flex items-center gap-1">*/}
                {/*                            <Clock className="w-4 h-4" />*/}
                {/*                            <span>{course.duration}</span>*/}
                {/*                        </div>*/}
                {/*                    </div>*/}

                {/*                    <div className="flex items-center justify-between">*/}
                {/*                        <div className="text-sm text-muted-foreground">{course.level} Level</div>*/}
                {/*                        {!course.isFree && <div className="font-semibold text-primary">${course.price}</div>}*/}
                {/*                    </div>*/}
                {/*                </CardContent>*/}
                {/*            </Card>*/}
                {/*        ))}*/}
                {/*    </div>*/}
                {/*</div>*/}
            </main>
        </div>
    );
};

const InfoBox = ({ icon, label, value }: { icon: React.ReactNode; label: string; value?: string }) => (
    <div className="flex items-center gap-3 p-3 rounded-lg border border-muted shadow-sm bg-muted/10">
        {icon}
        <div>
            <div className="text-sm text-muted-foreground">{label}</div>
            <div className="font-semibold">{value || 'N/A'}</div>
        </div>
    </div>
);

export default CareerDetail;
