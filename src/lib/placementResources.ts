export interface Resource {
  id: string;
  title: string;
  description: string;
  url: string;
  platform: string;
  category: string;
  free: boolean;
}

export interface CompanyGuide {
  company: string;
  cgpaCutoff: string;
  backlogs: string;
  rounds: string;
  focus: string;
  resources: string;
}

export interface Roadmap {
  branch: string;
  steps: { year: string; description: string }[];
}

export interface StudyPlan {
  title: string;
  duration: string;
  weeks: { label: string; description: string }[];
}

export interface AppRecommendation {
  name: string;
  description: string;
}

export const resources: Resource[] = [
  // DSA & Coding
  { id: "leetcode", title: "LeetCode", description: "2500+ problems, best for placement DSA prep", url: "https://leetcode.com", platform: "LeetCode", category: "DSA", free: true },
  { id: "gfg", title: "GeeksforGeeks", description: "DSA tutorials + company-wise questions bank", url: "https://geeksforgeeks.org", platform: "GFG", category: "DSA", free: true },
  { id: "striver", title: "Striver A2Z DSA Sheet", description: "Most followed DSA sheet, 455 problems step by step", url: "https://takeuforward.org", platform: "TakeUForward", category: "DSA", free: true },
  { id: "neetcode", title: "NeetCode", description: "Curated LeetCode problems with video solutions", url: "https://neetcode.io", platform: "NeetCode", category: "DSA", free: true },
  { id: "interviewbit", title: "InterviewBit", description: "Company-specific DSA practice + mock tests", url: "https://interviewbit.com", platform: "InterviewBit", category: "DSA", free: true },
  { id: "codechef", title: "CodeChef", description: "Competitive programming + weekly contests", url: "https://codechef.com", platform: "CodeChef", category: "DSA", free: true },
  { id: "hackerrank", title: "HackerRank", description: "Practice + get skill certificates companies recognize", url: "https://hackerrank.com", platform: "HackerRank", category: "DSA", free: true },
  { id: "codeforces", title: "Codeforces", description: "Advanced competitive programming platform", url: "https://codeforces.com", platform: "Codeforces", category: "DSA", free: true },

  // Aptitude
  { id: "indiabix", title: "IndiaBIX", description: "Best for Quant, Verbal, Logical Reasoning practice", url: "https://indiabix.com", platform: "IndiaBIX", category: "Aptitude", free: true },
  { id: "prepinsta", title: "PrepInsta", description: "Company-specific aptitude papers TCS Infosys Wipro", url: "https://prepinsta.com", platform: "PrepInsta", category: "Aptitude", free: true },
  { id: "freshersworld", title: "Freshersworld", description: "Aptitude tests + previous placement papers", url: "https://freshersworld.com", platform: "Freshersworld", category: "Aptitude", free: true },
  { id: "tcsion", title: "TCS iON Practice", description: "Official TCS NQT mock tests and practice papers", url: "https://learning.tcsionhub.in", platform: "TCS", category: "Aptitude", free: true },
  { id: "mathstricks", title: "MathsTricks PDF", description: "Speed math shortcuts for aptitude rounds", url: "https://google.com/search?q=aptitude+math+tricks+pdf", platform: "PDF", category: "Aptitude", free: true },
  { id: "testbook", title: "Testbook", description: "Mock tests for all top company aptitude patterns", url: "https://testbook.com", platform: "Testbook", category: "Aptitude", free: true },

  // Free Courses
  { id: "cs50", title: "CS50 Harvard", description: "World's best intro to Computer Science by Harvard", url: "https://cs50.harvard.edu", platform: "Harvard", category: "Free Courses", free: true },
  { id: "nptel", title: "NPTEL", description: "IIT professor courses with government certificates", url: "https://nptel.ac.in", platform: "NPTEL", category: "Free Courses", free: true },
  { id: "freecodecamp", title: "freeCodeCamp", description: "Web dev, Python, Data Science full courses", url: "https://freecodecamp.org", platform: "freeCodeCamp", category: "Free Courses", free: true },
  { id: "coursera", title: "Coursera", description: "Google, IBM, Meta certifications free to audit", url: "https://coursera.org", platform: "Coursera", category: "Free Courses", free: true },
  { id: "odinproject", title: "The Odin Project", description: "Complete full stack web development course", url: "https://theodinproject.com", platform: "Odin", category: "Free Courses", free: true },
  { id: "kaggle", title: "Kaggle Learn", description: "Data Science and ML micro-courses with certificates", url: "https://kaggle.com/learn", platform: "Kaggle", category: "Free Courses", free: true },
  { id: "aws", title: "AWS Free Tier", description: "Hands-on cloud computing practice free for 1 year", url: "https://aws.amazon.com/free", platform: "AWS", category: "Free Courses", free: true },
  { id: "w3schools", title: "W3Schools", description: "Quick reference and practice for all languages", url: "https://w3schools.com", platform: "W3Schools", category: "Free Courses", free: true },
  { id: "apnacollege", title: "Apna College YouTube", description: "Hindi DSA + Java + Web Dev full placement series", url: "https://youtube.com/@ApnaCollegeOfficial", platform: "YouTube", category: "Free Courses", free: true },
  { id: "codewithharry", title: "CodeWithHarry YouTube", description: "Hindi programming tutorials for all levels", url: "https://youtube.com/@CodeWithHarry", platform: "YouTube", category: "Free Courses", free: true },

  // Core Subjects
  { id: "dbms", title: "DBMS — GeeksforGeeks", description: "Complete database concepts asked in interviews", url: "https://geeksforgeeks.org/dbms", platform: "GFG", category: "Core Subjects", free: true },
  { id: "os", title: "Operating Systems — GFG", description: "OS concepts + interview questions with answers", url: "https://geeksforgeeks.org/operating-systems", platform: "GFG", category: "Core Subjects", free: true },
  { id: "cn", title: "Computer Networks — GFG", description: "CN topics asked in TCS Infosys Wipro interviews", url: "https://geeksforgeeks.org/computer-network-tutorials", platform: "GFG", category: "Core Subjects", free: true },
  { id: "oops", title: "OOPs Concepts — GFG", description: "Java and C++ OOPs with real interview examples", url: "https://geeksforgeeks.org/object-oriented-programming-oops-concept-in-java", platform: "GFG", category: "Core Subjects", free: true },
  { id: "systemdesign", title: "System Design Primer", description: "Most starred GitHub repo for system design prep", url: "https://github.com/donnemartin/system-design-primer", platform: "GitHub", category: "Core Subjects", free: true },
  { id: "sqlzoo", title: "SQL Practice — SQLZoo", description: "Interactive SQL practice used by top companies", url: "https://sqlzoo.net", platform: "SQLZoo", category: "Core Subjects", free: true },

  // Resume
  { id: "overleaf", title: "Overleaf", description: "Professional LaTeX resume templates recruiters love", url: "https://overleaf.com", platform: "Overleaf", category: "Resume", free: true },
  { id: "resumeworded", title: "Resume Worded", description: "AI-powered resume scorer with detailed feedback", url: "https://resumeworded.com", platform: "ResumeWorded", category: "Resume", free: true },
  { id: "jobscan", title: "JobScan", description: "ATS keyword checker to beat resume scanners", url: "https://jobscan.co", platform: "JobScan", category: "Resume", free: true },
  { id: "linkedin-guide", title: "LinkedIn Optimization Guide", description: "Step-by-step tips to get recruiter attention", url: "https://linkedin.com", platform: "LinkedIn", category: "Resume", free: true },
  { id: "github-readme", title: "GitHub Profile README Guide", description: "Make your GitHub profile stand out to companies", url: "https://docs.github.com/en/account-and-profile/setting-up-and-managing-your-github-profile", platform: "GitHub", category: "Resume", free: true },
  { id: "novoresume", title: "Novoresume", description: "Clean ATS-friendly resume builder with templates", url: "https://novoresume.com", platform: "Novoresume", category: "Resume", free: true },

  // Interview & Soft Skills
  { id: "glassdoor", title: "Glassdoor", description: "Real interview experiences from placed students", url: "https://glassdoor.com", platform: "Glassdoor", category: "Soft Skills", free: true },
  { id: "ambitionbox", title: "AmbitionBox", description: "Indian company reviews + actual interview questions", url: "https://ambitionbox.com", platform: "AmbitionBox", category: "Soft Skills", free: true },
  { id: "interviewbit-prep", title: "InterviewBit Interview Prep", description: "HR + Technical questions company-wise", url: "https://interviewbit.com/interview-questions", platform: "InterviewBit", category: "Soft Skills", free: true },
  { id: "joshtalks", title: "Josh Talks YouTube", description: "Communication skills + motivation for placements", url: "https://youtube.com/@JoshTalksLive", platform: "YouTube", category: "Soft Skills", free: true },
  { id: "gdtopics", title: "Top 50 GD Topics PDF", description: "Group Discussion topics asked in campus drives", url: "https://google.com/search?q=top+50+group+discussion+topics+placement", platform: "PDF", category: "Soft Skills", free: true },
  { id: "toastmasters", title: "Toastmasters Guide", description: "Public speaking tips for interviews and GDs", url: "https://toastmasters.org", platform: "Toastmasters", category: "Soft Skills", free: true },

  // Interview
  { id: "interview-warmup", title: "Google Interview Warmup", description: "AI-powered interview practice by Google", url: "https://grow.google/certificates/interview-warmup", platform: "Google", category: "Interview", free: true },
];

