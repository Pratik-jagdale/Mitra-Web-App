// Personal dashboard data for individual user view
export const userDashboardData = {
  personalMetrics: {
    currentStreak: 5,
    totalPlayTime: "12h 45m",
    averageMood: 85,
    gamesPlayed: 28
  },

  weeklyProgress: {
    moodScores: [82, 85, 78, 88, 92, 86, 89],
    playTime: [25, 30, 22, 35, 28, 32, 30], // minutes per day
    mindfulnessSessions: [2, 3, 2, 4, 3, 3, 4],
    emotionalBalance: [75, 78, 72, 85, 88, 84, 86]
  },

  recentActivities: [
    {
      date: "2025-09-21",
      activity: "Mood Matcher",
      duration: "15m",
      score: 92,
      mood: "Joy"
    },
    {
      date: "2025-09-21",
      activity: "Memory Game",
      duration: "10m",
      score: 88,
      mood: "Calm"
    },
    {
      date: "2025-09-20",
      activity: "Mood Matcher",
      duration: "12m",
      score: 85,
      mood: "Peace"
    }
  ],

  emotionalJourney: {
    dominantEmotions: [
      { emotion: "Joy", percentage: 35, color: "#FFB703" },
      { emotion: "Calm", percentage: 30, color: "#5AC8FA" },
      { emotion: "Peace", percentage: 20, color: "#A8DADC" },
      { emotion: "Hope", percentage: 15, color: "#90BE6D" }
    ],
    weeklyMoodPattern: {
      morning: ["Calm", "Joy", "Peace", "Joy", "Calm", "Joy", "Peace"],
      evening: ["Peace", "Calm", "Joy", "Peace", "Joy", "Peace", "Joy"]
    }
  },

  personalInsights: [
    {
      category: "Weekly Highlights",
      insights: [
        "Best mood score: 92 on Sunday",
        "Maintained 5-day streak",
        "Most productive time: Evening",
        "Favorite activity: Mood Matcher"
      ]
    },
    {
      category: "Wellness Tips",
      insights: [
        "You seem more energetic in evenings",
        "Regular gaming improves your mood",
        "Memory exercises boost your focus",
        "Consistent 15-min sessions work best"
      ]
    }
  ],

  achievements: {
    recent: [
      {
        name: "Consistency Champion",
        description: "Maintained a 5-day streak",
        icon: "🌟",
        date: "2025-09-21"
      },
      {
        name: "Mood Master",
        description: "Achieved 90+ score in Mood Matcher",
        icon: "🎯",
        date: "2025-09-21"
      }
    ],
    progress: [
      {
        name: "Memory Maven",
        current: 75,
        target: 100,
        description: "Complete 100 memory exercises"
      },
      {
        name: "Emotion Explorer",
        current: 40,
        target: 50,
        description: "Experience 50 different mood combinations"
      }
    ]
  },

  wellnessGoals: {
    daily: {
      target: 3,
      completed: 2,
      activities: ["Morning Mood Check", "Memory Exercise", "Evening Reflection"]
    },
    weekly: {
      mindfulMinutes: {
        target: 120,
        achieved: 85
      },
      moodVariety: {
        target: 5,
        achieved: 4
      }
    }
  }
};