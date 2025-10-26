// ChatbotWidget.js
import React, { useState } from 'react';
// Add this function at the top of ChatbotWidget.js

const getBotResponse = (message) => {
  const lowerMsg = message.toLowerCase();

  // --- Greeting and Basic Help ---
  if (lowerMsg.includes("hello") || lowerMsg.includes("hi")) {
    return "Hi! I'm your Flow Assistant. Ask me for an 'if example' or a 'for loop example'.";
  }

  if (lowerMsg.includes("how to add") || lowerMsg.includes("create a node")) {
    return "You can add any node by dragging it from the sidebar on the left onto the canvas.";
  }

  // --- Flow Recipe 1: Summing Numbers with a For Loop ---
  if (lowerMsg.includes("sum numbers") || lowerMsg.includes("for loop example")) {
    return (
      "To sum numbers from 1 to 10:\n\n" +
      "1. **Assign Node**: Create a variable `sum` and set its value to `0`.\n\n" +
      "2. **For Node**: Create a loop with variable `i` in range `11` (for 0 to 10).\n\n" +
      "3. **Assign Node**: Inside the loop, update `sum` with the expression `sum + i`.\n\n" +
      "4. **Print Node**: After the loop, print the final value of `sum`."
    );
  }

  // --- Flow Recipe 2: Checking a value with an If Node ---
  if (lowerMsg.includes("check a value") || lowerMsg.includes("if example")) {
    return (
      "To check if a variable `x` is greater than 5:\n\n" +
      "1. **Assign Node**: Create a variable `x` and set its value to `10`.\n\n" +
      "2. **If Node**: Set the condition to `x > 5`.\n\n" +
      "3. **Print Node**: Create a node to print `'x is bigger'`.\n\n" +
      "4. **Connect**: Connect the 'True' output of the 'If' node to this Print node."
    );
  }

  // --- Fallback Response ---
  return "Sorry, I don't recognize that command. Try asking for an 'if example' or a 'for loop example'.";
};

// A simple Chat icon SVG
const ChatIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
    <path strokeLinecap="round" strokeLinejoin="round" d="M8.625 12a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H8.25m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H12m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0h-.375M21 12c0 4.556-3.86 8.25-8.625 8.25a9.003 9.003 0 01-5.373-1.618l-2.955.985a.75.75 0 01-.965-.965l.985-2.955a9.003 9.003 0 01-1.618-5.373C2.25 7.444 6.11 3.75 10.875 3.75S19.5 7.444 19.5 12z" />
  </svg>
);

// A simple Close icon SVG
const CloseIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
  </svg>
);


const ChatbotWidget = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { from: 'bot', text: 'Hi! How can I help you build your flow?' }
  ]);
  const [inputText, setInputText] = useState('');

  const toggleChat = () => {
    setIsOpen(!isOpen);
  };

  const handleSend = () => {
    if (inputText.trim() === '') return;

    // Add user message
    const newMessages = [...messages, { from: 'user', text: inputText }];
    setMessages(newMessages);

    // --- This is where your bot logic will go ---
    // For now, let's just echo
    // --- Call the bot's brain ---
    setTimeout(() => {
        const botResponse = getBotResponse(inputText); // Get the smart response
        setMessages(prevMessages => [...prevMessages, { from: 'bot', text: botResponse }]);
    }, 500);
// ----------------------------
    // ------------------------------------------

    setInputText('');
  };

  return (
    <div className="fixed bottom-5 right-5 z-50">
      {/* Chat Window */}
      {isOpen && (
        <div className="w-80 h-96 bg-gray-700 rounded-lg shadow-xl flex flex-col">
          {/* Header */}
          <div className="bg-gray-900 p-3 rounded-t-lg text-white font-bold flex justify-between items-center">
            <span>Flow Assistant</span>
            <button onClick={toggleChat} className="text-gray-300 hover:text-white">
              <CloseIcon />
            </button>
          </div>

          {/* Message List */}
          <div className="flex-1 p-3 overflow-y-auto space-y-2">
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`p-2 rounded-lg max-w-[80%] ${
                  msg.from === 'bot'
                    ? 'bg-gray-600 text-white self-start'
                    : 'bg-blue-600 text-white self-end'
                }`}
              >
                {msg.text}
              </div>
            ))}
          </div>

          {/* Input Footer */}
          <div className="p-2 border-t border-gray-600 flex">
            <input
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSend()}
              placeholder="Ask a question..."
              className="flex-1 bg-gray-600 text-white rounded-l-md p-2 outline-none"
            />
            <button
              onClick={handleSend}
              className="bg-blue-600 text-white rounded-r-md p-2 hover:bg-blue-700"
            >
              Send
            </button>
          </div>
        </div>
      )}

      {/* Toggle Button (only show if chat is closed) */}
      {!isOpen && (
        <button
          onClick={toggleChat}
          className="bg-blue-600 text-white rounded-full p-3 shadow-lg hover:bg-blue-700"
        >
          <ChatIcon />
        </button>
      )}
    </div>
  );
};

export default ChatbotWidget;
