import { BountyCard } from "@/components/BountyCard";
import { AnimatedTooltip } from "@/components/ui/animated-tooltip";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { CardSpotlight } from "@/components/ui/card-spotlight";
import { Meteors } from "@/components/ui/meteors";
import { getAllBounties } from "@/lib/actions/bounties.actions";
import Link from "next/link";

export const revalidate = 5;

export default async function Bounties() {
  const bounties = await getAllBounties();




  return (
    <div className=" p-6">
      <h1 className="text-3xl font-bold mb-4">Bounties</h1>
      <Card className="mx-auto border-0">
        <div className="grid grid-cols-1 gap-6 bg-neutral-200 dark:bg-neutral-900 border-0">
          {bounties.map((bounty) => (
            <BountyCard key={bounty.id} bounty={bounty} />
          ))}
        </div>
      </Card>
    </div>
  );
}

