import { Metadata } from 'next';
import Navigation from '../ui/layout/navigation';
import Footer from '../ui/layout/footer';

export const metadata: Metadata = {
    title: 'Privacy Policy',
};

export default function PrivacyPolicyPage() {
    return(
        <div className="flex flex-col h-screen">
            <Navigation />
            <main className="flex-1">
                <div className="m-5">Privacy Policy page</div>
            </main>
            <Footer />
        </div>
        
    );
}