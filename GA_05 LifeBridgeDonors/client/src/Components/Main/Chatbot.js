// Chatbot.js
import React, { useState } from "react";
import { FaTimes, FaComments } from "react-icons/fa";

const Chatbot = ({ faqs }) => {
  const [isChatbotOpen, setChatbotOpen] = useState(false);
  const [userQuestion, setUserQuestion] = useState("");
  const [answers, setAnswers] = useState([]);

  const toggleChatbot = () => {
    setChatbotOpen(!isChatbotOpen);
    // Clear answers when opening the chatbot
    if (!isChatbotOpen) {
      setAnswers([]);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Normalize user question
    const userInput = userQuestion.toLowerCase();

    // Search for keyword matches
    const response = faqs.find((faq) =>
      faq.keywords.some((keyword) => userInput.includes(keyword))
    );

    if (response) {
      setAnswers((prevAnswers) => [...prevAnswers, response.answer]);
    } else {
      setAnswers((prevAnswers) => [
        ...prevAnswers,
        "Sorry, I don't have an answer for that.",
      ]);
    }
    setUserQuestion("");
  };

  return (
    <div className="relative">
      {/* Chat Icon */}
      {!isChatbotOpen ? (
        <FaComments
          size={60}
          className="text-blue-500 cursor-pointer hover:scale-105 transition-transform shadow-lg rounded-full p-2 bg-white border-2 border-blue-600 hover:bg-blue-600 hover:text-white fixed bottom-5 right-5 z-50"
          onClick={toggleChatbot} // Toggle the chatbot on click
        />
      ) : (
        <div className="fixed bottom-5 right-5 z-50">
          <div className="relative bg-white-900 shadow-lg rounded-lg p-6 w-80 max-h-[90vh] overflow-y-auto transition-all duration-300 ease-in-out">
            <FaTimes
              size={24}
              className="absolute top-2 right-2 text-red-500 cursor-pointer hover:opacity-80 transition-opacity"
              onClick={toggleChatbot} // Close the chatbot on click
            />
            <h3 className="text-lg font-bold text-blue-600 mb-2">
              Have Questions?
            </h3>
            <p className="mb-4 text-gray-700">Chat with to know the answer</p>

            <div className="flex flex-col">
              <div className="overflow-y-auto max-h-[60vh] mb-4 p-2">
                {answers.map((answer, index) => (
                  <div
                    key={index}
                    className="mb-2 p-2 bg-gray-100 rounded shadow"
                  >
                    {answer}
                  </div>
                ))}
              </div>
              <form onSubmit={handleSubmit} className="flex">
                <input
                  type="text"
                  value={userQuestion}
                  onChange={(e) => setUserQuestion(e.target.value)}
                  placeholder="Type your question..."
                  className="flex-grow border rounded-l px-2 py-1 focus:outline-none focus:ring focus:ring-blue-500"
                />
                <button
                  type="submit"
                  className="bg-blue-600 text-white rounded-r px-4 py-1 hover:bg-blue-700 transition-colors"
                >
                  Ask
                </button>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Chatbot;
