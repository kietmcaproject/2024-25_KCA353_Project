// TokenInput.tsx
import React from "react";

interface TokenInputProps {
  token: string;
  onTokenChange: (value: string) => void;
}

const TokenInput: React.FC<TokenInputProps> = ({ token, onTokenChange }) => {
  return (
    <div className="mb-4">
      <label
        htmlFor="token"
        className="block text-sm font-medium text-gray-700"
      >
        Enter Verification Token
      </label>
      <input
        type="text"
        name="token"
        id="token"
        value={token}
        onChange={(e) => onTokenChange(e.target.value)}
        required
        className="mt-1 block w-full p-2 border border-gray-300 dark:bg-gray-900 dark:text-white rounded"
        placeholder="Enter the token sent to your email"
      />
    </div>
  );
};

export default TokenInput;