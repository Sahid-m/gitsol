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
              href={bounty.issueLink || ""}
              target="_blank"
              rel="noopener noreferrer"
              className="block transition-transform hover:scale-102"
            >
              <div className="bg-gradient-to-br from-gray-800 to-gray-900 text-white p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
                <h2 className="text-lg font-semibold mb-2 text-indigo-300 truncate">
                  {bounty.githubRepoName} &gt; {bounty.issueName}
                </h2>
                <p className="text-sm text-gray-300 line-clamp-2">{bounty.issueDescription}</p>
                <div className="mt-3 flex justify-between items-center">
                  <span className="text-lg font-bold text-green-400">
                    ${bounty.bountyAmount}
                  </span>
                  <span className="px-2 py-1 bg-indigo-600 text-xs font-medium rounded-full">
                    {bounty.issueProgrammingLang}
                  </span>
                </div>
                <div className="mt-2 flex justify-between items-center text-xs text-gray-400">
                  <span>#{bounty.issueNumber}</span>
                  <span>{bounty.contributors.length} Contributors</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </Card>
    </div>
  );
}