export const companyGuides: CompanyGuide[] = [
  { company: "TCS", cgpaCutoff: "6.0+", backlogs: "0 active", rounds: "Aptitude → Coding → Technical → HR", focus: "IndiaBIX aptitude, basic coding, HR questions", resources: "PrepInsta TCS papers, TCS iON mock test" },
  { company: "Infosys", cgpaCutoff: "6.5+", backlogs: "0", rounds: "Online test → Interview", focus: "Logical reasoning, verbal ability, communication", resources: "IndiaBIX, Infosys prep on PrepInsta" },
  { company: "Wipro", cgpaCutoff: "6.0+", backlogs: "0", rounds: "WILP test → Essay → HR", focus: "Aptitude + essay writing + HR questions", resources: "Wipro papers on Freshersworld" },
  { company: "Accenture", cgpaCutoff: "6.0+", backlogs: "0", rounds: "Cognitive + Technical + HR", focus: "Reasoning, communication, team fit answers", resources: "AmbitionBox Accenture reviews" },
  { company: "Cognizant", cgpaCutoff: "6.0+", backlogs: "0", rounds: "GAME CHANGING test + Interview", focus: "Attention to detail, logical patterns", resources: "Cognizant papers on PrepInsta" },
  { company: "Capgemini", cgpaCutoff: "6.0+", backlogs: "0", rounds: "Aptitude + Essay + Technical + HR", focus: "Pseudo code questions, essay, communication", resources: "Capgemini prep on PrepInsta" },
  { company: "HCL", cgpaCutoff: "6.0+", backlogs: "0", rounds: "Aptitude + Technical + HR", focus: "Basic coding, aptitude, technical concepts", resources: "HCL papers on Freshersworld" },
  { company: "Zoho", cgpaCutoff: "Any", backlogs: "Any", rounds: "Written test → Technical rounds (4-5) → HR", focus: "Strong coding skills, problem solving, projects", resources: "GeeksforGeeks, LeetCode medium problems" },
  { company: "Amazon", cgpaCutoff: "7.0+", backlogs: "0", rounds: "Online Assessment → Technical (2-3) → Bar Raiser", focus: "LeetCode medium-hard, Leadership principles", resources: "Striver sheet, Amazon LP questions" },
  { company: "Microsoft", cgpaCutoff: "7.5+", backlogs: "0", rounds: "Coding test → 4-5 Technical rounds", focus: "DSA hard level, system design, CS fundamentals", resources: "CTCI book, LeetCode Microsoft tag" },
  { company: "Google", cgpaCutoff: "8.0+", backlogs: "0", rounds: "Phone screen → 4-5 Onsite rounds", focus: "Advanced DSA, system design, behavioral", resources: "LeetCode hard, Cracking the Coding Interview" },
];

