type Run = {
  time: Date;
  runner: string;
};

type Game = {
  id: string;
  name: string;
  category: string;
  runs: Array<Run>;
  approved: string;
};

export default Game;
export { Run, Game };
