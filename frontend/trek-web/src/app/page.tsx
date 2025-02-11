import { Button } from "./ui/button";
import SideNav from "./ui/dashboard/sidenav";

export default function Home() {
  return (
    <main className="flex-1">
        <Button isPrimary={true}>Primary</Button>
        <Button isSecondary={true}>Secondary</Button>
        <Button isDanger={true}>Danger</Button>
        <Button isDisabled={true}>Disabled</Button>

        <SideNav />
      </main>
  );
}
