import { useState } from "react";
import Timer from "../components/Timer";
import RunAwayButton from "../components/RunAwayButton";

export default function SupportPage() {

    return (
        <div>
            <Timer />
            <h1>Support</h1>

            <p>Did you click the button? EVEN THOUGH WE WARNED YOU NOT TO???</p>
            <p>  Dont worry! Just click this button to stop the timer. </p>

            <RunAwayButton />
        </div>
    );
}
