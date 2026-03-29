"use client";

import React, { useState } from "react";
import Button from "./ui/Button";

interface ExpertModeModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

export default function ExpertModeModal({ isOpen, onClose, onConfirm }: ExpertModeModalProps) {
  const [confirmText, setConfirmText] = useState("");
  const isConfirmEnabled = confirmText === "EXPERT";

  if (!isOpen) return null;

  const handleConfirm = () => {
    if (isConfirmEnabled) {
      onConfirm();
      onClose();
      setConfirmText("");
    }
  };

  const handleClose = () => {
    onClose();
    setConfirmText("");
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-slate-800 rounded-2xl border-2 border-red-500 p-6 max-w-md w-full shadow-2xl">
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-red-600 rounded-full flex items-center justify-center">
              <svg
                className="w-6 h-6 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                />
              </svg>
            </div>
            <div>
              <h2 className="text-xl font-bold text-white">Expert Mode Warning</h2>
              <p className="text-red-400 text-sm font-medium">High Risk - Read Carefully</p>
            </div>
          </div>
          <button
            onClick={handleClose}
            className="text-slate-400 hover:text-white transition-colors"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        {/* Critical Warning Message */}
        <div className="mb-6 space-y-3">
          <div className="bg-red-900/20 border border-red-500/30 rounded-lg p-4">
            <h3 className="text-red-400 font-semibold mb-2">⚠️ DANGERS OF EXPERT MODE</h3>
            <ul className="text-red-200 text-sm space-y-2">
              <li className="flex items-start gap-2">
                <span className="text-red-400 mt-0.5">•</span>
                <span>You can lose ALL your money to front-running attacks</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-red-400 mt-0.5">•</span>
                <span>High slippage trades will execute without warnings</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-red-400 mt-0.5">•</span>
                <span>No protection against sandwich attacks or MEV</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-red-400 mt-0.5">•</span>
                <span>You are responsible for ALL losses incurred</span>
              </li>
            </ul>
          </div>

          <div className="bg-yellow-900/20 border border-yellow-500/30 rounded-lg p-3">
            <p className="text-yellow-200 text-sm">
              <strong>For experienced traders only.</strong> If you're not sure what this means, DO NOT proceed.
            </p>
          </div>
        </div>

        {/* Confirmation Input */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-slate-300 mb-2">
            Type <code className="bg-slate-700 px-2 py-1 rounded text-red-400 font-mono">EXPERT</code> to confirm
          </label>
          <input
            type="text"
            value={confirmText}
            onChange={(e) => setConfirmText(e.target.value)}
            placeholder="Type EXPERT to enable"
            className="w-full bg-slate-700 border border-slate-600 rounded-lg px-4 py-3 text-white placeholder-slate-400 focus:outline-none focus:border-red-500 focus:ring-2 focus:ring-red-500/20 transition-colors font-mono"
            autoFocus
          />
          {confirmText && !isConfirmEnabled && (
            <p className="text-red-400 text-sm mt-2">Incorrect. Please type "EXPERT" exactly.</p>
          )}
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3">
          <Button
            variant="secondary"
            onClick={handleClose}
            className="flex-1"
          >
            Cancel
          </Button>
          <Button
            onClick={handleConfirm}
            disabled={!isConfirmEnabled}
            className={`flex-1 ${isConfirmEnabled
                ? "bg-red-600 hover:bg-red-700 text-white"
                : "bg-slate-700 text-slate-400 cursor-not-allowed"
              }`}
          >
            I Understand the Risks
          </Button>
        </div>

        {/* Liability Disclaimer */}
        <div className="mt-4 pt-4 border-t border-slate-700">
          <p className="text-slate-400 text-xs text-center">
            By proceeding, you acknowledge that you understand these risks and accept full responsibility for any losses.
          </p>
        </div>
      </div>
    </div>
  );
}
