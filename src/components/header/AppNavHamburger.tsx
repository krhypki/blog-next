import { HamburgerMenuIcon } from '@radix-ui/react-icons';

type AppNavHamburgerProps = {
  onClick: () => void;
};

export function AppNavHamburger({ onClick }: AppNavHamburgerProps) {
  return (
    <button className="p-3" onClick={onClick}>
      <HamburgerMenuIcon height="24" width="24" />
    </button>
  );
}
