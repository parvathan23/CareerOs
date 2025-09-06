import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { GET_ALL_SUBJECTS } from '@/graphql/subject-queries.ts';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ArrowRight, CheckCircle2, LoaderCircle, XCircle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';  // ✅ Import toast hook

interface Subject {
    id: string;
    name: string;
    icon: string;
}

const SubjectSelection = () => {
    const navigate = useNavigate();
    const [selectedSubjects, setSelectedSubjects] = useState<Subject[]>([]);
    const [isAnalyzing, setIsAnalyzing] = useState(false);

    const { toast } = useToast(); // ✅ useToast hook

    const { data, loading, error } = useQuery(GET_ALL_SUBJECTS);

    const subjectIconMap: Record<string, string> = {
        Maths: '📐',
        English: '📖',
        Chemistry: '⚗️',
        Biology: '🧬',
        History: '🏛️',
        Physics: '🔭',
        Commerce: '💰',
        Tamil: '📝',
        Geography: '🌍',
        Computer: '💻',
    };

    const subjects: Subject[] = (data?.getAllSubjects || []).map((name: string) => ({
        id: name.toLowerCase().replace(/\s+/g, '-'),
        name,
        icon: subjectIconMap[name] || '📘',
    }));

    const toggleSubject = (subject: Subject) => {
        setSelectedSubjects(prev => {
            const exists = prev.find(s => s.id === subject.id);
            return exists ? prev.filter(s => s.id !== subject.id) : [...prev, subject];
        });
    };

    const handleAnalyze = async () => {
        if (selectedSubjects.length < 2 || selectedSubjects.length > 3) {
            toast({
                title: "Invalid Selection ⚠️",
                description: "Please select 2 or 3 subjects to continue.",
                variant: "destructive", // red error toast
            });
            return;
        }

        setIsAnalyzing(true);
        await new Promise(resolve => setTimeout(resolve, 2000));
        const subjectNames = selectedSubjects.map(s => s.name).join(',');
        navigate(`/results?subjects=${subjectNames}`);
    };

    const isSelected = (subjectId: string) => selectedSubjects.some(s => s.id === subjectId);

    if (loading) return <div className="text-center mt-10"><LoaderCircle className="animate-spin w-6 h-6" /></div>;
    if (error) return <div className="text-center mt-10 text-red-500"><XCircle /> Failed to load subjects</div>;

    return (
        <div className="min-h-screen bg-background">
            <main className="max-w-6xl mx-auto px-4 py-12">
                <div className="text-center mb-12 animate-fade-in">
                    <h2 className="text-4xl font-bold mb-4">What subjects interest you the most?</h2>
                    <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                        Select <b>2 or 3 subjects</b>, and our AI will analyze your preferences to recommend the perfect career paths tailored just for you.
                    </p>
                </div>

                {/* Subject Cards */}
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mb-12">
                    {subjects.map((subject, index) => (
                        <Card
                            key={subject.id}
                            className={`
                                cursor-pointer transition-all duration-300 hover:scale-105
                                ${isSelected(subject.id)
                                ? 'ring-2 ring-primary shadow-lg bg-primary/5'
                                : 'glass-card hover:shadow-lg'}
                            `}
                            onClick={() => toggleSubject(subject)}
                            style={{ animationDelay: `${index * 100}ms` }}
                        >
                            <CardContent className="p-6 text-center relative">
                                {isSelected(subject.id) && (
                                    <div className="absolute -top-2 -right-2">
                                        <div className="w-6 h-6 bg-primary rounded-full flex items-center justify-center">
                                            <CheckCircle2 className="w-4 h-4 text-white" />
                                        </div>
                                    </div>
                                )}

                                <div className="text-4xl mb-3">{subject.icon}</div>
                                <h3 className="font-semibold text-lg mb-2">{subject.name}</h3>

                                {isSelected(subject.id) && (
                                    <Badge className="gradient-primary text-white border-0">Selected</Badge>
                                )}
                            </CardContent>
                        </Card>
                    ))}
                </div>

                {/* Selected Subjects */}
                {selectedSubjects.length > 0 && (
                    <div className="glass-card p-6 mb-8 animate-fade-in">
                        <h3 className="font-semibold mb-4">Selected Subjects ({selectedSubjects.length})</h3>
                        <div className="flex flex-wrap gap-2">
                            {selectedSubjects.map(subject => (
                                <Badge
                                    key={subject.id}
                                    variant="secondary"
                                    className="px-3 py-2 text-sm"
                                >
                                    {subject.icon} {subject.name}
                                </Badge>
                            ))}
                        </div>
                    </div>
                )}

                {/* Action Button */}
                <div className="text-center">
                    <Button
                        onClick={handleAnalyze}
                        disabled={isAnalyzing || selectedSubjects.length < 2}
                        size="lg"
                        className="gradient-primary text-white px-8 py-4 text-lg font-medium disabled:opacity-50"
                    >
                        {isAnalyzing ? (
                            <div className="flex items-center gap-3">
                                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                                Analyzing your interests...
                            </div>
                        ) : (
                            <div className="flex items-center gap-2">
                                Discover My Career Path
                                <ArrowRight className="w-5 h-5" />
                            </div>
                        )}
                    </Button>

                </div>
            </main>
        </div>
    );
};

export default SubjectSelection;