import React from 'react';
import { UserProfile, QuitPlan, ProgressData, Methodology } from '../types';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, BarChart, Bar } from 'recharts';
import { Award, Heart, Wind, CheckCircle } from 'lucide-react';

interface ProgressTrackerProps {
  userProfile: UserProfile;
  quitPlan: QuitPlan;
  progressData: ProgressData;
}

const Milestone: React.FC<{ icon: React.ReactNode; title: string; description: string; achieved: boolean }> = ({ icon, title, description, achieved }) => (
    <div className={`flex items-start space-x-4 p-4 rounded-lg ${achieved ? 'bg-green-100' : 'bg-gray-100'}`}>
        <div className={`flex-shrink-0 ${achieved ? 'text-green-600' : 'text-gray-400'}`}>
            {icon}
        </div>
        <div>
            <h3 className={`font-bold ${achieved ? 'text-green-800' : 'text-gray-600'}`}>{title}</h3>
            <p className={`text-sm ${achieved ? 'text-green-700' : 'text-gray-500'}`}>{description}</p>
        </div>
        {achieved && <CheckCircle className="h-6 w-6 text-green-500 ml-auto" />}
    </div>
);


const ProgressTracker: React.FC<ProgressTrackerProps> = ({ userProfile, quitPlan, progressData }) => {
    const isTapering = userProfile.quitMethodology === Methodology.Tapering;

    const milestones = [
        { icon: <Award size={24}/>, title: '24 Hours Smoke-Free', description: 'The first day is the hardest. You did it!', achieved: progressData.smokeFreeStreak >= 1 },
        { icon: <Heart size={24}/>, title: 'Health Boost', description: 'Your heart rate and blood pressure are dropping.', achieved: progressData.smokeFreeStreak >= 2 },
        { icon: <Wind size={24}/>, title: 'Breathing Easier', description: 'Your lung function is starting to improve.', achieved: progressData.smokeFreeStreak >= 7 },
    ];
    
    if (!quitPlan.dailyPlans || quitPlan.dailyPlans.length === 0) {
        return (
            <div className="p-4 space-y-6 pb-24">
                <header>
                    <h1 className="text-2xl font-bold text-text-primary">Your Progress</h1>
                    <p className="text-text-secondary">See how far you've come.</p>
                </header>
                <div className="bg-bg-card p-4 rounded-2xl shadow-sm">
                    <h2 className="font-bold mb-4 text-center">Progress Chart</h2>
                    <div className="h-[250px] flex items-center justify-center">
                        <p className="text-text-secondary">Your progress chart will appear here once your plan starts.</p>
                    </div>
                </div>
                <div className="bg-bg-card p-4 rounded-2xl shadow-sm space-y-4">
                     <h2 className="font-bold text-center">Milestones</h2>
                     {milestones.map((m, i) => <Milestone key={i} {...m} />)}
                </div>
            </div>
        );
    }
    
    const chartData = quitPlan.dailyPlans.map((plan, index) => {
        const goalMatch = plan.goal.match(/\d+/);
        const goalCigs = isTapering && goalMatch ? parseInt(goalMatch[0], 10) : 0;
        return {
            name: `Day ${index + 1}`,
            goal: goalCigs,
            actual: progressData.dailyCigarettes[index] ?? 0,
        };
    });
    
    const smokeFreeData = quitPlan.dailyPlans.map((_, index) => ({
        name: `Day ${index + 1}`,
        smokeFree: (progressData.dailyCigarettes[index] ?? 1) === 0 ? 1 : 0,
    }));
    
    return (
        <div className="p-4 space-y-6 pb-24">
            <header>
                <h1 className="text-2xl font-bold text-text-primary">Your Progress</h1>
                <p className="text-text-secondary">See how far you've come.</p>
            </header>

            <div className="bg-bg-card p-4 rounded-2xl shadow-sm">
                <h2 className="font-bold mb-4 text-center">{isTapering ? 'Cigarettes Per Day' : 'Smoke-Free Days'}</h2>
                <ResponsiveContainer width="100%" height={250}>
                    {isTapering ? (
                        <LineChart data={chartData}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="name" />
                            <YAxis allowDecimals={false} />
                            <Tooltip />
                            <Legend />
                            <Line type="monotone" dataKey="goal" stroke="#8884d8" strokeWidth={2} name="Goal Limit" />
                            <Line type="monotone" dataKey="actual" stroke="#82ca9d" strokeWidth={2} name="Actual Smoked" />
                        </LineChart>
                    ) : (
                        <BarChart data={smokeFreeData}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="name" />
                            <YAxis allowDecimals={false} domain={[0, 1]} tickFormatter={(tick) => tick === 1 ? 'Yes' : 'No'} />
                            <Tooltip formatter={(value) => value === 1 ? "Smoke-Free" : "Not Smoke-Free"}/>
                            <Legend formatter={() => "Smoke-Free Day"} />
                            <Bar dataKey="smokeFree" fill="#10B981" name="Smoke-Free Day" />
                        </BarChart>
                    )}
                </ResponsiveContainer>
            </div>
            
            <div className="bg-bg-card p-4 rounded-2xl shadow-sm space-y-4">
                 <h2 className="font-bold text-center">Milestones</h2>
                 {milestones.map((m, i) => <Milestone key={i} {...m} />)}
            </div>
            
        </div>
    );
};

export default ProgressTracker;