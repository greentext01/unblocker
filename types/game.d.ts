type Run = {
  time: number;
  runner: string;
  video: string;
};

type Game = {
  id: string;
  name: string;
  category: string;
  runs: Array<Run>;
  approved: string;
  url: string;
};

export default Game;
export { Run, Game };
