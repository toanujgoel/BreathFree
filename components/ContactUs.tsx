import React from 'react';
import { Mail, MapPin, User, ArrowLeft } from 'lucide-react';

interface ContactUsProps {
  onBack?: () => void;
}

export const ContactUs: React.FC<ContactUsProps> = ({ onBack }) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-blue-50 to-purple-50 p-4">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="mb-6">
          {onBack && (
            <button
              onClick={onBack}
              className="flex items-center text-gray-600 hover:text-gray-900 mb-4"
            >
              <ArrowLeft className="w-5 h-5 mr-2" />
              Back
            </button>
          )}
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Contact Us</h1>
          <p className="text-gray-600">
            We're here to help you on your smoke-free journey
          </p>
        </div>

        {/* Main Content */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-6">
          <div className="space-y-6">
            {/* App Info */}
            <div className="border-b pb-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4">About CleverQuit</h2>
              <div className="space-y-3">
                <div className="flex items-start">
                  <User className="w-5 h-5 text-blue-500 mr-3 mt-1 flex-shrink-0" />
                  <div>
                    <p className="font-semibold text-gray-900">App Name</p>
                    <p className="text-gray-600">CleverQuit</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <User className="w-5 h-5 text-blue-500 mr-3 mt-1 flex-shrink-0" />
                  <div>
                    <p className="font-semibold text-gray-900">Owner</p>
                    <p className="text-gray-600">Anuj Goel</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Information */}
            <div className="border-b pb-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Contact Information</h2>
              <div className="space-y-4">
                {/* Email */}
                <div className="flex items-start">
                  <Mail className="w-5 h-5 text-blue-500 mr-3 mt-1 flex-shrink-0" />
                  <div>
                    <p className="font-semibold text-gray-900">Email Address</p>
                    <a 
                      href="mailto:smokefree@cleverquit.com"
                      className="text-blue-600 hover:text-blue-700 hover:underline"
                    >
                      smokefree@cleverquit.com
                    </a>
                    <p className="text-sm text-gray-500 mt-1">
                      For support, feedback, or general inquiries
                    </p>
                  </div>
                </div>

                {/* Address */}
                <div className="flex items-start">
                  <MapPin className="w-5 h-5 text-blue-500 mr-3 mt-1 flex-shrink-0" />
                  <div>
                    <p className="font-semibold text-gray-900">Operating Address</p>
                    <p className="text-gray-600">
                      Near UP Pollution Control Board<br />
                      Sector 16, Vasundhara<br />
                      Ghaziabad, India
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Support Hours */}
            <div className="border-b pb-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Support Hours</h2>
              <p className="text-gray-600">
                We strive to respond to all inquiries within 24-48 hours during business days.
              </p>
              <div className="mt-3 p-4 bg-blue-50 rounded-lg">
                <p className="text-sm text-gray-700">
                  <strong>Note:</strong> For urgent matters related to your quit journey, 
                  please use our in-app AI chatbot available 24/7 for immediate support.
                </p>
              </div>
            </div>

            {/* What to Include */}
            <div>
              <h2 className="text-xl font-bold text-gray-900 mb-4">
                When Contacting Support
              </h2>
              <p className="text-gray-600 mb-3">
                To help us assist you better, please include:
              </p>
              <ul className="space-y-2 text-gray-600">
                <li className="flex items-start">
                  <span className="text-blue-500 mr-2">•</span>
                  <span>Your registered email address</span>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-500 mr-2">•</span>
                  <span>A detailed description of your issue or question</span>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-500 mr-2">•</span>
                  <span>Screenshots (if applicable)</span>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-500 mr-2">•</span>
                  <span>Device type and operating system version</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Quick Contact Card */}
        <div className="bg-gradient-to-r from-emerald-500 to-blue-500 rounded-2xl shadow-lg p-6 text-white">
          <h3 className="text-lg font-bold mb-2">Need Immediate Help?</h3>
          <p className="text-sm opacity-90 mb-4">
            Our AI-powered chatbot is available 24/7 within the app to provide 
            instant support for cravings and motivation.
          </p>
          <a
            href="mailto:smokefree@cleverquit.com"
            className="inline-block bg-white text-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-blue-50 transition-colors"
          >
            Email Us
          </a>
        </div>

        {/* Footer Note */}
        <div className="text-center mt-6 text-sm text-gray-500">
          <p>
            Last updated: November 13, 2025
          </p>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;
