/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { FileText, Database, ShieldAlert, CheckCircle, Search, HelpCircle, FileCheck2, Loader2, RefreshCw } from 'lucide-react';
import InacapHeader from './components/InacapHeader';
import Captcha from './components/Captcha';
import CertificateResult from './components/CertificateResult';
import { CertificateData, ValidationStatus } from './types';

// High fidelity certificate register databases (Carlos Heriberto Cerna Fuentes and Diego Luengo Alvial)
const CERTIFICATES_DB: Record<string, CertificateData> = {
  'A02C09399F22E1A0': {
    codigoVerificacion: 'A02C09399F22E1A0',
    nombreAlumno: 'CARLOS HERIBERTO CERNA FUENTES',
    rutAlumno: '12.193.606-2',
    programaEstudio: 'ADMINISTRACIÓN DE EMPRESA',
    fechaEmision: '03-06-2026 10:37:48 hrs.',
    institucion: 'INSTITUTO PROFESIONAL INACAP',
    certificado: 'CERTIFICADO ALUMNO',
    sede: 'Temuco',
    vigencia: 'Primer Semestre Académico del año 2026'
  },
  'C4CECC4C9AB14146': {
    codigoVerificacion: 'C4CECC4C9AB14146',
    nombreAlumno: 'DIEGO MARTIN ALEJANDRO LUENGO ALVIAL',
    rutAlumno: '18.765.432-K',
    programaEstudio: 'INGENIERÍA AGRÍCOLA',
    fechaEmision: '03-06-2026 09:12:45 hrs.',
    institucion: 'INSTITUTO PROFESIONAL INACAP',
    certificado: 'CERTIFICADO ALUMNO',
    sede: 'Temuco',
    vigencia: 'Primer Semestre Académico del año 2026'
  },
  'D5AA6E0663489D77': {
    codigoVerificacion: 'D5AA6E0663489D77',
    nombreAlumno: 'CATALINA ROCIO CANIULLAN ANCALAF',
    rutAlumno: '20.954.463-6',
    programaEstudio: 'INGENIERÍA EN TELECOMUNICACIONES, CONECTIVIDAD Y REDES',
    fechaEmision: '11-05-2026 12:17:05 hrs.',
    institucion: 'INSTITUTO PROFESIONAL INACAP',
    certificado: 'CERTIFICADO ALUMNO',
    sede: 'Temuco',
    vigencia: 'Primer Semestre Académico del año 2026'
  },
  '37E5697964B46DA0': {
    codigoVerificacion: '37E5697964B46DA0',
    nombreAlumno: 'CLAUDIA ANDREA MELIVILU LADINO',
    rutAlumno: '12.709.779-9',
    programaEstudio: 'ADMINISTRACIÓN LOGÍSTICA',
    fechaEmision: '13-03-2026 16:42:11 hrs.',
    institucion: 'INSTITUTO PROFESIONAL INACAP',
    certificado: 'CERTIFICADO ALUMNO',
    sede: 'Temuco',
    vigencia: 'Primer Semestre Académico del año 2026'
  }
};

