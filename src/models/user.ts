export interface User {
  id: number;
  first_name: string;
  last_name: string;
  image: string;
  stats: {
    current_streak_in_days: number;
    skills: {
      math: SkillInfo;
      reading: SkillInfo;
      speaking: SkillInfo;
      writing: SkillInfo;
    };
    total_sessions_played: number;
  };
}

export interface SkillInfo {
  current: number;
  level: number;
  max: number;
}
