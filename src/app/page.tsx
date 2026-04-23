"use client";

import React, { useState, useEffect } from "react";
import { connectWallet, WalletType } from "../lib/stellar";
import { PlusCircle, ShieldCheck, Landmark, Star } from "lucide-react";
import LoanTable from "../components/LoanTable";
import SkeletonRow from "../components/SkeletonRow";
import Navbar from "../components/Navbar";
import Card from "../components/Card";
import WalletModal from "../components/WalletModal";
import InvoiceMintForm from "../components/InvoiceMintForm";
import InvoiceTable from "../components/InvoiceTable";
import NewsBanner from "../components/NewsBanner";
import useTransactionToast from "../lib/useTransactionToast";
import AddTrustlineButton from "../components/AddTrustlineButton";
import ProModeSection from "../components/ProModeSection";
import WatchlistTab from "../components/WatchlistTab";
import TabNavigation from "../components/TabNavigation";
import { useWatchlist } from "../hooks/useWatchlist";
import StarIcon from "../components/StarIcon";

export default function Page() {
  const [address, setAddress] = useState("");
  const [showMintForm, setShowMintForm] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("dashboard");
  const { toggleWatchlist, isInWatchlist } = useWatchlist();

  // 1. Connect Stellar Wallet (supports Freighter, Albedo, xBull)
  const handleConnectWallet = async (walletType: WalletType) => {
    try {
      const userInfo = await connectWallet(walletType);
      if (userInfo && userInfo.publicKey) {
        setAddress(userInfo.publicKey);
        console.log("Wallet connected:", userInfo.publicKey, "Type:", userInfo.walletType);
      }
    } catch (e: unknown) {
      const error = e as Error;
      console.error("Connection failed:", error.message);
      alert(error.message || "Failed to connect to wallet.");
    }
  };

  const toast = useTransactionToast();

  const handleTestToast = () => {
    toast.loading();
    toast.success();
    toast.error();
  };

  const handleInvoiceMint = (data: Record<string, unknown>) => {
    console.log("Invoice data received:", data);
    setShowMintForm(false);
    // TODO: Chain integration will be handled separately
  };

  const tabs = [
    { id: "dashboard", label: "Dashboard" },
    { id: "watchlist", label: "Watchlist", icon: <Star size={16} /> },
  ];

  return (
    <div className="min-h-screen bg-tradeflow-dark text-white font-sans flex flex-col">
      {/* News Banner */}
      <NewsBanner />

      {/* Header */}
      <Navbar
        address={address}
        onConnect={() => setIsModalOpen(true)}
      />

      {/* Main Content */}
      <div className="flex-1 px-8">
        {/* Tab Navigation */}
        <TabNavigation
          tabs={tabs}
          activeTab={activeTab}
          onTabChange={setActiveTab}
        />

        {/* Tab Content */}
        {activeTab === "watchlist" ? (
          <WatchlistTab />
        ) : (
          <>
            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
              <Card>
                <ShieldCheck className="text-green-400 mb-4" />
                <h3 className="text-tradeflow-muted text-sm">Risk Engine Status</h3>
                <p className="text-2xl font-semibold text-green-400">Active (Mock)</p>
              </Card>
              <Card>
                <Landmark className="text-blue-400 mb-4" />
                <h3 className="text-tradeflow-muted text-sm">Protocol Liquidity</h3>
                <p className="text-2xl font-semibold">$1,250,000 USDC</p>
              </Card>
              <button
                onClick={() => setShowMintForm(true)}
                className="bg-tradeflow-accent/10 border-2 border-dashed border-tradeflow-accent/50 p-6 rounded-2xl flex flex-col items-center justify-center hover:bg-tradeflow-accent/20 transition"
              >
                <PlusCircle className="text-tradeflow-accent mb-2" size={32} />
                <span className="font-medium text-tradeflow-accent">
                  Mint New Invoice NFT
                </span>
              </button>
            </div>

            {/* Wallet Assets (Trustline Section) */}
            <div className="bg-slate-800/40 rounded-2xl border border-slate-700/50 p-6 mb-12 flex flex-col md:flex-row gap-8 items-center justify-between">
              <div className="flex-1">
                <h2 className="text-xl font-semibold text-white mb-2">My Stellar Wallet</h2>
                <p className="text-slate-400 text-sm">Establish trustlines to receive and trade these assets on-chain.</p>
              </div>
              <div className="flex flex-wrap gap-4">
                <div className="flex items-center gap-3 bg-slate-900/50 p-3 rounded-xl border border-slate-700/50 min-w-[220px] justify-between">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-white">USDC</span>
                    <StarIcon
                      isStarred={isInWatchlist("USDC")}
                      onClick={() => toggleWatchlist("USDC")}
                      size={14}
                    />
                  </div>
                  <AddTrustlineButton
                    assetCode="USDC"
                    assetIssuer="GBBD67IF633ZHJ2CCYBT6RILOY7Y6S6M5SOW2S2ZQRAGI7XRYB2TOC6S"
                  />
                </div>
                <div className="flex items-center gap-3 bg-slate-900/50 p-3 rounded-xl border border-slate-700/50 min-w-[220px] justify-between">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-white">yXLM</span>
                    <StarIcon
                      isStarred={isInWatchlist("yXLM")}
                      onClick={() => toggleWatchlist("yXLM")}
                      size={14}
                    />
                  </div>
                  <AddTrustlineButton
                    assetCode="yXLM"
                    assetIssuer="GBDUE7TSYHCWW2NQCXHTS7F7W4R4SXY5NCCO4I734XOYLGGUKJALTCYI"
                  />
                </div>
              </div>
            </div>

            {/* Invoice Table */}
            <InvoiceTable />

            {/* Active Loans Table (Issue #6) */}
            <div className="bg-tradeflow-secondary rounded-2xl border border-tradeflow-muted overflow-hidden">
              <div className="p-6 border-b border-slate-700">
                <h2 className="text-xl font-semibold">Active Loans Dashboard</h2>
              </div>
              <div className="p-6 bg-tradeflow-dark/50">
                <LoanTable />
              </div>
            </div>

            {/* Pro Mode Charts (Lazy-loaded) */}
            <ProModeSection />
          </>
        )}
      </div>

      <WalletModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConnect={handleConnectWallet}
      />

      {/* Invoice Mint Form Modal */}
      {showMintForm && (
        <InvoiceMintForm
          onClose={() => setShowMintForm(false)}
          onSubmit={handleInvoiceMint}
        />
      )}
    </div>
  );
}
