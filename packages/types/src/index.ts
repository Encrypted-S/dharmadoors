// DharmaDoors Shared Types

// =============================================================================
// Traditions
// =============================================================================

export type Tradition =
  | 'theravada'
  | 'mahayana'
  | 'vajrayana'
  | 'zen'
  | 'pure_land'
  | 'nichiren'
  | 'secular'
  | 'multi_tradition'
  | 'other';

export const TRADITIONS: Record<Tradition, { label: string; subTraditions: string[] }> = {
  theravada: {
    label: 'Theravada',
    subTraditions: ['Thai Forest', 'Burmese', 'Sri Lankan', 'Western Insight'],
  },
  mahayana: {
    label: 'Mahayana',
    subTraditions: ['Chinese', 'Vietnamese', 'Korean'],
  },
  vajrayana: {
    label: 'Vajrayana/Tibetan',
    subTraditions: ['Gelug', 'Kagyu', 'Nyingma', 'Sakya', 'Rimé'],
  },
  zen: {
    label: 'Zen/Chan/Seon',
    subTraditions: ['Soto', 'Rinzai', 'Sanbo Kyodan', 'Korean Seon'],
  },
  pure_land: {
    label: 'Pure Land',
    subTraditions: ['Jodo Shinshu', 'Jodo Shu', 'Chinese Pure Land'],
  },
  nichiren: {
    label: 'Nichiren',
    subTraditions: ['SGI', 'Nichiren Shu', 'Nichiren Shoshu'],
  },
  secular: {
    label: 'Secular/Non-sectarian',
    subTraditions: ['MBSR', 'Secular Buddhism'],
  },
  multi_tradition: {
    label: 'Multi-tradition',
    subTraditions: [],
  },
  other: {
    label: 'Other',
    subTraditions: [],
  },
};

// =============================================================================
// Offerings
// =============================================================================

export type Offering =
  | 'meditation_sits'
  | 'dharma_talks'
  | 'retreats'
  | 'classes'
  | 'online_programs'
  | 'monastic_training'
  | 'family_programs'
  | 'recovery_programs'
  | 'interfaith'
  | 'community_events';

export const OFFERINGS: Record<Offering, string> = {
  meditation_sits: 'Meditation Sessions',
  dharma_talks: 'Dharma Talks',
  retreats: 'Retreats',
  classes: 'Classes/Courses',
  online_programs: 'Online Programs',
  monastic_training: 'Monastic Training',
  family_programs: 'Family Programs',
  recovery_programs: 'Recovery Programs',
  interfaith: 'Interfaith Activities',
  community_events: 'Community Events',
};

// =============================================================================
// Center
// =============================================================================

export interface Center {
  id: string;
  name: string;
  slug: string;

  // Location
  address?: string;
  city?: string;
  state?: string;
  country: string;
  postalCode?: string;
  latitude: number;
  longitude: number;

  // Contact
  website?: string;
  email?: string;
  phone?: string;

  // Details
  description?: string;
  tradition: Tradition;
  subTradition?: string;
  languages: string[];
  offerings: Offering[];

  // Accessibility
  wheelchairAccessible: boolean;
  hearingLoop: boolean;
  signLanguage: boolean;

  // Media
  photoUrl?: string;

  // Support (V2)
  needsSupport: boolean;
  supportDescription?: string;
  donationUrl?: string;

  // Meta
  status: 'pending' | 'approved' | 'rejected';
  createdAt: Date;
  updatedAt: Date;
}

export interface CenterInput {
  name: string;
  address?: string;
  city?: string;
  state?: string;
  country: string;
  postalCode?: string;
  latitude: number;
  longitude: number;
  website?: string;
  email?: string;
  phone?: string;
  description?: string;
  tradition: Tradition;
  subTradition?: string;
  languages?: string[];
  offerings?: Offering[];
  wheelchairAccessible?: boolean;
  hearingLoop?: boolean;
  signLanguage?: boolean;
  photoUrl?: string;
}

// =============================================================================
// API
// =============================================================================

export interface CentersSearchParams {
  lat?: number;
  lng?: number;
  radius?: number; // km
  tradition?: Tradition;
  offerings?: Offering[];
  country?: string;
  q?: string; // text search
  limit?: number;
  offset?: number;
}

export interface CentersSearchResponse {
  centers: Center[];
  total: number;
  hasMore: boolean;
}
