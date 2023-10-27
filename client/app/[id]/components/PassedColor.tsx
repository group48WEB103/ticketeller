'use client'
import React, { useState } from 'react';
import ColorThief from './ColorThief';
import EventInfo from './Event';
import { Event } from "../../../services/types";

interface PassedColorProps {
    image: string;
    location: string;
    event: Event;
}

const PassedColor: React.FC<PassedColorProps> = ({ image, location, event }) => {

    const [BackgroundColor, setBackgroundColor] = useState('');
    const [AccentColor, setAccentColor] = useState('');
    const [gotColor, setGotColor] = useState(0);
    const [resetCount, setresetCount] = useState(0);

    const getNewBackgroundColor = (newBackgroundColor: string) => {
        setBackgroundColor(newBackgroundColor);
        setGotColor(gotColor + 1);
    };

    const getNewAccentColor = (newAccentColor: string) => {
        setAccentColor(newAccentColor);
        setGotColor(gotColor + 1);
    };

    const resetGotColor = () => {
        setGotColor(0);
        setresetCount(resetCount + 1);
        if (resetCount > 50) {
            window.location.reload();
        }
        console.log('resetCount: ', resetCount);
    }

    return (
        <div>
            {gotColor < 2 && <ColorThief getBackgroundColor={(value: any) => getNewBackgroundColor(value)} getAccentColor={(value: any) => getNewAccentColor(value)} image={image} />}
            {gotColor === 2 ? <EventInfo event={event} location={location} BackgroundColor={BackgroundColor} AccentColor={AccentColor} retryColorThief={resetGotColor} /> : null}
        </div>
    )
}

export default PassedColor;