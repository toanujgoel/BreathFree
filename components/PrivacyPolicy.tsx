import React from 'react';
import { ArrowLeft, Shield, Lock, Eye, Database, Globe } from 'lucide-react';

interface PrivacyPolicyProps {
  onBack?: () => void;
}

export const PrivacyPolicy: React.FC<PrivacyPolicyProps> = ({ onBack }) => {
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
            <Lock className="w-8 h-8 text-blue-500 mr-3" />
            <h1 className="text-3xl font-bold text-gray-900">Privacy Policy</h1>
          </div>
          <p className="text-gray-600">
            Last updated: November 13, 2025
          </p>
        </div>

        {/* Main Content */}
        <div className="bg-white rounded-2xl shadow-lg p-8 space-y-8">
          {/* Introduction */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Introduction</h2>
            <p className="text-gray-700 leading-relaxed mb-3">
              Welcome to CleverQuit's Privacy Policy. We respect your privacy and are committed to 
              protecting your personal data. This policy explains how we collect, use, store, and 
              protect your information when you use our application.
            </p>
            <div className="bg-blue-50 p-4 rounded-lg">
              <p className="text-gray-700">
                <strong>Operated by:</strong> Anuj Goel<br />
                <strong>Contact:</strong> smokefree@cleverquit.com<br />
                <strong>Address:</strong> Near UP Pollution Control Board, Sector 16, Vasundhara, 
                Ghaziabad, India
              </p>
            </div>
          </section>

          {/* Information We Collect */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
              <Database className="w-6 h-6 text-blue-500 mr-2" />
              1. Information We Collect
            </h2>
            
            <h3 className="text-lg font-semibold text-gray-800 mb-3">1.1 Information You Provide</h3>
            <ul className="space-y-2 text-gray-700 ml-6 mb-4">
              <li className="flex items-start">
                <span className="text-blue-500 mr-2">•</span>
                <div>
                  <strong>Account Information:</strong> Name, email address, password
                </div>
              </li>
              <li className="flex items-start">
                <span className="text-blue-500 mr-2">•</span>
                <div>
                  <strong>Smoking Profile:</strong> Cigarettes per day, years smoking, quit date, 
                  triggers, motivations
                </div>
              </li>
              <li className="flex items-start">
                <span className="text-blue-500 mr-2">•</span>
                <div>
                  <strong>Progress Data:</strong> Quit tracking, cravings logged, achievements, 
                  money saved
                </div>
              </li>
              <li className="flex items-start">
                <span className="text-blue-500 mr-2">•</span>
                <div>
                  <strong>Communication Data:</strong> Messages with AI chatbot, support inquiries, 
                  feedback
                </div>
              </li>
              <li className="flex items-start">
                <span className="text-blue-500 mr-2">•</span>
                <div>
                  <strong>Payment Information:</strong> Processed securely by third-party payment 
                  providers (we don't store card details)
                </div>
              </li>
            </ul>

            <h3 className="text-lg font-semibold text-gray-800 mb-3">1.2 Automatically Collected Information</h3>
            <ul className="space-y-2 text-gray-700 ml-6 mb-4">
              <li className="flex items-start">
                <span className="text-blue-500 mr-2">•</span>
                <div>
                  <strong>Device Information:</strong> Device type, operating system, app version
                </div>
              </li>
              <li className="flex items-start">
                <span className="text-blue-500 mr-2">•</span>
                <div>
                  <strong>Usage Data:</strong> Features used, session duration, interaction patterns
                </div>
              </li>
              <li className="flex items-start">
                <span className="text-blue-500 mr-2">•</span>
                <div>
                  <strong>Analytics:</strong> App performance, crashes, errors
                </div>
              </li>
              <li className="flex items-start">
                <span className="text-blue-500 mr-2">•</span>
                <div>
                  <strong>Location Data:</strong> Only if you grant permission (used for localized 
                  content and support resources)
                </div>
              </li>
            </ul>

            <h3 className="text-lg font-semibold text-gray-800 mb-3">1.3 Third-Party OAuth Data</h3>
            <p className="text-gray-700 leading-relaxed">
              If you sign in with Google or other OAuth providers, we receive your name, email 
              address, and profile picture as permitted by the provider and your privacy settings.
            </p>
          </section>

          {/* How We Use Your Information */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
              <Eye className="w-6 h-6 text-blue-500 mr-2" />
              2. How We Use Your Information
            </h2>
            <ul className="space-y-3 text-gray-700 ml-6">
              <li className="flex items-start">
                <span className="text-emerald-500 mr-2">✓</span>
                <div>
                  <strong>Personalized Quit Plans:</strong> Create customized smoking cessation 
                  strategies based on your profile
                </div>
              </li>
              <li className="flex items-start">
                <span className="text-emerald-500 mr-2">✓</span>
                <div>
                  <strong>AI Chatbot Assistance:</strong> Provide personalized support and 
                  motivation through our AI assistant
                </div>
              </li>
              <li className="flex items-start">
                <span className="text-emerald-500 mr-2">✓</span>
                <div>
                  <strong>Progress Tracking:</strong> Monitor your smoke-free journey and display 
                  achievements
                </div>
              </li>
              <li className="flex items-start">
                <span className="text-emerald-500 mr-2">✓</span>
                <div>
                  <strong>Service Improvement:</strong> Analyze usage patterns to enhance app 
                  features and performance
                </div>
              </li>
              <li className="flex items-start">
                <span className="text-emerald-500 mr-2">✓</span>
                <div>
                  <strong>Account Management:</strong> Authenticate users, manage subscriptions, 
                  and provide support
                </div>
              </li>
              <li className="flex items-start">
                <span className="text-emerald-500 mr-2">✓</span>
                <div>
                  <strong>Communications:</strong> Send important updates, reminders, and 
                  motivational messages
                </div>
              </li>
              <li className="flex items-start">
                <span className="text-emerald-500 mr-2">✓</span>
                <div>
                  <strong>Security:</strong> Detect and prevent fraud, abuse, and technical issues
                </div>
              </li>
              <li className="flex items-start">
                <span className="text-emerald-500 mr-2">✓</span>
                <div>
                  <strong>Legal Compliance:</strong> Meet legal obligations and enforce our Terms
                </div>
              </li>
            </ul>
          </section>

          {/* Data Sharing */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
              <Globe className="w-6 h-6 text-blue-500 mr-2" />
              3. Data Sharing and Disclosure
            </h2>
            
            <h3 className="text-lg font-semibold text-gray-800 mb-3">3.1 We DO NOT Sell Your Data</h3>
            <div className="bg-green-50 p-4 rounded-lg mb-4">
              <p className="text-gray-700 leading-relaxed">
                <strong>Important:</strong> We never sell, rent, or trade your personal information 
                to third parties for marketing purposes.
              </p>
            </div>

            <h3 className="text-lg font-semibold text-gray-800 mb-3">3.2 We May Share Data With:</h3>
            <ul className="space-y-3 text-gray-700 ml-6">
              <li className="flex items-start">
                <span className="text-blue-500 mr-2">•</span>
                <div>
                  <strong>Service Providers:</strong> Third-party services like Supabase (database), 
                  Google AI (chatbot), payment processors (secure transactions)
                </div>
              </li>
              <li className="flex items-start">
                <span className="text-blue-500 mr-2">•</span>
                <div>
                  <strong>Analytics Partners:</strong> To understand app usage and improve our services 
                  (anonymized data only)
                </div>
              </li>
              <li className="flex items-start">
                <span className="text-blue-500 mr-2">•</span>
                <div>
                  <strong>Legal Requirements:</strong> When required by law, court order, or government 
                  request
                </div>
              </li>
              <li className="flex items-start">
                <span className="text-blue-500 mr-2">•</span>
                <div>
                  <strong>Business Transfers:</strong> In case of merger, acquisition, or asset sale 
                  (users will be notified)
                </div>
              </li>
              <li className="flex items-start">
                <span className="text-blue-500 mr-2">•</span>
                <div>
                  <strong>With Your Consent:</strong> When you explicitly authorize data sharing
                </div>
              </li>
            </ul>
          </section>

          {/* Data Security */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
              <Shield className="w-6 h-6 text-blue-500 mr-2" />
              4. Data Security
            </h2>
            <p className="text-gray-700 leading-relaxed mb-3">
              We implement industry-standard security measures to protect your data:
            </p>
            <ul className="space-y-2 text-gray-700 ml-6 mb-4">
              <li className="flex items-start">
                <span className="text-green-500 mr-2">🔒</span>
                <div>
                  <strong>Encryption:</strong> Data encrypted in transit (SSL/TLS) and at rest
                </div>
              </li>
              <li className="flex items-start">
                <span className="text-green-500 mr-2">🔒</span>
                <div>
                  <strong>Secure Authentication:</strong> Password hashing, OAuth 2.0, secure sessions
                </div>
              </li>
              <li className="flex items-start">
                <span className="text-green-500 mr-2">🔒</span>
                <div>
                  <strong>Access Controls:</strong> Restricted data access, role-based permissions
                </div>
              </li>
              <li className="flex items-start">
                <span className="text-green-500 mr-2">🔒</span>
                <div>
                  <strong>Regular Audits:</strong> Security assessments and monitoring
                </div>
              </li>
              <li className="flex items-start">
                <span className="text-green-500 mr-2">🔒</span>
                <div>
                  <strong>Secure Infrastructure:</strong> Hosted on secure cloud platforms (Supabase)
                </div>
              </li>
            </ul>
            <div className="bg-yellow-50 p-4 rounded-lg">
              <p className="text-sm text-gray-700">
                <strong>Note:</strong> While we use best practices to protect your data, no method 
                of transmission over the Internet is 100% secure. We cannot guarantee absolute security.
              </p>
            </div>
          </section>

          {/* Data Retention */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">5. Data Retention</h2>
            <ul className="space-y-2 text-gray-700 ml-6">
              <li className="flex items-start">
                <span className="text-blue-500 mr-2">•</span>
                <div>
                  <strong>Active Accounts:</strong> Data retained as long as your account is active
                </div>
              </li>
              <li className="flex items-start">
                <span className="text-blue-500 mr-2">•</span>
                <div>
                  <strong>After Cancellation:</strong> Progress data preserved for 90 days to allow 
                  resubscription
                </div>
              </li>
              <li className="flex items-start">
                <span className="text-blue-500 mr-2">•</span>
                <div>
                  <strong>After Deletion:</strong> Account data permanently deleted within 30 days
                </div>
              </li>
              <li className="flex items-start">
                <span className="text-blue-500 mr-2">•</span>
                <div>
                  <strong>Legal Requirements:</strong> Some data retained longer if required by law 
                  (e.g., financial records)
                </div>
              </li>
              <li className="flex items-start">
                <span className="text-blue-500 mr-2">•</span>
                <div>
                  <strong>Anonymized Data:</strong> May be retained indefinitely for analytics and 
                  research
                </div>
              </li>
            </ul>
          </section>

          {/* Your Rights */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">6. Your Privacy Rights</h2>
            <p className="text-gray-700 leading-relaxed mb-3">
              You have the following rights regarding your personal data:
            </p>
            <ul className="space-y-3 text-gray-700 ml-6">
              <li className="flex items-start">
                <span className="text-emerald-500 mr-2">✓</span>
                <div>
                  <strong>Access:</strong> Request a copy of your personal data
                </div>
              </li>
              <li className="flex items-start">
                <span className="text-emerald-500 mr-2">✓</span>
                <div>
                  <strong>Correction:</strong> Update or correct inaccurate information
                </div>
              </li>
              <li className="flex items-start">
                <span className="text-emerald-500 mr-2">✓</span>
                <div>
                  <strong>Deletion:</strong> Request deletion of your account and data
                </div>
              </li>
              <li className="flex items-start">
                <span className="text-emerald-500 mr-2">✓</span>
                <div>
                  <strong>Export:</strong> Download your data in a portable format
                </div>
              </li>
              <li className="flex items-start">
                <span className="text-emerald-500 mr-2">✓</span>
                <div>
                  <strong>Opt-Out:</strong> Unsubscribe from marketing communications
                </div>
              </li>
              <li className="flex items-start">
                <span className="text-emerald-500 mr-2">✓</span>
                <div>
                  <strong>Withdraw Consent:</strong> Revoke permissions for data collection
                </div>
              </li>
            </ul>
            <div className="bg-blue-50 p-4 rounded-lg mt-4">
              <p className="text-gray-700">
                To exercise these rights, contact us at <strong>smokefree@cleverquit.com</strong>
              </p>
            </div>
          </section>

          {/* Children's Privacy */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">7. Children's Privacy</h2>
            <p className="text-gray-700 leading-relaxed mb-3">
              CleverQuit is not intended for users under 18 years of age. We do not knowingly 
              collect personal information from children.
            </p>
            <p className="text-gray-700 leading-relaxed">
              If we become aware that a child under 18 has provided us with personal information, 
              we will delete it immediately. If you believe a child has provided us with data, 
              please contact us at smokefree@cleverquit.com.
            </p>
          </section>

          {/* Cookies and Tracking */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">8. Cookies and Tracking</h2>
            <p className="text-gray-700 leading-relaxed mb-3">
              We use cookies and similar tracking technologies to:
            </p>
            <ul className="space-y-2 text-gray-700 ml-6 mb-3">
              <li className="flex items-start">
                <span className="text-blue-500 mr-2">•</span>
                <span>Maintain your login session</span>
              </li>
              <li className="flex items-start">
                <span className="text-blue-500 mr-2">•</span>
                <span>Remember your preferences</span>
              </li>
              <li className="flex items-start">
                <span className="text-blue-500 mr-2">•</span>
                <span>Analyze app usage and performance</span>
              </li>
              <li className="flex items-start">
                <span className="text-blue-500 mr-2">•</span>
                <span>Improve user experience</span>
              </li>
            </ul>
            <p className="text-gray-700 leading-relaxed">
              You can control cookies through your browser settings, but disabling them may affect 
              app functionality.
            </p>
          </section>

          {/* International Users */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">9. International Data Transfers</h2>
            <p className="text-gray-700 leading-relaxed mb-3">
              Your data may be processed and stored on servers located outside your country. We 
              ensure appropriate safeguards are in place for international data transfers.
            </p>
            <p className="text-gray-700 leading-relaxed">
              By using CleverQuit, you consent to the transfer of your information to countries 
              that may have different data protection laws than your country of residence.
            </p>
          </section>

          {/* Policy Changes */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">10. Changes to This Policy</h2>
            <p className="text-gray-700 leading-relaxed mb-3">
              We may update this Privacy Policy periodically. We will notify you of significant 
              changes via:
            </p>
            <ul className="space-y-2 text-gray-700 ml-6 mb-3">
              <li className="flex items-start">
                <span className="text-blue-500 mr-2">•</span>
                <span>Email notification</span>
              </li>
              <li className="flex items-start">
                <span className="text-blue-500 mr-2">•</span>
                <span>In-app notification</span>
              </li>
              <li className="flex items-start">
                <span className="text-blue-500 mr-2">•</span>
                <span>Updated "Last Modified" date at the top of this page</span>
              </li>
            </ul>
            <p className="text-gray-700 leading-relaxed">
              Continued use of the Service after changes constitutes acceptance of the updated policy.
            </p>
          </section>

          {/* Contact Us */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">11. Contact Us</h2>
            <p className="text-gray-700 leading-relaxed mb-3">
              If you have questions, concerns, or requests regarding this Privacy Policy:
            </p>
            <div className="bg-gray-50 p-4 rounded-lg">
              <p className="text-gray-700 mb-2">
                <strong>Email:</strong> smokefree@cleverquit.com
              </p>
              <p className="text-gray-700 mb-2">
                <strong>Owner:</strong> Anuj Goel
              </p>
              <p className="text-gray-700">
                <strong>Address:</strong> Near UP Pollution Control Board, Sector 16, 
                Vasundhara, Ghaziabad, India
              </p>
            </div>
          </section>

          {/* Summary */}
          <section className="bg-gradient-to-r from-blue-50 to-emerald-50 p-6 rounded-lg border-2 border-blue-200">
            <h3 className="text-xl font-bold text-gray-900 mb-4">Privacy Commitment</h3>
            <p className="text-gray-700 leading-relaxed mb-3">
              At CleverQuit, we are committed to:
            </p>
            <ul className="space-y-2 text-gray-700">
              <li className="flex items-start">
                <span className="text-emerald-600 mr-2">✓</span>
                <span>Protecting your personal information</span>
              </li>
              <li className="flex items-start">
                <span className="text-emerald-600 mr-2">✓</span>
                <span>Being transparent about data practices</span>
              </li>
              <li className="flex items-start">
                <span className="text-emerald-600 mr-2">✓</span>
                <span>Never selling your data</span>
              </li>
              <li className="flex items-start">
                <span className="text-emerald-600 mr-2">✓</span>
                <span>Giving you control over your information</span>
              </li>
              <li className="flex items-start">
                <span className="text-emerald-600 mr-2">✓</span>
                <span>Supporting your quit smoking journey securely</span>
              </li>
            </ul>
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

export default PrivacyPolicy;
