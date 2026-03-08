export const studentProfile = {
  name: "Arjun Sharma",
  cgpa: 8.42,
  placementReadiness: 78,
  streak: 12,
  xp: 2450,
  badges: 7,
  semester: 6,
  branch: "Computer Science & Engineering",
};

export const todayTasks = [
  { id: 1, title: "Complete DSA: Binary Trees", done: false, priority: "high" as const },
  { id: 2, title: "Submit DBMS Assignment", done: true, priority: "medium" as const },
  { id: 3, title: "Practice Aptitude - Percentages", done: false, priority: "low" as const },
  { id: 4, title: "Review OS Notes - Deadlocks", done: false, priority: "high" as const },
];

export const upcomingDeadlines = [
  { id: 1, title: "ML Project Report", date: "Mar 12", subject: "Machine Learning" },
  { id: 2, title: "Web Dev Assignment", date: "Mar 14", subject: "Full Stack" },
  { id: 3, title: "DBMS Lab Viva", date: "Mar 15", subject: "DBMS" },
];

export const attendanceData = [
  { subject: "Data Structures", attended: 32, total: 38, percentage: 84 },
  { subject: "DBMS", attended: 28, total: 36, percentage: 78 },
  { subject: "Operating Systems", attended: 25, total: 35, percentage: 71 },
  { subject: "Machine Learning", attended: 30, total: 34, percentage: 88 },
  { subject: "Computer Networks", attended: 22, total: 32, percentage: 69 },
  { subject: "Software Engineering", attended: 33, total: 36, percentage: 92 },
];

export const weeklyTimetable = [
  { day: "Mon", slots: ["DSA", "DBMS", "—", "ML", "Lab"] },
  { day: "Tue", slots: ["OS", "CN", "SE", "—", "DSA"] },
  { day: "Wed", slots: ["ML", "DSA", "DBMS", "OS", "—"] },
  { day: "Thu", slots: ["CN", "SE", "—", "DSA", "Lab"] },
  { day: "Fri", slots: ["DBMS", "ML", "OS", "CN", "SE"] },
  { day: "Sat", slots: ["Lab", "—", "—", "—", "—"] },
];

export const studyHoursData = [
  { day: "Mon", hours: 4.5 },
  { day: "Tue", hours: 3.2 },
  { day: "Wed", hours: 5.1 },
  { day: "Thu", hours: 2.8 },
  { day: "Fri", hours: 4.0 },
  { day: "Sat", hours: 6.5 },
  { day: "Sun", hours: 3.0 },
];

export const semesterGrades = [
  { semester: 1, gpa: 7.8, subjects: [{ name: "Math I", credits: 4, grade: "A" }, { name: "Physics", credits: 3, grade: "B+" }, { name: "Chemistry", credits: 3, grade: "A-" }, { name: "English", credits: 2, grade: "A" }] },
  { semester: 2, gpa: 8.1, subjects: [{ name: "Math II", credits: 4, grade: "A" }, { name: "Electronics", credits: 3, grade: "B+" }, { name: "Programming", credits: 4, grade: "A+" }, { name: "Env Science", credits: 2, grade: "B" }] },
  { semester: 3, gpa: 8.4, subjects: [{ name: "DSA", credits: 4, grade: "A+" }, { name: "Discrete Math", credits: 3, grade: "A" }, { name: "OOP", credits: 4, grade: "A" }, { name: "DLD", credits: 3, grade: "B+" }] },
  { semester: 4, gpa: 8.6, subjects: [{ name: "DBMS", credits: 4, grade: "A" }, { name: "OS", credits: 4, grade: "A+" }, { name: "TOC", credits: 3, grade: "B+" }, { name: "Stats", credits: 3, grade: "A" }] },
  { semester: 5, gpa: 8.9, subjects: [{ name: "CN", credits: 4, grade: "A+" }, { name: "ML", credits: 4, grade: "A" }, { name: "SE", credits: 3, grade: "A" }, { name: "Compiler", credits: 3, grade: "A-" }] },
];

export const skills = [
  { name: "Python", level: 85 },
  { name: "React", level: 78 },
  { name: "SQL", level: 72 },
  { name: "Java", level: 80 },
  { name: "C++", level: 88 },
  { name: "Git", level: 75 },
  { name: "Docker", level: 45 },
  { name: "AWS", level: 30 },
];

