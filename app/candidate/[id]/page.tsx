
'use client';

import { useParams, useRouter } from 'next/navigation';
import { useCandidates } from '@/contexts/candidate';
import Image from 'next/image';

export default function CandidatePage() {
    const params = useParams();
    const router = useRouter();
    const { getCandidateById } = useCandidates();

    const candidate = getCandidateById(Number(params.id));

    if (!candidate) {
        return <div>Candidate not found</div>;
    }

    return (
        <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-xl mx-auto"> {/* Further reduced max width */}
                <div className="bg-white rounded-lg shadow-lg overflow-hidden">
                    <button
                        onClick={() => router.back()}
                        className="absolute top-4 left-4 text-blue-600 hover:text-blue-800 bg-white rounded-full p-2 shadow-md z-10"
                    >
                        ← Back
                    </button>

                    <div className="flex flex-col md:flex-row">
                        <div className="relative w-full md:w-2/5 h-48"> {/* Reduced height and width */}
                            <Image
                                src={candidate.imageUrl}
                                alt={candidate.name}
                                fill
                                style={{ objectFit: 'contain' }}
                                priority
                                className="rounded-t-lg md:rounded-l-lg md:rounded-t-none p-2"
                            />
                        </div>

                        <div className="p-4 md:w-3/5"> {/* Adjusted width ratio and padding */}
                            <h1 className="text-xl font-bold text-gray-900 mb-3"> {/* Slightly reduced text size */}
                                {candidate.name}
                            </h1>
                            <div className="space-y-3"> {/* Reduced spacing */}
                                <div className="border-t border-gray-200 pt-3">
                                    <p className="text-sm text-gray-600">Political Party</p>
                                    <p className="text-base text-gray-900">{candidate.politicalParty}</p>
                                </div>
                                <div className="border-t border-gray-200 pt-3">
                                    <p className="text-sm text-gray-600">Candidate ID</p>
                                    <p className="text-base text-gray-900">#{candidate.id}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
