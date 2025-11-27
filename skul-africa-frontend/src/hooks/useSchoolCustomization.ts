import { useState, useEffect } from 'react';

export interface SchoolBranding {
  schoolName: string;
  motto: string;
  logo: string;
  favicon: string;
  primaryColor: string;
  secondaryColor: string;
  accentColor: string;
  fontStyle: string;
}

export interface HomepageContent {
  hero: {
    title: string;
    subtitle: string;
    bgImage: string;
    ctaText: string;
    ctaLink: string;
  };
  about: {
    description: string;
    vision: string;
    mission: string;
    image: string;
  };
  academics: Array<{
    id: string;
    title: string;
    description: string;
    image: string;
  }>;
  gallery: string[];
  testimonials: Array<{
    id: string;
    name: string;
    role: string;
    content: string;
    image: string;
  }>;
}

export interface HomepageVisibility {
  hero: boolean;
  about: boolean;
  academics: boolean;
  gallery: boolean;
  testimonials: boolean;
  contact: boolean;
}

export interface SchoolTheme {
  mode: 'classic' | 'minimal' | 'modern' | 'dark' | 'gradient';
}

export interface SchoolContact {
  email: string;
  phone: string;
  address: string;
  socials: {
    facebook: string;
    instagram: string;
    twitter: string;
    whatsapp: string;
  };
}

export interface SchoolNavigation {
  links: Array<{ id: string; label: string; href: string }>;
}

export interface SchoolFooter {
  text: string;
  copyright: string;
}

const DEFAULT_BRANDING: SchoolBranding = {
  schoolName: 'Skul Africa',
  motto: 'Excellence in Education',
  logo: '',
  favicon: '',
  primaryColor: '#000000',
  secondaryColor: '#ffffff',
  accentColor: '#3b82f6',
  fontStyle: 'Inter',
};

const DEFAULT_HOMEPAGE: HomepageContent = {
  hero: {
    title: 'Welcome to Skul Africa',
    subtitle: 'Empowering the next generation of leaders',
    bgImage: '',
    ctaText: 'Get Started',
    ctaLink: '/register',
  },
  about: {
    description: 'We are a leading institution dedicated to providing quality education.',
    vision: 'To be the best school in Africa',
    mission: 'To educate and inspire',
    image: '',
  },
  academics: [],
  gallery: [],
  testimonials: [],
};

const DEFAULT_VISIBILITY: HomepageVisibility = {
  hero: true,
  about: true,
  academics: true,
  gallery: true,
  testimonials: true,
  contact: true,
};

const DEFAULT_THEME: SchoolTheme = {
  mode: 'modern',
};

const DEFAULT_CONTACT: SchoolContact = {
  email: 'info@skulafrica.com',
  phone: '+1234567890',
  address: '123 School Lane, Education City',
  socials: {
    facebook: '',
    instagram: '',
    twitter: '',
    whatsapp: '',
  },
};

const DEFAULT_NAVIGATION: SchoolNavigation = {
  links: [
    { id: '1', label: 'Home', href: '/' },
    { id: '2', label: 'About', href: '#about' },
    { id: '3', label: 'Academics', href: '#academics' },
    { id: '4', label: 'Contact', href: '#contact' },
  ],
};

const DEFAULT_FOOTER: SchoolFooter = {
  text: 'Skul Africa - All Rights Reserved',
  copyright: `© ${new Date().getFullYear()} Skul Africa`,
};

export function useSchoolCustomization(subdomain: string) {
  const [branding, setBranding] = useState<SchoolBranding>(DEFAULT_BRANDING);
  const [homepage, setHomepage] = useState<HomepageContent>(DEFAULT_HOMEPAGE);
  const [visibility, setVisibility] = useState<HomepageVisibility>(DEFAULT_VISIBILITY);
  const [theme, setTheme] = useState<SchoolTheme>(DEFAULT_THEME);
  const [contact, setContact] = useState<SchoolContact>(DEFAULT_CONTACT);
  const [navigation, setNavigation] = useState<SchoolNavigation>(DEFAULT_NAVIGATION);
  const [footer, setFooter] = useState<SchoolFooter>(DEFAULT_FOOTER);
  const [isLoaded, setIsLoaded] = useState(false);

  // Load from localStorage
  useEffect(() => {
    if (!subdomain) return;

    const loadState = (key: string, setter: any, defaultValue: any) => {
      const saved = localStorage.getItem(`${subdomain}-${key}`);
      if (saved) {
        try {
          setter({ ...defaultValue, ...JSON.parse(saved) });
        } catch (e) {
          console.error(`Error parsing ${key}`, e);
          setter(defaultValue);
        }
      } else {
        setter(defaultValue);
      }
    };

    loadState('branding', setBranding, DEFAULT_BRANDING);
    loadState('homepage-content', setHomepage, DEFAULT_HOMEPAGE);
    loadState('homepage-visibility', setVisibility, DEFAULT_VISIBILITY);
    loadState('theme', setTheme, DEFAULT_THEME);
    loadState('contact', setContact, DEFAULT_CONTACT);
    loadState('navigation', setNavigation, DEFAULT_NAVIGATION);
    loadState('footer', setFooter, DEFAULT_FOOTER);
    setIsLoaded(true);
  }, [subdomain]);

  // Save helpers
  const save = (key: string, value: any) => {
    localStorage.setItem(`${subdomain}-${key}`, JSON.stringify(value));
  };

  const updateBranding = (updates: Partial<SchoolBranding>) => {
    const newBranding = { ...branding, ...updates };
    setBranding(newBranding);
    save('branding', newBranding);
  };

  const updateHomepage = (updates: Partial<HomepageContent>) => {
    const newHomepage = { ...homepage, ...updates };
    setHomepage(newHomepage);
    save('homepage-content', newHomepage);
  };

  const updateVisibility = (updates: Partial<HomepageVisibility>) => {
    const newVisibility = { ...visibility, ...updates };
    setVisibility(newVisibility);
    save('homepage-visibility', newVisibility);
  };

  const updateTheme = (updates: Partial<SchoolTheme>) => {
    const newTheme = { ...theme, ...updates };
    setTheme(newTheme);
    save('theme', newTheme);
  };

  const updateContact = (updates: Partial<SchoolContact>) => {
    const newContact = { ...contact, ...updates };
    setContact(newContact);
    save('contact', newContact);
  };

  const updateNavigation = (updates: Partial<SchoolNavigation>) => {
    const newNavigation = { ...navigation, ...updates };
    setNavigation(newNavigation);
    save('navigation', newNavigation);
  };

  const updateFooter = (updates: Partial<SchoolFooter>) => {
    const newFooter = { ...footer, ...updates };
    setFooter(newFooter);
    save('footer', newFooter);
  };

  return {
    branding,
    homepage,
    visibility,
    theme,
    contact,
    navigation,
    footer,
    isLoaded,
    updateBranding,
    updateHomepage,
    updateVisibility,
    updateTheme,
    updateContact,
    updateNavigation,
    updateFooter,
  };
}
