//FIX: import AuthRedirectProvider from "../providers/authredirect";
import Breadcrumbs from "../ui/dashboard/breadcrumbs";
import MobileDashboardNavigation from "../ui/dashboard/mobile-nav";
import ProfileRow from "../ui/dashboard/profile-row";
import SideNav from "../ui/dashboard/side-nav";

export default function Layout({ children }: { children: React.ReactNode }) {
    return (
      <div className="flex h-screen flex-col md:flex-row md:overflow-hidden">
          <div className="w-full flex-none md:w-64 hidden md:block">
            <SideNav />
          </div>
          <div className="md:hidden flex flex-col gap-2">
            <div className="flex flex-row justify-between">
              <MobileDashboardNavigation />
              <ProfileRow />
            </div>
            <div className="pl-6 mb-3">
              <Breadcrumbs />
            </div>
            
          </div>
          <div className="w-full">
            <div className="hidden md:flex md:flex-row justify-between items-center pl-12">
              <Breadcrumbs />
              <ProfileRow />
            </div>
            <main className="flex-grow px-6 md:overflow-y-auto md:px-12">
              {children}
            </main>
          </div>
        </div>
      
    );
  }