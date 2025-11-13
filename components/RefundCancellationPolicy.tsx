import React from 'react';
import { ArrowLeft, RefreshCw, Clock, CreditCard, AlertCircle } from 'lucide-react';

interface RefundCancellationPolicyProps {
  onBack?: () => void;
}

export const RefundCancellationPolicy: React.FC<RefundCancellationPolicyProps> = ({ onBack }) => {
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
            <RefreshCw className="w-8 h-8 text-blue-500 mr-3" />
            <h1 className="text-3xl font-bold text-gray-900">Refund & Cancellation Policy</h1>
          </div>
          <p className="text-gray-600">
            Last updated: November 13, 2025
          </p>
        </div>

        {/* Main Content */}
        <div className="bg-white rounded-2xl shadow-lg p-8 space-y-8">
          {/* Introduction */}
          <section>
            <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-4">
              <p className="text-gray-700 leading-relaxed font-semibold mb-2">
                Important: All Sales Are Final
              </p>
              <p className="text-gray-700 leading-relaxed">
                At CleverQuit, all subscription purchases are final and non-refundable. However, 
                you can cancel your subscription at any time to prevent future charges. This policy 
                outlines our cancellation procedures and related terms.
              </p>
            </div>
          </section>

          {/* Free Trial Period */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
              <Clock className="w-6 h-6 text-blue-500 mr-2" />
              1. Free Trial Period
            </h2>
            <p className="text-gray-700 leading-relaxed mb-3">
              <strong>7-Day Free Trial:</strong> All new users are eligible for a 7-day free trial 
              of CleverQuit Premium features.
            </p>
            <ul className="space-y-2 text-gray-700 ml-6 mb-3">
              <li className="flex items-start">
                <span className="text-blue-500 mr-2">•</span>
                <span>No credit card charges during the trial period</span>
              </li>
              <li className="flex items-start">
                <span className="text-blue-500 mr-2">•</span>
                <span>Cancel anytime during the trial with no charges</span>
              </li>
              <li className="flex items-start">
                <span className="text-blue-500 mr-2">•</span>
                <span>Automatic conversion to paid subscription after 7 days if not cancelled</span>
              </li>
              <li className="flex items-start">
                <span className="text-blue-500 mr-2">•</span>
                <span>Email reminders sent 2 days before trial ends</span>
              </li>
            </ul>
            <div className="bg-yellow-50 p-4 rounded-lg">
              <p className="text-sm text-gray-700">
                <strong>Important:</strong> To avoid charges, cancel at least 24 hours before your 
                trial ends.
              </p>
            </div>
          </section>

          {/* No Refund Policy */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
              <CreditCard className="w-6 h-6 text-blue-500 mr-2" />
              2. No Refund Policy
            </h2>
            
            <div className="bg-red-50 border-l-4 border-red-400 p-4 mb-4">
              <p className="text-gray-700 leading-relaxed font-semibold mb-2">
                All Subscription Purchases Are Final
              </p>
              <p className="text-gray-700 leading-relaxed">
                CleverQuit does not offer refunds on any subscription purchases, including Monthly, 
                Quarterly, Annual, and Lifetime subscriptions. All sales are final.
              </p>
            </div>

            <h3 className="text-lg font-semibold text-gray-800 mb-3">2.1 Why No Refunds?</h3>
            <p className="text-gray-700 leading-relaxed mb-3">
              We provide a <strong>7-day free trial</strong> that allows you to fully explore all 
              premium features before making a purchase decision. This trial period is designed to 
              ensure you are completely satisfied with the service before committing to a paid subscription.
            </p>

            <h3 className="text-lg font-semibold text-gray-800 mb-3">2.2 No Refunds Under Any Circumstances</h3>
            <p className="text-gray-700 leading-relaxed mb-3">
              Refunds will NOT be provided for any reason, including but not limited to:
            </p>
            <ul className="space-y-2 text-gray-700 ml-6">
              <li className="flex items-start">
                <span className="text-red-500 mr-2">✗</span>
                <span>Change of mind after purchase</span>
              </li>
              <li className="flex items-start">
                <span className="text-red-500 mr-2">✗</span>
                <span>Unused subscription time</span>
              </li>
              <li className="flex items-start">
                <span className="text-red-500 mr-2">✗</span>
                <span>Subscription renewals</span>
              </li>
              <li className="flex items-start">
                <span className="text-red-500 mr-2">✗</span>
                <span>Account termination due to Terms of Service violations</span>
              </li>
              <li className="flex items-start">
                <span className="text-red-500 mr-2">✗</span>
                <span>Technical issues (contact support for assistance)</span>
              </li>
              <li className="flex items-start">
                <span className="text-red-500 mr-2">✗</span>
                <span>Partial subscription periods</span>
              </li>
              <li className="flex items-start">
                <span className="text-red-500 mr-2">✗</span>
                <span>Accidental purchases (please be careful when purchasing)</span>
              </li>
            </ul>
          </section>

          {/* Cancellation Policy */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">3. Cancellation Policy</h2>
            
            <h3 className="text-lg font-semibold text-gray-800 mb-3">3.1 How to Cancel</h3>
            <p className="text-gray-700 leading-relaxed mb-3">
              You can cancel your subscription at any time through:
            </p>
            <div className="bg-gray-50 p-4 rounded-lg mb-4">
              <ol className="space-y-2 text-gray-700">
                <li className="flex items-start">
                  <span className="font-semibold mr-2">Option 1:</span>
                  <span>
                    In-App: Go to Settings → Subscription → Manage Subscription → Cancel Subscription
                  </span>
                </li>
                <li className="flex items-start">
                  <span className="font-semibold mr-2">Option 2:</span>
                  <span>
                    Email: Send cancellation request to mailtoanujgoel@gmail.com with your 
                    registered email address
                  </span>
                </li>
                <li className="flex items-start">
                  <span className="font-semibold mr-2">Option 3:</span>
                  <span>
                    Payment Provider: Cancel through your app store (Google Play/Apple App Store) 
                    subscription settings
                  </span>
                </li>
              </ol>
            </div>

            <h3 className="text-lg font-semibold text-gray-800 mb-3">3.2 Cancellation Timeline</h3>
            <ul className="space-y-3 text-gray-700 ml-6 mb-4">
              <li className="flex items-start">
                <span className="text-blue-500 mr-2">•</span>
                <div>
                  <strong>Immediate Effect:</strong> Cancellation takes effect at the end of your 
                  current billing period
                </div>
              </li>
              <li className="flex items-start">
                <span className="text-blue-500 mr-2">•</span>
                <div>
                  <strong>Access Retention:</strong> You retain access to Premium features until 
                  the billing period ends
                </div>
              </li>
              <li className="flex items-start">
                <span className="text-blue-500 mr-2">•</span>
                <div>
                  <strong>No Partial Refunds:</strong> Cancellation does not qualify for refund 
                  of the current billing period
                </div>
              </li>
              <li className="flex items-start">
                <span className="text-blue-500 mr-2">•</span>
                <div>
                  <strong>Confirmation:</strong> You will receive an email confirmation within 
                  24 hours of cancellation
                </div>
              </li>
            </ul>

            <h3 className="text-lg font-semibold text-gray-800 mb-3">3.3 After Cancellation</h3>
            <p className="text-gray-700 leading-relaxed mb-3">
              When your subscription expires:
            </p>
            <ul className="space-y-2 text-gray-700 ml-6">
              <li className="flex items-start">
                <span className="text-blue-500 mr-2">•</span>
                <span>Your account remains active with free tier features</span>
              </li>
              <li className="flex items-start">
                <span className="text-blue-500 mr-2">•</span>
                <span>Your progress data is preserved for 90 days</span>
              </li>
              <li className="flex items-start">
                <span className="text-blue-500 mr-2">•</span>
                <span>You can resubscribe anytime to regain Premium access</span>
              </li>
              <li className="flex items-start">
                <span className="text-blue-500 mr-2">•</span>
                <span>Premium content and features become locked</span>
              </li>
            </ul>
          </section>

          {/* Billing Issues */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">4. Billing Issues and Support</h2>
            
            <h3 className="text-lg font-semibold text-gray-800 mb-3">4.1 Billing Problems</h3>
            <p className="text-gray-700 leading-relaxed mb-3">
              If you experience billing errors or unauthorized charges, please contact us immediately:
            </p>
            <div className="bg-blue-50 p-4 rounded-lg mb-4">
              <p className="text-gray-700 leading-relaxed mb-3">
                Email us at <strong>smokefree@cleverquit.com</strong> with:
              </p>
              <ul className="space-y-2 text-gray-700 ml-4">
                <li className="flex items-start">
                  <span className="text-blue-500 mr-2">•</span>
                  <span>Your registered email address</span>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-500 mr-2">•</span>
                  <span>Order/Transaction ID</span>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-500 mr-2">•</span>
                  <span>Description of the billing issue</span>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-500 mr-2">•</span>
                  <span>Screenshots or proof of payment (if applicable)</span>
                </li>
              </ul>
            </div>

            <h3 className="text-lg font-semibold text-gray-800 mb-3">4.2 Unauthorized Charges</h3>
            <p className="text-gray-700 leading-relaxed mb-3">
              If you notice unauthorized charges on your account, contact us within 48 hours. We will 
              investigate and resolve the issue. This is the only circumstance where a refund may be considered.
            </p>

            <h3 className="text-lg font-semibold text-gray-800 mb-3">4.3 Double Charges</h3>
            <p className="text-gray-700 leading-relaxed">
              If you are accidentally charged twice for the same subscription, contact us immediately. 
              We will refund the duplicate charge after verification.
            </p>
          </section>

          {/* Cancellation Fees */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">5. Cancellation Fees</h2>
            <div className="bg-green-50 p-4 rounded-lg">
              <p className="text-gray-700 leading-relaxed">
                <strong>Good News!</strong> CleverQuit does NOT charge any cancellation fees. 
                You can cancel your subscription at any time without penalty.
              </p>
            </div>
          </section>

          {/* Subscription Pausing */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">6. Subscription Pausing</h2>
            <p className="text-gray-700 leading-relaxed mb-3">
              Currently, we do not offer subscription pausing. However, you can:
            </p>
            <ul className="space-y-2 text-gray-700 ml-6">
              <li className="flex items-start">
                <span className="text-blue-500 mr-2">•</span>
                <span>Cancel and resubscribe later (your progress is saved for 90 days)</span>
              </li>
              <li className="flex items-start">
                <span className="text-blue-500 mr-2">•</span>
                <span>Contact support at mailtoanujgoel@gmail.com for special circumstances</span>
              </li>
            </ul>
          </section>

          {/* Special Circumstances */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">7. Technical Issues and Support</h2>
            <p className="text-gray-700 leading-relaxed mb-3">
              If you experience technical issues preventing you from using the app:
            </p>
            <ul className="space-y-2 text-gray-700 ml-6 mb-3">
              <li className="flex items-start">
                <span className="text-blue-500 mr-2">•</span>
                <span>Contact our support team at smokefree@cleverquit.com</span>
              </li>
              <li className="flex items-start">
                <span className="text-blue-500 mr-2">•</span>
                <span>We will work to resolve the issue promptly</span>
              </li>
              <li className="flex items-start">
                <span className="text-blue-500 mr-2">•</span>
                <span>Technical issues do not qualify for refunds</span>
              </li>
              <li className="flex items-start">
                <span className="text-blue-500 mr-2">•</span>
                <span>You may cancel to prevent future charges</span>
              </li>
            </ul>
            <p className="text-gray-700 leading-relaxed">
              We are committed to providing excellent support and resolving any technical problems 
              you encounter. However, refunds cannot be issued for past subscription periods.
            </p>
          </section>

          {/* Policy Changes */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">8. Policy Changes</h2>
            <p className="text-gray-700 leading-relaxed mb-3">
              We reserve the right to modify this Refund and Cancellation Policy at any time. 
              Changes will be communicated via:
            </p>
            <ul className="space-y-2 text-gray-700 ml-6 mb-3">
              <li className="flex items-start">
                <span className="text-blue-500 mr-2">•</span>
                <span>Email notification to registered users</span>
              </li>
              <li className="flex items-start">
                <span className="text-blue-500 mr-2">•</span>
                <span>In-app notification</span>
              </li>
              <li className="flex items-start">
                <span className="text-blue-500 mr-2">•</span>
                <span>Updated policy page with revision date</span>
              </li>
            </ul>
            <p className="text-gray-700 leading-relaxed">
              Any changes will not affect refunds for purchases made before the policy change.
            </p>
          </section>

          {/* Contact Information */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">9. Questions & Support</h2>
            <p className="text-gray-700 leading-relaxed mb-3">
              If you have questions about cancellations or billing, please contact us:
            </p>
            <div className="bg-gray-50 p-4 rounded-lg">
              <p className="text-gray-700 mb-2">
                <strong>Email:</strong> smokefree@cleverquit.com
              </p>
              <p className="text-gray-700 mb-2">
                <strong>Response Time:</strong> Within 24-48 hours
              </p>
              <p className="text-gray-700">
                <strong>Address:</strong> Near UP Pollution Control Board, Sector 16, 
                Vasundhara, Ghaziabad, India
              </p>
            </div>
          </section>

          {/* Summary Box */}
          <section className="bg-gradient-to-r from-red-50 to-orange-50 p-6 rounded-lg border-2 border-red-200">
            <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
              <AlertCircle className="w-6 h-6 text-red-600 mr-2" />
              Quick Summary
            </h3>
            <ul className="space-y-2 text-gray-700">
              <li className="flex items-start">
                <span className="text-emerald-600 mr-2">✓</span>
                <span><strong>7-day free trial</strong> - Try before you buy</span>
              </li>
              <li className="flex items-start">
                <span className="text-red-600 mr-2">✗</span>
                <span><strong>No refunds</strong> on any subscription purchases</span>
              </li>
              <li className="flex items-start">
                <span className="text-emerald-600 mr-2">✓</span>
                <span><strong>No cancellation fees</strong> - cancel anytime</span>
              </li>
              <li className="flex items-start">
                <span className="text-emerald-600 mr-2">✓</span>
                <span><strong>Access retained</strong> until end of billing period</span>
              </li>
              <li className="flex items-start">
                <span className="text-red-600 mr-2">✗</span>
                <span><strong>All sales are final</strong> - please review before purchasing</span>
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

export default RefundCancellationPolicy;
