import React, { useState, useEffect } from "react";

interface CardInfo {
  cardNumber: string;
  expirationDate: string;
  cvv: string;
}

const CardPaymentForm: React.FC = () => {
  const [cardInfo, setCardInfo] = useState({
    cardNumber: "",
    expirationDate: "",
    cvv: "",
  });
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    document.title = `Enter Card Details - ${new Date().toLocaleString()}`;
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCardInfo({ ...cardInfo, [name]: value });
  };

  const validateCard = () => {
    return cardInfo.cardNumber.length === 16 && cardInfo.cvv.length === 3;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    if (validateCard()) {
      try {
        const response = await fetch("https://api.revenew.co/process-payment", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(cardInfo),
        });

        if (response.ok) {
          alert("Payment processed successfully!");
        } else {
          throw new Error("Payment processing failed");
        }
      } catch (error) {
        console.log("Error processing payment:", error);
        alert("Error processing payment. Please try again.");
      }
    } else {
      alert("Invalid card information. Please check and try again.");
    }

    setIsLoading(false);
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-xl">
      <h1 className="text-2xl font-bold mb-6 text-gray-800">
        Card Payment Form
      </h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label
            htmlFor="cardNumber"
            className="block text-sm font-medium text-gray-700"
          >
            Card Number
          </label>
          <input
            type="text"
            id="cardNumber"
            name="cardNumber"
            value={cardInfo.cardNumber}
            onChange={handleInputChange}
            placeholder="1234 5678 9012 3456"
            maxLength={16}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>
        <div>
          <label
            htmlFor="expirationDate"
            className="block text-sm font-medium text-gray-700"
          >
            Expiration Date
          </label>
          <input
            type="text"
            id="expirationDate"
            name="expirationDate"
            value={cardInfo.expirationDate}
            onChange={handleInputChange}
            placeholder="MM/YY"
            maxLength={5}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>
        <div>
          <label
            htmlFor="cvv"
            className="block text-sm font-medium text-gray-700"
          >
            CVV
          </label>
          <input
            type="text"
            id="cvv"
            name="cvv"
            value={cardInfo.cvv}
            onChange={handleInputChange}
            placeholder="123"
            maxLength={3}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>
        <button
          type="submit"
          disabled={isLoading}
          className={`w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 ${
            isLoading ? "opacity-50 cursor-not-allowed" : ""
          }`}
        >
          {isLoading ? "Processing..." : "Submit Payment"}
        </button>
      </form>
    </div>
  );
};

export default CardPaymentForm;
