export const NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/jobs", label: "Find jobs" },
  { href: "/employers", label: "For employers" },
  { href: "/#how-it-works", label: "How it works" },
  { href: "/#faq", label: "FAQ" },
];

export const JOBS = [
  { id: 1, title: "Senior Backend Engineer", company: "Finlytic", location: "Pune", type: "Full-time", role: "Engineering", salary: "₹28–40 LPA", posted: "2 days ago" },
  { id: 2, title: "Product Designer", company: "Kiraya Homes", location: "Remote", type: "Full-time", role: "Design", salary: "₹18–26 LPA", posted: "1 day ago" },
  { id: 3, title: "Inside Sales Executive", company: "CloudKart", location: "Mumbai", type: "Full-time", role: "Sales", salary: "₹6–9 LPA + incentives", posted: "3 days ago" },
  { id: 4, title: "Frontend Developer Intern", company: "Brightpath Labs", location: "Nashik", type: "Internship", role: "Engineering", salary: "₹20,000 / month", posted: "Today" },
  { id: 5, title: "Performance Marketing Manager", company: "Glowmint", location: "Bengaluru", type: "Full-time", role: "Marketing", salary: "₹16–22 LPA", posted: "4 days ago" },
  { id: 6, title: "Customer Success Associate", company: "Ledgerly", location: "Remote", type: "Contract", role: "Operations", salary: "₹50,000 / month", posted: "5 days ago" },
  { id: 7, title: "Data Analyst", company: "Orbit Logistics", location: "Pune", type: "Full-time", role: "Data", salary: "₹10–15 LPA", posted: "1 week ago" },
  { id: 8, title: "Content Writer", company: "Trailhead Media", location: "Remote", type: "Part-time", role: "Marketing", salary: "₹25,000 / month", posted: "2 days ago" },
  { id: 9, title: "DevOps Engineer", company: "Finlytic", location: "Bengaluru", type: "Full-time", role: "Engineering", salary: "₹24–34 LPA", posted: "6 days ago" },
  { id: 10, title: "HR Business Partner", company: "Nandi Foods", location: "Mumbai", type: "Full-time", role: "Operations", salary: "₹14–19 LPA", posted: "3 days ago" },
  { id: 11, title: "UX Research Contractor", company: "Kiraya Homes", location: "Remote", type: "Contract", role: "Design", salary: "₹90,000 / month", posted: "1 week ago" },
  { id: 12, title: "Business Development Manager", company: "CloudKart", location: "Nashik", type: "Full-time", role: "Sales", salary: "₹12–18 LPA", posted: "Today" },
];

export const ROLES = ["Engineering", "Design", "Sales", "Marketing", "Operations", "Data"];
export const LOCATIONS = ["Remote", "Pune", "Mumbai", "Bengaluru", "Nashik"];
export const TYPES = ["Full-time", "Part-time", "Contract", "Internship"];

export const EMPLOYERS = ["Finlytic", "Kiraya Homes", "CloudKart", "Glowmint", "Ledgerly", "Orbit Logistics"];

export const STEPS = [
  { title: "Create your profile or job post", text: "Job seekers upload a résumé in two minutes. Employers describe the role, must-have skills and salary band." },
  { title: "Get matched on skills, not keywords", text: "We rank candidates and roles by skills, experience and location, so you see the best five first." },
  { title: "Talk, interview, and close", text: "Chat in-app, book interviews on a shared calendar and send offers without leaving Surhires." },
];

export const TESTIMONIALS = [
  { name: "Ananya Mehta", title: "HR Lead, Finlytic", avatar: "/avatar-am.svg", quote: "We filled a senior backend role in 11 days. The shortlist had four people we actually wanted to interview." },
  { name: "Rohan Kulkarni", title: "Product Designer, hired via Surhires", avatar: "/avatar-rk.svg", quote: "I applied to six roles and heard back from five. The salary range on every listing saved me weeks of guessing." },
  { name: "Sneha Deshmukh", title: "Founder, Glowmint", avatar: "/avatar-sd.svg", quote: "Posting took ten minutes, and the screening questions filtered out the noise before it reached my inbox." },
];

export const FAQS = [
  { q: "Is Surhires free for job seekers?", a: "Yes. Creating a profile, applying and messaging employers is free, and always will be." },
  { q: "How much does it cost to post a job?", a: "Your first job post is free for 30 days. After that, plans start at ₹2,999 per month. See the full breakdown on the employers page." },
  { q: "How are candidates matched to roles?", a: "We compare the skills, experience and location in a profile with each role's requirements, then rank the closest matches first." },
  { q: "Can I hire remotely or across cities?", a: "Yes. Every job can be tagged remote, hybrid or on-site, and candidates can filter by location." },
  { q: "How do I remove a job or my profile?", a: "Open your dashboard, choose the listing or profile and select Delete. It disappears from search within an hour." },
];

export const PLANS = [
  { name: "Starter", price: "₹2,999", cadence: "per month", blurb: "For small teams making an occasional hire.", features: ["3 active job posts", "Basic applicant tracking", "Email support"], cta: "Start with Starter" },
  { name: "Growth", price: "₹7,999", cadence: "per month", blurb: "For growing teams hiring every month.", features: ["15 active job posts", "Skill-based candidate matching", "Interview scheduling", "Priority support"], cta: "Choose Growth", featured: true },
  { name: "Scale", price: "Custom", cadence: "annual contract", blurb: "For companies hiring at volume.", features: ["Unlimited job posts", "Dedicated hiring manager", "ATS integrations", "Team roles and reports"], cta: "Talk to sales" },
];

export const COMPARE = [
  ["Active job posts", "3", "15", "Unlimited"],
  ["Candidate matching", "Basic", "Skill-based", "Skill-based + sourcing"],
  ["Interview scheduling", "—", "Included", "Included"],
  ["Team members", "1", "5", "Unlimited"],
  ["Support", "Email", "Priority", "Dedicated manager"],
];
