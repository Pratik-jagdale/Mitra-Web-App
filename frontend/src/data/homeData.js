// Realistic dummy data for the Mitra App homepage
export const gameStats = {
  moodMatcher: {
    totalPlays: 1247,
    averageScore: 85,
    highScore: 100,
    recentTimes: [45, 38, 42, 35, 40], // in seconds
    achievements: [
      { id: 1, name: "First Match", description: "Complete your first mood matching session", achieved: true },
      { id: 2, name: "Perfect Score", description: "Match all emotions correctly in one session", achieved: false },
      { id: 3, name: "Quick Thinker", description: "Complete a session under 30 seconds", achieved: true },
    ],
    dailyProgress: [65, 70, 85, 80, 90, 85, 88], // last 7 days
  },
  emotionMemory: {
    totalPlays: 892,
    averageScore: 78,
    highScore: 95,
    recentTimes: [120, 115, 105, 110, 108], // in seconds
    achievements: [
      { id: 1, name: "Memory Master", description: "Complete a perfect memory round", achieved: false },
      { id: 2, name: "Quick Recall", description: "Match all pairs under 60 seconds", achieved: true },
      { id: 3, name: "Consistent Player", description: "Play 5 days in a row", achieved: true },
    ],
    dailyProgress: [60, 65, 75, 80, 85, 82, 88], // last 7 days
  }
};

export const userEngagement = {
  streakDays: 5,
  totalPlayTime: "12h 45m",
  moodHistory: [
    { date: "2025-09-21", mood: "Calm", score: 85 },
    { date: "2025-09-20", mood: "Joy", score: 90 },
    { date: "2025-09-19", mood: "Hope", score: 75 },
    { date: "2025-09-18", mood: "Peace", score: 82 },
    { date: "2025-09-17", mood: "Tranquil", score: 88 },
  ],
  weeklyHighlights: [
    { title: "Best Score", value: "95 points", icon: "🌟" },
    { title: "Longest Streak", value: "5 days", icon: "🔥" },
    { title: "Mood Improvement", value: "+15%", icon: "📈" },
    { title: "Games Played", value: "28", icon: "🎮" },
  ]
};

export const aiCompanionHistory = {
  recentInteractions: [
    {
      id: 1,
      date: "2025-09-21",
      topic: "Dealing with stress",
      sentiment: "positive",
      duration: "5m",
    },
    {
      id: 2,
      date: "2025-09-20",
      topic: "Daily mindfulness",
      sentiment: "neutral",
      duration: "8m",
    },
    {
      id: 3,
      date: "2025-09-19",
      topic: "Sleep habits",
      sentiment: "positive",
      duration: "6m",
    },
  ],
  suggestedTopics: [
    "Mindful breathing exercises",
    "Creating a positive routine",
    "Understanding emotions",
    "Building resilience",
  ],
  wellnessScore: 85
};

export const achievements = [
  {
    id: 1,
    name: "Early Bird",
    description: "Play a game before 9 AM",
    icon: "🌅",
    progress: 100,
    reward: "Special morning theme",
  },
  {
    id: 2,
    name: "Emotion Expert",
    description: "Successfully identify 50 different emotions",
    icon: "🎯",
    progress: 75,
    reward: "New game mode unlock",
  },
  {
    id: 3,
    name: "Mindfulness Master",
    description: "Complete 10 mindfulness sessions",
    icon: "🧘‍♀️",
    progress: 60,
    reward: "Exclusive background themes",
  },
  {
    id: 4,
    name: "Consistency King",
    description: "Maintain a 7-day streak",
    icon: "👑",
    progress: 70,
    reward: "Profile badge",
  },
];