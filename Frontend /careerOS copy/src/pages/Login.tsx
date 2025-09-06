import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import { REGISTER_MUTATION } from '@/graphql/registerMutation';
import { useAuth } from '@/contexts/AuthContext';
import { loginUser as loginService } from '@/services/authService.ts';

import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Label } from '@/components/ui/label';
import { GraduationCap, Sparkles } from 'lucide-react';
import { toast } from 'sonner';

const Login = () => {
    const navigate = useNavigate();
    const { login } = useAuth();

    const [isLoading, setIsLoading] = useState(false);
    const [loginForm, setLoginForm] = useState({ email: '', password: '' });
    const [registerForm, setRegisterForm] = useState({ name: '', email: '', password: '' });

    const [registerUser] = useMutation(REGISTER_MUTATION);

    const handleAuth = async (type: 'login' | 'register') => {
        setIsLoading(true);
        try {
            if (type === 'login') {
                const response = await loginService({
                    email: loginForm.email,
                    password: loginForm.password,
                });

                if (response?.token && response?.refreshToken) {
                    localStorage.setItem('token', response.token);
                    localStorage.setItem('refreshToken', response.refreshToken);

                    login({
                        name: loginForm.email.split('@')[0],
                        email: loginForm.email,
                        selectedSubjects: [],
                        predictedCareers: [],
                    });

                    toast.success('Login successful!');
                    navigate('/subjects');
                } else {
                    toast.error('Login failed: Missing token');
                }
            } else {
                const { data } = await registerUser({
                    variables: {
                        username: registerForm.name.replace(/\s/g, '').toLowerCase(),
                        email: registerForm.email,
                        password: registerForm.password,
                    },
                });

                if (data?.registerUser?.user) {
                    toast.success(`🎉 Registration successful! Welcome ${registerForm.name}`);
                    login({
                        name: registerForm.name,
                        email: registerForm.email,
                        selectedSubjects: [],
                        predictedCareers: [],
                    });
                    setTimeout(() => {
                        navigate('/subjects');
                    }, 1000);
                } else {
                    toast.error("`🎉 Registration successful!.");
                }
            }
        } catch (error: unknown) {
            if (error instanceof Error) {
                toast.error(`Authentication Failed: ${error.message}`);
            } else {
                toast.error(`Unknown error occurred. Please try again.`);
            }
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen gradient-primary flex items-center justify-center p-4">
            <div className="absolute inset-0 overflow-hidden">
                <div className="absolute -top-40 -right-40 w-80 h-80 bg-white/10 rounded-full blur-3xl animate-pulse"></div>
                <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-white/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
            </div>

            <div className="w-full max-w-md relative z-10">
                <div className="text-center mb-8 animate-fade-in">
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-white/20 backdrop-blur-lg rounded-full mb-4">
                        <GraduationCap className="w-8 h-8 text-white" />
                    </div>
                    <h1 className="text-4xl font-bold text-white mb-2">CareerOS</h1>
                    <p className="text-white/80 text-lg flex items-center justify-center gap-2">
                        <Sparkles className="w-5 h-5" />
                        Discover your future with AI
                    </p>
                </div>

                <Card className="glass-card border-white/20">
                    <CardHeader className="text-center">
                        <CardTitle className="text-2xl">Welcome</CardTitle>
                        <CardDescription>Join thousands finding their perfect career path</CardDescription>
                    </CardHeader>

                    <CardContent>
                        <Tabs defaultValue="login" className="space-y-6">
                            <TabsList className="grid w-full grid-cols-2">
                                <TabsTrigger value="login">Login</TabsTrigger>
                                <TabsTrigger value="register">Register</TabsTrigger>
                            </TabsList>

                            {/* LOGIN TAB */}
                            <TabsContent value="login" className="space-y-4">
                                <div className="space-y-2">
                                    <Label htmlFor="email">Email</Label>
                                    <Input
                                        id="email"
                                        type="email"
                                        placeholder="Enter your email"
                                        className="glass-card"
                                        value={loginForm.email}
                                        onChange={(e) => setLoginForm((prev) => ({ ...prev, email: e.target.value }))}
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="password">Password</Label>
                                    <Input
                                        id="password"
                                        type="password"
                                        placeholder="Enter your password"
                                        className="glass-card"
                                        value={loginForm.password}
                                        onChange={(e) => setLoginForm((prev) => ({ ...prev, password: e.target.value }))}
                                    />
                                </div>
                                <Button
                                    onClick={() => handleAuth('login')}
                                    className="w-full gradient-primary text-white font-medium"
                                    disabled={isLoading}
                                >
                                    {isLoading ? 'Signing in...' : 'Sign In'}
                                </Button>
                            </TabsContent>

                            {/* REGISTER TAB */}
                            <TabsContent value="register" className="space-y-4">
                                <div className="space-y-2">
                                    <Label htmlFor="name">Full Name</Label>
                                    <Input
                                        id="name"
                                        placeholder="Enter your full name"
                                        className="glass-card"
                                        value={registerForm.name}
                                        onChange={(e) => setRegisterForm((prev) => ({ ...prev, name: e.target.value }))}
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="reg-email">Email</Label>
                                    <Input
                                        id="reg-email"
                                        type="email"
                                        placeholder="Enter your email"
                                        className="glass-card"
                                        value={registerForm.email}
                                        onChange={(e) => setRegisterForm((prev) => ({ ...prev, email: e.target.value }))}
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="reg-password">Password</Label>
                                    <Input
                                        id="reg-password"
                                        type="password"
                                        placeholder="Create a password"
                                        className="glass-card"
                                        value={registerForm.password}
                                        onChange={(e) => setRegisterForm((prev) => ({ ...prev, password: e.target.value }))}
                                    />
                                </div>
                                <Button
                                    onClick={() => handleAuth('register')}
                                    className="w-full gradient-primary text-white font-medium"
                                    disabled={isLoading}
                                >
                                    {isLoading ? 'Creating account...' : 'Create Account'}
                                </Button>
                            </TabsContent>
                        </Tabs>

                        <div className="mt-6 text-center">
                            <p className="text-sm text-muted-foreground">
                                By continuing, you agree to our{' '}
                                <Link to="#" className="text-primary animated-underline">
                                    Terms of Service
                                </Link>
                            </p>
                        </div>
                    </CardContent>
                </Card>

                <div className="mt-8 grid grid-cols-3 gap-4 text-center animate-fade-in">
                    <div className="text-white/80">
                        <div className="text-2xl font-bold">AI-Powered</div>
                        <div className="text-sm">Predictions</div>
                    </div>
                    <div className="text-white/80">
                        <div className="text-2xl font-bold">1000+</div>
                        <div className="text-sm">Career Paths</div>
                    </div>
                    <div className="text-white/80">
                        <div className="text-2xl font-bold">50K+</div>
                        <div className="text-sm">Success Stories</div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;