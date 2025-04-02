import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { AuthProvider } from "@/hooks/use-auth";
import { ProtectedRoute } from "./lib/protected-route";

import NotFound from "@/pages/not-found";
import HomePage from "@/pages/home-page";
import AuthPage from "@/pages/auth-page";
import DiscoverPage from "@/pages/discover-page";
import MyAppsPage from "@/pages/my-apps-page";
import SubmitAppPage from "@/pages/submit-app-page";
import LeaderboardPage from "@/pages/leaderboard-page";
import AppDetailsPage from "@/pages/app-details-page";
import ProfilePage from "@/pages/profile-page";

// Platform Pages
import PointsSystemPage from "@/pages/points-system-page";

// Resources Pages
import TestingGuidelinesPage from "@/pages/testing-guidelines-page";
import DeveloperResourcesPage from "@/pages/developer-resources-page";
import ApiDocumentationPage from "@/pages/api-documentation-page";
import CommunityForumsPage from "@/pages/community-forums-page";

// Company Pages
import AboutPage from "@/pages/about-page";
import BlogPage from "@/pages/blog-page";
import PartnersPage from "@/pages/partners-page";
import CareersPage from "@/pages/careers-page";

// Legal Pages
import PrivacyPage from "@/pages/privacy-page";
import TermsPage from "@/pages/terms-page";
import CookiePolicyPage from "@/pages/cookie-policy-page";
import ContactPage from "@/pages/contact-page";

function Router() {
  return (
    <Switch>
      {/* Main routes */}
      <Route path="/" component={HomePage} />
      <Route path="/auth" component={AuthPage} />
      <Route path="/discover" component={DiscoverPage} />
      <ProtectedRoute path="/my-apps" component={() => <MyAppsPage />} />
      <ProtectedRoute path="/submit-app" component={() => <SubmitAppPage />} />
      <Route path="/leaderboard" component={LeaderboardPage} />
      <Route path="/apps/:id" component={AppDetailsPage} />
      <ProtectedRoute path="/profile" component={() => <ProfilePage />} />

      {/* Platform pages */}
      <Route path="/points-system" component={PointsSystemPage} />

      {/* Resources pages */}
      <Route path="/testing-guidelines" component={TestingGuidelinesPage} />
      <Route path="/developer-resources" component={DeveloperResourcesPage} />
      <Route path="/api-documentation" component={ApiDocumentationPage} />
      <Route path="/community-forums" component={CommunityForumsPage} />

      {/* Company pages */}
      <Route path="/about" component={AboutPage} />
      <Route path="/blog" component={BlogPage} />
      <Route path="/partners" component={PartnersPage} />
      <Route path="/careers" component={CareersPage} />

      {/* Legal pages */}
      <Route path="/privacy" component={PrivacyPage} />
      <Route path="/terms" component={TermsPage} />
      <Route path="/cookie-policy" component={CookiePolicyPage} />
      <Route path="/contact" component={ContactPage} />

      {/* 404 fallback */}
      <Route path="*" component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <Router />
        <Toaster />
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default App;
