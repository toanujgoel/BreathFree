
import React from 'react';
import { DailyPlan } from '../types';
import { Calendar, Target, Wind } from 'lucide-react';

interface WeeklyPlanViewProps {
    dailyPlans: DailyPlan[];
}

const WeeklyPlanView: React.FC<WeeklyPlanViewProps> = ({ dailyPlans }) => {
    return (
        <div className="space-y-3 animate-fade-in">
            {dailyPlans.map((plan) => (
                <div key={plan.day} className="bg-gray-50 p-3 rounded-lg border border-gray-200">
                    <p className="font-bold text-brand-primary mb-2 flex items-center">
                        <Calendar size={16} className="mr-2" /> Day {plan.day}
                    </p>
                    <div className="space-y-2 text-sm">
                        <p className="flex items-start">
                            <Target size={14} className="mr-2 mt-0.5 flex-shrink-0 text-gray-500" />
                            <span className="font-semibold text-text-primary mr-1">Goal:</span>
                            <span>{plan.goal}</span>
                        </p>
                        <p className="flex items-start">
                             <Wind size={14} className="mr-2 mt-0.5 flex-shrink-0 text-gray-500" />
                             <span className="font-semibold text-text-primary mr-1">Exercise:</span>
                             <span>{plan.mindfulnessExercise}</span>
                        </p>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default WeeklyPlanView;
