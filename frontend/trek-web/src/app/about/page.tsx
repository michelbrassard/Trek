import { Metadata } from 'next';
import Navigation from '../ui/navigation';
import Footer from '../ui/footer';

export const metadata: Metadata = {
    title: 'About',
};

export default function AboutPage() {
    return(
        <div className="flex flex-col h-screen">
            <Navigation />
            <main className="flex-1">
                <div className="m-5">About page</div>
            </main>
            <Footer />
        </div>
    );
}