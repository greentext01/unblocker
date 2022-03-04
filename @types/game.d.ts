type GameType = {
  credit: {
    name: string;
  };
  approved: boolean;
  category: 'Site' | 'Other' | 'Puzzle' | 'Skill' | 'Level';
  id: number;
  name: string;
};

type GameDetails = {
  url: string;
  runs: Run[];
} & GameType;

type Run = {
  runner: UserToken;
  time: number;
  videoUrl: string;
  approved: boolean;
  id: number;
}
