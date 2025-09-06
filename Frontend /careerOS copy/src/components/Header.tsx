import { useAuth } from '@/contexts/AuthContext';
import { useNavigate, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import UserProfile from './UserProfile';
import { Sparkles, ArrowLeft } from 'lucide-react';

const Header = () => {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  // Don't show header on login page
  if (location.pathname === '/') {
    return null;
  }

  const getPageTitle = () => {
    switch (location.pathname) {
      case '/subjects':
        return {
          title: 'Subject Selection',
          description: 'AI-Powered Career Guidance',
          badge: 'Step 1 of 2'
        };
      case '/results':
        return {
          title: 'Career Results',
          description: 'Your AI Career Predictions',
          badge: null
        };
      case '/courses':
        return {
          title: 'Course Catalog',
          description: 'Discover courses to boost your career',
          badge: null
        };
      default:
        if (location.pathname.startsWith('/career/')) {
          return {
            title: 'Career Details',
            description: 'Complete career overview',
            badge: null
          };
        }
        if (location.pathname.startsWith('/course/')) {
          return {
            title: 'Course Details',
            description: 'Complete course information',
            badge: null
          };
        }
        return {
          title: 'CareerOS',
          description: 'AI-Powered Career Guidance',
          badge: null
        };
    }
  };

  const pageInfo = getPageTitle();
  const showBackButton = location.pathname !== '/subjects' && location.pathname !== '/results';

  return (
    <header className="bg-white border-b sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-4 py-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            {showBackButton && (
              <Button
                onClick={() => navigate(-1)}
                variant="ghost"
                size="sm"
                className="flex-shrink-0"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back
              </Button>
            )}
            
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 gradient-primary rounded-lg flex items-center justify-center flex-shrink-0">
                <Sparkles className="w-6 h-6 text-white" />
              </div>
              <div className="min-w-0">
                <h1 className="text-2xl font-bold truncate">{pageInfo.title}</h1>
                <p className="text-muted-foreground text-sm truncate">{pageInfo.description}</p>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-4">
            {pageInfo.badge && (
              <Badge variant="secondary" className="px-4 py-2 hidden sm:block">
                {pageInfo.badge}
              </Badge>
            )}
            
            {isAuthenticated ? (
              <UserProfile />
            ) : (
              <Button
                onClick={() => navigate('/')}
                variant="outline"
              >
                Sign In
              </Button>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;