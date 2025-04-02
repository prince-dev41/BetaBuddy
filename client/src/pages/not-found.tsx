import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { AlertCircle } from "lucide-react";
import { Link } from "wouter";

export default function NotFound() {
  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-gray-50">
      <Card className="w-full max-w-md mx-4 shadow-lg">
        <CardContent className="pt-8 pb-8">
          <div className="text-center mb-6">
            <div className="flex justify-center mb-4">
              <AlertCircle className="h-16 w-16 text-red-500" />
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">404</h1>
            <h2 className="text-xl font-semibold text-gray-700">Page Not Found</h2>
          </div>

          <p className="text-center mb-8 text-gray-600">
            We're sorry, the page you were looking for doesn't exist or has been moved.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/">
              <Button className="w-full sm:w-auto bg-gradient-to-r from-purple-600 to-blue-500 hover:from-purple-700 hover:to-blue-600">
                Go to Home
              </Button>
            </Link>
            <Link href="/discover">
              <Button variant="outline" className="w-full sm:w-auto">
                Explore Apps
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
