import { useState } from 'react';

function ChatResponder() {
    const [messages, setMessages] = useState([
        { id: 1, type: "bot", text: "Hello! How can I help you today? Choose one option or type your issue." },
        { id: 2, type: "bot", text: "1. Resume Wizard\n2. Mock Interview\n3. Cognitive Test\n4. Technical Test\n5. Job Recommendation\n6. Roadmap\n7. Self Learning\n8. Community Support\n9. Skill Verification\n" }
    ]);
    const [input, setInput] = useState("");

    const predefinedErrors = {
        "resume wizard": "If you're facing issues in Resume Wizard, please make sure all fields are filled. \n If the issue persists, contact support.",
        "mock interview": "For Mock Interview issues, ensure your microphone and camera are enabled.",
        "cognitive test": "Issues in Cognitive Test can arise due to slow internet speed. Retry the test.",
        "technical test": "Choose a specific skill to get more details.",
        "job recommendation": "For Job Recommendations, ensure your profile details are updated.",
        "roadmap": "Facing issues in Roadmap? Let us know which section isn't visible.",
        "self learning": "Issues in Self Learning? Try refreshing your course page.",
        "community support": "Community Support is under maintenance for now.",
        "skill verification": "For Skill Verification issues, ensure your test results are submitted correctly."
    };

    const handleSend = () => {
        if (!input.trim()) return;

        const userMessage = { id: Date.now(), type: "user", text: input };
        setMessages([...messages, userMessage]);

        const lowerInput = input.toLowerCase().trim();
        const inputWords = lowerInput.split(/\s+/); // Split input into words

        let matchedResponse = null;

        // Check for matching keywords in predefinedErrors
        inputWords.forEach((word) => {
            Object.keys(predefinedErrors).forEach((key) => {
                if (key.toLowerCase().includes(word)) {
                    matchedResponse = predefinedErrors[key];
                }
            });
        });

        let botResponse;
        if (matchedResponse) {
            botResponse = matchedResponse;
        } else {
            botResponse =
                "This is a new type of error, our team will contact you in 2-3 working days.";
        }

        const botMessage = { id: Date.now() + 1, type: "bot", text: botResponse };

        setTimeout(() => {
            setMessages((prev) => [...prev, botMessage]);
        }, 500);

        setInput("");
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            handleSend();
        }
    };

    return (
        <div className="flex flex-col h-full">
            {/* Chat Window */}
            <div className="flex-1 p-2 overflow-y-auto bg-gray-50" style={{ maxHeight: '70vh' }}>
                {messages.map((msg) => (
                    <div
                        key={msg.id}
                        className={`my-1 p-2 rounded-md ${
                            msg.type === "bot"
                                ? "bg-gray-200 text-gray-800 self-start"
                                : "bg-gray-300 text-gray-800 self-end"
                        }`}
                    >
                        {msg.text.split("\n").map((line, idx) => (
                            <p key={idx}>{line}</p>
                        ))}
                    </div>
                ))}
            </div>

            {/* Input Box */}
            <div className="p-2 border-t border-gray-300 flex gap-2">
                <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder="Type your issue here..."
                    className="flex-1 p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-gray-500"
                />
                <button
                    onClick={handleSend}
                    className="bg-gray-800 text-white px-4 py-2 rounded-md hover:bg-gray-700"
                >
                    Send
                </button>
            </div>
        </div>
    );
}

export default ChatResponder;
