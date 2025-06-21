
'use client';

import { useCandidates } from '@/contexts/candidate';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import Navigation from '../../components/navigation'

export default function AddCandidate() {
    const router = useRouter();
    const { addCandidate } = useCandidates();
    const [formData, setFormData] = useState({
        name: '',
        politicalParty: '',
        imageUrl: ''
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        addCandidate(formData);
        router.push('/');
    };

    const inputClassName = "mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 text-black px-3 py-2 bg-white";

    return (
        <div className="min-h-screen bg-gray-100">
            <Navigation />
            <main className="py-12 px-4 sm:px-6 lg:px-8">
                <div className="max-w-md mx-auto bg-white rounded-lg shadow-md p-6">
                    <h1 className="text-2xl font-bold text-center mb-6">Add New Candidate</h1>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Name</label>
                            <input
                                type="text"
                                required
                                className={inputClassName}
                                value={formData.name}
                                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                placeholder="Enter candidate name"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Political Party</label>
                            <input
                                type="text"
                                required
                                className={inputClassName}
                                value={formData.politicalParty}
                                onChange={(e) => setFormData({ ...formData, politicalParty: e.target.value })}
                                placeholder="Enter political party"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Image URL</label>
                            <input
                                type="url"
                                required
                                className={inputClassName}
                                value={formData.imageUrl}
                                onChange={(e) => setFormData({ ...formData, imageUrl: e.target.value })}
                                placeholder="Enter image URL"
                            />
                        </div>
                        <div className="flex gap-4">
                            <button
                                type="submit"
                                className="flex-1 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                            >
                                Add Candidate
                            </button>
                            <button
                                type="button"
                                onClick={() => router.back()}
                                className="flex-1 bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded"
                            >
                                Cancel
                            </button>
                        </div>
                    </form>
                </div>
            </main>
        </div>
    );
}
