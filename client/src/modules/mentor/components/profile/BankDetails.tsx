import React from "react";

interface BankDetailsProps {}

const BankDetails: React.FC<BankDetailsProps> = ({}) => {
  return (
    <div>
      <div className="border rounded-lg p-4 mt-6">
        <div className="text-xl font-semibold mb-4">Bank Account Details</div>
        <div className="grid gap-4">
          <div className="grid gap-2">
            <label className="text-sm font-medium">Account Holder Name</label>
            <input
              className="border p-2 rounded-md"
              placeholder="Enter account holder name"
            />
          </div>
          <div className="grid gap-2">
            <label className="text-sm font-medium">Account Number</label>
            <input
              className="border p-2 rounded-md"
              placeholder="Enter account number"
            />
          </div>
          <div className="grid gap-2">
            <label className="text-sm font-medium">Bank Name</label>
            <input
              className="border p-2 rounded-md"
              placeholder="Enter bank name"
            />
          </div>
          <div className="grid gap-2">
            <label className="text-sm font-medium">IFSC Code</label>
            <input
              className="border p-2 rounded-md"
              placeholder="Enter IFSC code"
            />
          </div>
          <button className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-md mt-4">
            Save Bank Details
          </button>
        </div>
      </div>
    </div>
  );
};

export default BankDetails;
