
'use client';

import { useEffect, useState } from 'react';
import { useCandidates } from '@/contexts/candidate';
import Navigation from '../components/navigation';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from 'recharts';

interface PartyStats {
    party: string;
    count: number;
    percentage: number;
}

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8'];


export default function Statistics() {
    const { candidates } = useCandidates();
    const [partyStats, setPartyStats] = useState<PartyStats[]>([]);
    const [isSimulating, setIsSimulating] = useState(false);
    const [simulationInterval, setSimulationInterval] = useState<NodeJS.Timeout | null>(null);

    const calculatePartyStats = () => {
        const stats: { [key: string]: number } = {};
        candidates.forEach(candidate => {
            stats[candidate.politicalParty] = (stats[candidate.politicalParty] || 0) + 1;
        });

        const total = Object.values(stats).reduce((acc, curr) => acc + curr, 0);

        return Object.entries(stats)
            .map(([party, count]) => ({
                party,
                count,
                percentage: (count / total) * 100
            }))
            .sort((a, b) => b.count - a.count);
    };

    useEffect(() => {
        setPartyStats(calculatePartyStats());
    }, [candidates]);

    const startSimulation = () => {
        if (isSimulating) return;
        setIsSimulating(true);
        const interval = setInterval(() => {
            setPartyStats(prevStats => {
                const randomIndex = Math.floor(Math.random() * prevStats.length);
                const newStats = prevStats.map((stat, index) => {
                    if (index === randomIndex) {
                        return { ...stat, count: stat.count + 1 };
                    }
                    return stat;
                });

                const total = newStats.reduce((acc, curr) => acc + curr.count, 0);
                return newStats.map(stat => ({
                    ...stat,
                    percentage: (stat.count / total) * 100
                })).sort((a, b) => b.count - a.count);
            });
        }, 1000);
        setSimulationInterval(interval);
    };

    const stopSimulation = () => {
        if (simulationInterval) {
            clearInterval(simulationInterval);
            setSimulationInterval(null);
        }
        setIsSimulating(false);
    };

    const chartData = partyStats.map(stat => ({
        name: stat.party,
        value: stat.count
    }));

    return (
        <div className="min-h-screen bg-gray-100">
            <Navigation />
            <main className="py-12 px-4 sm:px-6 lg:px-8">
                <div className="max-w-6xl mx-auto bg-white rounded-lg shadow-md p-6"> {/* Increased max-width */}
                    <div className="flex justify-between items-center mb-6">
                        <h1 className="text-2xl font-bold">Political Party Statistics</h1>
                        <div className="space-x-4">
                            <button
                                onClick={startSimulation}
                                disabled={isSimulating}
                                className={`px-4 py-2 rounded-md font-bold ${
                                    isSimulating
                                        ? 'bg-gray-300 cursor-not-allowed'
                                        : 'bg-blue-500 hover:bg-blue-700 text-white'
                                }`}
                            >
                                Start Simulation
                            </button>
                            <button
                                onClick={stopSimulation}
                                disabled={!isSimulating}
                                className={`px-4 py-2 rounded-md font-bold ${
                                    !isSimulating
                                        ? 'bg-gray-300 cursor-not-allowed'
                                        : 'bg-red-500 hover:bg-red-600 text-white'
                                }`}
                            >
                                Stop Simulation
                            </button>
                        </div>
                    </div>
                    <div className="flex flex-col md:flex-row gap-8">
                        <div className="w-full md:w-2/3 h-[500px]"> {/* Increased height and width */}
                            <ResponsiveContainer width="100%" height="100%">
                                <PieChart>
                                    <Pie
                                        data={chartData}
                                        cx="50%"
                                        cy="50%"
                                        labelLine={false}
                                        outerRadius={180} // Increased radius
                                        fill="#8884d8"
                                        dataKey="value"
                                        label={({
                                                    cx,
                                                    cy,
                                                    midAngle,
                                                    innerRadius,
                                                    outerRadius,
                                                    value,
                                                    index
                                                }) => {
                                            const RADIAN = Math.PI / 180;
                                            const radius = 35 + innerRadius + (outerRadius - innerRadius); // Increased label distance
                                            const x = cx + radius * Math.cos(-midAngle * RADIAN);
                                            const y = cy + radius * Math.sin(-midAngle * RADIAN);
                                            return (
                                                <text
                                                    x={x}
                                                    y={y}
                                                    fill="#000"
                                                    textAnchor={x > cx ? 'start' : 'end'}
                                                    dominantBaseline="central"
                                                    fontSize="12" // Added font size
                                                >
                                                    {chartData[index].name} ({value})
                                                </text>
                                            );
                                        }}
                                    >
                                        {chartData.map((entry, index) => (
                                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                        ))}
                                    </Pie>
                                    <Tooltip />
                                </PieChart>
                            </ResponsiveContainer>
                        </div>
                        <div className="w-full md:w-1/3 space-y-6"> {/* Adjusted width */}
                            {partyStats.map((stat, index) => (
                                <div key={stat.party} className="space-y-2">
                                    <div className="flex justify-between text-sm">
                                        <span className="font-medium flex items-center">
                                            <span
                                                className="w-3 h-3 rounded-full mr-2"
                                                style={{ backgroundColor: COLORS[index % COLORS.length] }}
                                            />
                                            {stat.party}
                                        </span>
                                        <span className="text-gray-600">
                                            {stat.count} candidates ({stat.percentage.toFixed(1)}%)
                                        </span>
                                    </div>
                                    <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                                        <div
                                            className="h-full transition-all duration-500"
                                            style={{
                                                width: `${stat.percentage}%`,
                                                backgroundColor: COLORS[index % COLORS.length]
                                            }}
                                        />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}

