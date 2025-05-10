"use client";
import { useState } from "react";

export default function BrokerageContactForm() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [propertyId, setPropertyId] = useState("");
  const [isPhoneValid, setIsPhoneValid] = useState(false);
  const [isPhoneVerified, setIsPhoneVerified] = useState(false);
  const [isVerifying, setIsVerifying] = useState(false);
  const [validationMessage, setValidationMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState("");

  const validatePhone = (value: string) => /^\d{10}$/.test(value);

  const handlePhoneChange = (value: string) => {
    setPhone(value);
    setIsPhoneValid(validatePhone(value));
    setIsPhoneVerified(false);
    setValidationMessage("");
  };

  const verifyPhoneNumber = async () => {
    if (!isPhoneValid) {
      setValidationMessage("Please enter a valid 10-digit number");
      return;
    }
    setIsVerifying(true);
    setValidationMessage("Verifying...");
    setTimeout(() => {
      setIsPhoneVerified(true);
      setIsVerifying(false);
      setValidationMessage("Phone number verified!");
    }, 1000);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitMessage("");
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitMessage("Your request has been submitted! We will contact you soon.");
    }, 1500);
  };

  return (
    <form className="space-y-6" onSubmit={handleSubmit}>
      <div>
        <label className="block mb-2 text-white font-semibold">Name</label>
        <input
          type="text"
          value={name}
          onChange={e => setName(e.target.value)}
          className="w-full bg-white/5 p-3 rounded-lg border border-white/20 focus:border-electric-blue outline-none text-white"
          placeholder="Enter your name"
          required
        />
      </div>
      <div>
        <label className="block mb-2 text-white font-semibold">Phone Number</label>
        <div className="flex gap-2 items-center">
          <input
            type="tel"
            value={phone}
            onChange={e => handlePhoneChange(e.target.value)}
            className="flex-1 bg-white/5 p-3 rounded-lg border border-white/20 focus:border-electric-blue outline-none text-white"
            placeholder="Enter 10-digit number"
            maxLength={10}
            required
          />
          <button
            type="button"
            onClick={verifyPhoneNumber}
            disabled={isVerifying || !isPhoneValid || isPhoneVerified}
            className={`px-4 py-2 rounded-lg transition-colors ${
              isVerifying || !isPhoneValid || isPhoneVerified
                ? "bg-gray-500 text-gray-300 cursor-not-allowed"
                : "bg-electric-blue text-black hover:bg-blue-600"
            }`}
          >
            {isPhoneVerified ? "Verified" : isVerifying ? "Verifying..." : "Verify"}
          </button>
        </div>
        {validationMessage && (
          <p className={`mt-1 text-sm ${isPhoneVerified ? "text-green-400" : "text-red-400"}`}>{validationMessage}</p>
        )}
      </div>
      <div>
        <label className="block mb-2 text-white font-semibold">Property ID</label>
        <input
          type="text"
          value={propertyId}
          onChange={e => setPropertyId(e.target.value.toUpperCase())}
          className="w-full bg-white/5 p-3 rounded-lg border border-white/20 focus:border-electric-blue outline-none text-white"
          placeholder="e.g. R1, C3, W7, L8"
          pattern="^(R|C|W|L)\d+$"
          required
        />
        <p className="text-xs text-gray-400 mt-1">Accepted formats: R1, C3, W7, L8</p>
      </div>
      <button
        type="submit"
        disabled={isSubmitting || !name || !isPhoneVerified || !propertyId}
        className={`px-4 py-2 rounded-lg transition-colors font-semibold flex items-center justify-center ${
          isSubmitting || !name || !isPhoneVerified || !propertyId
            ? "bg-gray-500 text-gray-300 cursor-not-allowed"
            : "bg-electric-blue text-black hover:bg-blue-600"
        }`}
      >
        {isSubmitting ? "Submitting..." : "Submit"}
      </button>
      {submitMessage && (
        <p className="mt-3 text-green-400 text-center">{submitMessage}</p>
      )}
    </form>
  );
}
