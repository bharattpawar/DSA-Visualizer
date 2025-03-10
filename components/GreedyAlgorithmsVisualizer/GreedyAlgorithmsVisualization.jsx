import React, { useState } from 'react';
import { generateRandomActivities } from './utils/randomValueGenerator';
import { animate } from './utils/animation';

const GreedyAlgorithmsVisualization = () => {
    const [activities, setActivities] = useState([]);
    const [selectedActivities, setSelectedActivities] = useState([]);
    const [explanation, setExplanation] = useState('');
    const [stepByStepExplanation, setStepByStepExplanation] = useState([]);

    const handleRandomValues = () => {
        const randomActivities = generateRandomActivities(5, 1, 20); // Generate 5 random activities
        setActivities(randomActivities);
        setExplanation('Random activities generated. Click "Select Activities" to see the optimal selection.');
        setSelectedActivities([]);
        setStepByStepExplanation([]);
    };

    const handleUserInput = (event) => {
        const inputValues = event.target.value.split(',').map(pair => {
            const [start, end] = pair.split('-').map(Number);
            return { start, end };
        });
        setActivities(inputValues);
        setExplanation('Activities entered. Click "Select Activities" to see the optimal selection.');
        setSelectedActivities([]);
        setStepByStepExplanation([]);
    };

    const selectActivities = () => {
        if (activities.length === 0) {
            setExplanation('Please enter activities or generate random values.');
            return;
        }

        const steps = [];
        steps.push('Step 1: Start with the given activities.');
        steps.push(`Activities: ${activities.map(activity => `${activity.start}-${activity.end}`).join(', ')}`);

        const sortedActivities = activities.sort((a, b) => a.end - b.end);
        steps.push('Step 2: Sort the activities based on their finish time.');
        steps.push(`Sorted Activities: ${sortedActivities.map(activity => `${activity.start}-${activity.end}`).join(', ')}`);

        const selected = [];
        let lastFinishTime = 0;

        sortedActivities.forEach(activity => {
            if (activity.start >= lastFinishTime) {
                selected.push(activity);
                lastFinishTime = activity.end;
                steps.push(`Step ${selected.length + 2}: Select activity ${activity.start}-${activity.end} as it does not conflict with the last selected activity.`);
            } else {
                steps.push(`Step ${selected.length + 2}: Skip activity ${activity.start}-${activity.end} as it conflicts with the last selected activity.`);
            }
        });

        setSelectedActivities(selected);
        setExplanation('Activities selected based on the earliest finish time. Highlighted activities are part of the optimal set.');
        setStepByStepExplanation(steps);
        animate(document.querySelectorAll('.activity'), 500);
    };

    return (
        <div className="visualization">
            <h3>Greedy Algorithms Visualization</h3>
            <button onClick={handleRandomValues}>Generate Random Activities</button>
            <input type="text" placeholder="Enter activities (e.g., 1-3,2-5,6-8)" onChange={handleUserInput} />
            <button onClick={selectActivities}>Select Activities</button>
            <div className="activities">
                <h4>Activities:</h4>
                {activities.map((activity, index) => (
                    <div key={index} className="activity">
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
            <div className="explanation">
                <h4>Explanation:</h4>
                <p>{explanation}</p>
                <h4>Step-by-Step Process:</h4>
                <ul>
                    {stepByStepExplanation.map((step, index) => (
                        <li key={index}>{step}</li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default GreedyAlgorithmsVisualization;