export default function App() {
  const [verificationCode, setVerificationCode] = useState('A02C09399F22E1A0');
  const [captchaValue, setCaptchaValue] = useState('');
  const [isCaptchaCorrect, setIsCaptchaCorrect] = useState(false);
  const [validationStatus, setValidationStatus] = useState<ValidationStatus>('idle');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [shouldResetCaptcha, setShouldResetCaptcha] = useState(false);
  const [validatedCertificate, setValidatedCertificate] = useState<CertificateData | null>(null);

  // Trigger captcha regeneration
  const handleResetCaptcha = () => {
    setShouldResetCaptcha(prev => !prev);
    setCaptchaValue('');
    setIsCaptchaCorrect(false);
  };

  // Perform full certificate authentication search simulation
  const handleValidate = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    // Standard validation guards
    if (!verificationCode.trim()) {
      setErrorMessage('Por favor, ingrese un código de verificación válido.');
      return;
    }

    if (!captchaValue.trim()) {
      setErrorMessage('Por favor, ingrese el código captcha de seguridad de 5 dígitos.');
      return;
    }

    if (!isCaptchaCorrect) {
      setErrorMessage('El código de seguridad captcha ingresado es incorrecto. Por favor, verifique el código e intente de nuevo.');
      handleResetCaptcha();
      return;
    }

    // Capture dynamic changes or load standard default matching requested data
    setValidationStatus('loading');

    // High fidelity simulated database latency
    setTimeout(() => {
      // Validate everything that matches, with uppercase styling
      const code = verificationCode.trim().toUpperCase();
      const matched = CERTIFICATES_DB[code];
      
      if (matched) {
        setValidatedCertificate(matched);
      } else {
        // Fallback to Carlos but substitute the exact entered code
        setValidatedCertificate({
          ...CERTIFICATES_DB['A02C09399F22E1A0'],
          codigoVerificacion: code
        });
      }
      setValidationStatus('valid');
    }, 1500);
  };

  // Restores validation portal state
  const handleBack = () => {
    setValidationStatus('idle');
    setValidatedCertificate(null);
    handleResetCaptcha();
  };

  return (
    <div className="min-h-screen bg-[#f8fafc] flex flex-col font-sans text-gray-800" id="inacap-portal">
      {/* Upper Brand Header Grid Banner */}
      <InacapHeader />

      <main className="flex-grow" id="main-content">
        <AnimatePresence mode="wait">
          {validationStatus === 'valid' && validatedCertificate ? (
            // Render Verification Screen Result Frame (First Image matched)
            <div key="result">
              <CertificateResult
                data={validatedCertificate}
                onBack={handleBack}
              />
            </div>
          ) : (
            // Render Primary Validation Form (Second Image matched)
            <motion.div
              key="form"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="w-full"
            >
              {/* Hero Banner Section with Building Backdrop & overlay gradient mirroring the photograph */}
              <div 
                id="hero-banner" 
                className="relative bg-gradient-to-r from-[#111c2a] via-[#1b2b3f] to-[#14202e] py-14 md:py-20 px-4 overflow-hidden border-b border-gray-800 select-none"
              >
                {/* Modern building architecture translucent background mesh */}
                <div 
                  className="absolute inset-0 bg-cover bg-center mix-blend-overlay opacity-30 select-none pointer-events-none"
                  style={{ 
                    backgroundImage: `url('https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=1600&auto=format&fit=crop')` 
                  }}
                  id="building-backdrop"
                />

                {/* Left diagonal highlight mimics sunset shadow coloring on campus */}
                <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-[#111c2a]/90 to-transparent pointer-events-none"></div>

                <div className="max-w-4xl mx-auto relative z-10 text-center md:text-left">
                  {/* Validation Main Headline */}
                  <h1 
                    id="page-title" 
                    className="text-white text-3xl md:text-5xl font-extrabold tracking-tight mb-8 font-display"
                  >
                    Validación de Certificados Temuco
                  </h1>

                  {/* Search Verification Bar Container */}
                  <form onSubmit={handleValidate} className="w-full max-w-3xl" id="validation-form">
                    <div className="flex flex-col space-y-2 mb-4">
                      {/* Form Top Label */}
                      <label 
                        htmlFor="txt-verification-code" 
                        className="text-white text-xs md:text-sm font-semibold tracking-wider text-left block"
                      >
                        Ingrese código de verificación
                      </label>

                      {/* Main Verification Input Row */}
                      <div className="flex flex-col sm:flex-row items-stretch sm:space-x-2 space-y-2 sm:space-y-0">
                        <div className="relative flex-grow">
                          <input
                            id="txt-verification-code"
                            type="text"
                            placeholder="Ej: C4CECC4C9AB14146"
                            value={verificationCode}
                            onChange={(e) => setVerificationCode(e.target.value)}
                            disabled={validationStatus === 'loading'}
                            className="w-full h-12 bg-white text-gray-800 text-sm md:text-base font-semibold px-4 rounded-[2px] border border-gray-300 focus:outline-none focus:border-[#E30613] hover:border-gray-400 transition-colors uppercase placeholder:text-gray-400 placeholder:normal-case shadow-inner"
                          />
                          <div className="absolute right-3 top-3.5 text-gray-400">
                            <Search size={18} />
                          </div>
                        </div>

                        {/* Submit Button */}
                        <button
                          id="btn-validate"
                          type="submit"
                          disabled={validationStatus === 'loading'}
                          className="h-12 bg-[#E30613] hover:bg-[#c20510] text-white text-sm md:text-base font-bold px-8 rounded-[2px] transition-colors focus:outline-none flex items-center justify-center space-x-2 cursor-pointer shadow-md shadow-black/10 active:scale-[0.99]"
                        >
                          {validationStatus === 'loading' ? (
                            <>
                              <Loader2 size={18} className="animate-spin text-white-800" />
                              <span>Validando...</span>
                            </>
                          ) : (
                            <span>Validar</span>
                          )}
                        </button>
                      </div>
                    </div>

                    {/* Captcha Block (positioned below verification code input) */}
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mt-5 pt-3 border-t border-white/10" id="captcha-grid-row">
                      <div className="flex flex-col space-y-1.5 text-left">
                        <span className="text-white/80 text-xs font-semibold select-none">Filtro de Seguridad Captcha</span>
                        <Captcha
                          onValidate={setIsCaptchaCorrect}
                          captchaValue={captchaValue}
                          setCaptchaValue={setCaptchaValue}
                          shouldResetTrigger={shouldResetCaptcha}
                        />
                      </div>

                      {/* Info Helper Link */}
                      <div className="text-left py-1 text-xs text-white/50 select-none hidden md:block max-w-[280px]">
                        Escriba los 5 caracteres distorsionados exactamente como aparecen en el recuadro gris antes de presionar validar.
                      </div>
                    </div>
                  </form>
                </div>
              </div>

              {/* Informative Guidance & Verification Instructions */}
              <div className="max-w-4xl mx-auto px-4 py-10" id="instructions-container">
                {/* Error Block Alert */}
                <AnimatePresence>
                  {errorMessage && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="mb-8 p-4 bg-red-50 border-l-4 border-[#E30613] rounded-r-md flex items-start space-x-3 shadow-xs"
                      id="error-block"
                    >
                      <ShieldAlert className="text-[#E30613] mt-0.5 flex-shrink-0" size={20} />
                      <div>
                        <h4 className="text-sm font-bold text-red-900 mb-0.5">Error de Verificación</h4>
                        <p className="text-xs md:text-sm text-red-700 font-sans tracking-wide">
                          {errorMessage}
                        </p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Database Loading Spinner Overlay */}
                {validationStatus === 'loading' && (
                  <div className="my-6 p-6 bg-blue-50/50 border border-blue-100 rounded-md flex items-center justify-center space-x-4 animate-pulse">
                    <Loader2 className="animate-spin text-blue-600" size={24} />
                    <div className="text-left font-sans text-xs md:text-sm text-blue-800">
                      <p className="font-bold">Consultando Servidores de INACAP Sede Temuco...</p>
                      <p className="text-blue-600/85">Verificando firma digital y validez jurídica del certificado académico...</p>
                    </div>
                  </div>
                )}

                {/* Instruction Grid Section */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6" id="instructional-grid">
                  <div className="p-5 bg-white border border-gray-200 rounded-sm shadow-xs flex flex-col justify-between" id="card-inst-1">
                    <div>
                      <div className="w-10 h-10 rounded-full bg-[#E30613]/5 flex items-center justify-center mb-4">
                        <FileText className="text-[#E30613]" size={20} />
                      </div>
                      <h3 className="text-sm font-bold text-gray-800 mb-2 font-display">¿Dónde encontrar el código?</h3>
                      <p className="text-xs text-gray-500 leading-relaxed">
                        El código de verificación se encuentra impreso en la parte inferior o en el margen lateral del certificado oficial emitido por la institución.
                      </p>
                    </div>
                  </div>

                  <div className="p-5 bg-white border border-gray-200 rounded-sm shadow-xs flex flex-col justify-between" id="card-inst-2">
                    <div>
                      <div className="w-10 h-10 rounded-full bg-[#E30613]/5 flex items-center justify-center mb-4">
                        <Database className="text-[#E30613]" size={20} />
                      </div>
                      <h3 className="text-sm font-bold text-gray-800 mb-2 font-display">Sistemas de Registro Nacional</h3>
                      <p className="text-xs text-gray-500 leading-relaxed">
                        El validador encriptado conecta en tiempo real con las actas y bases académicas unificadas correspondientes a la Sede Temuco de INACAP.
                      </p>
                    </div>
                  </div>

                  <div className="p-5 bg-white border border-gray-200 rounded-sm shadow-xs flex flex-col justify-between" id="card-inst-3">
                    <div>
                      <div className="w-10 h-10 rounded-full bg-[#E30613]/5 flex items-center justify-center mb-4">
                        <FileCheck2 className="text-[#E30613]" size={20} />
                      </div>
                      <h3 className="text-sm font-bold text-gray-800 mb-2 font-display">Certificación Digital Segura</h3>
                      <p className="text-xs text-gray-500 leading-relaxed">
                        Este portal oficial otorga plena seguridad jurídica a empleadores e instituciones respecto a la veracidad de los estudios acreditados.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* Footer Branding Area */}
      <footer className="w-full bg-[#1e293b] border-t border-gray-800 py-6 px-4 md:px-8 text-center" id="portal-footer">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between text-xs text-gray-400 font-sans gap-4">
          <div className="flex items-center space-x-2 select-none">
            <span className="font-extrabold text-white bg-[#E30613] px-1 rounded-xs">I</span>
            <span className="font-bold text-white tracking-tight">INACAP</span>
            <span className="text-gray-500">|</span>
            <span>Vía de Validación Autorizada, Sede Temuco</span>
          </div>
          <div className="flex space-x-4 select-none">
            <span className="hover:text-white transition-colors cursor-pointer">Términos de Uso</span>
            <span className="hover:text-white transition-colors cursor-pointer">Soporte Técnico</span>
            <span className="hover:text-white transition-colors cursor-pointer">Contacto Sede</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
