import { Button } from "./ui/button";
import Footer from "./ui/footer";
import Navigation from "./ui/navigation";

export default function Home() {
  return (
      <div className="flex flex-col h-screen">
        <Navigation />
        <main className="flex-1">
          <Button isPrimary={true}>Primary</Button>
          <Button isSecondary={true}>Secondary</Button>
          <Button isDanger={true}>Danger</Button>
          <Button isDisabled={true}>Disabled</Button>
      </main>
        <Footer />
      </div>
  );
}
