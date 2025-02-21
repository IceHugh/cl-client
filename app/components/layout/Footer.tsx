import { Button } from "@/components/ui/button"
import { NavLink } from "react-router";

export function Footer() {
  return (
    <footer className="border-t py-6 md:py-0">
      <div className="container flex flex-col items-center justify-between gap-4 md:h-20 md:flex-row mx-auto">
        <div className="flex items-center gap-4 text-sm">
          <span>Social links:</span>
          <NavLink to="#" className="hover:underline">
            TG
          </NavLink>
          <NavLink to="#" className="hover:underline">
            Github
          </NavLink>
        </div>
        <div className="flex items-center gap-4">
          <Button>Button</Button>
          <Button variant="secondary">Secondary button</Button>
        </div>
      </div>
    </footer>
  )
}

