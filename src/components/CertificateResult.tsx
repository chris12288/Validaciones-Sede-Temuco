/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { motion } from 'motion/react';
import { Check, ArrowLeft, Printer, Download, ExternalLink } from 'lucide-react';
import { CertificateData } from '../types';

interface CertificateResultProps {
  data: CertificateData;
  onBack: () => void;
}

export default function CertificateResult({ data, onBack }: CertificateResultProps) {
  // Simple print handler
  const handlePrint = () => {
    window.print();
  };

  return (
    <motion.div
      id="certificate-result-container"
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -15 }}
      transition={{ duration: 0.35, ease: 'easeOut' }}
      className="w-full max-w-3xl mx-auto px-4 py-8"
    >
      {/* Back Button Link (Institutional style) */}
      <button
        id="btn-back-to-validator"
        onClick={onBack}
        className="group flex items-center space-x-2 text-xs md:text-sm font-medium text-gray-500 hover:text-[#E30613] mb-6 transition-colors duration-200 cursor-pointer"
      >
        <ArrowLeft size={16} className="transform group-hover:-translate-x-1 transition-transform" />
        <span>Volver a la Validación</span>
      </button>

      {/* Main Verification Card */}
      <div 
        id="verification-card" 
        className="bg-white rounded-lg border border-gray-200/80 shadow-md md:shadow-lg overflow-hidden"
      >
        {/* Certificate Success Header Block */}
        <div className="p-6 md:p-8 border-b border-gray-100 flex items-center justify-between bg-emerald-50/20">
          <div className="flex items-center space-x-3.5" id="header-status-title">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-700 tracking-tight flex items-center gap-2">
              Certificado Válido
            </h2>
            <div className="flex items-center justify-center w-7 h-7 md:w-8 md:h-8 rounded-full bg-[#5cb85c] text-white shadow-sm flex-shrink-0 animate-pulse">
              <Check size={18} className="stroke-[3.5]" />
            </div>
          </div>
          
          <div className="hidden sm:flex items-center space-x-1.5 text-xs text-emerald-700 font-semibold bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-100/50">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping"></span>
            <span>Autenticidad Verificada</span>
          </div>
        </div>

        {/* Certificate Data Table representation */}
        <div id="data-table-section" className="p-5 md:p-8">
          <div className="border border-gray-200 rounded-sm overflow-hidden shadow-sm">
            
            {/* Row 1: Nombre Alumno */}
            <div className="flex flex-col sm:flex-row border-b border-gray-200" id="row-nombre">
              <div className="w-full sm:w-1/3 bg-[#f9fafb] px-4 py-4 md:py-5 flex items-center border-b sm:border-b-0 sm:border-r border-gray-200">
                <span className="text-sm font-semibold text-gray-600 select-none">Nombre Alumno</span>
              </div>
              <div className="w-full sm:w-2/3 bg-white px-4 py-4 md:py-5 flex items-center">
                <span className="text-sm font-bold text-gray-800 tracking-wide uppercase select-all">
                  {data.nombreAlumno}
                </span>
              </div>
            </div>

            {/* Row 1b: Cédula de Identidad */}
            {data.rutAlumno && (
              <div className="flex flex-col sm:flex-row border-b border-gray-200" id="row-rut">
                <div className="w-full sm:w-1/3 bg-[#f9fafb] px-4 py-4 md:py-5 flex items-center border-b sm:border-b-0 sm:border-r border-gray-200">
                  <span className="text-sm font-semibold text-gray-600 select-none">Cédula de Identidad</span>
                </div>
                <div className="w-full sm:w-2/3 bg-white px-4 py-4 md:py-5 flex items-center">
                  <span className="text-sm font-bold text-gray-800 tracking-wide font-mono uppercase select-all">
                    {data.rutAlumno}
                  </span>
                </div>
              </div>
            )}

            {/* Row 2: Programa de Estudio */}
            <div className="flex flex-col sm:flex-row border-b border-gray-200" id="row-programa">
              <div className="w-full sm:w-1/3 bg-[#f9fafb] px-4 py-4 md:py-5 flex items-center border-b sm:border-b-0 sm:border-r border-gray-200">
                <span className="text-sm font-semibold text-gray-600 select-none">Programa de Estudio</span>
              </div>
              <div className="w-full sm:w-2/3 bg-[#fbfcfd] px-4 py-4 md:py-5 flex items-center">
                <span className="text-sm font-bold text-gray-800 tracking-wide uppercase">
                  {data.programaEstudio}
                </span>
              </div>
            </div>

            {/* Row 3: Fecha de Emisión */}
            <div className="flex flex-col sm:flex-row border-b border-gray-200" id="row-fecha">
              <div className="w-full sm:w-1/3 bg-[#f9fafb] px-4 py-4 md:py-5 flex items-center border-b sm:border-b-0 sm:border-r border-gray-200">
                <span className="text-sm font-semibold text-gray-600 select-none">Fecha de Emisión</span>
              </div>
              <div className="w-full sm:w-2/3 bg-white px-4 py-4 md:py-5 flex items-center">
                <span className="text-sm font-bold text-gray-800 tracking-wide uppercase font-mono">
                  {data.fechaEmision}
                </span>
              </div>
            </div>

            {/* Row 3b: Vigencia */}
            {data.vigencia && (
              <div className="flex flex-col sm:flex-row border-b border-gray-200" id="row-vigencia">
                <div className="w-full sm:w-1/3 bg-[#f9fafb] px-4 py-4 md:py-5 flex items-center border-b sm:border-b-0 sm:border-r border-gray-200">
                  <span className="text-sm font-semibold text-gray-600 select-none">Vigencia</span>
                </div>
                <div className="w-full sm:w-2/3 bg-[#fbfcfd] px-4 py-4 md:py-5 flex items-center">
                  <span className="text-sm font-bold text-gray-800 tracking-wide uppercase text-gray-850">
                    {data.vigencia}
                  </span>
                </div>
              </div>
            )}

            {/* Row 4: Institución */}
            <div className="flex flex-col sm:flex-row border-b border-gray-200" id="row-institucion">
              <div className="w-full sm:w-1/3 bg-[#f9fafb] px-4 py-4 md:py-5 flex items-center border-b sm:border-b-0 sm:border-r border-gray-200">
                <span className="text-sm font-semibold text-gray-600 select-none">Institución</span>
              </div>
              <div className="w-full sm:w-2/3 bg-[#fbfcfd] px-4 py-4 md:py-5 flex items-center">
                <span className="text-sm font-bold text-gray-800 tracking-wide uppercase">
                  {data.institucion}
                </span>
              </div>
            </div>

            {/* Row 5: Certificado */}
            <div className="flex flex-col sm:flex-row" id="row-certificado">
              <div className="w-full sm:w-1/3 bg-[#f9fafb] px-4 py-4 md:py-5 flex items-center border-b sm:border-b-0 sm:border-r border-gray-200">
                <span className="text-sm font-semibold text-gray-600 select-none">Certificado</span>
              </div>
              <div className="w-full sm:w-2/3 bg-white px-4 py-4 md:py-5 flex items-center">
                <span className="text-sm font-bold text-gray-800 tracking-wide uppercase text-[#E30613]">
                  {data.certificado}
                </span>
              </div>
            </div>

          </div>

          {/* Sede Indicator & Details */}
          <div className="mt-4 flex justify-between items-center px-1 text-xs text-gray-400 font-sans">
            <span>Sede Validación: {data.sede}</span>
            <span>Código: {data.codigoVerificacion}</span>
          </div>
        </div>

        {/* Dynamic Interactive Utility Controls */}
        <div id="util-controls" className="px-6 py-4 bg-gray-50 border-t border-gray-100 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="text-xs text-gray-500 font-sans text-center sm:text-left select-none">
            Este certificado es un registro digital auténtico emitido por INACAP.
          </div>
          <div className="flex items-center space-x-2 w-full sm:w-auto justify-end">
            <button
              id="print-cert-button"
              onClick={handlePrint}
              className="flex items-center justify-center space-x-1.5 px-4 py-2 bg-white border border-gray-300 rounded-[2px] text-xs font-semibold text-gray-700 hover:bg-gray-50 transition-colors w-full sm:w-auto cursor-pointer shadow-xs"
            >
              <Printer size={14} />
              <span>Imprimir</span>
            </button>
            <button
              id="download-cert-button"
              onClick={handlePrint}
              className="flex items-center justify-center space-x-1.5 px-4 py-2 bg-[#1c2836] rounded-[2px] text-xs font-bold text-white hover:bg-[#253447] transition-colors w-full sm:w-auto cursor-pointer shadow-xs"
            >
              <Download size={14} />
              <span>Descargar PDF</span>
            </button>
          </div>
        </div>
      </div>

      <div className="mt-8 text-center" id="security-assurance">
        <p className="text-xs text-gray-400 select-none">
          © 2026 Universidad Tecnológica de Chile INACAP. Todos los derechos reservados.
        </p>
      </div>
    </motion.div>
  );
}
