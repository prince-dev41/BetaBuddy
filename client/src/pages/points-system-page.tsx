import { StaticPage } from "@/components/static-page";

export default function PointsSystemPage() {
  return (
    <StaticPage 
      title="Points System" 
      subtitle="Learn how our points system works and how to earn rewards through beta testing"
    >
      <section>
        <h2>How Points Work on BetaBuddy</h2>
        <p>
          BetaBuddy uses a points-based system to reward users for their contributions to the beta testing community. 
          Points are earned through various activities and can be used to track your progress and standing within the community.
        </p>
      </section>

      <section className="mt-8">
        <h2>Earning Points</h2>
        <p>Users can earn points through the following activities:</p>
        
        <div className="mt-4 space-y-4">
          <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
            <h3 className="text-xl font-medium text-gray-800">Testing Applications</h3>
            <p className="text-gray-600">
              Each application specifies a reward between 50-500 points. You'll earn these points after completing testing and submitting quality feedback.
            </p>
          </div>
          
          <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
            <h3 className="text-xl font-medium text-gray-800">Quality Bonuses</h3>
            <p className="text-gray-600">
              Developers can award additional points for exceptionally detailed or helpful feedback that goes above and beyond.
            </p>
          </div>
          
          <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
            <h3 className="text-xl font-medium text-gray-800">Bug Discovery</h3>
            <p className="text-gray-600">
              Finding and properly documenting critical bugs can earn you bonus points at the developer's discretion.
            </p>
          </div>
        </div>
      </section>

      <section className="mt-8">
        <h2>Leaderboard & Recognition</h2>
        <p>
          Points contribute to your ranking on our <a href="/leaderboard" className="text-blue-600 hover:underline">Leaderboard</a>. 
          Top testers receive recognition and may gain access to exclusive testing opportunities and early-access programs.
        </p>
      </section>

      <section className="mt-8">
        <h2>Points Guidelines</h2>
        <p>To ensure a fair and constructive environment:</p>
        <ul className="list-disc pl-5 space-y-2 mt-2">
          <li>Points are awarded only for constructive, detailed feedback</li>
          <li>Submitting low-quality feedback may result in no points being awarded</li>
          <li>Abuse of the points system may result in account suspension</li>
          <li>Points cannot be transferred between accounts</li>
        </ul>
      </section>

      <section className="mt-8">
        <h2>Future Developments</h2>
        <p>
          In future updates, we plan to introduce a rewards system where points can be exchanged for various benefits, including:
        </p>
        <ul className="list-disc pl-5 space-y-2 mt-2">
          <li>Early access to premium applications</li>
          <li>Customization options for your BetaBuddy profile</li>
          <li>Exclusive testing opportunities</li>
          <li>Potential partnerships with developers for premium rewards</li>
        </ul>
      </section>
    </StaticPage>
  );
}