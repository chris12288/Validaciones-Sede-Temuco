/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface CertificateData {
  codigoVerificacion: string;
  nombreAlumno: string;
  rutAlumno?: string;
  programaEstudio: string;
  fechaEmision: string;
  institucion: string;
  certificado: string;
  sede: string;
  vigencia?: string;
}

export type ValidationStatus = 'idle' | 'loading' | 'valid' | 'invalid';
