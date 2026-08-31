export interface Product {
  id: string;
  icon: string;
  title: string;
  description: string;
}

export interface Service {
  id: string;
  number: string;
  icon: string;
  title: string;
  description: string;
}

export interface PricingPlan {
  id: string;
  name: string;
  description: string;
  price: number;
  period: string;
  features: { text: string; included: boolean }[];
  featured?: boolean;
  badge?: string;
}

export interface Testimonial {
  id: string;
  text: string;
  author: string;
  role: string;
}

export interface ContactInfo {
  icon: string;
  label: string;
  value: string;
  href?: string;
}

export interface AboutCard {
  icon: string;
  title: string;
  description: string;
}
