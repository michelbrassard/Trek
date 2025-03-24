import Footer from "./ui/layout/footer";
import Navigation from "./ui/layout/navigation";
import TrekLogo from "./ui/logo/trek-logo";

export default function Home() {
  return (
      <div className="flex flex-col h-screen">
        <Navigation />
        <main className="flex-1 p-3 flex justify-center">
          <div className="text-center">
            <div className="flex col justify-center mb-3 ">
              <div className="flex row gap-2 mb-5">
                <TrekLogo size={60} color="fill-blue-500" />
                <h1 className="text-5xl font-bold m-1">Trek</h1>
              </div>
            </div>
            <p>This is a dashboard blablabla promo text...</p>
          </div>
        </main>
        <Footer />
      </div>
  );
}