export const roadmaps: Roadmap[] = [
  {
    branch: "CSE / IT",
    steps: [
      { year: "Year 1", description: "Learn C/C++/Python basics + Math fundamentals" },
      { year: "Year 2", description: "DSA + DBMS + OS + OOPs + first mini projects" },
      { year: "Year 3", description: "Web/ML/Cloud skills + internship + GitHub profile" },
      { year: "Year 4", description: "100-day DSA sprint + aptitude + mock interviews + apply" },
    ],
  },
  {
    branch: "ECE",
    steps: [
      { year: "Year 1-2", description: "Core subjects + C programming + digital circuits" },
      { year: "Year 2-3", description: "Embedded systems + Arduino/Raspberry Pi projects" },
      { year: "Year 3", description: "Python/MATLAB + VLSI basics + NPTEL certifications" },
      { year: "Year 4", description: "DSA basics + aptitude + core company prep OR IT company prep" },
    ],
  },
  {
    branch: "Mechanical",
    steps: [
      { year: "Year 1-2", description: "Core subjects + AutoCAD + SolidWorks basics" },
      { year: "Year 2-3", description: "FEA/CFD tools + internship in manufacturing" },
      { year: "Year 3", description: "Six Sigma + CATIA + industry certifications" },
      { year: "Year 4", description: "Core company prep + PSU exams + GATE prep option" },
    ],
  },
  {
    branch: "MBA / BBA",
    steps: [
      { year: "Year 1", description: "Excel + PowerPoint + communication skills" },
      { year: "Year 2", description: "SQL basics + Google Analytics + HubSpot certification" },
      { year: "Year 3", description: "Case study practice + GD prep + HR interview skills" },
      { year: "Final", description: "Resume polish + LinkedIn + campus drive applications" },
    ],
  },
];

