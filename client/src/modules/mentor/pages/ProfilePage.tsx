import React, { useState } from "react";
import { Camera, CreditCard, KeyRound, User } from "lucide-react";
import PersonalDetails from "../components/profile/PersonalDetails";
import ChangePassword from "../components/profile/ChangePassword";
import BankDetails from "../components/profile/BankDetails";
import { useSelector } from "react-redux";
import { RootState } from "../../../store";

type NavState = "personal" | "password" | "bank";

const MentorProfile = () => {
  const { theme } = useSelector((state: RootState) => state.theme);
  const [navState, setNavState] = useState<NavState>("personal");

  const activeStyle =
    theme === "light"
      ? "border-purple-600 text-purple-600"
      : "border-purple-300 text-purple-300";

  return (
    <div className="w-full max-w-4xl mx-auto p-4 space-y-6">
      <h1 className="text-2xl font-bold">Account & Settings</h1>

      <div className="w-full">
        <div className="grid grid-cols-2 w-full mb-4">
          <button
            onClick={() => setNavState("personal")}
            className={`flex items-center gap-2 p-2 border-b-2 ${
              navState === "personal" && activeStyle
            }}`}
          >
            <User className="h-4 w-4" />
            Personal Details
          </button>
          <button
            onClick={() => setNavState("password")}
            className={`flex items-center gap-2 p-2 border-b-2 ${
              navState === "password" && activeStyle
            }}`}
          >
            {" "}
            <KeyRound className="h-4 w-4" />
            Change Password
          </button>
          {/* <button
            onClick={() => setNavState("bank")}
            className={`flex items-center gap-2 p-2 border-b-2 ${
              navState === "bank" && activeStyle
            }}`}
          >
            {" "}
            <CreditCard className="h-4 w-4" />
            Bank Details
          </button> */}
        </div>
        {navState === "personal" && <PersonalDetails />}

        {navState === "password" && <ChangePassword />}
        {navState === "bank" && <BankDetails />}

        {/* <div className="border rounded-lg p-4 mt-6 bg-red-50">
          <div className="text-xl font-semibold text-red-600 mb-4">
            Delete Account
          </div>
          <p className="text-sm text-red-600 mb-4">
            Delete your account and all of your source data. This is
            irreversible.
          </p>
          <button className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md">
            Delete Account
          </button>
        </div> */}
      </div>
    </div>
  );
};

export default MentorProfile;
