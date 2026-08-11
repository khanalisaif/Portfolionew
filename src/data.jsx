// ==========================================
// PORTFOLIO DATA - Edit this file to update your portfolio
// ==========================================

export const profileData = {
  name: "Mustafa Hasan",
  nameParts: { first: "Mustafa", last: " Hasan" },
  titles: ["Android Developer", "UI/UX Designer", "Freelancer"],
  tagline: "I build beautiful Android applications with modern UI, scalable architecture and seamless user experiences.",
  resumeUrl: "/Saif-Ali-Khan-Resume.pdf",
  hireEmail: "mustafa@example.com",
  avatarUrl: "/Nikhil.webp.png",
  socialLinks: {
    linkedin: "#",
    github: "#",
    email: "mailto:dummy@example.com",
    whatsapp: "#"
  }
};

// Orbit Cards - shown in circle around profile photo
export const orbitCards = [
  {
    id: "certificates",
    label: "Certificates",
    sublabel: "View my certifications",
    iconBg: "from-blue-400 to-blue-600",
    icon: "certificate",
    position: "top-left",
    items: ["Google Certified", "Meta Certified", "Udemy Certificates"],
    viewAllLabel: "View all certificates",
    viewAllUrl: "/all-education",
  },
  {
    id: "networks",
    label: "Networks",
    sublabel: "Check my connections",
    iconBg: "from-cyan-400 to-cyan-600",
    icon: "network",
    position: "top-right",
    items: ["LinkedIn", "GitHub", "Twitter"],
    viewAllLabel: "View all networks",
    viewAllUrl: "/#network",
  },
  {
    id: "skills",
    label: "Skills",
    sublabel: "Explore my technical skills",
    iconBg: "from-indigo-500 to-purple-600",
    icon: "code",
    position: "mid-left",
    items: ["Kotlin", "Android", "Jetpack Compose"],
    viewAllLabel: "View all skills",
    viewAllUrl: "/all-skills",
  },
  {
    id: "achievements",
    label: "Achievements",
    sublabel: "My wins and recognitions",
    iconBg: "from-purple-500 to-pink-500",
    icon: "trophy",
    position: "mid-right",
    items: ["Top Performer 2023", "Hackathon Winner", "100+ Projects"],
    viewAllLabel: "View all achievements",
    viewAllUrl: "/all-education",
  },
  {
    id: "projects",
    label: "Projects",
    sublabel: "See my work and projects",
    iconBg: "from-violet-500 to-purple-700",
    icon: "briefcase",
    position: "bot-left",
    items: ["12 Android Apps", "4 Live Products", "2 SaaS Products"],
    viewAllLabel: "View all projects",
    viewAllUrl: "/all-projects",
  },
  {
    id: "strength",
    label: "Strength",
    sublabel: "My core strengths",
    iconBg: "from-blue-500 to-indigo-600",
    icon: "dumbbell",
    position: "bot-right",
    items: ["Problem Solving", "Team Player", "Fast Learner"],
    viewAllLabel: "View all strengths",
    viewAllUrl: "/all-skills",
  },
];

