import { useEffect, useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { useLazyQuery } from '@apollo/client';
import { GET_CAREER_DETAILS } from '@/graphql/career-queries';
import { Career } from '@/Models/career';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import {
    ArrowRight,
    MapPin,
    DollarSign,
    Briefcase,
    Sparkles,
    Star,
    Globe
} from 'lucide-react';

const CareerResults = () => {
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    const [predictedCareers, setPredictedCareers] = useState<Career[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [getCareerDetails] = useLazyQuery(GET_CAREER_DETAILS);

    useEffect(() => {
        const subjectsParam = searchParams.get('subjects');
        if (subjectsParam) {
            const subjectArray = subjectsParam.split(',').map((s) => s.trim());

            getCareerDetails({
                variables: { names: subjectArray },
                onCompleted: (data) => {
                    setPredictedCareers(data.getCareerDetails);
                    setIsLoading(false);
                },
                onError: (err) => {
                    console.error('Query error:', err);
                    navigate('/subjects');
                }
            });
        } else {
            navigate('/subjects');
        }
    }, [searchParams, getCareerDetails, navigate]);

    if (isLoading) {
        return (
            <div className="min-h-screen bg-background flex items-center justify-center">
                <div className="text-center animate-fade-in">
                    <div className="w-16 h-16 gradient-primary rounded-full flex items-center justify-center mb-6 pulse-glow mx-auto">
                        <Sparkles className="w-8 h-8 text-white animate-spin" />
                    </div>
                    <h2 className="text-2xl font-bold mb-2">Analyzing Your Career Path</h2>
                    <p className="text-muted-foreground mb-6">Our AI is processing your interests...</p>
                    <Progress value={75} className="w-64 mx-auto" />
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-background">
            <main className="max-w-6xl mx-auto px-4 py-12">
                <div className="text-center mb-12 animate-fade-in">
                    <div className="w-20 h-20 gradient-primary rounded-full flex items-center justify-center mx-auto mb-6 animate-scale-in">
                        <Star className="w-10 h-10 text-white" />
                    </div>
                    <h2 className="text-4xl font-bold mb-4">🎓 Career Recommendation</h2>
                    <p className="text-xl text-muted-foreground">Based on your subject choices, we recommend:</p>
                </div>

                <div className="space-y-8">
                    {predictedCareers.map((career, index) => (
                        <Card
                            key={index}
                            className="glass-card-hover animate-fade-in cursor-pointer"
                            style={{ animationDelay: `${index * 200}ms` }}
                            onClick={() => navigate(`/career/${career.predictedCareer}`)}
                        >
                            <CardHeader>
                                <CardTitle className="text-2xl font-semibold">{career.predictedCareer}</CardTitle>
                            </CardHeader>

                            <CardContent className="space-y-4">
                                <p className="text-muted-foreground leading-relaxed">{career.careerDescription}</p>

                                <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
                                    <div className="glass-card p-4 text-center">
                                        <DollarSign className="w-6 h-6 text-green-600 mx-auto mb-2" />
                                        <div className="text-sm text-muted-foreground">Local Salary</div>
                                        <div className="font-semibold">{career.slMonthlySalary}</div>
                                    </div>

                                    <div className="glass-card p-4 text-center">
                                        <DollarSign className="w-6 h-6 text-blue-600 mx-auto mb-2" />
                                        <div className="text-sm text-muted-foreground">Foreign Salary</div>
                                        <div className="font-semibold">{career.foreignMonthlySalary}</div>
                                    </div>

                                    <div className="glass-card p-4 text-center">
                                        <MapPin className="w-6 h-6 text-orange-600 mx-auto mb-2" />
                                        <div className="text-sm text-muted-foreground">Sri Lanka Location</div>
                                        <div className="font-semibold">{career.slLocation}</div>
                                    </div>

                                    <div className="glass-card p-4 text-center">
                                        <Globe className="w-6 h-6 text-indigo-600 mx-auto mb-2" />
                                        <div className="text-sm text-muted-foreground">Foreign Location</div>
                                        <div className="font-semibold">{career.foreignLocation}</div>
                                    </div>

                                    <div className="glass-card p-4 text-center">
                                        <Briefcase className="w-6 h-6 text-purple-600 mx-auto mb-2" />
                                        <div className="text-sm text-muted-foreground">Work Type</div>
                                        <div className="font-semibold">{career.workType}</div>
                                    </div>

                                    <div className="glass-card p-4 text-center">
                                        <Star className="w-6 h-6 text-yellow-500 mx-auto mb-2" />
                                        <div className="text-sm text-muted-foreground">Education</div>
                                        <div className="font-semibold">{career.educationRequirement}</div>
                                    </div>
                                </div>

                                {Array.isArray(career.skills) && career.skills.length > 0 ? (
                                    <div>
                                        <h4 className="font-semibold mb-2">Key Skills</h4>
                                        <div className="flex flex-wrap gap-2">
                                            {career.skills.map((skill, idx) => (
                                                <Badge key={idx} variant="secondary" className="px-3 py-1">
                                                    {skill}
                                                </Badge>
                                            ))}
                                        </div>
                                    </div>
                                ) : (
                                    <div>
                                        <h4 className="font-semibold mb-2">Key Skills</h4>
                                        <p className="text-muted-foreground">No skill data available</p>
                                    </div>
                                )}

                                <div className="pt-4 flex items-center justify-between">
                                    <p className="text-sm text-muted-foreground">
                                        View opportunities in: {career.careerOpportunities}
                                    </p>
                                    <ArrowRight className="w-5 h-5 text-primary" />
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>

                <div className="text-center mt-16">
                    <Button
                        onClick={() => navigate('/subjects')}
                        className="gradient-primary text-white px-6 py-3 text-lg"
                    >
                        Try Again with Different Subjects
                    </Button>
                </div>
            </main>
        </div>
    );
};

export default CareerResults;