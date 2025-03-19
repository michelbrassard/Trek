import { Metadata } from 'next';
import Footer from "../ui/layout/footer";
import Navigation from "../ui/navigation";

export const metadata: Metadata = {
    title: 'Terms of Service',
};

export default function TermsOfServicePage() {
    return(
        <div className="flex flex-col h-screen">
            <Navigation />
            <main className="flex-1">
                <div className="m-5">Terms of service page</div>
            </main>
            <Footer />
        </div> 
    );
}