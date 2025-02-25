import Footer from "./ui/footer";
import Navigation from "./ui/navigation";

export default function Home() {
  return (
      <div className="flex flex-col h-screen">
        <Navigation />
        <main className="flex-1 p-3 flex justify-center">
          <div className="text-center">
            <h1 className="text-4xl font-bold m-1">Trek</h1>
            <p>This is an athlete dashboard...</p>
          </div>
        </main>
        <Footer />
      </div>
  );
}
