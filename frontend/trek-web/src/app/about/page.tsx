import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'About',
};

export default function AboutPage() {
    return(
        <main className="flex-1">
            <div className="m-5">About page</div>
        </main>
        
    );
}