export const dsaProgress = { easy: 120, medium: 85, hard: 22, total: 227 };

export const certifications = [
  { name: "AWS Cloud Practitioner", platform: "AWS", date: "Jan 2026", link: "#" },
  { name: "React Developer Certificate", platform: "Meta", date: "Nov 2025", link: "#" },
  { name: "Python for Data Science", platform: "Coursera", date: "Aug 2025", link: "#" },
  { name: "SQL Advanced", platform: "HackerRank", date: "Jun 2025", link: "#" },
];

export const projects = [
  { name: "Campus Connect", description: "Social platform for college students", tech: ["React", "Node.js", "MongoDB"], link: "#" },
  { name: "Smart Attendance", description: "Face recognition based attendance system", tech: ["Python", "OpenCV", "Flask"], link: "#" },
  { name: "Budget Tracker", description: "Personal finance management app", tech: ["React Native", "Firebase"], link: "#" },
];

export const aptitudeQuestions = [
  { id: 1, question: "A train 150m long passes a pole in 15 seconds. What is its speed?", options: ["36 km/h", "40 km/h", "32 km/h", "28 km/h"], answer: 0 },
  { id: 2, question: "If 6 men can do a piece of work in 12 days, how many men are needed to do it in 8 days?", options: ["6", "8", "9", "12"], answer: 2 },
  { id: 3, question: "What is 15% of 240?", options: ["32", "36", "34", "38"], answer: 1 },
  { id: 4, question: "Find the next number: 2, 6, 12, 20, 30, ?", options: ["40", "42", "38", "44"], answer: 1 },
  { id: 5, question: "A can do a work in 10 days, B in 15 days. Together?", options: ["5 days", "6 days", "7 days", "8 days"], answer: 1 },
  { id: 6, question: "Simple interest on ₹5000 at 8% for 3 years?", options: ["₹1200", "₹1000", "₹1400", "₹800"], answer: 0 },
  { id: 7, question: "If APPLE is coded as ELPPA, how is MANGO coded?", options: ["OGNAM", "ONAGM", "OGANM", "NAMGO"], answer: 0 },
  { id: 8, question: "Average of first 10 natural numbers?", options: ["5", "5.5", "6", "4.5"], answer: 1 },
  { id: 9, question: "Ratio of 45 minutes to 1 hour?", options: ["3:4", "4:3", "1:2", "2:3"], answer: 0 },
  { id: 10, question: "A circle has radius 7cm. Find its area.", options: ["154 cm²", "148 cm²", "156 cm²", "144 cm²"], answer: 0 },
];

export const hrQuestions = [
  { question: "Tell me about yourself.", answer: "I am a final year B.Tech CSE student passionate about software development. I have strong foundations in DSA, web development, and have worked on 3 major projects. I actively participate in hackathons and contribute to open source." },
  { question: "Why should we hire you?", answer: "I bring a combination of strong technical skills, problem-solving ability, and a collaborative mindset. My project experience demonstrates my ability to deliver end-to-end solutions, and my consistent academic performance reflects my dedication." },
  { question: "What are your strengths?", answer: "My key strengths include analytical thinking, adaptability, and strong communication skills. I excel at breaking down complex problems and working under tight deadlines." },
  { question: "Where do you see yourself in 5 years?", answer: "I see myself as a senior software engineer leading a team, contributing to impactful products, and continuously learning emerging technologies." },
  { question: "Tell about a challenging situation you faced.", answer: "During our college hackathon, our team's main feature broke hours before submission. I led the debugging effort, identified the issue, and we delivered a working product that won 2nd place." },
];

export const resumeChecklist = [
  { id: 1, text: "Contact info at the top (Name, Email, Phone, LinkedIn, GitHub)", checked: true },
  { id: 2, text: "Professional summary in 2-3 lines", checked: true },
  { id: 3, text: "Education section with CGPA", checked: true },
  { id: 4, text: "Skills section with categorized technical skills", checked: false },
  { id: 5, text: "Projects with tech stack and impact metrics", checked: false },
  { id: 6, text: "Work experience / internships", checked: true },
  { id: 7, text: "Certifications with verification links", checked: false },
  { id: 8, text: "ATS-friendly format (no tables, images, or headers)", checked: true },
  { id: 9, text: "Consistent formatting and font usage", checked: true },
  { id: 10, text: "Single page with proper margins", checked: false },
];

