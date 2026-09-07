'use client';

import { useState, useEffect, FormEvent, ChangeEvent } from 'react';
import { INTEREST_OPTIONS, INTEREST_FIELDS, INTEREST_FIELD_LABELS, COBERTURA_OPTIONS, type InterestType } from '../../lib/constants';
import { trackContactFormSubmit, trackContactFormSuccess, trackContactFormError } from '../../lib/umami';

interface FormData {
  interesPrincipal: InterestType;
  nombre: string;
  email: string;
  telefono: string;
  comentarios: string;
  tipoCobertura: string;
  dni: string;
  ubicacion: string;
  marca: string;
  modelo: string;
  anio: string;
  cuit: string;
}

const initialData: FormData = {
  interesPrincipal: 'vida/prepaga',
  nombre: '',
  email: '',
  telefono: '',
  comentarios: '',
  tipoCobertura: 'soltero',
  dni: '',
  ubicacion: '',
  marca: '',
  modelo: '',
  anio: '',
  cuit: '',
};

const interestLabels: Record<InterestType, string> = {
  'vida/prepaga': 'Seguro de Vida',
  'hogar': 'Hogar',
  'vehicular': 'Vehicular',
  'empresas': 'Empresas / Laboral',
  'otros': 'Otros',
};

export default function ContactForm({ initialInterest }: { initialInterest?: InterestType }) {
  const [data, setData] = useState<FormData>(() => ({
    ...initialData,
    interesPrincipal: initialInterest || 'vida/prepaga',
  }));
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');
  const [errors, setErrors] = useState<Partial<Record<keyof FormData, string>>>({});

  // Update dynamic fields when interest changes
  useEffect(() => {
    const fields = INTEREST_FIELDS[data.interesPrincipal];
    const newData = { ...data };
    // Clear fields not relevant to new interest
    const allDynamicFields = ['tipoCobertura', 'dni', 'ubicacion', 'marca', 'modelo', 'anio', 'cuit'];
    allDynamicFields.forEach(field => {
      if (!fields.includes(field as keyof FormData)) {
        newData[field as keyof FormData] = initialData[field as keyof FormData];
      }
    });
    setData(newData);
    setErrors({});
  }, [data.interesPrincipal]);

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked;

    if (type === 'checkbox') {
      setData(prev => ({ ...prev, [name]: checked }));
    } else {
      setData(prev => ({ ...prev, [name]: value }));
    }

    // Clear error for this field
    if (errors[name as keyof FormData]) {
      setErrors(prev => ({ ...prev, [name]: undefined }));
    }
  };

  const handleSelectInterest = (interest: InterestType) => {
    setData(prev => ({ ...prev, interesPrincipal: interest }));
    setError('');
    setErrors({});
  };

  const validateField = (name: keyof FormData, value: string): string | undefined => {
    const fieldConfig = INTEREST_FIELD_LABELS[name];
    if (fieldConfig?.required && !value.trim()) {
      return `${fieldConfig.label.replace(' *', '')} es requerido`;
    }

    if (name === 'email' && value && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
      return 'Email inválido';
    }

    if (name === 'telefono' && value && !/^[\d\s\+\-\(\)]{10,}$/.test(value)) {
      return 'Teléfono inválido (mín 10 dígitos)';
    }

    if (name === 'anio' && value && (parseInt(value) < 1990 || parseInt(value) > new Date().getFullYear() + 1)) {
      return 'Año inválido';
    }

    return undefined;
  };

  const validateForm = (): boolean => {
    const newErrors: Partial<Record<keyof FormData, string>> = {};

    // Always required
    ['nombre', 'telefono'].forEach(field => {
      const err = validateField(field, data[field]);
      if (err) newErrors[field as keyof FormData] = err;
    });

    // Dynamic fields based on interest
    const dynamicFields = INTEREST_FIELDS[data.interesPrincipal];
    dynamicFields.forEach(field => {
      const err = validateField(field as keyof FormData, data[field as keyof FormData]);
      if (err) newErrors[field as keyof FormData] = err;
    });

    // Email optional but validated if present
    if (data.email) {
      const err = validateField('email', data.email);
      if (err) newErrors.email = err;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError('');

    if (!validateForm()) {
      return;
    }

    setSubmitting(true);
    trackContactFormSubmit(data.interesPrincipal);

    try {
      const formData = new FormData();
      Object.entries(data).forEach(([k, v]) => formData.append(k, v));

      const response = await fetch('/api/contact', {
        method: 'POST',
        body: formData,
      });

      const result = await response.json();

      if (result.success) {
        setSuccess(true);
        setData(initialData);
        setErrors({});
        trackContactFormSuccess(data.interesPrincipal);
      } else {
        setError(result.error || 'Hubo un problema al enviar. Intente nuevamente o contáctenos por WhatsApp.');
        trackContactFormError(data.interesPrincipal, result.error || 'unknown');
      }
    } catch (err) {
      console.error('Form submit error:', err);
      setError('Error de conexión. Intente nuevamente o contáctenos por WhatsApp.');
      trackContactFormError(data.interesPrincipal, 'network_error');
    } finally {
      setSubmitting(false);
    }
  };

  const dynamicFields = INTEREST_FIELDS[data.interesPrincipal];

  return (
    <form onSubmit={handleSubmit} className="space-y-6" noValidate>
      {/* Interest Selector */}
      <div>
        <label className="block text-sm font-semibold text-dark-light mb-3">
          Interés principal
        </label>
        <div className="flex flex-wrap gap-2" role="radiogroup" aria-label="Seleccionar interés principal">
          {INTEREST_OPTIONS.map(opt => (
            <button
              key={opt.value}
              type="button"
              role="radio"
              aria-checked={data.interesPrincipal === opt.value}
              onClick={() => handleSelectInterest(opt.value)}
              className={`px-4 py-2 rounded-full text-sm font-bold transition-all border-2 ${
                data.interesPrincipal === opt.value
                  ? 'bg-primary border-primary text-white shadow-sm'
                  : 'bg-transparent border-primary/20 text-primary hover:border-primary hover:bg-primary/5'
              }`}
            >
              <span className="material-symbols-outlined text-base mr-1.5 align-middle">{opt.icon}</span>
              {interestLabels[opt.value]}
            </button>
          ))}
        </div>
      </div>

      {/* Dynamic Fields */}
      {dynamicFields.length > 0 && (
        <div className="bg-primary/5 p-4 rounded-xl border border-primary/10 animate-in">
          <div className="grid gap-4 md:grid-cols-2">
            {dynamicFields.map(field => {
              const config = INTEREST_FIELD_LABELS[field];
              const fieldErrors = errors[field as keyof FormData];

              if (field === 'tipoCobertura') {
                return (
                  <div key={field}>
                    <label className="block text-sm font-semibold text-dark-light mb-2">
                      {config.label}
                    </label>
                    <select
                      name={field}
                      value={data[field]}
                      onChange={handleChange}
                      className={`w-full px-4 py-3 rounded-lg border bg-white text-dark focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all ${
                        fieldErrors ? 'border-error focus:ring-error/30 focus:border-error' : 'border-border'
                      }`}
                      aria-invalid={fieldErrors ? 'true' : 'false'}
                      aria-describedby={fieldErrors ? `${field}-error` : undefined}
                    >
                      {COBERTURA_OPTIONS.map(opt => (
                        <option key={opt.value} value={opt.value}>{opt.label}</option>
                      ))}
                    </select>
                    {fieldErrors && <p id={`${field}-error`} className="mt-1.5 text-sm text-error" role="alert">{fieldErrors}</p>}
                  </div>
                );
              }

              return (
                <div key={field}>
                  <label className="block text-sm font-semibold text-dark-light mb-2">
                    {config.label}
                  </label>
                  <input
                    type={config.type || 'text'}
                    name={field}
                    value={data[field]}
                    onChange={handleChange}
                    required={config.required}
                    placeholder={config.placeholder}
                    className={`w-full px-4 py-3 rounded-lg border bg-white text-dark focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all ${
                      fieldErrors ? 'border-error focus:ring-error/30 focus:border-error' : 'border-border'
                    }`}
                    aria-invalid={fieldErrors ? 'true' : 'false'}
                    aria-describedby={fieldErrors ? `${field}-error` : undefined}
                  />
                  {fieldErrors && <p id={`${field}-error`} className="mt-1.5 text-sm text-error" role="alert">{fieldErrors}</p>}
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Common Fields */}
      <div>
        <label className="block text-sm font-semibold text-dark-light mb-2">
          Nombre completo <span className="text-error">*</span>
        </label>
        <input
          type="text"
          name="nombre"
          value={data.nombre}
          onChange={handleChange}
          required
          className={`w-full px-4 py-3 rounded-lg border bg-white text-dark focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all ${
            errors.nombre ? 'border-error focus:ring-error/30 focus:border-error' : 'border-border'
          }`}
          placeholder="Ej. Juan Pérez"
          aria-invalid={errors.nombre ? 'true' : 'false'}
          aria-describedby={errors.nombre ? 'nombre-error' : undefined}
        />
        {errors.nombre && <p id="nombre-error" className="mt-1.5 text-sm text-error" role="alert">{errors.nombre}</p>}
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <div>
          <label className="block text-sm font-semibold text-dark-light mb-2">
            Correo electrónico
          </label>
          <input
            type="email"
            name="email"
            value={data.email}
            onChange={handleChange}
            className={`w-full px-4 py-3 rounded-lg border bg-white text-dark focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all ${
              errors.email ? 'border-error focus:ring-error/30 focus:border-error' : 'border-border'
            }`}
            placeholder="juan@correo.com"
            aria-invalid={errors.email ? 'true' : 'false'}
            aria-describedby={errors.email ? 'email-error' : undefined}
          />
          {errors.email && <p id="email-error" className="mt-1.5 text-sm text-error" role="alert">{errors.email}</p>}
        </div>
        <div>
          <label className="block text-sm font-semibold text-dark-light mb-2">
            Teléfono <span className="text-error">*</span>
          </label>
          <input
            type="tel"
            name="telefono"
            value={data.telefono}
            onChange={handleChange}
            required
            className={`w-full px-4 py-3 rounded-lg border bg-white text-dark focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all ${
              errors.telefono ? 'border-error focus:ring-error/30 focus:border-error' : 'border-border'
            }`}
            placeholder="+54 9 11 1234-5678"
            aria-invalid={errors.telefono ? 'true' : 'false'}
            aria-describedby={errors.telefono ? 'telefono-error' : undefined}
          />
          {errors.telefono && <p id="telefono-error" className="mt-1.5 text-sm text-error" role="alert">{errors.telefono}</p>}
        </div>
      </div>

      <div>
        <label className="block text-sm font-semibold text-dark-light mb-2">
          Comentarios / Observaciones
        </label>
        <textarea
          name="comentarios"
          value={data.comentarios}
          onChange={handleChange}
          rows={4}
          className="w-full px-4 py-3 rounded-lg border border-border bg-white text-dark focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary resize-none transition-all"
          placeholder="Cuéntenos un poco más sobre lo que necesita..."
        />
      </div>

      {/* Success Message */}
      {success && (
        <div className="bg-success-bg border border-success/30 text-success px-4 py-3 rounded-lg flex items-center gap-2 animate-in" role="alert">
          <svg className="w-5 h-5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/></svg>
          <p className="text-sm font-bold">¡Mensaje enviado con éxito! Nos contactaremos pronto.</p>
        </div>
      )}

      {/* Error Message */}
      {error && !success && (
        <div className="bg-error-bg border border-error/30 text-error px-4 py-3 rounded-lg flex items-center gap-2 animate-in" role="alert">
          <svg className="w-5 h-5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd"/></svg>
          <p className="text-sm font-bold">{error}</p>
        </div>
      )}

      {/* Submit Button */}
      <button
        type="submit"
        disabled={submitting}
        className={`w-full px-8 py-4 rounded-lg font-bold hover:shadow-lg active:scale-[0.98] transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 ${
          submitting
            ? 'bg-primary/70 text-white cursor-wait'
            : 'bg-primary text-white hover:bg-primary-hover shadow-md'
        }`}
      >
        {submitting && (
          <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24" aria-hidden="true">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"/>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"/>
          </svg>
        )}
        {submitting ? 'Enviando...' : 'Enviar Solicitud'}
      </button>
    </form>
  );
}