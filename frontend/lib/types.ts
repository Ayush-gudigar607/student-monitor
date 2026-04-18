export type MetricCard = {
  title: string;
  value: string;
  change: string;
};

export type TrendDatum = {
  month: string;
  score: number;
};

export type SubjectDatum = {
  subject: string;
  value: number;
};

export type ClassificationDatum = {
  name: string;
  value: number;
};

export type LeaderboardEntry = {
  rank: number;
  student: string;
  score: number;
  className: string;
};