export const mockInterviews = [
  { date: "Feb 28, 2026", company: "TCS", feedback: "Good communication, improve DSA speed", result: "Passed" as const },
  { date: "Feb 20, 2026", company: "Infosys", feedback: "Strong fundamentals, work on system design", result: "Passed" as const },
  { date: "Feb 10, 2026", company: "Wipro", feedback: "Need to improve aptitude speed", result: "Failed" as const },
  { date: "Jan 28, 2026", company: "Cognizant", feedback: "Excellent HR round, good project knowledge", result: "Passed" as const },
];

export const campusDrives = [
  { id: 1, company: "Google", role: "SDE Intern", ctc: "₹45 LPA", date: "Mar 20, 2026", cgpaCutoff: 8.0, status: "upcoming" as const },
  { id: 2, company: "Microsoft", role: "Software Engineer", ctc: "₹42 LPA", date: "Mar 25, 2026", cgpaCutoff: 7.5, status: "upcoming" as const },
  { id: 3, company: "Amazon", role: "SDE I", ctc: "₹36 LPA", date: "Mar 10, 2026", cgpaCutoff: 7.0, status: "applied" as const },
  { id: 4, company: "TCS Digital", role: "Digital Engineer", ctc: "₹7 LPA", date: "Feb 28, 2026", cgpaCutoff: 6.0, status: "shortlisted" as const },
  { id: 5, company: "Infosys", role: "Systems Engineer", ctc: "₹6.5 LPA", date: "Feb 15, 2026", cgpaCutoff: 6.0, status: "placed" as const },
  { id: 6, company: "Wipro", role: "Project Engineer", ctc: "₹5.5 LPA", date: "Feb 10, 2026", cgpaCutoff: 6.0, status: "applied" as const },
  { id: 7, company: "Deloitte", role: "Analyst", ctc: "₹12 LPA", date: "Mar 18, 2026", cgpaCutoff: 7.0, status: "upcoming" as const },
  { id: 8, company: "Accenture", role: "Associate SE", ctc: "₹4.5 LPA", date: "Jan 20, 2026", cgpaCutoff: 5.5, status: "placed" as const },
];

export const communityPosts = [
  { id: 1, author: "Priya M.", avatar: "PM", content: "Just cracked TCS Digital! 🎉 Focus on coding rounds and practice at least 200 DSA problems.", likes: 42, comments: 8, time: "2h ago" },
  { id: 2, author: "Rahul K.", avatar: "RK", content: "Anyone has notes for Computer Networks? The Kurose & Ross book is too heavy for quick revision.", likes: 15, comments: 12, time: "5h ago" },
  { id: 3, author: "Sneha R.", avatar: "SR", content: "Mock interview tip: Always ask clarifying questions before jumping to the solution. Shows maturity.", likes: 38, comments: 5, time: "1d ago" },
  { id: 4, author: "Vikram S.", avatar: "VS", content: "System Design resources thread 🧵: Start with Gaurav Sen's YouTube channel, then move to DDIA book.", likes: 67, comments: 21, time: "1d ago" },
];

export const studyGroups = [
  { name: "DSA Warriors", subject: "Data Structures", members: 24, icon: "⚔️" },
  { name: "ML Enthusiasts", subject: "Machine Learning", members: 18, icon: "🤖" },
  { name: "Web Dev Club", subject: "Full Stack", members: 31, icon: "🌐" },
  { name: "Placement Prep", subject: "Interview Prep", members: 45, icon: "🎯" },
];

export const seniorTips = [
  { name: "Ananya (Google)", tip: "Start DSA in 3rd year. Don't just solve — understand patterns. 200 quality problems > 500 random ones.", avatar: "AG" },
  { name: "Karthik (Amazon)", tip: "Projects matter more than CGPA after 7.0. Build 2-3 solid projects and explain them well.", avatar: "KA" },
  { name: "Meera (Microsoft)", tip: "Soft skills are underrated. Practice explaining your thought process out loud while solving problems.", avatar: "MM" },
  { name: "Rohan (Flipkart)", tip: "Don't ignore aptitude. Many companies filter in the first round itself. Practice daily for 30 min.", avatar: "RF" },
];
