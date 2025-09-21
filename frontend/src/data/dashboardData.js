// Realistic dummy data for the Mitra App judge dashboard

export const overallMetrics = {
  totalUsers: 256,
  activeUsers: 189,
  averageEngagement: "24m",
  riskAlerts: 3,
  userGrowth: "+12%",
  wellnessScore: 82
};

export const weeklyTrends = {
  userEngagement: [65, 72, 68, 74, 82, 79, 85], // percentage
  averageMood: [75, 78, 72, 80, 83, 81, 85], // scale of 0-100
  riskFactors: [12, 10, 15, 8, 6, 9, 7], // number of identified risk patterns
  gameParticipation: [145, 156, 142, 168, 172, 165, 180], // daily active players
};

export const moodDistribution = [
  { mood: "Calm", percentage: 35, color: "#FFB3BA" },
  { mood: "Joy", percentage: 25, color: "#FFDFBA" },
  { mood: "Hope", percentage: 15, color: "#FFFFBA" },
  { mood: "Peace", percentage: 15, color: "#BAFFC9" },
  { mood: "Tranquil", percentage: 10, color: "#BAE1FF" },
];

export const recentAlerts = [
  {
    id: 1,
    userId: "U2849",
    timestamp: "2025-09-21T14:30:00Z",
    severity: "high",
    type: "Sudden mood decline",
    status: "pending",
    details: "Sharp decrease in engagement and mood scores over 24h"
  },
  {
    id: 2,
    userId: "U2925",
    timestamp: "2025-09-21T12:15:00Z",
    severity: "medium",
    type: "Irregular pattern",
    status: "reviewing",
    details: "Unusual game interaction patterns detected"
  },
  {
    id: 3,
    userId: "U2734",
    timestamp: "2025-09-21T10:45:00Z",
    severity: "low",
    type: "Extended absence",
    status: "resolved",
    details: "User returned after 7-day absence"
  },
];

export const userInsights = [
  {
    category: "Engagement Patterns",
    insights: [
      "Peak activity hours: 2PM - 6PM",
      "Average session duration increasing",
      "Higher engagement on weekends",
      "Popular game: Mood Matcher"
    ]
  },
  {
    category: "Mental Wellness Trends",
    insights: [
      "Overall mood improving week-over-week",
      "Stress levels decreasing",
      "Positive response to mindfulness activities",
      "Strong community participation"
    ]
  },
  {
    category: "Risk Indicators",
    insights: [
      "3 users requiring attention",
      "2 users showing improvement",
      "1 new case identified",
      "Quick response time maintained"
    ]
  }
];

export const timeFrameData = {
  daily: {
    averageMood: 82,
    totalSessions: 450,
    uniqueUsers: 180,
    alerts: 3
  },
  weekly: {
    averageMood: 79,
    totalSessions: 2840,
    uniqueUsers: 225,
    alerts: 12
  },
  monthly: {
    averageMood: 77,
    totalSessions: 11200,
    uniqueUsers: 256,
    alerts: 45
  }
};

export const interventionStats = {
  total: 68,
  successful: 52,
  ongoing: 12,
  requiring_escalation: 4,
  response_time_avg: "2h 15m",
  effectiveness_rate: "76%",
  categories: [
    { name: "Mood Support", count: 28 },
    { name: "Anxiety Management", count: 18 },
    { name: "Crisis Prevention", count: 12 },
    { name: "General Wellness", count: 10 }
  ]
};