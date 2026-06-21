/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';

export default function InacapHeader() {
  return (
    <header className="w-full select-none" id="inacap-header">
      {/* Upper Red Accent Line */}
      <div className="w-full h-1 bg-[#E30613]"></div>

      {/* Main Brand Header */}
      <div className="w-full bg-[#1c2836] py-3.5 px-4 md:px-8 border-b border-gray-800">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-3">
            {/* INACAP Brand Logo Component */}
            <div className="flex items-center" id="inacap-logo-wrapper">
              <div className="flex items-center bg-[#E30613] text-white font-extrabold px-2 py-0.5 text-lg rounded-sm tracking-tighter mr-0.5 shadow-sm">
                I
              </div>
              <span className="text-white font-bold text-lg tracking-tight font-sans">
                nacap
              </span>
              <div className="h-6 w-[1px] bg-white/30 mx-3"></div>
              <div className="flex items-baseline text-white">
                <span className="font-sans font-bold text-lg">60</span>
                <span className="font-sans text-xs uppercase tracking-wider ml-0.5 opacity-80">Años</span>
              </div>
            </div>
          </div>
          
          {/* Institutional Indicators */}
          <div className="hidden sm:flex items-center space-x-4 text-xs text-gray-400 font-sans tracking-wide">
            <span>SEDE TEMUCO</span>
            <span className="h-3 w-[1px] bg-gray-700"></span>
            <span>PORTAL VERIFICACIÓN</span>
          </div>
        </div>
      </div>
    </header>
  );
}
