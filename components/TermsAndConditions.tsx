import React from 'react';
import { ArrowLeft, Shield, AlertCircle } from 'lucide-react';

interface TermsAndConditionsProps {
  onBack?: () => void;
}

export const TermsAndConditions: React.FC<TermsAndConditionsProps> = ({ onBack }) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-blue-50 to-purple-50 p-4">
      <div className="max-w-4xl mx-auto">
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
          <div className="flex items-center mb-4">
            <Shield className="w-8 h-8 text-blue-500 mr-3" />
            <h1 className="text-3xl font-bold text-gray-900">Terms & Conditions</h1>
          </div>
          <p className="text-gray-600">
            Last updated: November 13, 2025
          </p>
        </div>

        {/* Main Content */}
        <div className="bg-white rounded-2xl shadow-lg p-8 space-y-8">
          {/* Introduction */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">1. Introduction</h2>
            <p className="text-gray-700 leading-relaxed mb-3">
              Welcome to CleverQuit ("we," "our," or "us"). These Terms and Conditions ("Terms") 
              govern your access to and use of the CleverQuit mobile application and related services 
              (collectively, the "Service").
            </p>
            <p className="text-gray-700 leading-relaxed">
              By accessing or using our Service, you agree to be bound by these Terms. If you do not 
              agree to these Terms, please do not use our Service.
            </p>
            <div className="bg-blue-50 p-4 rounded-lg flex items-start">
              <AlertCircle className="w-5 h-5 text-blue-500 mr-3 mt-0.5 flex-shrink-0" />
              <p className="text-sm text-gray-700">
                <strong>Operated by:</strong> Anuj Goel, Near UP Pollution Control Board, 
                Sector 16, Vasundhara, Ghaziabad, India<br />
                <strong>Email:</strong> smokefree@cleverquit.com
              </p>
            </div>
          </section>

          {/* Acceptance of Terms */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">2. Acceptance of Terms</h2>
            <p className="text-gray-700 leading-relaxed mb-3">
              By creating an account or using CleverQuit, you acknowledge that you have read, 
              understood, and agree to be bound by these Terms and our Privacy Policy.
            </p>
            <p className="text-gray-700 leading-relaxed">
              You must be at least 18 years old to use our Service. By using the Service, you 
              represent and warrant that you meet this age requirement.
            </p>
          </section>

          {/* Service Description */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">3. Service Description</h2>
            <p className="text-gray-700 leading-relaxed mb-3">
              CleverQuit is an AI-powered smoking cessation application that provides:
            </p>
            <ul className="space-y-2 text-gray-700 ml-6">
              <li className="flex items-start">
                <span className="text-blue-500 mr-2">•</span>
                <span>Personalized quit smoking plans</span>
              </li>
              <li className="flex items-start">
                <span className="text-blue-500 mr-2">•</span>
                <span>Progress tracking and analytics</span>
              </li>
              <li className="flex items-start">
                <span className="text-blue-500 mr-2">•</span>
                <span>AI-powered chatbot support</span>
              </li>
              <li className="flex items-start">
                <span className="text-blue-500 mr-2">•</span>
                <span>Educational content and resources</span>
              </li>
              <li className="flex items-start">
                <span className="text-blue-500 mr-2">•</span>
                <span>Motivational tools and challenges</span>
              </li>
            </ul>
          </section>

          {/* User Account */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">4. User Account</h2>
            <h3 className="text-lg font-semibold text-gray-800 mb-2">4.1 Account Creation</h3>
            <p className="text-gray-700 leading-relaxed mb-3">
              To access certain features, you must create an account. You agree to:
            </p>
            <ul className="space-y-2 text-gray-700 ml-6 mb-4">
              <li className="flex items-start">
                <span className="text-blue-500 mr-2">•</span>
                <span>Provide accurate and complete information</span>
              </li>
              <li className="flex items-start">
                <span className="text-blue-500 mr-2">•</span>
                <span>Maintain the security of your password</span>
              </li>
              <li className="flex items-start">
                <span className="text-blue-500 mr-2">•</span>
                <span>Notify us immediately of any unauthorized access</span>
              </li>
              <li className="flex items-start">
                <span className="text-blue-500 mr-2">•</span>
                <span>Accept responsibility for all activities under your account</span>
              </li>
            </ul>
            <h3 className="text-lg font-semibold text-gray-800 mb-2">4.2 Account Termination</h3>
            <p className="text-gray-700 leading-relaxed">
              We reserve the right to suspend or terminate your account if you violate these Terms 
              or engage in fraudulent, abusive, or illegal activities.
            </p>
          </section>

          {/* Subscription and Payment */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">5. Subscription and Payment</h2>
            <h3 className="text-lg font-semibold text-gray-800 mb-2">5.1 Free Trial</h3>
            <p className="text-gray-700 leading-relaxed mb-3">
              We offer a 7-day free trial for new users. After the trial period, your subscription 
              will automatically renew at the standard rate unless cancelled.
            </p>
            <h3 className="text-lg font-semibold text-gray-800 mb-2">5.2 Premium Subscription</h3>
            <p className="text-gray-700 leading-relaxed mb-3">
              Premium subscriptions are available on monthly, quarterly, annual, and lifetime basis. 
              All subscription fees are non-refundable. You may cancel your subscription at any time, 
              but no refunds will be provided for the current or past billing periods.
            </p>
            <h3 className="text-lg font-semibold text-gray-800 mb-2">5.3 Automatic Renewal</h3>
            <p className="text-gray-700 leading-relaxed mb-3">
              Subscriptions automatically renew unless cancelled at least 24 hours before the end 
              of the current period. You will be charged within 24 hours prior to the end of the 
              current period. All subscription payments are non-refundable.
            </p>
            <h3 className="text-lg font-semibold text-gray-800 mb-2">5.4 Price Changes</h3>
            <p className="text-gray-700 leading-relaxed">
              We reserve the right to modify subscription prices. Any price changes will be 
              communicated at least 30 days in advance and will apply to subsequent billing periods.
            </p>
          </section>

          {/* Usage Restrictions */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">6. Usage Restrictions</h2>
            <p className="text-gray-700 leading-relaxed mb-3">
              You agree not to:
            </p>
            <ul className="space-y-2 text-gray-700 ml-6">
              <li className="flex items-start">
                <span className="text-red-500 mr-2">✗</span>
                <span>Use the Service for any illegal purpose</span>
              </li>
              <li className="flex items-start">
                <span className="text-red-500 mr-2">✗</span>
                <span>Attempt to gain unauthorized access to our systems</span>
              </li>
              <li className="flex items-start">
                <span className="text-red-500 mr-2">✗</span>
                <span>Reverse engineer or decompile the application</span>
              </li>
              <li className="flex items-start">
                <span className="text-red-500 mr-2">✗</span>
                <span>Share your account credentials with others</span>
              </li>
              <li className="flex items-start">
                <span className="text-red-500 mr-2">✗</span>
                <span>Upload malicious code or viruses</span>
              </li>
              <li className="flex items-start">
                <span className="text-red-500 mr-2">✗</span>
                <span>Scrape or harvest data from the Service</span>
              </li>
              <li className="flex items-start">
                <span className="text-red-500 mr-2">✗</span>
                <span>Impersonate any person or entity</span>
              </li>
            </ul>
          </section>

          {/* Intellectual Property */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">7. Intellectual Property</h2>
            <p className="text-gray-700 leading-relaxed mb-3">
              All content, features, and functionality of the Service, including but not limited to 
              text, graphics, logos, icons, images, audio clips, and software, are the exclusive 
              property of CleverQuit or its licensors.
            </p>
            <p className="text-gray-700 leading-relaxed">
              You may not copy, modify, distribute, sell, or lease any part of our Service without 
              our express written permission.
            </p>
          </section>

          {/* Medical Disclaimer */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">8. Medical Disclaimer</h2>
            <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-3">
              <p className="text-gray-700 leading-relaxed font-semibold mb-2">
                Important Notice:
              </p>
              <p className="text-gray-700 leading-relaxed">
                CleverQuit is a wellness and motivational tool, not a medical device or service. 
                Our Service is not intended to diagnose, treat, cure, or prevent any disease or 
                medical condition.
              </p>
            </div>
            <p className="text-gray-700 leading-relaxed mb-3">
              The information provided through our Service is for educational and informational 
              purposes only. Always seek the advice of your physician or other qualified health 
              provider with any questions regarding smoking cessation or your health.
            </p>
            <p className="text-gray-700 leading-relaxed">
              Never disregard professional medical advice or delay seeking it because of something 
              you have read on CleverQuit.
            </p>
          </section>

          {/* Limitation of Liability */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">9. Limitation of Liability</h2>
            <p className="text-gray-700 leading-relaxed mb-3">
              To the maximum extent permitted by law, CleverQuit and its operators shall not be 
              liable for any indirect, incidental, special, consequential, or punitive damages, 
              including but not limited to:
            </p>
            <ul className="space-y-2 text-gray-700 ml-6 mb-3">
              <li className="flex items-start">
                <span className="text-blue-500 mr-2">•</span>
                <span>Loss of profits or revenue</span>
              </li>
              <li className="flex items-start">
                <span className="text-blue-500 mr-2">•</span>
                <span>Loss of data or information</span>
              </li>
              <li className="flex items-start">
                <span className="text-blue-500 mr-2">•</span>
                <span>Business interruption</span>
              </li>
              <li className="flex items-start">
                <span className="text-blue-500 mr-2">•</span>
                <span>Personal injury or health issues</span>
              </li>
            </ul>
            <p className="text-gray-700 leading-relaxed">
              Our total liability shall not exceed the amount you paid for the Service in the 
              12 months preceding the claim.
            </p>
          </section>

          {/* Warranty Disclaimer */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">10. Warranty Disclaimer</h2>
            <p className="text-gray-700 leading-relaxed mb-3">
              THE SERVICE IS PROVIDED "AS IS" AND "AS AVAILABLE" WITHOUT WARRANTIES OF ANY KIND, 
              EITHER EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO:
            </p>
            <ul className="space-y-2 text-gray-700 ml-6">
              <li className="flex items-start">
                <span className="text-blue-500 mr-2">•</span>
                <span>Warranties of merchantability</span>
              </li>
              <li className="flex items-start">
                <span className="text-blue-500 mr-2">•</span>
                <span>Fitness for a particular purpose</span>
              </li>
              <li className="flex items-start">
                <span className="text-blue-500 mr-2">•</span>
                <span>Non-infringement</span>
              </li>
              <li className="flex items-start">
                <span className="text-blue-500 mr-2">•</span>
                <span>Uninterrupted or error-free operation</span>
              </li>
            </ul>
          </section>

          {/* Indemnification */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">11. Indemnification</h2>
            <p className="text-gray-700 leading-relaxed">
              You agree to indemnify, defend, and hold harmless CleverQuit, its operators, and 
              affiliates from any claims, damages, losses, liabilities, and expenses (including 
              legal fees) arising from your use of the Service, violation of these Terms, or 
              infringement of any third-party rights.
            </p>
          </section>

          {/* Dispute Resolution */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">12. Dispute Resolution</h2>
            <h3 className="text-lg font-semibold text-gray-800 mb-2">12.1 Governing Law</h3>
            <p className="text-gray-700 leading-relaxed mb-3">
              These Terms shall be governed by and construed in accordance with the laws of India, 
              without regard to its conflict of law provisions.
            </p>
            <h3 className="text-lg font-semibold text-gray-800 mb-2">12.2 Jurisdiction</h3>
            <p className="text-gray-700 leading-relaxed mb-3">
              Any disputes arising from these Terms or your use of the Service shall be subject 
              to the exclusive jurisdiction of the courts in Ghaziabad, Uttar Pradesh, India.
            </p>
            <h3 className="text-lg font-semibold text-gray-800 mb-2">12.3 Informal Resolution</h3>
            <p className="text-gray-700 leading-relaxed">
              Before initiating formal proceedings, we encourage you to contact us at 
              smokefree@cleverquit.com to seek an informal resolution.
            </p>
          </section>

          {/* Changes to Terms */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">13. Changes to Terms</h2>
            <p className="text-gray-700 leading-relaxed mb-3">
              We reserve the right to modify these Terms at any time. We will notify users of any 
              material changes via email or through the Service.
            </p>
            <p className="text-gray-700 leading-relaxed">
              Your continued use of the Service after changes become effective constitutes your 
              acceptance of the revised Terms.
            </p>
          </section>

          {/* Termination */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">14. Termination</h2>
            <p className="text-gray-700 leading-relaxed mb-3">
              We may terminate or suspend your account and access to the Service immediately, 
              without prior notice, for any reason, including if you breach these Terms.
            </p>
            <p className="text-gray-700 leading-relaxed">
              Upon termination, your right to use the Service will immediately cease. All provisions 
              of these Terms that by their nature should survive termination shall survive.
            </p>
          </section>

          {/* Severability */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">15. Severability</h2>
            <p className="text-gray-700 leading-relaxed">
              If any provision of these Terms is found to be unenforceable or invalid, that provision 
              shall be limited or eliminated to the minimum extent necessary, and the remaining 
              provisions shall remain in full force and effect.
            </p>
          </section>

          {/* Contact Information */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">16. Contact Information</h2>
            <p className="text-gray-700 leading-relaxed mb-3">
              If you have any questions about these Terms, please contact us:
            </p>
            <div className="bg-gray-50 p-4 rounded-lg">
              <p className="text-gray-700"><strong>Email:</strong> smokefree@cleverquit.com</p>
              <p className="text-gray-700 mt-2">
                <strong>Address:</strong> Near UP Pollution Control Board, Sector 16, 
                Vasundhara, Ghaziabad, India
              </p>
            </div>
          </section>

          {/* Acknowledgment */}
          <section className="bg-blue-50 p-6 rounded-lg">
            <h2 className="text-xl font-bold text-gray-900 mb-3">Acknowledgment</h2>
            <p className="text-gray-700 leading-relaxed">
              By using CleverQuit, you acknowledge that you have read, understood, and agree to be 
              bound by these Terms and Conditions.
            </p>
          </section>
        </div>

        {/* Footer */}
        <div className="text-center mt-6 text-sm text-gray-500">
          <p>© 2025 CleverQuit. All rights reserved.</p>
        </div>
      </div>
    </div>
  );
};

export default TermsAndConditions;
