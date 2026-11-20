/*
 * Certificate catalog
 *
 * To add a certificate:
 * 1. Put its badge image in public/assets/certifications/.
 * 2. Add one object below. The image path must start with /public/assets/.
 * 3. Use either issued or expires (or both). Leave a date out if it does not apply.
 */
window.PORTFOLIO_CERTIFICATIONS = [
  { title: 'Cisco Certified Support Technician Networking (CCST Networking)', issuer: 'Cisco', image: '/public/assets/certifications/ccst-networking.png', issued: 'Oct 2026' },
  { title: 'Ethical Hacker', issuer: 'Cisco', image: '/public/assets/certifications/ethical-hacker.webp', issued: 'Jul 12, 2026' },
  { title: 'Introduction to Cybersecurity', issuer: 'Cisco', image: '/public/assets/certifications/introduction-to-cybersecurity.webp', issued: 'Feb 8, 2026' },
  { title: 'Junior Cybersecurity Analyst Career Path', issuer: 'Cisco', image: '/public/assets/certifications/junior-cybersecurity-analyst-career-path.webp', issued: 'Mar 24, 2026' },
  { title: 'Network Defense', issuer: 'Cisco', image: '/public/assets/certifications/network-defense.webp', issued: 'Mar 24, 2026' },
  { title: 'IT Specialist — Databases', issuer: 'Certiport', image: '/public/assets/certifications/it-specialist-databases.webp', expires: 'Nov 24, 2030' },
  { title: 'IT Specialist — Java', issuer: 'Certiport', image: '/public/assets/certifications/it-specialist-java.webp', expires: 'Nov 25, 2030' },
  { title: 'IT Specialist — Python', issuer: 'Certiport', image: '/public/assets/certifications/it-specialist-python.webp', expires: 'Mar 23, 2031' }
];
