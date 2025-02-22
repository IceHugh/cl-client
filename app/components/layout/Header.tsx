import { NavLink } from "react-router";
import { ConnectButton } from '@mysten/dapp-kit';

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background">
      <div className="container flex h-16 items-center justify-between mx-auto">
        <NavLink to="/" className="flex items-center space-x-2">
          <span className="text-xl font-bold">Tokensmith</span>
        </NavLink>
        <nav className="flex items-center space-x-6">
          {/* <NavLink to="/" className="text-sm font-medium">
            Create
          </NavLink>
          <NavLink to="/manage" className="text-sm font-medium">
            Manage
          </NavLink>
          <NavLink to="/portfolio" className="text-sm font-medium">
            Portfolio
          </NavLink> */}
          <ConnectButton />
        </nav>
      </div>
    </header>
  )
}

