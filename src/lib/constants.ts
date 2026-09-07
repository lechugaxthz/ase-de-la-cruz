export const SITE = {
  name: 'Ase de la Cruz',
  description: 'Asesoramiento experto e integral en seguros personales y corporativos. Protegemos tu patrimonio con estrategias personalizadas.',
  url: 'https://asedelacruz.com',
  ogImage: '/images/og-default.jpg',
  twitterHandle: '@asedelacruz',
};

export const CONTACT = {
  phones: [
    { number: '+54 9 11 41769566', label: 'Diego García', whatsapp: '5491141769566' },
    { number: '+54 9 11 61696120', label: 'Lautaro González', whatsapp: '5491161696120' },
    { number: '+54 9 11 23327062', label: 'Francisco García', whatsapp: '5491123327062' },
  ],
  emails: [
    'diegog.garcia1@gmail.com',
    'lautarogonzalogarcia@outlook.com',
    'franciscoggarcia722@gmail.com',
  ],
  address: 'Pilar, Buenos Aires, Argentina',
  hours: 'Lunes a Viernes de 9:00 a 18:00',
};

export const INTEREST_OPTIONS = [
  { value: 'vida/prepaga', label: 'Seguro de Vida / Prepaga', icon: 'favorite' },
  { value: 'hogar', label: 'Hogar', icon: 'home' },
  { value: 'vehicular', label: 'Vehicular', icon: 'directions_car' },
  { value: 'empresas', label: 'Empresas / Laboral', icon: 'business' },
  { value: 'otros', label: 'Otros', icon: 'more_horiz' },
] as const;

export type InterestType = typeof INTEREST_OPTIONS[number]['value'];

export const INTEREST_FIELDS: Record<InterestType, string[]> = {
  'vida/prepaga': ['tipoCobertura', 'dni'],
  'hogar': ['dni', 'ubicacion'],
  'vehicular': ['marca', 'modelo', 'anio'],
  'empresas': ['cuit'],
  'otros': [],
};

export const INTEREST_FIELD_LABELS: Record<string, { label: string; required: boolean; placeholder: string; type?: string }> = {
  tipoCobertura: { label: 'Tipo de cobertura *', required: true, placeholder: 'Seleccionar' },
  dni: { label: 'DNI *', required: true, placeholder: 'Ej. 12.345.678' },
  ubicacion: { label: 'Ubicación *', required: true, placeholder: 'Ej. Pilar, Buenos Aires' },
  marca: { label: 'Marca *', required: true, placeholder: 'Ej. Toyota' },
  modelo: { label: 'Modelo', required: false, placeholder: 'Ej. Corolla' },
  anio: { label: 'Año', required: false, placeholder: 'Ej. 2022', type: 'number' },
  cuit: { label: 'CUIT de la Empresa *', required: true, placeholder: 'Ej. 30-12345678-9' },
};

export const COBERTURA_OPTIONS = [
  { value: 'soltero', label: 'Individual / Soltero' },
  { value: 'familiar', label: 'Grupo Familiar' },
];