export const studyPlans: StudyPlan[] = [
  {
    title: "30-Day Beginner Plan",
    duration: "30 days",
    weeks: [
      { label: "Week 1", description: "Arrays + Strings in DSA + Aptitude percentages" },
      { label: "Week 2", description: "Linked Lists + Time/Work aptitude problems" },
      { label: "Week 3", description: "Resume building + LinkedIn profile setup" },
      { label: "Week 4", description: "Mock aptitude test + 1 mock HR interview" },
    ],
  },
  {
    title: "60-Day Intermediate Plan",
    duration: "60 days",
    weeks: [
      { label: "Month 1", description: "Striver SDE sheet Part 1 + daily aptitude + core subjects" },
      { label: "Month 2", description: "2 projects on GitHub + system design intro + company research" },
    ],
  },
  {
    title: "90-Day Full Placement Plan",
    duration: "90 days",
    weeks: [
      { label: "Month 1", description: "DSA foundations + aptitude daily + resume ready" },
      { label: "Month 2", description: "Advanced DSA + core subjects revision + mock interviews" },
      { label: "Month 3", description: "Company-specific prep + 20 applications + HR practice" },
    ],
  },
];

export const mustHaveApps: AppRecommendation[] = [
  { name: "LinkedIn", description: "Networking + job alerts from recruiters" },
  { name: "LeetCode App", description: "Daily DSA practice on mobile" },
  { name: "Unstop", description: "Competitions + hiring challenges" },
  { name: "Internshala", description: "Internships + training courses" },
  { name: "Naukri", description: "Job applications + resume visibility" },
  { name: "Notion", description: "Study planning + notes organization" },
  { name: "AnkiApp", description: "Flashcards for quick revision" },
  { name: "Duolingo", description: "English communication improvement" },
];

export const allCategories = ["All", "DSA", "Aptitude", "Core Subjects", "Soft Skills", "Resume", "Interview", "Free Courses", "Roadmaps"];
