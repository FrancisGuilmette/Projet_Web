interface Props {
    messages: string[];
}

export default function PassiveAggressiveMessages({ messages }: Props) {
    return (
        <div>
            {messages.map((msg, i) => (
                <h3 key={i}>{msg}</h3>
            ))}
        </div>
    );
}