// Education Section
export const educationData = {
  sectionTitle: "Education",
  sectionSubtitle: "My academic background and achievements",
  viewAllUrl: "/all-education",
  entries: [
    {
      id: "lpu",
      universityName: "Lovely Professional University",
      location: "Punjab, India",
      universityImage: "https://images.unsplash.com/photo-1562774053-701939374585?w=600&auto=format",
      universityLogo: "https://i.pravatar.cc/60?img=5",
      degree: "Bachelor of Technology in Computer Science",
      type: "B.TECH",
      period: "2019 - 2023",
      description: "Focused on Android development, software engineering, data structures, and modern app architecture.",
      stats: [
        { label: "CGPA", value: "8.53 / 10" },
        { label: "Rank", value: "Top 10%", sub: "of batch" },
        { label: "Honors", value: "Dean's List", sub: "(2021, 2022)" },
        { label: "Activities", value: "Coding Club", sub: "Lead" },
      ],
      keyAchievements: [
        "Developed 15+ Android applications",
        "Secured 2nd position in National Hackathon 2022",
        "Research published in International Journal of Computer Applications",
      ],
      certificates: [
        { title: "Dean's List Certificate", year: "2021", image: "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=300&auto=format" },
        { title: "Hackathon Winner", year: "2022", image: "https://images.unsplash.com/photo-1569437061241-a848be43cc82?w=300&auto=format" },
        { title: "Research Publication", year: "2022", image: "https://images.unsplash.com/photo-1532153975070-2e9ab71f1b14?w=300&auto=format" },
        { title: "Academic Excellence", year: "2023", image: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=300&auto=format" },
        { title: "Android Development", year: "2023", image: "https://images.unsplash.com/photo-1607252650355-f7fd0460ccdb?w=300&auto=format" },
      ],
    },
  ],
};

// Skills Section
export const skillsData = {
  sectionTitle: "Skills & Expertise",
  sectionSubtitle: "Technologies and tools I work with",
  viewAllUrl: "/all-skills",
  technicalSkills: [
    {
      id: "kotlin",
      name: "Kotlin",
      iconUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/kotlin/kotlin-original.svg",
      description: "Modern programming language for Android development. Fully interoperable with Java.",
      level: "Primary",
      levelColor: "text-indigo-600 bg-indigo-50",
      platform: "Android",
      usedFor: "Android Apps",
      projects: "12+",
    },
    {
      id: "java",
      name: "Java",
      iconUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg",
      description: "Object-oriented programming language widely used for Android and backend.",
      level: "Proficient",
      levelColor: "text-green-600 bg-green-50",
      platform: "Android, Backend",
      usedFor: "Android Apps",
      projects: "8+",
    },
    {
      id: "jetpack",
      name: "Jetpack Compose",
      iconUrl: "https://upload.wikimedia.org/wikipedia/commons/d/d7/Android_robot.svg", // Fallback for compose
      description: "Modern Android UI toolkit for building native UI with less code.",
      level: "Proficient",
      levelColor: "text-green-600 bg-green-50",
      platform: "Android",
      usedFor: "UI Development",
      projects: "10+",
    },
    {
      id: "android",
      name: "Android Dev",
      iconUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/android/android-original.svg",
      description: "Building robust and scalable Android applications with modern architecture.",
      level: "Expert",
      levelColor: "text-blue-600 bg-blue-50",
      platform: "Android",
      usedFor: "Mobile Apps",
      projects: "15+",
    },
    {
      id: "firebase",
      name: "Firebase",
      iconUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/firebase/firebase-plain.svg",
      description: "Backend platform for authentication, database, storage, and cloud functions.",
      level: "Proficient",
      levelColor: "text-green-600 bg-green-50",
      platform: "Google Cloud",
      usedFor: "Backend Services",
      projects: "9+",
    },
    {
      id: "retrofit",
      name: "Retrofit",
      iconUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg",
      description: "Type-safe HTTP client for Android and Java to consume RESTful APIs.",
      level: "Advanced",
      levelColor: "text-orange-600 bg-orange-50",
      platform: "Android, Java",
      usedFor: "API Integration",
      projects: "11+",
    },
    {
      id: "room",
      name: "Room Database",
      iconUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/sqlite/sqlite-original.svg",
      description: "Local database for storing structured data offline in Android apps.",
      level: "Advanced",
      levelColor: "text-orange-600 bg-orange-50",
      platform: "Android",
      usedFor: "Local Storage",
      projects: "7+",
    },
    {
      id: "git",
      name: "Git & GitHub",
      iconUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg",
      description: "Version control and collaboration for managing source code efficiently.",
      level: "Expert",
      levelColor: "text-blue-600 bg-blue-50",
      platform: "Cross Platform",
      usedFor: "Version Control",
      projects: "14+",
    },
  ],
  skillsOverview: {
    total: "18+",
    label: "Technologies",
    levels: [
      { name: "Expert", count: 6, color: "#6366f1" },
      { name: "Advanced", count: 7, color: "#3b82f6" },
      { name: "Proficient", count: 4, color: "#a78bfa" },
      { name: "Learning", count: 2, color: "#e2e8f0" },
    ],
  },
  popularTools: [
    { name: "Android Studio", iconUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/androidstudio/androidstudio-original.svg" },
    { name: "VS Code", iconUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vscode/vscode-original.svg" },
    { name: "Figma", iconUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/figma/figma-original.svg" },
    { name: "Postman", iconUrl: "https://www.vectorlogo.zone/logos/getpostman/getpostman-icon.svg" },
    { name: "OkHttp", iconUrl: "https://upload.wikimedia.org/wikipedia/commons/d/d7/Android_robot.svg" }, // Fallback
    { name: "Coroutines", iconUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/kotlin/kotlin-original.svg" },
    { name: "Flow", iconUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/kotlin/kotlin-original.svg" },
    { name: "Hilt", iconUrl: "https://upload.wikimedia.org/wikipedia/commons/d/d7/Android_robot.svg" }, // Fallback
    { name: "DataStore", iconUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/sqlite/sqlite-original.svg" }, // Fallback
    { name: "Glide", iconUrl: "https://upload.wikimedia.org/wikipedia/commons/d/d7/Android_robot.svg" }, // Fallback
    { name: "Crashlytics", iconUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/firebase/firebase-plain.svg" }, // Fallback
    { name: "Jira", iconUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/jira/jira-original.svg" },
  ],
  learningNow: [
    { name: "KMM", iconUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/kotlin/kotlin-original.svg" },
    { name: "GraphQL", iconUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/graphql/graphql-plain.svg" },
    { name: "Docker", iconUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg" },
    { name: "CI / CD", iconUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg" },
    { name: "Clean Architecture", iconUrl: "https://upload.wikimedia.org/wikipedia/commons/d/d7/Android_robot.svg" },
    { name: "Dagger Hilt", iconUrl: "https://upload.wikimedia.org/wikipedia/commons/d/d7/Android_robot.svg" },
  ],
  stats: [
    { value: "20+", label: "Technologies Worked With" },
    { value: "30+", label: "Projects Completed" },
    { value: "1800+", label: "Hours Coding" },
  ],
};

// Projects Section
export const projectsData = {
  sectionTitle: "Featured Projects",
  sectionSubtitle: "Things I've built with passion and purpose",
  viewAllUrl: "/all-projects",
  featured: [
    {
      id: "digivahan",
      badge: "Current Project",
      name: "Digivahan - Vehicle Assistant",
      verified: true,
      description: "A comprehensive Android application for vehicle owners to access all important vehicle-related information and services in one place.",
      tags: ["Android", "Kotlin", "MVVM", "Retrofit", "Room", "Hilt"],
      stats: [
        { icon: "users", label: "Users", value: "50K+" },
        { icon: "download", label: "Downloads", value: "100K+" },
        { icon: "star", label: "Rating", value: "4.6" },
        { icon: "calendar", label: "Completed", value: "2024" },
      ],
      image: "https://images.unsplash.com/photo-1618761714954-0b8cd0026356?w=800&auto=format",
      liveUrl: "#",
      storeUrl: "#",
    },
    {
      id: "shopkart",
      badge: "Top Rated",
      name: "ShopKart - E-Commerce App",
      verified: true,
      description: "A full-featured e-commerce Android app with product listings, cart management, payment integration and real-time order tracking.",
      tags: ["Android", "Kotlin", "Firebase", "Stripe", "MVVM"],
      stats: [
        { icon: "users", label: "Users", value: "20K+" },
        { icon: "download", label: "Downloads", value: "35K+" },
        { icon: "star", label: "Rating", value: "4.8" },
        { icon: "calendar", label: "Completed", value: "2023" },
      ],
      image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&auto=format",
      liveUrl: "#",
      storeUrl: "#",
    },
  ],
};

// Industry Network Section
export const networkData = {
  sectionTitle: "My Industry Network",
  sectionSubtitle: "A strong network to learn, collaborate and solve problems together",
  centerLabel: "Me",
  centerSubLabel: "Android Developer",
  centerAvatar: "/Nikhil.webp.png",
  connections: [
    {
      id: "aman",
      name: "Aman Verma",
      role: "Senior Android Developer",
      avatar: "https://i.pravatar.cc/150?img=12",
      skill: "Android Development",
      skillColor: "#22c55e",
      skillIcon: "android",
      ringColor: "#22c55e",
      angle: 0,
    },
    {
      id: "rahul",
      name: "Rahul Sharma",
      role: "iOS Developer",
      avatar: "https://i.pravatar.cc/150?img=14",
      skill: "iOS Development",
      skillColor: "#3b82f6",
      skillIcon: "apple",
      ringColor: "#3b82f6",
      angle: 65,
    },
    {
      id: "neha",
      name: "Neha Singh",
      role: "Backend Developer",
      avatar: "https://i.pravatar.cc/150?img=47",
      skill: "Backend Development",
      skillColor: "#22c55e", // Light green in image
      skillIcon: "server",
      ringColor: "#22c55e",
      angle: 115,
    },
    {
      id: "anjali",
      name: "Anjali Rathi",
      role: "QA Engineer",
      avatar: "https://i.pravatar.cc/150?img=48",
      skill: "Testing & QA",
      skillColor: "#eab308",
      skillIcon: "search",
      ringColor: "#eab308",
      angle: 160,
    },
    {
      id: "sagar",
      name: "Sagar Jain",
      role: "DevOps Engineer",
      avatar: "https://i.pravatar.cc/150?img=15",
      skill: "DevOps & Cloud",
      skillColor: "#06b6d4",
      skillIcon: "cloud",
      ringColor: "#06b6d4",
      angle: 210,
    },
    {
      id: "vikram",
      name: "Vikram Patel",
      role: "Full Stack Developer",
      avatar: "https://i.pravatar.cc/150?img=13",
      skill: "Web Development",
      skillColor: "#f97316",
      skillIcon: "globe",
      ringColor: "#f97316",
      angle: 260,
    },
    {
      id: "pooja",
      name: "Pooja Mehta",
      role: "UI/UX Designer",
      avatar: "https://i.pravatar.cc/150?img=49",
      skill: "UI/UX & Figma",
      skillColor: "#a855f7",
      skillIcon: "search",
      ringColor: "#a855f7",
      angle: 310,
    },
  ],
};

// All Skills Page Data
export const allSkillsCategories = [
  { id: "kotlin", name: "Kotlin", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/kotlin/kotlin-original.svg", count: 24 },
  { id: "java", name: "Java", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg", count: 18 },
  { id: "compose", name: "Jetpack Compose", icon: "https://upload.wikimedia.org/wikipedia/commons/d/d7/Android_robot.svg", count: 15 },
  { id: "android", name: "Android Development", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/android/android-original.svg", count: 20 },
  { id: "firebase", name: "Firebase", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/firebase/firebase-plain.svg", count: 12 },
  { id: "retrofit", name: "Retrofit", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg", count: 10 },
  { id: "room", name: "Room Database", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/sqlite/sqlite-original.svg", count: 8 },
  { id: "git", name: "Git & GitHub", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg", count: 10 },
  { id: "htmlcss", name: "HTML & CSS", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg", count: 12 },
  { id: "js", name: "JavaScript", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg", count: 9 },
  { id: "ts", name: "TypeScript", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg", count: 7 },
  { id: "node", name: "Node.js", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg", count: 10 },
  { id: "figma", name: "Figma", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/figma/figma-original.svg", count: 8 },
  { id: "docker", name: "Docker", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg", count: 6 },
  { id: "aws", name: "AWS", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/amazonwebservices/amazonwebservices-original-wordmark.svg", count: 9 },
  { id: "cicd", name: "CI / CD", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg", count: 7 },
];

export const allSkillsDetailed = {
  kotlin: {
    title: "Kotlin",
    badge: "Primary Skill",
    description: "Modern programming language for Android development. Fully interoperable with Java, concise, safe, and designed to improve developer productivity.",
    meta: [
      { label: "Platform", value: "Android", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/android/android-original.svg" },
      { label: "Used For", value: "Android Apps", icon: "apps" },
      { label: "Experience", value: "3+ Years", icon: "calendar" },
      { label: "Projects", value: "12+ Projects", icon: "code" },
    ],
    breakdownCount: 24,
    breakdownItems: [
      {
        id: "coroutines",
        title: "Coroutines",
        level: "Expert",
        description: "Used for managing background tasks and asynchronous programming in a simple and efficient way.",
        points: [
          "Launched coroutines with lifecycleScope and viewModelScope",
          "Used async, await, launch, and runBlocking",
          "Handled exception and cancellation",
          "Implemented structured concurrency"
        ],
        experience: "3+ Years"
      },
      {
        id: "flow",
        title: "Flow",
        level: "Expert",
        description: "Used Kotlin Flow for handling reactive streams and data asynchronously.",
        points: [
          "Created cold and hot flows using Flow, StateFlow, SharedFlow",
          "Used operators like map, filter, flatMapLatest, debounce",
          "Collected flows with lifecycle awareness",
          "Combined multiple flows using combine & zip"
        ],
        experience: "2+ Years"
      },
      {
        id: "room",
        title: "Room Database",
        level: "Expert",
        description: "Local database for structured data storage with SQLite.",
        points: [
          "Designed entities, DAO, and database",
          "Used relationships, migrations, and type converters",
          "Worked with LiveData and Flow with Room",
          "Implemented pagination with Room"
        ],
        experience: "2+ Years"
      },
      {
        id: "retrofit",
        title: "Retrofit",
        level: "Expert",
        description: "Type-safe HTTP client for Android and Java to consume RESTful APIs.",
        points: [
          "Created RESTful API services with Retrofit",
          "Used custom converters (Gson, Moshi)",
          "Implemented interceptors for logging and auth",
          "Handled API errors and response mapping"
        ],
        experience: "3+ Years"
      },
      {
        id: "mvvm",
        title: "MVVM Architecture",
        level: "Expert",
        description: "Used MVVM architecture for clean, scalable and maintainable code.",
        points: [
          "Separated UI, business logic and data layer",
          "Used ViewModel and Repository pattern",
          "Managed UI state with LiveData / StateFlow",
          "Followed single responsibility principle"
        ],
        experience: "3+ Years"
      },
      {
        id: "hilt",
        title: "Dependency Injection (Hilt)",
        level: "Expert",
        description: "Used Hilt for dependency injection and managing app components.",
        points: [
          "Injected dependencies using @Inject and @Provides",
          "Used @HiltViewModel for ViewModels",
          "Managed scopes and modules",
          "Simplified object creation and testing"
        ],
        experience: "2+ Years"
      },
      {
        id: "language",
        title: "Kotlin Language Features",
        level: "Expert",
        description: "Leveraged modern Kotlin features for concise and safe code.",
        points: [
          "Used data classes, sealed classes, object, companion object",
          "Extensions and higher-order functions",
          "Null safety and smart casting",
          "Lambdas, inline functions, and delegation"
        ],
        experience: "3+ Years"
      },
      {
        id: "serialization",
        title: "Serialization (kotlinx.serialization)",
        level: "Advanced",
        description: "Used for JSON serialization and deserialization.",
        points: [
          "Created serializable data models",
          "Custom serializers and deserializers",
          "Worked with polymorphism",
          "Integrated with Retrofit"
        ],
        experience: "2+ Years"
      },
      {
        id: "testing",
        title: "Testing (JUnit & MockK)",
        level: "Advanced",
        description: "Unit testing and mocking for better code quality.",
        points: [
          "Wrote unit tests with JUnit",
          "Used MockK for mocking dependencies",
          "Tested ViewModels and UseCases",
          "Implemented test-driven development (TDD)"
        ],
        experience: "1+ Year"
      },
      {
        id: "datastore",
        title: "DataStore",
        level: "Advanced",
        description: "Used DataStore for key-value and preference storage.",
        points: [
          "Implemented Preferences DataStore",
          "Read and write data using Flow",
          "Handled data migrations",
          "Used for user settings and app preferences"
        ],
        experience: "1+ Year"
      }
    ]
  },
  java: {
    title: "Java",
    badge: "Proficient",
    description: "Object-oriented programming language widely used for Android and backend development. Strong foundation in OOP concepts.",
    meta: [
      { label: "Platform", value: "Android", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/android/android-original.svg" },
      { label: "Used For", value: "Android Apps", icon: "apps" },
      { label: "Experience", value: "4+ Years", icon: "calendar" },
      { label: "Projects", value: "8+ Projects", icon: "code" },
    ],
    breakdownCount: 18,
    breakdownItems: [
      {
        id: "oop",
        title: "OOP Concepts",
        level: "Expert",
        description: "Deep understanding of object-oriented programming principles in Java.",
        points: ["Inheritance, Polymorphism, Abstraction, Encapsulation", "Interfaces and Abstract classes", "Design patterns (Singleton, Factory, Builder)", "SOLID principles"],
        experience: "4+ Years"
      },
      {
        id: "collections",
        title: "Collections Framework",
        level: "Expert",
        description: "Used Java Collections for data structures and algorithms.",
        points: ["ArrayList, LinkedList, HashMap, HashSet", "Sorting and searching algorithms", "Iterators and comparators", "Thread-safe collections"],
        experience: "4+ Years"
      },
      {
        id: "threading",
        title: "Multithreading",
        level: "Advanced",
        description: "Concurrent programming with Java threads and executors.",
        points: ["Thread lifecycle and synchronization", "ExecutorService and ThreadPool", "Runnable and Callable", "Semaphore and CountDownLatch"],
        experience: "3+ Years"
      },
      {
        id: "streams",
        title: "Java Streams & Lambda",
        level: "Advanced",
        description: "Functional programming with Java 8+ streams and lambda expressions.",
        points: ["map, filter, reduce, collect", "Lambda expressions and method references", "Optional for null safety", "Stream pipelines"],
        experience: "3+ Years"
      }
    ]
  },
  android: {
    title: "Android Development",
    badge: "Expert",
    description: "Building robust, scalable Android applications with modern architecture patterns, UI toolkits, and best practices.",
    meta: [
      { label: "Platform", value: "Android", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/android/android-original.svg" },
      { label: "Used For", value: "Mobile Apps", icon: "apps" },
      { label: "Experience", value: "4+ Years", icon: "calendar" },
      { label: "Projects", value: "15+ Projects", icon: "code" },
    ],
    breakdownCount: 20,
    breakdownItems: [
      {
        id: "activities",
        title: "Activities & Fragments",
        level: "Expert",
        description: "Core Android UI components for building screens and navigation.",
        points: ["Activity lifecycle management", "Fragment transactions and back stack", "Navigation Component with SafeArgs", "Deep links and intent handling"],
        experience: "4+ Years"
      },
      {
        id: "recyclerview",
        title: "RecyclerView & Adapters",
        level: "Expert",
        description: "Efficient list rendering with RecyclerView.",
        points: ["Custom adapters with ViewHolder pattern", "DiffUtil for efficient updates", "Multiple view types", "ListAdapter with Paging 3"],
        experience: "4+ Years"
      },
      {
        id: "notifications",
        title: "Push Notifications",
        level: "Advanced",
        description: "Firebase Cloud Messaging for push notifications.",
        points: ["FCM setup and token management", "Notification channels and groups", "Foreground and background notifications", "Deep link notifications"],
        experience: "3+ Years"
      },
      {
        id: "workmanager",
        title: "WorkManager",
        level: "Advanced",
        description: "Background task scheduling with WorkManager.",
        points: ["Periodic and one-time work requests", "Chaining work and passing data", "Constraints (network, battery)", "Observing work status"],
        experience: "2+ Years"
      }
    ]
  },
  firebase: {
    title: "Firebase",
    badge: "Proficient",
    description: "Google's backend platform for authentication, real-time database, cloud storage, analytics, and more.",
    meta: [
      { label: "Platform", value: "Google Cloud", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/firebase/firebase-plain.svg" },
      { label: "Used For", value: "Backend", icon: "apps" },
      { label: "Experience", value: "3+ Years", icon: "calendar" },
      { label: "Projects", value: "9+ Projects", icon: "code" },
    ],
    breakdownCount: 12,
    breakdownItems: [
      {
        id: "auth",
        title: "Firebase Authentication",
        level: "Expert",
        description: "User authentication with multiple providers.",
        points: ["Email/password and Google sign-in", "Phone OTP authentication", "Custom token authentication", "Auth state management"],
        experience: "3+ Years"
      },
      {
        id: "firestore",
        title: "Cloud Firestore",
        level: "Advanced",
        description: "NoSQL cloud database for real-time data sync.",
        points: ["CRUD operations and queries", "Real-time listeners", "Subcollections and references", "Offline persistence"],
        experience: "3+ Years"
      },
      {
        id: "storage",
        title: "Firebase Storage",
        level: "Advanced",
        description: "Cloud storage for images, videos, and files.",
        points: ["Upload and download with progress", "Security rules", "Image compression before upload", "Metadata management"],
        experience: "2+ Years"
      }
    ]
  },
  git: {
    title: "Git & GitHub",
    badge: "Expert",
    description: "Version control and collaboration for efficient source code management in solo and team projects.",
    meta: [
      { label: "Platform", value: "Cross Platform", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg" },
      { label: "Used For", value: "Version Control", icon: "apps" },
      { label: "Experience", value: "5+ Years", icon: "calendar" },
      { label: "Repos", value: "50+ Repos", icon: "code" },
    ],
    breakdownCount: 10,
    breakdownItems: [
      {
        id: "branching",
        title: "Branching Strategy",
        level: "Expert",
        description: "Git branching for feature development and releases.",
        points: ["Git Flow (main, develop, feature branches)", "Branch protection rules", "PR reviews and code review", "Hotfix and release branches"],
        experience: "5+ Years"
      },
      {
        id: "cicd",
        title: "GitHub Actions (CI/CD)",
        level: "Advanced",
        description: "Automated testing and deployment pipelines.",
        points: ["Build and test automation", "Deploy to Play Store via Fastlane", "Code quality checks (Lint, Detekt)", "Secrets management"],
        experience: "2+ Years"
      }
    ]
  },
  compose: {
    title: "Jetpack Compose",
    badge: "Proficient",
    description: "Modern declarative UI toolkit for Android. Build beautiful, native UIs with less code using Kotlin.",
    meta: [
      { label: "Platform", value: "Android", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/android/android-original.svg" },
      { label: "Used For", value: "UI Development", icon: "apps" },
      { label: "Experience", value: "2+ Years", icon: "calendar" },
      { label: "Projects", value: "10+ Projects", icon: "code" },
    ],
    breakdownCount: 15,
    breakdownItems: [
      {
        id: "composables",
        title: "Composables & State",
        level: "Advanced",
        description: "Building UI with composable functions and state management.",
        points: ["remember, rememberSaveable, State hoisting", "Side effects: LaunchedEffect, SideEffect", "Recomposition and performance optimization", "Custom composable components"],
        experience: "2+ Years"
      },
      {
        id: "navigation",
        title: "Navigation in Compose",
        level: "Advanced",
        description: "Screen navigation using Jetpack Navigation with Compose.",
        points: ["NavHost and NavController", "Passing arguments between composables", "Deep links integration", "Bottom navigation and drawer"],
        experience: "2+ Years"
      },
      {
        id: "animation",
        title: "Animations",
        level: "Proficient",
        description: "Smooth UI animations with Compose animation APIs.",
        points: ["animate*AsState helpers", "AnimatedVisibility and crossfade", "Transition API for complex animations", "Gesture-driven animations"],
        experience: "1+ Year"
      }
    ]
  },
  retrofit: {
    title: "Retrofit",
    badge: "Expert",
    description: "Type-safe HTTP client for Android and Java. Makes consuming REST APIs simple and elegant.",
    meta: [
      { label: "Platform", value: "Android", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/android/android-original.svg" },
      { label: "Used For", value: "API Integration", icon: "apps" },
      { label: "Experience", value: "3+ Years", icon: "calendar" },
      { label: "Projects", value: "11+ Projects", icon: "code" },
    ],
    breakdownCount: 10,
    breakdownItems: [
      {
        id: "api-service",
        title: "API Service Design",
        level: "Expert",
        description: "Designing type-safe API interfaces.",
        points: ["@GET, @POST, @PUT, @DELETE annotations", "Query params, path params, body", "Multipart for file uploads", "Dynamic URL handling"],
        experience: "3+ Years"
      },
      {
        id: "interceptors",
        title: "OkHttp Interceptors",
        level: "Expert",
        description: "Custom interceptors for logging, auth, and caching.",
        points: ["Auth token injection in headers", "Logging interceptor for debug", "Retry and timeout policies", "Cache control"],
        experience: "3+ Years"
      }
    ]
  },
  room: {
    title: "Room Database",
    badge: "Advanced",
    description: "SQLite abstraction layer for robust local data storage in Android applications.",
    meta: [
      { label: "Platform", value: "Android", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/android/android-original.svg" },
      { label: "Used For", value: "Local Storage", icon: "apps" },
      { label: "Experience", value: "2+ Years", icon: "calendar" },
      { label: "Projects", value: "7+ Projects", icon: "code" },
    ],
    breakdownCount: 8,
    breakdownItems: [
      {
        id: "entities",
        title: "Entities & DAOs",
        level: "Expert",
        description: "Database schema design with Room entities and data access objects.",
        points: ["Entity design with annotations", "DAO with CRUD queries", "Relationships: @Embedded, @Relation", "Type converters"],
        experience: "2+ Years"
      },
      {
        id: "migrations",
        title: "Migrations & Queries",
        level: "Advanced",
        description: "Safe schema migrations and complex SQL queries.",
        points: ["Migration strategies for version updates", "Complex JOIN queries", "FTS (Full Text Search)", "Room with Flow/LiveData"],
        experience: "1+ Year"
      }
    ]
  },
  htmlcss: {
    title: "HTML & CSS",
    badge: "Proficient",
    description: "Web fundamentals for building structured and beautifully styled web pages.",
    meta: [
      { label: "Platform", value: "Web", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg" },
      { label: "Used For", value: "Web Pages", icon: "apps" },
      { label: "Experience", value: "3+ Years", icon: "calendar" },
      { label: "Projects", value: "12+ Projects", icon: "code" },
    ],
    breakdownCount: 12,
    breakdownItems: [
      {
        id: "layout",
        title: "Flexbox & Grid",
        level: "Expert",
        description: "Modern CSS layout techniques for responsive design.",
        points: ["Flexbox alignment and direction", "CSS Grid for complex layouts", "Responsive breakpoints", "CSS custom properties"],
        experience: "3+ Years"
      },
      {
        id: "animations",
        title: "CSS Animations",
        level: "Advanced",
        description: "Smooth transitions and keyframe animations.",
        points: ["@keyframes and animation properties", "Transition for hover effects", "Transform for 2D/3D effects", "Performance-friendly animations"],
        experience: "2+ Years"
      }
    ]
  },
  js: {
    title: "JavaScript",
    badge: "Advanced",
    description: "The language of the web — used for dynamic UI, APIs, and full-stack development.",
    meta: [
      { label: "Platform", value: "Web / Node", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg" },
      { label: "Used For", value: "Web Apps", icon: "apps" },
      { label: "Experience", value: "3+ Years", icon: "calendar" },
      { label: "Projects", value: "9+ Projects", icon: "code" },
    ],
    breakdownCount: 9,
    breakdownItems: [
      {
        id: "async",
        title: "Async JavaScript",
        level: "Expert",
        description: "Asynchronous programming with Promises and async/await.",
        points: ["Promises, .then(), .catch()", "async/await pattern", "Fetch API and Axios", "Error handling in async code"],
        experience: "3+ Years"
      },
      {
        id: "dom",
        title: "DOM Manipulation",
        level: "Advanced",
        description: "Dynamic web content with DOM APIs.",
        points: ["querySelector, addEventListener", "Creating and removing elements", "Event delegation", "Intersection Observer API"],
        experience: "2+ Years"
      }
    ]
  },
  ts: {
    title: "TypeScript",
    badge: "Advanced",
    description: "Typed superset of JavaScript for scalable, maintainable web applications.",
    meta: [
      { label: "Platform", value: "Web / Node", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg" },
      { label: "Used For", value: "Web Apps", icon: "apps" },
      { label: "Experience", value: "2+ Years", icon: "calendar" },
      { label: "Projects", value: "7+ Projects", icon: "code" },
    ],
    breakdownCount: 7,
    breakdownItems: [
      {
        id: "types",
        title: "Type System",
        level: "Advanced",
        description: "Using TypeScript's type system for safe code.",
        points: ["Interfaces and type aliases", "Generics and utility types", "Union and intersection types", "Discriminated unions"],
        experience: "2+ Years"
      }
    ]
  },
  node: {
    title: "Node.js",
    badge: "Proficient",
    description: "JavaScript runtime for building fast, scalable server-side applications and APIs.",
    meta: [
      { label: "Platform", value: "Backend", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg" },
      { label: "Used For", value: "Backend APIs", icon: "apps" },
      { label: "Experience", value: "2+ Years", icon: "calendar" },
      { label: "Projects", value: "10+ Projects", icon: "code" },
    ],
    breakdownCount: 10,
    breakdownItems: [
      {
        id: "express",
        title: "Express.js APIs",
        level: "Advanced",
        description: "RESTful API development with Express.",
        points: ["Route handling and middleware", "Authentication with JWT", "Error handling middleware", "Request validation"],
        experience: "2+ Years"
      },
      {
        id: "db",
        title: "Database Integration",
        level: "Proficient",
        description: "Connecting Node.js to databases.",
        points: ["MongoDB with Mongoose", "MySQL with Sequelize", "Redis for caching", "Database transactions"],
        experience: "1+ Year"
      }
    ]
  },
  figma: {
    title: "Figma",
    badge: "Proficient",
    description: "Collaborative UI/UX design tool for building prototypes and design systems.",
    meta: [
      { label: "Platform", value: "Design Tool", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/figma/figma-original.svg" },
      { label: "Used For", value: "UI Design", icon: "apps" },
      { label: "Experience", value: "2+ Years", icon: "calendar" },
      { label: "Projects", value: "8+ Projects", icon: "code" },
    ],
    breakdownCount: 8,
    breakdownItems: [
      {
        id: "components",
        title: "Components & Variants",
        level: "Proficient",
        description: "Building reusable design components.",
        points: ["Component creation and instances", "Variants and interactive states", "Auto layout for responsive designs", "Design tokens"],
        experience: "2+ Years"
      }
    ]
  },
  docker: {
    title: "Docker",
    badge: "Learning",
    description: "Containerization platform for building, shipping, and running distributed applications.",
    meta: [
      { label: "Platform", value: "DevOps", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg" },
      { label: "Used For", value: "Containerization", icon: "apps" },
      { label: "Experience", value: "1+ Year", icon: "calendar" },
      { label: "Projects", value: "6+ Projects", icon: "code" },
    ],
    breakdownCount: 6,
    breakdownItems: [
      {
        id: "containers",
        title: "Docker Containers",
        level: "Proficient",
        description: "Building and running Docker containers.",
        points: ["Dockerfile creation", "docker-compose for multi-service apps", "Port mapping and volumes", "Docker Hub push/pull"],
        experience: "1+ Year"
      }
    ]
  },
  aws: {
    title: "AWS",
    badge: "Proficient",
    description: "Amazon Web Services cloud platform for scalable infrastructure and managed services.",
    meta: [
      { label: "Platform", value: "Cloud", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/amazonwebservices/amazonwebservices-original-wordmark.svg" },
      { label: "Used For", value: "Cloud Hosting", icon: "apps" },
      { label: "Experience", value: "2+ Years", icon: "calendar" },
      { label: "Projects", value: "9+ Projects", icon: "code" },
    ],
    breakdownCount: 9,
    breakdownItems: [
      {
        id: "ec2-s3",
        title: "EC2 & S3",
        level: "Proficient",
        description: "Core AWS services for compute and storage.",
        points: ["EC2 instance setup and management", "S3 bucket for file storage", "IAM roles and permissions", "Elastic Load Balancer"],
        experience: "2+ Years"
      }
    ]
  },
  cicd: {
    title: "CI / CD",
    badge: "Advanced",
    description: "Continuous integration and deployment pipelines for automated testing and delivery.",
    meta: [
      { label: "Platform", value: "DevOps", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg" },
      { label: "Used For", value: "Automation", icon: "apps" },
      { label: "Experience", value: "2+ Years", icon: "calendar" },
      { label: "Projects", value: "7+ Projects", icon: "code" },
    ],
    breakdownCount: 7,
    breakdownItems: [
      {
        id: "github-actions",
        title: "GitHub Actions",
        level: "Advanced",
        description: "Automated CI/CD workflows using GitHub Actions.",
        points: ["Build, test and lint automation", "Deploy to cloud on push", "Matrix builds for multiple environments", "Workflow triggers and conditions"],
        experience: "2+ Years"
      }
    ]
  }
};


// All Projects Page Data
export const allProjectsData = [
  {
    id: "digivahan",
    badge: "Featured",
    name: "DigiVahan - Vehicle Assistant",
    verified: true,
    liveBadge: "Live",
    category: "android",
    description: "A comprehensive Android application for vehicle owners to access all important vehicle-related information and services in one place.",
    tags: ["Android", "Kotlin", "MVVM", "Retrofit", "Room", "Hilt"],
    stats: [
      { label: "Users", value: "50K+" },
      { label: "Downloads", value: "100K+" },
      { label: "Rating", value: "4.6", isStar: true },
      { label: "Completed", value: "2024" }
    ],
    liveUrl: "#",
    image: "https://images.unsplash.com/photo-1618761714954-0b8cd0026356?w=800&auto=format"
  },
  {
    id: "zerocommission",
    badge: "Featured",
    name: "Zero Commission - Loan DSA Platform",
    verified: true,
    liveBadge: "Live",
    category: "android",
    description: "A digital platform that connects customers with multiple banking partners to provide the best loan offers with zero commission.",
    tags: ["Android", "Kotlin", "PHP", "MySQL", "REST API"],
    stats: [
      { label: "Users", value: "25K+" },
      { label: "Loans Disbursed", value: "1.2K+" },
      { label: "Partners", value: "12+" },
      { label: "Completed", value: "2023" }
    ],
    liveUrl: "#",
    image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&auto=format"
  },
  {
    id: "veloura",
    badge: "Featured",
    name: "Veloura - E-Commerce Store",
    verified: true,
    liveBadge: "Live",
    category: "web",
    description: "A premium e-commerce platform for adult wellness and lifestyle products with a seamless and discreet shopping experience.",
    tags: ["Next.js", "TypeScript", "Stripe", "Tailwind CSS", "MongoDB"],
    stats: [
      { label: "Products", value: "500+" },
      { label: "Orders", value: "5K+" },
      { label: "Users", value: "10K+" },
      { label: "Completed", value: "2024" }
    ],
    liveUrl: "#",
    image: "https://images.unsplash.com/photo-1557821552-17105176677c?w=800&auto=format"
  },
  {
    id: "taskflow",
    badge: "Featured",
    name: "TaskFlow - Project Management SaaS",
    verified: true,
    liveBadge: "Live",
    category: "saas",
    description: "A modern SaaS project management tool for teams to collaborate, track tasks, and manage sprints in real-time.",
    tags: ["React", "Node.js", "MongoDB", "Socket.io", "AWS"],
    stats: [
      { label: "Teams", value: "200+" },
      { label: "Tasks Managed", value: "50K+" },
      { label: "Uptime", value: "99.9%" },
      { label: "Completed", value: "2024" }
    ],
    liveUrl: "#",
    image: "https://images.unsplash.com/photo-1611532736597-de2d4265fba3?w=800&auto=format"
  },
  {
    id: "medinote",
    badge: "New",
    name: "MediNote - Doctor's Assistant App",
    verified: false,
    liveBadge: "Live",
    category: "android",
    description: "An Android app for doctors to manage patient prescriptions, appointments, and medical records efficiently.",
    tags: ["Android", "Kotlin", "Room", "Firebase", "Hilt"],
    stats: [
      { label: "Doctors", value: "500+" },
      { label: "Prescriptions", value: "10K+" },
      { label: "Rating", value: "4.7", isStar: true },
      { label: "Completed", value: "2023" }
    ],
    liveUrl: "#",
    image: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=800&auto=format"
  },
  {
    id: "linkpro",
    badge: "Featured",
    name: "LinkPro - Link in Bio Tool",
    verified: true,
    liveBadge: "Live",
    category: "web",
    description: "A web-based link-in-bio tool for creators and brands to showcase their links, social profiles, and portfolio.",
    tags: ["Next.js", "Tailwind CSS", "Supabase", "TypeScript"],
    stats: [
      { label: "Creators", value: "5K+" },
      { label: "Links Created", value: "50K+" },
      { label: "Clicks", value: "1M+" },
      { label: "Completed", value: "2024" }
    ],
    liveUrl: "#",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&auto=format"
  }
];

// All Projects Sidebar Data
export const allProjectsSidebar = {
  overview: [
    { value: "18+", label: "Total Projects", color: "primary" },
    { value: "12", label: "Completed", color: "primary" },
    { value: "4", label: "In Progress", color: "purple" },
    { value: "2", label: "Coming Soon", color: "purple" },
  ],
  technologies: [
    { name: "Kotlin", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/kotlin/kotlin-original.svg" },
    { name: "Java", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg" },
    { name: "PHP", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/php/php-original.svg" },
    { name: "JavaScript", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg" },
    { name: "Firebase", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/firebase/firebase-plain.svg" },
    { name: "MySQL", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg" },
    { name: "MongoDB", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg" },
    { name: "AWS", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/amazonwebservices/amazonwebservices-original-wordmark.svg" },
    { name: "Docker", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg" },
    { name: "Git", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg" },
    { name: "Android", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/android/android-original.svg" },
    { name: "Figma", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/figma/figma-original.svg" },
  ],
  categories: [
    { id: "android", label: "Android Apps", count: 8, color: "#22c55e" },
    { id: "web", label: "Web Applications", count: 5, color: "#3b82f6" },
    { id: "saas", label: "SaaS Products", count: 3, color: "#a855f7" },
    { id: "other", label: "Other Projects", count: 2, color: "#64748b" },
  ],
};

export const projectDetailsData = {
  digivahan: {
    id: "digivahan",
    badge: "Current Project",
    name: "Digivahan - Vehicle Assistant",
    verified: true,
    description: "A comprehensive Android application for vehicle owners to access all important vehicle-related information and services in one place.",
    tags: ["Android", "Kotlin", "MVVM", "Retrofit", "Room", "Hilt"],
    stats: [
      { label: "Users", value: "50K+", icon: "user" },
      { label: "Downloads", value: "100K+", icon: "download" },
      { label: "Rating", value: "4.6", icon: "star", isStar: true },
      { label: "Completed", value: "2024", icon: "calendar" }
    ],
    mainImage: "https://images.unsplash.com/photo-1618761714954-0b8cd0026356?w=1000&auto=format",
    overviewText: "Digivahan is an all-in-one vehicle assistant app that helps vehicle owners manage and access essential vehicle-related services seamlessly. From RC verification to challan checking, insurance details to Fastag recharge, everything is available in a single, easy-to-use application.",
    overviewPoints: [
      "RC Verification using vehicle number",
      "Check Insurance validity and details",
      "PUC Certificate status check",
      "Challan details and payment",
      "Fastag recharge and history",
      "RTO services and information",
      "User-friendly dashboard and UI",
      "Secure and fast performance"
    ],
    metaTable: [
      { label: "Platform", value: "Android", icon: "android" },
      { label: "Architecture", value: "MVVM", icon: "architecture" },
      { label: "Language", value: "Kotlin", icon: "code" },
      { label: "Database", value: "Room", icon: "database" },
      { label: "Backend", value: "REST API", icon: "server" },
      { label: "State Management", value: "ViewModel + LiveData", icon: "state" },
      { label: "DI", value: "Hilt", icon: "di" },
      { label: "Testing", value: "JUnit, Espresso", icon: "test" }
    ],
    highlights: [
      { icon: "phone", title: "All in One Solution", desc: "Multiple vehicle services in a single application." },
      { icon: "refresh", title: "Real-time Data", desc: "Live data integration for accurate and up-to-date info." },
      { icon: "shield", title: "Secure & Reliable", desc: "Secure API communication and data handling." },
      { icon: "zap", title: "Great Performance", desc: "Optimized app performance for smooth user experience." }
    ],
    screenshots: [
      "https://images.unsplash.com/photo-1618761714954-0b8cd0026356?w=300&auto=format",
      "https://images.unsplash.com/photo-1518770660439-4636190af475?w=300&auto=format",
      "https://images.unsplash.com/photo-1555421689-491a97ff2040?w=300&auto=format",
      "https://images.unsplash.com/photo-1607252650355-f7fd0460ccdb?w=300&auto=format",
      "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=300&auto=format"
    ],
    techStack: [
      { name: "Kotlin", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/kotlin/kotlin-original.svg" },
      { name: "Android SDK", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/android/android-original.svg" },
      { name: "MVVM", icon: "https://upload.wikimedia.org/wikipedia/commons/d/d7/Android_robot.svg" },
      { name: "Retrofit", icon: "https://upload.wikimedia.org/wikipedia/commons/d/d7/Android_robot.svg" },
      { name: "Room Database", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/sqlite/sqlite-original.svg" },
      { name: "Hilt", icon: "https://upload.wikimedia.org/wikipedia/commons/d/d7/Android_robot.svg" },
      { name: "Coroutines", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/kotlin/kotlin-original.svg" },
      { name: "Flow", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/kotlin/kotlin-original.svg" },
      { name: "Material Design 3", icon: "https://upload.wikimedia.org/wikipedia/commons/d/d7/Android_robot.svg" },
      { name: "Firebase", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/firebase/firebase-plain.svg" }
    ],
    liveUrl: "#",
    storeUrl: "#"
  },
  medinote: {
    id: "medinote",
    badge: "New Project",
    name: "MediNote - Doctor's Assistant App",
    verified: false,
    description: "An Android app for doctors to manage patient prescriptions, appointments, and medical records efficiently.",
    tags: ["Android", "Kotlin", "Room", "Firebase", "Hilt"],
    stats: [
      { label: "Doctors", value: "500+", icon: "user" },
      { label: "Prescriptions", value: "10K+", icon: "download" },
      { label: "Rating", value: "4.7", icon: "star", isStar: true },
      { label: "Completed", value: "2024", icon: "calendar" }
    ],
    mainImage: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=1000&auto=format",
    overviewText: "MediNote transforms how doctors manage daily workflows. It enables quick prescription generation, patient record management, appointment scheduling, and medical history tracking in a single intuitive interface.",
    overviewPoints: [
      "Digital prescription generation",
      "Patient appointment scheduling",
      "Medical history tracking",
      "Drug database integration",
      "Offline-first with Room DB",
      "Firebase cloud sync",
      "Doctor profile management",
      "PDF export for prescriptions"
    ],
    metaTable: [
      { label: "Platform", value: "Android", icon: "android" },
      { label: "Architecture", value: "MVVM + Clean", icon: "architecture" },
      { label: "Language", value: "Kotlin", icon: "code" },
      { label: "Database", value: "Room + Firebase", icon: "database" },
      { label: "Backend", value: "Firebase Firestore", icon: "server" },
      { label: "State Management", value: "ViewModel + StateFlow", icon: "state" },
      { label: "DI", value: "Hilt", icon: "di" },
      { label: "Testing", value: "JUnit, Mockito", icon: "test" }
    ],
    highlights: [
      { icon: "phone", title: "Digital Prescriptions", desc: "Generate and share digital prescriptions instantly." },
      { icon: "refresh", title: "Real-time Sync", desc: "Firebase ensures data stays in sync across devices." },
      { icon: "shield", title: "HIPAA Compliant", desc: "Secure handling of patient sensitive information." },
      { icon: "zap", title: "Offline Support", desc: "Full functionality even without internet connection." }
    ],
    screenshots: [
      "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=300&auto=format",
      "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=300&auto=format",
      "https://images.unsplash.com/photo-1530497610245-94d3c16cda28?w=300&auto=format",
      "https://images.unsplash.com/photo-1585435557343-3b092031a831?w=300&auto=format",
      "https://images.unsplash.com/photo-1514995669114-6081e934b693?w=300&auto=format"
    ],
    techStack: [
      { name: "Kotlin", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/kotlin/kotlin-original.svg" },
      { name: "Android SDK", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/android/android-original.svg" },
      { name: "Room Database", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/sqlite/sqlite-original.svg" },
      { name: "Firebase", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/firebase/firebase-plain.svg" },
      { name: "Hilt", icon: "https://upload.wikimedia.org/wikipedia/commons/d/d7/Android_robot.svg" },
      { name: "Coroutines", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/kotlin/kotlin-original.svg" }
    ],
    liveUrl: "#",
    storeUrl: "#"
  },
  shophive: {
    id: "shophive",
    badge: "Featured",
    name: "ShopHive - E-Commerce App",
    verified: true,
    description: "A full-featured Android e-commerce application with product listings, cart, orders, payments, and user profiles.",
    tags: ["Android", "Kotlin", "Firebase", "Stripe", "Jetpack Compose"],
    stats: [
      { label: "Products", value: "5K+", icon: "user" },
      { label: "Orders", value: "20K+", icon: "download" },
      { label: "Rating", value: "4.5", icon: "star", isStar: true },
      { label: "Completed", value: "2023", icon: "calendar" }
    ],
    mainImage: "https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?w=1000&auto=format",
    overviewText: "ShopHive is a feature-rich Android e-commerce platform that provides a seamless shopping experience. From browsing curated product collections to secure checkout and order tracking, ShopHive covers the full shopping journey.",
    overviewPoints: [
      "Product catalog with categories",
      "Cart and wishlist management",
      "Stripe payment gateway",
      "Order tracking and history",
      "Push notifications for offers",
      "Seller dashboard and analytics",
      "Product reviews and ratings",
      "Address management"
    ],
    metaTable: [
      { label: "Platform", value: "Android", icon: "android" },
      { label: "Architecture", value: "MVVM + Clean", icon: "architecture" },
      { label: "Language", value: "Kotlin", icon: "code" },
      { label: "Database", value: "Firebase Firestore", icon: "database" },
      { label: "Payment", value: "Stripe SDK", icon: "server" },
      { label: "State Management", value: "StateFlow + ViewModel", icon: "state" },
      { label: "DI", value: "Hilt", icon: "di" },
      { label: "UI", value: "Jetpack Compose", icon: "test" }
    ],
    highlights: [
      { icon: "phone", title: "Smooth Shopping", desc: "Intuitive product browsing and cart experience." },
      { icon: "shield", title: "Secure Payments", desc: "Stripe integration for safe and fast transactions." },
      { icon: "refresh", title: "Real-time Updates", desc: "Live inventory and order status updates." },
      { icon: "zap", title: "Fast Performance", desc: "Optimized loading with caching and pagination." }
    ],
    screenshots: [
      "https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?w=300&auto=format",
      "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=300&auto=format",
      "https://images.unsplash.com/photo-1555421689-491a97ff2040?w=300&auto=format",
      "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=300&auto=format",
      "https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=300&auto=format"
    ],
    techStack: [
      { name: "Kotlin", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/kotlin/kotlin-original.svg" },
      { name: "Jetpack Compose", icon: "https://upload.wikimedia.org/wikipedia/commons/d/d7/Android_robot.svg" },
      { name: "Firebase", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/firebase/firebase-plain.svg" },
      { name: "Stripe", icon: "https://upload.wikimedia.org/wikipedia/commons/d/d7/Android_robot.svg" },
      { name: "Hilt", icon: "https://upload.wikimedia.org/wikipedia/commons/d/d7/Android_robot.svg" },
      { name: "Coil", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/kotlin/kotlin-original.svg" }
    ],
    liveUrl: "#",
    storeUrl: "#"
  },
  fittrack: {
    id: "fittrack",
    badge: "Top Rated",
    name: "FitTrack - Fitness Tracker",
    verified: false,
    description: "A comprehensive fitness tracking Android app with workout plans, diet tracking, progress analytics and health insights.",
    tags: ["Android", "Kotlin", "Health API", "Room", "Retrofit"],
    stats: [
      { label: "Users", value: "30K+", icon: "user" },
      { label: "Workouts", value: "80K+", icon: "download" },
      { label: "Rating", value: "4.8", icon: "star", isStar: true },
      { label: "Completed", value: "2023", icon: "calendar" }
    ],
    mainImage: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=1000&auto=format",
    overviewText: "FitTrack helps users achieve their health goals through personalized workout plans, diet logging, and progress analytics. Integration with Google Fit API ensures accurate health data tracking.",
    overviewPoints: [
      "Personalized workout plans",
      "Diet and calorie tracking",
      "Progress charts and analytics",
      "Google Fit API integration",
      "Daily health insights",
      "Step counter and activity tracking",
      "Water intake reminder",
      "BMI and body metrics tracker"
    ],
    metaTable: [
      { label: "Platform", value: "Android", icon: "android" },
      { label: "Architecture", value: "MVVM", icon: "architecture" },
      { label: "Language", value: "Kotlin", icon: "code" },
      { label: "Database", value: "Room Database", icon: "database" },
      { label: "Health API", value: "Google Fit", icon: "server" },
      { label: "State Management", value: "LiveData + ViewModel", icon: "state" },
      { label: "DI", value: "Hilt", icon: "di" },
      { label: "Charts", value: "MPAndroidChart", icon: "test" }
    ],
    highlights: [
      { icon: "phone", title: "Health Insights", desc: "Personalized daily health tips and activity summaries." },
      { icon: "zap", title: "Progress Charts", desc: "Visualize your fitness journey with beautiful charts." },
      { icon: "shield", title: "Privacy First", desc: "All health data stays private and secure." },
      { icon: "refresh", title: "Google Fit Sync", desc: "Seamless sync with Google Health for accuracy." }
    ],
    screenshots: [
      "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=300&auto=format",
      "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=300&auto=format",
      "https://images.unsplash.com/photo-1526506118085-60ce8714f8c5?w=300&auto=format",
      "https://images.unsplash.com/photo-1547592180-85f173990554?w=300&auto=format",
      "https://images.unsplash.com/photo-1540497077202-7c8a3999166f?w=300&auto=format"
    ],
    techStack: [
      { name: "Kotlin", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/kotlin/kotlin-original.svg" },
      { name: "Android SDK", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/android/android-original.svg" },
      { name: "Room Database", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/sqlite/sqlite-original.svg" },
      { name: "Retrofit", icon: "https://upload.wikimedia.org/wikipedia/commons/d/d7/Android_robot.svg" },
      { name: "Google Fit", icon: "https://upload.wikimedia.org/wikipedia/commons/d/d7/Android_robot.svg" },
      { name: "Hilt", icon: "https://upload.wikimedia.org/wikipedia/commons/d/d7/Android_robot.svg" }
    ],
    liveUrl: "#",
    storeUrl: "#"
  },
  devblog: {
    id: "devblog",
    badge: "Featured",
    name: "DevBlog - Developer Blog Platform",
    verified: false,
    description: "A full-stack developer blogging platform built with React, Node.js, and MongoDB for the tech community.",
    tags: ["React", "Node.js", "MongoDB", "Express", "Tailwind CSS"],
    stats: [
      { label: "Authors", value: "300+", icon: "user" },
      { label: "Articles", value: "2K+", icon: "download" },
      { label: "Rating", value: "4.6", icon: "star", isStar: true },
      { label: "Completed", value: "2023", icon: "calendar" }
    ],
    mainImage: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?w=1000&auto=format",
    overviewText: "DevBlog is a platform designed for developers to share knowledge, tutorials, and insights with the tech community. Rich text editing, code highlighting, and SEO optimization make it ideal for developer content.",
    overviewPoints: [
      "Rich text editor with Markdown support",
      "Code syntax highlighting",
      "SEO-optimized blog posts",
      "Author profiles and followers",
      "Tag-based categorization",
      "Comment and discussion system",
      "RSS feed support",
      "Analytics dashboard for authors"
    ],
    metaTable: [
      { label: "Platform", value: "Web", icon: "android" },
      { label: "Frontend", value: "React + TypeScript", icon: "code" },
      { label: "Backend", value: "Node.js + Express", icon: "server" },
      { label: "Database", value: "MongoDB", icon: "database" },
      { label: "Auth", value: "JWT + Google OAuth", icon: "shield" },
      { label: "Hosting", value: "AWS EC2 + S3", icon: "server" },
      { label: "CI/CD", value: "GitHub Actions", icon: "di" },
      { label: "Cache", value: "Redis", icon: "test" }
    ],
    highlights: [
      { icon: "code", title: "Code Highlighting", desc: "Beautiful syntax highlighting for 50+ languages." },
      { icon: "zap", title: "SEO Optimized", desc: "Meta tags and structured data for search engines." },
      { icon: "users", title: "Community Features", desc: "Follow authors, like posts, and comment threads." },
      { icon: "server", title: "Scalable Backend", desc: "Node.js API with Redis caching for performance." }
    ],
    screenshots: [
      "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?w=300&auto=format",
      "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=300&auto=format",
      "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=300&auto=format",
      "https://images.unsplash.com/photo-1516116216624-53e697fedbea?w=300&auto=format",
      "https://images.unsplash.com/photo-1555421689-491a97ff2040?w=300&auto=format"
    ],
    techStack: [
      { name: "React", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg" },
      { name: "Node.js", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg" },
      { name: "MongoDB", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg" },
      { name: "TypeScript", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg" },
      { name: "Redis", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/redis/redis-original.svg" },
      { name: "AWS", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/amazonwebservices/amazonwebservices-original-wordmark.svg" }
    ],
    liveUrl: "#",
    storeUrl: "#"
  },
  taskflow: {
    id: "taskflow",
    badge: "Featured",
    name: "TaskFlow - Project Management SaaS",
    verified: true,
    description: "A modern SaaS project management tool for teams to collaborate, track tasks, and manage sprints in real-time.",
    tags: ["React", "Node.js", "MongoDB", "Socket.io", "AWS"],
    stats: [
      { label: "Teams", value: "200+", icon: "user" },
      { label: "Tasks Managed", value: "50K+", icon: "download" },
      { label: "Uptime", value: "99.9%", icon: "shield" },
      { label: "Completed", value: "2024", icon: "calendar" }
    ],
    mainImage: "https://images.unsplash.com/photo-1611532736597-de2d4265fba3?w=1000&auto=format",
    overviewText: "TaskFlow is a comprehensive project management SaaS platform that helps teams stay organized, collaborate effectively, and deliver projects on time. Real-time updates via Socket.io keep everyone in sync.",
    overviewPoints: [
      "Kanban board with drag-and-drop",
      "Sprint planning and backlog",
      "Real-time collaboration via WebSocket",
      "Task assignment and due dates",
      "Time tracking and reports",
      "Team permissions and roles",
      "Slack and GitHub integrations",
      "Advanced analytics dashboard"
    ],
    metaTable: [
      { label: "Platform", value: "Web SaaS", icon: "android" },
      { label: "Frontend", value: "React + TypeScript", icon: "code" },
      { label: "Backend", value: "Node.js + Express", icon: "server" },
      { label: "Database", value: "MongoDB", icon: "database" },
      { label: "Real-time", value: "Socket.io", icon: "refresh" },
      { label: "Hosting", value: "AWS EC2 + S3", icon: "server" },
      { label: "Auth", value: "JWT + OAuth2", icon: "di" },
      { label: "CI/CD", value: "GitHub Actions", icon: "test" }
    ],
    highlights: [
      { icon: "refresh", title: "Real-time Sync", desc: "Live task updates with Socket.io across all team members." },
      { icon: "users", title: "Team Collaboration", desc: "Invite teammates, assign roles, and work together." },
      { icon: "zap", title: "Sprint Management", desc: "Plan sprints, track velocity, and manage backlog." },
      { icon: "shield", title: "99.9% Uptime", desc: "Highly available infrastructure hosted on AWS." }
    ],
    screenshots: [
      "https://images.unsplash.com/photo-1611532736597-de2d4265fba3?w=300&auto=format",
      "https://images.unsplash.com/photo-1552664730-d307ca884978?w=300&auto=format",
      "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=300&auto=format",
      "https://images.unsplash.com/photo-1553877522-43269d4ea984?w=300&auto=format",
      "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=300&auto=format"
    ],
    techStack: [
      { name: "React", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg" },
      { name: "Node.js", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg" },
      { name: "MongoDB", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg" },
      { name: "Socket.io", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg" },
      { name: "TypeScript", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg" },
      { name: "AWS", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/amazonwebservices/amazonwebservices-original-wordmark.svg" }
    ],
    liveUrl: "#",
    storeUrl: "#"
  }
};


// All Education Page Data
export const allEducationData = [
  {
    id: "lpu",
    universityName: "Lovely Professional University",
    location: "Punjab, India",
    universityImage: "https://images.unsplash.com/photo-1562774053-701939374585?w=600&auto=format",
    universityLogo: "https://i.pravatar.cc/60?img=5",
    degree: "Bachelor of Technology in Computer Science",
    type: "B.TECH",
    period: "2019 - 2023",
    description: "Focused on Android development, software engineering, data structures, and modern app architecture.",
    stats: [
      { label: "CGPA", value: "8.53 / 10" },
      { label: "Rank", value: "Top 10%", sub: "of batch" },
      { label: "Honors", value: "Dean's List", sub: "(2021, 2022)" },
      { label: "Activities", value: "Coding Club", sub: "Lead" },
    ],
    keyAchievements: [
      "Developed 15+ Android applications",
      "Secured 2nd position in National Hackathon 2022",
      "Research published in International Journal of Computer Applications",
    ],
    certificates: [],
  },
  {
    id: "cu",
    universityName: "Chandigarh University",
    location: "Chandigarh, India",
    universityImage: "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=600&auto=format",
    universityLogo: "https://i.pravatar.cc/60?img=6",
    degree: "Senior Secondary (PCM)",
    type: "12TH (SENIOR SECONDARY)",
    period: "2017 - 2019",
    description: "Physics, Chemistry, Mathematics with Computer Science. Focused on problem solving and logical thinking.",
    stats: [
      { label: "Percentage", value: "92.40%" },
      { label: "Board", value: "CBSE" },
      { label: "Rank", value: "Top 5%", sub: "of school" },
      { label: "Activities", value: "Maths Club", sub: "Member" },
    ],
    keyAchievements: [
      "Scored 95+ in Mathematics",
      "Participated in National Science Olympiad",
      "Awarded scholarship for academic excellence",
    ],
    certificates: [],
  },
  {
    id: "stx",
    universityName: "St. Xavier's High School",
    location: "Delhi, India",
    universityImage: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=600&auto=format",
    universityLogo: "https://i.pravatar.cc/60?img=7",
    degree: "Secondary Education",
    type: "10TH (SECONDARY)",
    period: "2015 - 2017",
    description: "Completed secondary education with a focus on Science and Mathematics. Actively participated in co-curricular activities.",
    stats: [
      { label: "Percentage", value: "93.20%" },
      { label: "Board", value: "CBSE" },
      { label: "Rank", value: "Top 3%", sub: "of school" },
      { label: "Activities", value: "Science Club", sub: "Member" },
    ],
    keyAchievements: [
      "School Topper in Science",
      "Won Inter-School Science Exhibition",
      "Active member of Robotics Club",
    ],
    certificates: [],
  },
  {
    id: "google-ux",
    universityName: "Google (Coursera)",
    location: "Online",
    universityImage: "https://images.unsplash.com/photo-1555421689-491a97ff2040?w=600&auto=format",
    universityLogo: "https://i.pravatar.cc/60?img=8",
    degree: "Google UX Design Professional Certificate",
    type: "CERTIFICATION",
    period: "2023",
    description: "Comprehensive program covering UX research, wireframing, prototyping, and design thinking.",
    stats: [
      { label: "Credential ID", value: "G-123456789" },
      { label: "Duration", value: "6 Months" },
      { label: "Modules", value: "7 Courses" },
      { label: "Skills Gained", value: "UX Research" },
    ],
    keyAchievements: [
      "Completed 100+ hours of coursework",
      "Built real-world projects and case studies",
      "Top Performer in 2 courses",
    ],
    certificates: [],
  },
  {
    id: "kotlin-dev",
    universityName: "Udemy",
    location: "Online",
    universityImage: "https://images.unsplash.com/photo-1618401471353-b98afee0b2eb?w=600&auto=format",
    universityLogo: "https://i.pravatar.cc/60?img=9",
    degree: "Kotlin for Android Developers",
    type: "CERTIFICATION",
    period: "2022",
    description: "In-depth understanding of Kotlin programming language for modern Android development.",
    stats: [
      { label: "Credential ID", value: "U-987654321" },
      { label: "Duration", value: "15 Hours" },
      { label: "Lectures", value: "64 Lectures" },
      { label: "Level", value: "Intermediate" },
    ],
    keyAchievements: [
      "Learned Kotlin fundamentals and advanced concepts",
      "Hands-on projects and practical implementation",
      "Highly rated course with 4.7/5",
    ],
    certificates: [],
  }
];

// About Page specific data
export const aboutPageData = {
  stats: [
    { value: "3+", label: "Years Experience", icon: "briefcase" },
    { value: "40+", label: "Applications Completed", icon: "code" },
    { value: "20+", label: "Technologies Worked With", icon: "layers" },
    { value: "3+", label: "Companies Worked With", icon: "building" },
    { value: "40+", label: "Android Apps", icon: "android" },
    { value: "1+", label: "iOS Projects", icon: "apple" }
  ],
  coreValues: [
    {
      title: "Clean Architecture",
      description: "Building scalable and maintainable applications following modern architecture principles.",
      icon: "code",
      color: "text-purple-600 bg-purple-50"
    },
    {
      title: "Problem Solving",
      description: "Transforming complex business requirements into reliable mobile solutions.",
      icon: "lightbulb",
      color: "text-green-600 bg-green-50"
    },
    {
      title: "Performance",
      description: "Optimizing applications for speed, stability, and exceptional user experience.",
      icon: "zap",
      color: "text-blue-600 bg-blue-50"
    },
    {
      title: "Continuous Learning",
      description: "Always exploring modern technologies and improving development practices.",
      icon: "book",
      color: "text-indigo-600 bg-indigo-50"
    },
    {
      title: "Team Collaboration",
      description: "Working closely with designers, QA engineers, and backend developers to deliver quality products.",
      icon: "users",
      color: "text-pink-600 bg-pink-50"
    },
    {
      title: "User First",
      description: "Designing applications that are simple, intuitive, and enjoyable to use.",
      icon: "user",
      color: "text-orange-600 bg-orange-50"
    }
  ],
  whatIWorkOn: [
    { title: "Android Development", icon: "android", color: "text-green-500 bg-green-50" },
    { title: "iOS Development", icon: "apple", color: "text-gray-800 bg-gray-50" },
    { title: "REST API Integration", icon: "cloud", color: "text-blue-500 bg-blue-50" },
    { title: "Google Maps & Location", icon: "map-pin", color: "text-red-500 bg-red-50" },
    { title: "Authentication & Security", icon: "shield", color: "text-emerald-500 bg-emerald-50" },
    { title: "Payment Gateway", icon: "credit-card", color: "text-purple-500 bg-purple-50" },
    { title: "Push Notifications", icon: "bell", color: "text-orange-500 bg-orange-50" },
    { title: "QR Scanner Development", icon: "qr-code", color: "text-indigo-500 bg-indigo-50" },
    { title: "Firebase Services", icon: "flame", color: "text-amber-500 bg-amber-50" },
    { title: "Cloud Integration", icon: "cloud-upload", color: "text-cyan-500 bg-cyan-50" },
    { title: "Performance Optimization", icon: "trending-up", color: "text-blue-600 bg-blue-50" },
    { title: "UI/UX Implementation", icon: "pen-tool", color: "text-pink-500 bg-pink-50" }
  ],
  careerObjective: "My goal is to build reliable, scalable, and user-friendly mobile applications while continuously improving my technical expertise and contributing to products that create real value for users and businesses.",
  quote: "Great mobile applications are built by combining clean code, thoughtful design, and a deep understanding of user needs."
};
