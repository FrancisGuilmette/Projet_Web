import { useState } from "react";
import Timer from "../components/Timer";
import RunAwayButton from "../components/RunAwayButton";
import PassiveAggressiveMessages from "../components/UnhelpfulTips";

export default function SupportPage() {

    return (
        <div>
            <Timer />
            <h1>Support</h1>

            <p>Did you click the button? EVEN THOUGH WE WARNED YOU NOT TO???</p>
            <p>  Dont worry! Just click this button to stop the timer. </p>

            <RunAwayButton />

            <PassiveAggressiveMessages messages={[
                "FAQ: Q: Why is the timer running feel so fast? A: Dunno.",
                "FAQ: Q: Why are you doing this? A: Uhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhh",
                "FAQ: Q: Am i real? A: According to René Descartes, you think therefore you are.",
                "FAQ: Q: Am i in danger. A: Dunno",
            ]} />
        </div>
    );
}
