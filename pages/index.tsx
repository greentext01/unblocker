import AddButton from '../components/index/AddButton';
import GameHeader from '../components/index/GameHeader';
import GamesList from '../components/index/GamesList';
import UnblockerHead from '../components/index/UnblockerHead';

function Main() {
  return (
    <>
      <UnblockerHead />
      <GameHeader />
      <GamesList />
      <AddButton />
    </>
  );
}

export default Main;
