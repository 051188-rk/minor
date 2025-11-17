"use client";
import Link from "next/link";
import { FaCheckCircle, FaGraduationCap, FaClipboardCheck, FaRocket } from "react-icons/fa";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Hero Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-32">
        <div className="text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
            Transform Your <span className="text-indigo-600">Exam Preparation</span>
          </h1>
          <p className="mt-6 text-xl text-gray-600 max-w-3xl mx-auto">
            Generate customized mock tests and get instant evaluations with our AI-powered platform. 
            Perfect for students and educators looking to enhance learning outcomes.
          </p>
          
          {/* Action Buttons */}
          <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              href="/signup-student" 
              className="px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 md:py-4 md:text-lg md:px-10 transition-all duration-200 transform hover:scale-105"
            >
              Get Started as Student
            </Link>
            <Link 
              href="/signup-evaluator" 
              className="px-8 py-3 border border-transparent text-base font-medium rounded-md text-indigo-700 bg-indigo-100 hover:bg-indigo-200 md:py-4 md:text-lg md:px-10 transition-all duration-200"
            >
              Join as Evaluator
            </Link>
          </div>
          
          <div className="mt-8">
            <Link 
              href="/login" 
              className="text-indigo-600 hover:text-indigo-800 font-medium inline-flex items-center"
            >
              Already have an account? Sign in
              <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="text-center p-6 bg-gray-50 rounded-xl hover:shadow-lg transition-shadow">
              <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-indigo-100 text-indigo-600 mb-4">
                <FaGraduationCap className="h-8 w-8" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">Smart Test Generation</h3>
              <p className="text-gray-600">Create customized mock tests tailored to your study needs and curriculum.</p>
            </div>
            
            {/* Feature 2 */}
            <div className="text-center p-6 bg-gray-50 rounded-xl hover:shadow-lg transition-shadow">
              <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-green-100 text-green-600 mb-4">
                <FaClipboardCheck className="h-8 w-8" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">Instant Evaluation</h3>
              <p className="text-gray-600">Get detailed feedback and scores immediately after submission.</p>
            </div>
            
            {/* Feature 3 */}
            <div className="text-center p-6 bg-gray-50 rounded-xl hover:shadow-lg transition-shadow">
              <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-blue-100 text-blue-600 mb-4">
                <FaRocket className="h-8 w-8" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">AI-Powered Insights</h3>
              <p className="text-gray-600">Leverage Gemini AI for advanced document understanding and analysis.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-50 py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-gray-500 text-sm flex items-center justify-center">
            <FaCheckCircle className="mr-2 text-green-600" /> 
            Built with Next.js, Express, MongoDB, and Gemini
          </p>
        </div>
      </footer>
    </div>
  );
}
