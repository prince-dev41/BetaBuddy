import { ReactNode } from "react";
import { Layout } from "@/components/layout";

interface StaticPageProps {
  title: string;
  subtitle?: string;
  children: ReactNode;
}

export function StaticPage({ title, subtitle, children }: StaticPageProps) {
  return (
    <Layout>
      <div className="container max-w-4xl mx-auto py-12 px-4">
        <div className="mb-8 text-center">
          <h1 className="text-4xl font-extrabold bg-gradient-to-r from-purple-600 to-blue-500 bg-clip-text text-transparent">
            {title}
          </h1>
          {subtitle && (
            <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
              {subtitle}
            </p>
          )}
        </div>
        <div className="prose prose-lg max-w-none">
          {children}
        </div>
      </div>
    </Layout>
  );
}