import React, { useEffect, useState } from "react";
import "./quote.css";

function QuoteMachine() {
  const [quote, setQuote] = useState("");
  const [author, setAuthor] = useState("");
  const [color, setColor] = useState("");
  const [quotes, setQuotes] = useState([]);
  const fetchQuotes = async () => {
    try {
      const response = await fetch("https://type.fit/api/quotes");
      const data = await response.json();
      setQuotes(data);
    } catch (error) {
      console.error("Error fetching quotes:", error);
    }
  };
  const randomQuote = () => {
    const randomNumber = Math.floor(Math.random() * quotes.length);
    setQuote(quotes[randomNumber].text);
    setAuthor(quotes[randomNumber].author);
    setColor(getRandomColor());
  };
  const getRandomColor = () => {
    const randomColor = Math.floor(Math.random() * 16777215).toString(16);
    return "#" + randomColor;
  };

  useEffect(() => {
    fetchQuotes();
  }, []);

  return (
    <div className="quote-box">
      <div className="quote-style" style={{ backgroundColor: color }}>
        <p>"{quote}"</p>
        <p>- {author}</p>
      </div>
      <button className="quote-btn" onClick={randomQuote}>
        Get Quote
      </button>
    </div>
  );
}

export default QuoteMachine;
