import React, { useEffect, useState } from "react";

const TabSwitchAlert = () => {
    const [isInputFocused, setIsInputFocused] = useState(false);

    const handleVisibilityChange = () => {
        if (document.hidden && !isInputFocused) {
            alert("Tab switched!");
        }
    };

    const handleInputFocus = () => {
        setIsInputFocused(true);
    };

    const handleInputBlur = () => {
        setIsInputFocused(false);
    };

    useEffect(() => {
        document.addEventListener("visibilitychange", handleVisibilityChange);

        return () => {
            document.removeEventListener("visibilitychange", handleVisibilityChange);
        };
    }, [isInputFocused]);

    return (
        <div>
            <div>Tab Switch Alert</div>
            <input type="text" onFocus={handleInputFocus} onBlur={handleInputBlur} placeholder="Type here..." />
        </div>
    );
};

export default TabSwitchAlert;
