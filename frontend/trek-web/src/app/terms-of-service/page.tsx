import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Terms of Service',
};

export default function TermsOfServicePage() {
    return(
        <main className="flex-1">
            <div className="m-5">Terms of service page</div>
        </main>
        
    );
}