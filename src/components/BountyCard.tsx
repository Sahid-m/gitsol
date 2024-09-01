import Link from "next/link";
import MarkdownRenderer from "./ReactMarkdownRenderer";
import { AnimatedTooltip } from "./ui/animated-tooltip";
import { Badge } from "./ui/badge";
import { CardSpotlight } from "./ui/card-spotlight";
import { Meteors } from "./ui/meteors";

export function BountyCard({ bounty }: any) {


    const tooltipContent = bounty.contributors.length > 0
        ? bounty.contributors.map((contributor: any, index: any) => ({
            id: index + 1,
            name: contributor.name,
            image: contributor.profileImg,
            designation: `${contributor.totalBountyWon} bounties won`,
        }))
        : [
            {
                id: 1,
                name: "0 Contributors",
                image: "/favicon.png", // Replace with your default image path
                designation: "None",
            }
        ];

    const tooltipWinner = bounty.contributors
        .filter((contributor: any) => contributor.id === bounty.winnerId)
        .map((contributor: any) => ({
            id: bounty.winnerId,
            name: contributor.name,
            image: contributor.profileImg,
            designation: `${contributor.totalBountyWon} bounties won`,
        }));

    return (
        <Link
            href={bounty.issueLink || ""}
            target="_blank"
            rel="noopener noreferrer"
            className="block"
        >
            <CardSpotlight className={`relative  ${bounty.completed ? "bg-green-300 dark:bg-green-950" : "bg-white dark:bg-black"}  overflow-hidden`} radius={1} >
                {/* <CardContent className="p-6 bg-gradient-to-br from-gray-800 to-gray-900 text-white rounded-lg"> */}
                <h2 className="text-lg md:text-xl font-semibold mb-2 text-black dark:text-indigo-600 truncate">
                    {bounty.githubRepoName} &gt; {bounty.issueName}
                </h2>
                {/* <p className="text-sm text-neutral-800 dark:text-gray-300 line-clamp-2">{bounty.issueDescription}</p> */}
                <MarkdownRenderer
                    content={bounty.issueDescription}
                    className="text-sm text-neutral-800 dark:text-gray-300"
                    maxLines={4}
                />
                <div className="mt-3 flex justify-between items-center">
                    <span className="text-lg md:text-xl font-bold text-green-500 dark:text-green-400">
                        ${bounty.bountyAmount}
                    </span>

                    <Badge variant="secondary" className="dark:bg-indigo-600 bg-black text-white">
                        {bounty.issueProgrammingLang}
                    </Badge>
                </div>
                <div className="mt-2 flex justify-between items-center text-xs text-gray-400">
                    <div className="justify-center flex items-center">

                        <span>#{bounty.issueNumber}</span>
                    </div>
                </div>
                <div className="flex justify-center">
                    {bounty.winnerId ? <>
                        <h1 className="mx-2">Winner : </h1>
                        <AnimatedTooltip items={tooltipWinner} /></> : <>
                        <h1 className="mx-2">Contributors : </h1>
                        <AnimatedTooltip items={tooltipContent} /></>}


                </div>
                {/* </CardContent> */}
                <Meteors number={10} />
            </CardSpotlight>
        </Link >
    );
}
