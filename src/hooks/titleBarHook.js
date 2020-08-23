import { useState } from 'react';

export default function()
{
    const [getTitleStatus, setTitleStatus] = useState('');

    return ({
        getTitleStatus: getTitleStatus,
        setTitleStatus: setTitleStatus
    });
}