import React from "react";

export default function Loading() {
  return (
    <div className="w-full max-w-[1200px] mx-auto px-4 py-6 sm:px-6 lg:px-8 animate-pulse">
      {/* Ad Leaderboard Skeleton */}
      <div className="w-full max-w-[728px] mx-auto h-[90px] bg-slate-100 rounded-lg mb-8 border border-dashed border-slate-200" />

      {/* Hero Title Skeleton */}
      <div className="text-center max-w-2xl mx-auto mb-8">
        <div className="h-8 bg-slate-200 rounded-md w-3/4 mx-auto mb-3" />
        <div className="h-4 bg-slate-100 rounded-md w-1/2 mx-auto" />
      </div>

      {/* Two Column Tool Skeleton */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left: Upload Zone Skeleton */}
        <div className="lg:col-span-7 bg-white p-6 rounded-xl border border-slate-200 shadow-sm min-h-[380px] flex flex-col items-center justify-center">
          <div className="h-12 w-12 rounded-full bg-slate-100 mb-4" />
          <div className="h-5 bg-slate-200 rounded w-48 mb-2" />
          <div className="h-4 bg-slate-100 rounded w-64" />
        </div>

        {/* Right: Settings Panel Skeleton */}
        <div className="lg:col-span-5 bg-white p-6 rounded-xl border border-slate-200 shadow-sm space-y-5">
          <div className="h-5 bg-slate-200 rounded w-32" />
          <div className="h-10 bg-slate-100 rounded-lg w-full" />
          <div className="grid grid-cols-2 gap-3">
            <div className="h-10 bg-slate-100 rounded-lg" />
            <div className="h-10 bg-slate-100 rounded-lg" />
          </div>
          <div className="h-10 bg-slate-100 rounded-lg w-full" />
          <div className="h-12 bg-blue-100 rounded-lg w-full" />
        </div>
      </div>
    </div>
  );
}

