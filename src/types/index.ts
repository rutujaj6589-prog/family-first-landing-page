export interface NavItem {
  label: string;
  to: string;
}

export interface TrustBadge {
  icon: string;
  value: string;
  label: string;
}

export interface StatCounter {
  end: number;
  suffix: string;
  label: string;
  prefix?: string;
}

export interface WhyCard {
  icon: React.ReactNode;
  title: string;
  description: string;
  color: string;
}

export interface TimelineStep {
  year: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  color: string;
}

export interface Benefit {
  icon: React.ReactNode;
  title: string;
  description: string;
  gradient: string;
}

export interface FounderAchievement {
  value: string;
  label: string;
}

export interface Testimonial {
  id: number;
  name: string;
  role: string;
  image: string;
  rating: number;
  text: string;
  location: string;
}

export interface FAQItem {
  id: number;
  question: string;
  answer: string;
}

export interface CalculatorFormData {
  childAge: number;
  targetAge: number;
  currentCost: number;
  inflationRate: number;
  monthlyInvestment: number;
}

export interface CalculatorResult {
  futureCost: number;
  totalInvestment: number;
  maturityAmount: number;
  coverageGap: number;
  monthlyNeeded: number;
}
