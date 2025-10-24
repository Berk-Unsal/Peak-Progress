import { Leaf, Sun, Award, Mountain, Star } from 'lucide-react';

export const MILESTONES = [
  { days: 1, name: "24 Hours", description: "You made it through the first day!", icon: Star },
  { days: 3, name: "72 Hours", description: "Nicotine is leaving your system.", icon: Leaf },
  { days: 7, name: "1 Week", description: "A whole week smoke-free!", icon: Sun },
  { days: 30, name: "1 Month", description: "Your lung function is improving.", icon: Award },
  { days: 90, name: "3 Months", description: "Coughing and shortness of breath decrease.", icon: Award },
  { days: 365, name: "1 Year", description: "You reached the peak! Your risk of heart disease is cut in half.", icon: Mountain }
];
