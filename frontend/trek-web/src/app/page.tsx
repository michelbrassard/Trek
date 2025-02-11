import { Button } from "./ui/button";
import SideNav from "./ui/dashboard/sidenav";

export default function Home() {
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <nav className="flex flex-row gap-4">

      </nav>
      
      <main className="flex flex-col gap-8 row-start-2 items-center">
        <Button isPrimary={true}>Primary</Button>
        <Button isSecondary={true}>Secondary</Button>
        <Button isDanger={true}>Danger</Button>
        <Button isDisabled={true}>Disabled</Button>

        <SideNav />
      </main>
      <footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center">
        Placeholder footer
      </footer>
    </div>
  );
}
