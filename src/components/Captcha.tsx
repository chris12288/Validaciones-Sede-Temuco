/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from 'react';
import { RefreshCw } from 'lucide-react';

interface CaptchaProps {
  onValidate: (isValid: boolean) => void;
  captchaValue: string;
  setCaptchaValue: (val: string) => void;
  shouldResetTrigger: boolean;
}

export default function Captcha({ onValidate, captchaValue, setCaptchaValue, shouldResetTrigger }: CaptchaProps) {
  const [currentCode, setCurrentCode] = useState('');
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Generate a random 5-character captcha code suitable for readability but realistic look
  const generateCode = () => {
    const chars = '23456789abcdefghijkmnpqrstuvwxyzABCDEFGHJKLMNPQRSTUVWXYZ';
    let code = '';
    for (let i = 0; i < 5; i++) {
      code += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    // For authenticity, let's keep it lowercase or exact
    return code.toLowerCase();
  };

  const regenerate = () => {
    const newCode = generateCode();
    setCurrentCode(newCode);
    setCaptchaValue('');
    onValidate(false);
  };

  useEffect(() => {
    regenerate();
  }, [shouldResetTrigger]);

  // Draw the captcha with custom background noise, lines and text distortion
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Background - textured grayish noise
    ctx.fillStyle = '#f3f4f6';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Draw some noise points (dots)
    for (let i = 0; i < 150; i++) {
      ctx.fillStyle = `rgba(${Math.floor(Math.random() * 100)}, ${Math.floor(Math.random() * 100)}, ${Math.floor(Math.random() * 100)}, 0.15)`;
      ctx.fillRect(Math.random() * canvas.width, Math.random() * canvas.height, 1.5, 1.5);
    }

    // Draw some security lines across text
    for (let i = 0; i < 6; i++) {
      ctx.strokeStyle = `rgba(0, 0, 0, ${0.1 + Math.random() * 0.15})`;
      ctx.lineWidth = 1 + Math.random();
      ctx.beginPath();
      ctx.moveTo(Math.random() * 10, Math.random() * canvas.height);
      ctx.quadraticCurveTo(
        canvas.width / 2 + (Math.random() - 0.5) * 20,
        Math.random() * canvas.height,
        canvas.width - Math.random() * 10,
        Math.random() * canvas.height
      );
      ctx.stroke();
    }

    // Draw the text
    ctx.font = 'italic bold 20px "Courier New", Courier, monospace';
    ctx.textBaseline = 'middle';

    const charSpacing = canvas.width / (currentCode.length + 1);
    for (let i = 0; i < currentCode.length; i++) {
      const char = currentCode[i];
      // Distort each character slightly (angle & vertical shift)
      const angle = (Math.random() - 0.5) * 0.35;
      const yOffset = (Math.random() - 0.5) * 6;

      ctx.save();
      ctx.translate(charSpacing * (i + 1), canvas.height / 2 + yOffset);
      ctx.rotate(angle);

      // Organic dark grey or charcoal colors
      ctx.fillStyle = `rgba(${Math.floor(Math.random() * 50 + 50)}, ${Math.floor(Math.random() * 50 + 50)}, ${Math.floor(Math.random() * 50 + 50)}, 0.85)`;
      ctx.fillText(char, -7, 0);
      ctx.restore();
    }
  }, [currentCode]);

  // Handle captcha typing
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.trim().toLowerCase();
    setCaptchaValue(value);
    
    // Check if what is typed matches the current code
    if (value === currentCode.toLowerCase()) {
      onValidate(true);
    } else {
      onValidate(false);
    }
  };

  return (
    <div className="flex items-center space-x-1" id="captcha-container">
      {/* Captcha Input Box */}
      <input
        id="captcha-input"
        type="text"
        placeholder="Ingrese código captcha"
        value={captchaValue}
        onChange={handleInputChange}
        className="h-10 px-3 py-1 text-sm text-gray-800 bg-white border border-gray-300 rounded-[2px] w-[145px] hover:border-gray-400 focus:border-red-500 focus:outline-none transition-colors"
        maxLength={7}
      />

      {/* Captcha Image Frame (Canvas) */}
      <div className="h-10 border border-gray-300 bg-[#f3f4f6] rounded-[2px] overflow-hidden flex items-center select-none" id="captcha-canvas-frame">
        <canvas
          ref={canvasRef}
          width={100}
          height={38}
          className="cursor-default"
          title="Código de Seguridad"
        />
      </div>

      {/* Refresh Button */}
      <button
        id="captcha-refresh-btn"
        type="button"
        onClick={regenerate}
        className="h-10 w-10 flex items-center justify-center bg-[#182330] hover:bg-[#202f40] border border-gray-700 hover:border-gray-600 rounded-[2px] transition-colors group cursor-pointer"
        title="Regenerar Imagen"
      >
        <RefreshCw size={15} className="text-gray-300 group-hover:text-white transition-colors duration-200" />
      </button>
    </div>
  );
}
