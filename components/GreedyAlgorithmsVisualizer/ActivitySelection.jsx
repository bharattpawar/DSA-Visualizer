import React, { useState } from 'react';
import { generateRandomActivities, handleInput } from './utils/randomValueGenerator';
import './styles/ActivitySelection.css';

const ActivitySelection = () => {
    const [activities, setActivities] = useState([]);
    const [selectedActivities, setSelectedActivities] = useState([]);
    const [explanation, setExplanation] = useState('');
    const [isRunning, setIsRunning] = useState(false);

    const handleRandomValues = () => {
        const randomActivities = generateRandomActivities(5, 1, 20);
        setActivities(randomActivities);
        setExplanation('Random activities generated. Click "Select Activities" to see the optimal selection.');
        setSelectedActivities([]);
        setIsRunning(false);
    };

    const handleUserInput = (event) => {
        const inputValues = event.target.value.split(',').map(pair => {
            const [start, end] = pair.split('-').map(Number);
            return { start, end };
        });
        setActivities(inputValues);
        setExplanation('Activities entered. Click "Select Activities" to see the optimal selection.');
        setSelectedActivities([]);
        setIsRunning(false);
    };

    const selectActivities = () => {
        if (activities.length === 0) {
            setExplanation('Please enter activities or generate random values.');
            return;
        }

        if (isRunning) return; // Prevent multiple clicks

        setIsRunning(true);
        setExplanation('Starting activity selection...');

        const sortedActivities = [...activities].sort((a, b) => a.end - b.end);
        const selected = [];
        let lastFinishTime = 0;

        // Reset all activities to default state
        document.querySelectorAll('.activity').forEach(activity => {
            activity.style.backgroundColor = '#e0e0e0';
        });

        // Step-by-step selection
        let step = 0;
        const processStep = () => {
            if (step >= sortedActivities.length) {
                setIsRunning(false);
                setExplanation('All activities processed. The selected activities are highlighted.');
                return;
            }

            const currentActivity = sortedActivities[step];
            const activityElement = document.querySelector(`.activity[data-index="${step}"]`);

            if (currentActivity.start >= lastFinishTime) {
                selected.push(currentActivity);
                lastFinishTime = currentActivity.end;

                // Highlight the selected activity
                if (activityElement) {
                    activityElement.style.backgroundColor = '#69b3a2'; // Green for selected
                }

                setSelectedActivities([...selected]);
                setExplanation(`Activity ${step + 1} (${currentActivity.start}-${currentActivity.end}) is selected because it does not conflict with the last selected activity.`);
            } else {
                // Highlight the rejected activity
                if (activityElement) {
                    activityElement.style.backgroundColor = '#ff6b6b'; // Red for rejected
                }

                setExplanation(`Activity ${step + 1} (${currentActivity.start}-${currentActivity.end}) is rejected because it conflicts with the last selected activity.`);
            }

            step++;
            setTimeout(processStep, 1000); // 1-second delay between steps
        };

        processStep(); // Start the first step
    };

    return (
        <div className="activity-selection">
            <h3>Activity Selection</h3>
            <button onClick={handleRandomValues}>Generate Random Activities</button>
            <input type="text" placeholder="Enter activities (e.g., 1-3,2-5,6-8)" onChange={handleUserInput} />
            <button onClick={selectActivities} disabled={isRunning}>
                {isRunning ? 'Processing...' : 'Select Activities'}
            </button>
            <div className="activities">
                <h4>Activities:</h4>
                {activities.map((activity, index) => (
                    <div key={index} className="activity" data-index={index}>
                        Activity {index + 1}: {activity.start}-{activity.end}
                    </div>
                ))}
            </div>
            <div className="selected-activities">
                <h4>Selected Activities:</h4>
                {selectedActivities.map((activity, index) => (
                    <div key={index} className="activity">
                        {activity.start}-{activity.end}
                    </div>
                ))}
            </div>
            <div className="explanation">{explanation}</div>
        </div>
    );
};

export default ActivitySelection;