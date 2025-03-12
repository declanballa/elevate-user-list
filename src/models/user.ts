export interface User {
  id: number;
  first_name: string;
  last_name: string;
  image: string;
  stats: {
    current_streak_in_days: number;
    skills: {
      [key: string]: SkillInfo;
    };
    total_sessions_played: number;
  };
  error?: string;
}

export interface SkillInfo {
  current: number;
  level: string;
  max: number;
}
