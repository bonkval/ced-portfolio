/*
 * Certificate catalog
 *
 * To add a certificate:
 * 1. Put its badge image in public/assets/certifications/.
 * 2. Add one object below. The image path must start with /public/assets/.
 * 3. Use either issued or expires (or both). Leave a date out if it does not apply.
 */
window.PORTFOLIO_CERTIFICATIONS = [
  { title: 'Ethical Hacker', issuer: 'Cisco', image: '/public/assets/certifications/ethical-hacker.png', issued: 'Jul 12, 2026' },
  { title: 'Introduction to Cybersecurity', issuer: 'Cisco', image: '/public/assets/certifications/introduction-to-cybersecurity.png', issued: 'Feb 8, 2026' },
  { title: 'Junior Cybersecurity Analyst Career Path', issuer: 'Cisco', image: '/public/assets/certifications/junior-cybersecurity-analyst-career-path.png', issued: 'Mar 24, 2026' },
  { title: 'Network Defense', issuer: 'Cisco', image: '/public/assets/certifications/network-defense.png', issued: 'Mar 24, 2026' },
  { title: 'IT Specialist — Databases', issuer: 'Certiport', image: '/public/assets/certifications/it-specialist-databases.png', expires: 'Nov 24, 2030' },
  { title: 'IT Specialist — Java', issuer: 'Certiport', image: '/public/assets/certifications/it-specialist-java.png', expires: 'Nov 25, 2030' },
  { title: 'IT Specialist — Python', issuer: 'Certiport', image: '/public/assets/certifications/it-specialist-python.png', expires: 'Mar 23, 2031' }
];
