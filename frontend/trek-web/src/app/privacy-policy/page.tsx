import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Privacy Policy',
};

export default function PrivacyPolicyPage() {
    return(
        <main className="flex-1">
            <div className="m-5">Privacy Policy page</div>
        </main>
        
    );
}