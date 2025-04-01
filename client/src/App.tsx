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

function Router() {
  return (
    <Switch>
      <Route path="/" component={HomePage} />
      <Route path="/auth" component={AuthPage} />
      <Route path="/discover" component={DiscoverPage} />
      <ProtectedRoute path="/my-apps" component={MyAppsPage} />
      <ProtectedRoute path="/submit-app" component={SubmitAppPage} />
      <Route path="/leaderboard" component={LeaderboardPage} />
      <Route path="/apps/:id" component={AppDetailsPage} />
      <ProtectedRoute path="/profile" component={ProfilePage} />
      <Route component={NotFound} />
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
