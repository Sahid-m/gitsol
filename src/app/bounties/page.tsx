import { Card } from "@/components/ui/card";
import { getAllBounties } from "@/lib/actions/bounties.actions";
import Link from "next/link";

export default async function Bounties() {
  const bounties = await getAllBounties();

  return (
    <div className="mt-20 p-6">
      <h1 className="text-3xl font-bold mb-4">Bounties</h1>
      <Card className="mx-auto ">
        <div className="grid grid-cols-1 gap-6">
          {bounties.map((bounty) => (
            <Link
              key={bounty.id}
              // href={`https://github.com/${bounty.githubRepo}/issues/${bounty.issueId}`}
              href={bounty.issueLink ? bounty.issueLink : ""}
              target="_blank"
              rel="noopener noreferrer"
            >
              <div className="bg-gray-800 text-white p-4 rounded-lg shadow-lg">
                <h2 className="text-2xl font-semibold">
                  {bounty.githubRepoName} &gt; {bounty.issueName}
                </h2>
                <p className="mt-2 text-gray-400">{bounty.issueDescription}</p>
                <p className="text-lg font-bold text-green-400">
                  ${bounty.bountyAmount}
                </p>
                <p className="text-sm text-gray-400">
                  {bounty.issueProgrammingLang}
                </p>
                <p className="mt-2 text-gray-400">#{bounty.issueNumber}</p>
                <p className="text-sm text-gray-400">
                  {bounty.contributors.length} Contributors
                </p>
              </div>
            </Link>
          ))}
        </div>
      </Card>
    </div>
  );
}
