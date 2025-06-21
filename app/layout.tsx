'use client';

import { CandidateProvider } from '@/contexts/candidate';
import './globals.css';

export default function RootLayout({
                                       children,
                                   }: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en">
        <body>
        <CandidateProvider>
            {children}
        </CandidateProvider>
        </body>
        </html>
    );
}
