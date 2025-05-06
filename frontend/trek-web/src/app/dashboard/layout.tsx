import MobileDashboardNavigation from "../ui/dashboard/mobile-nav";
import ProfileRow from "../ui/dashboard/profile-row";
import SideNav from "../ui/dashboard/side-nav";


export default function Layout({ children }: { children: React.ReactNode }) {
    return (
      <div className="flex h-screen flex-col md:flex-row md:overflow-hidden">
        <div className="w-full flex-none md:w-64 hidden md:block">
          <SideNav />
        </div>
        <div className="md:hidden flex flex-row justify-between">
          <MobileDashboardNavigation />
          <ProfileRow />
        </div>
        <div className="w-full">
          <div className="hidden md:block">
            <ProfileRow />
          </div>
          <main className="flex-grow px-6 md:overflow-y-auto md:px-12">
            {children}
          </main>
        </div>
      </div>
    );
  }