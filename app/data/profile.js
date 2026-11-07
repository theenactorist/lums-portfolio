export const profile = {
  name: 'Olumide Olusesi',
  alternateName: 'Lums',
  role: 'Product Design Engineer',
  seniorRole: 'Senior Product Designer',
  city: 'Toronto',
  country: 'Canada',
};

export const profileLocation = `${profile.city}, ${profile.country}`;

// Product design career start (Olumide, 6 Nov 2026). Agency work from 2017 is listed separately.
export const careerStart = { year: 2019, month: 11 };

// Completed years since careerStart, so the number updates whenever the site builds.
export function yearsOfExperience(now = new Date()) {
  const years = now.getFullYear() - careerStart.year;
  return now.getMonth() + 1 < careerStart.month ? years - 1 : years;
}

// First About paragraph on Home (Olumide approved, 6 Nov 2026).
export const homeAboutLead = `I’ve spent ${yearsOfExperience()} years designing at every size. I was Shiga’s founding designer, taking its first product from idea to funding. At Branch and Carbon, I designed apps used by millions (50M+ downloads at Branch, 4M+ customers at Carbon). I’ve also designed for people with very particular jobs, like delivery drivers and the developers wiring up a payments SDK. Whatever the size, I care about the full product, not isolated screens: how it works for users, how it supports the business, and how well it translates into something engineering can actually ship.`;
