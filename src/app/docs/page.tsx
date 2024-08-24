import Image from "next/image";
import Link from "next/link";
import React from "react";

export default function Docs() {
  return (
    <div className="container mx-auto p-6 bg-gray-100 rounded-lg shadow-md">
      <h1 className="text-4xl font-extrabold text-blue-600 mb-6">
        How to Add the Bot to Your Repository
      </h1>

      <section className="mb-10">
        <h2 className="text-2xl font-semibold text-gray-800 mb-3">
          Step 1: Install the Bot on GitHub
        </h2>
        <p className="text-lg text-gray-700 mb-4">
          To add the bot, go to the{" "}
          <Link
            className="text-blue-500 hover:underline"
            href="https://github.com/apps/gitsol-bounty/installations/new"
            target="_blank"
          >
            Gitsol-bounty GitHub App
          </Link>{" "}
          and install it on your desired repository.
        </p>
        <Image
          src="/images/add-bot-1.png"
          alt="Selecting a bot"
          width={800}
          height={600}
          className="w-full h-auto rounded-lg shadow-sm mb-6"
        />
      </section>

      <section className="mb-10">
        <h2 className="text-2xl font-semibold text-gray-800 mb-3">
          Step 2: Add Funds to Your Wallet
        </h2>
        <p className="text-lg text-gray-700 mb-4">
          To add funds, visit your{" "}
          <Link className="text-blue-500 hover:underline" href="/userwallet">
            wallet
          </Link>
          . Note: Currently, this only supports Devnet SOL.
        </p>
        <p className="text-lg text-gray-700 mb-4">
          You can fund your wallet by airdropping some Devnet SOL to your
          address or by transferring from a wallet like Phantom or Metamask.
        </p>
        <Image
          src="/images/userwallet.png"
          alt="User Wallet"
          width={800}
          height={600}
          className="w-full h-auto rounded-lg shadow-sm mb-6"
        />
      </section>

      <section className="mb-10">
        <h2 className="text-2xl font-semibold text-gray-800 mb-3">
          Step 3: Start Using the Bot
        </h2>
        <p className="text-lg text-gray-700 mb-4">
          Once you have installed the bot on your repository and funded your
          wallet, you can start using it by commenting
          <strong className="text-blue-600"> /bounty $amount</strong> on issues.
        </p>
        <p className="text-lg text-gray-700 mb-4">
          Contributors can attempt a bounty by commenting
          <strong className="text-blue-600"> /attempt sol_devnet_addr</strong>.
        </p>
        <p className="text-lg text-gray-700">
          After the contributor submits a pull request and it gets merged, the
          bounty amount will automatically be transferred from your wallet to
          the contributor&apos;s SOL address.
        </p>
      </section>
    </div>
  );
}
