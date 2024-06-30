import React, { useState, useEffect } from 'react';
import { Progress } from './ui/progress';

const InfiniteProgress = () => {
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setProgress(prevProgress => {
                if (prevProgress >= 100) {
                    return 0;
                }
                return prevProgress + 1;
            });
        }, 100); // Adjust the speed by changing the interval time (100ms here)

        return () => {
            clearInterval(interval);
        };
    }, []);

    return <Progress className=' md:w-72 w-44 mx-auto mt-6 mb-10' value={progress} />;
};

export default InfiniteProgress;
