import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from "@/hooks/use-toast";
import { LOGOUT_MUTATION } from '@/graphql/registerMutation.ts';
import { REFRESH_TOKEN_MUTATION } from '@/graphql/registerMutation.ts';
import { logoutUser } from "@/services/authService";
import { Button } from '@/components/ui/button';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { LogOut, ChevronDown } from 'lucide-react';

const UserProfile = () => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();
    const { toast } = useToast();
    const [isLoggingOut, setIsLoggingOut] = useState(false);

    const [logoutMutation] = useMutation(LOGOUT_MUTATION);
    const [refreshTokenMutation] = useMutation(REFRESH_TOKEN_MUTATION);
    if (!user) return null;

    const handleLogout = async () => {
        setIsLoggingOut(true);
        try {
            // Optional: check refreshToken
            const refreshToken = localStorage.getItem("refreshToken");

            if (!refreshToken) {
                toast({
                    variant: "destructive",
                    title: "Missing Token",
                    description: "No refresh token found. Please log in again.",
                });
                return;
            }

            // ❌ Don't call logoutMutation because revokeToken doesn't exist
            // ✅ You could call verifyToken or refreshToken if needed

        } catch (error) {
            console.error("Logout error:", error);
        } finally {
            // ✅ Always clear local data
            logout();
            logoutUser();
            toast({
                title: "Logged Out",
                description: "You’ve been logged out successfully.",
            });
            navigate("/");
            setIsLoggingOut(false);
        }
    };

    const getInitials = (name: string) => {
        return name
            .split(' ')
            .map(part => part.charAt(0))
            .join('')
            .toUpperCase()
            .slice(0, 2);
    };

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="flex items-center gap-2 h-auto p-2">
                    <Avatar className="w-8 h-8">
                        <AvatarImage src="/placeholder-avatar.jpg" alt="User avatar" />
                        <AvatarFallback className="bg-primary text-white text-sm">
                            {getInitials(user.name || 'U')}
                        </AvatarFallback>
                    </Avatar>
                    <div className="hidden md:flex flex-col items-start">
                        <span className="text-sm font-medium">{user.name || 'Unnamed'}</span>
                        <span className="text-xs text-muted-foreground">{user.email || 'No email'}</span>
                    </div>
                    <ChevronDown className="w-4 h-4 text-muted-foreground" />
                </Button>
            </DropdownMenuTrigger>

            <DropdownMenuContent align="end" className="w-64">
                <DropdownMenuLabel>
                    <div className="flex items-center gap-3">
                        <Avatar className="w-12 h-12">
                            <AvatarImage src="/placeholder-avatar.jpg" alt="User avatar" />
                            <AvatarFallback className="bg-primary text-white">
                                {getInitials(user.name || 'U')}
                            </AvatarFallback>
                        </Avatar>
                        <div className="flex-1">
                            <p className="font-medium">{user.name || 'Unnamed'}</p>
                            <p className="text-sm text-muted-foreground">{user.email || 'No email'}</p>
                        </div>
                    </div>
                </DropdownMenuLabel>

                <DropdownMenuSeparator />

                <DropdownMenuItem
                    onClick={handleLogout}
                    className="cursor-pointer text-destructive focus:text-destructive"
                    disabled={isLoggingOut}
                >
                    <LogOut className="w-4 h-4 mr-2" />
                    <span>{isLoggingOut ? 'Logging out...' : 'Log out'}</span>
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
};

export default UserProfile;