
'use client';

import { useCandidates } from '@/contexts/candidate';
import Link from 'next/link';
import Image from 'next/image';
import Navigation from './components/navigation'
import { useRouter } from 'next/navigation';

export default function Home() {
    const { candidates, deleteCandidate } = useCandidates();
    const router = useRouter();

    return (
        <div className="min-h-screen bg-gray-100">
            <Navigation />
            <main className="py-12 px-4 sm:px-6 lg:px-8">
                <div className="max-w-7xl mx-auto">
                    <h1 className="text-4xl font-bold text-center text-gray-900 mb-8">
                        Election Candidates
                    </h1>
                    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                        {candidates.map((candidate) => (
                            <div key={candidate.id} className="bg-white rounded-lg shadow-md overflow-hidden flex flex-col">
                                <Link href={`/candidate/${candidate.id}`} className="block flex-grow">
                                    <div className="flex justify-center items-center h-64"> {/* Increased height */}
                                        {candidate.imageUrl ? (
                                            <div className="relative h-64 w-48"> {/* Fixed width and height container */}
                                                <Image
                                                    src={candidate.imageUrl}
                                                    alt={candidate.name}
                                                    fill
                                                    style={{ objectFit: 'contain' }}
                                                    className="hover:opacity-90 transition-opacity p-2"
                                                />
                                            </div>
                                        ) : (
                                            <div className="w-48 h-64 bg-gray-200 flex items-center justify-center">
                                                <span className="text-gray-400">No Image</span>
                                            </div>
                                        )}
                                    </div>
                                    <div className="p-4">
                                        <h2 className="text-xl font-semibold text-gray-900 mb-2 text-center">
                                            {candidate.name}
                                        </h2>
                                        <p className="text-gray-600 text-sm text-center">
                                            {candidate.politicalParty}
                                        </p>
                                    </div>
                                </Link>
                                <div className="px-4 pb-4 flex gap-2 mt-auto">
                                    <button
                                        onClick={() => router.push(`/candidate/edit/${candidate.id}`)}
                                        className="flex-1 bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-2 px-4 rounded"
                                    >
                                        Update
                                    </button>
                                    <button
                                        onClick={() => {
                                            deleteCandidate(candidate.id);
                                        }}
                                        className="flex-1 bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded"
                                    >
                                        Delete
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </main>
        </div>
    );
}
