import { useState } from "react";
import { X, Smartphone, Zap, CheckCircle, Loader } from "lucide-react";

export const VibrationSetupModal = ({
  isOpen,
  onClose,
  connectionStatus,
  hapticBridgeConnected,
  onStartBridge
}) => {
  const [step, setStep] = useState(0);
  const [bridgeStarted, setBridgeStarted] = useState(false);
  const [startingBridge, setStartingBridge] = useState(false);

  const steps = [
    {
      title: "📱 Connect Your Mobile",
      icon: <Smartphone className="w-8 h-8 text-blue-500" />,
      content: (
        <div className="text-left space-y-3">
          <p className="text-sm text-gray-700">Connect your phone via USB-C:</p>
          <ol className="list-decimal list-inside space-y-2 text-sm text-gray-600">
            <li>Connect phone to laptop with USB cable</li>
            <li>Enable USB Tethering in phone settings:
              <ul className="list-disc list-inside ml-4 mt-1">
                <li><strong>Android:</strong> Settings → Network → USB Tethering</li>
                <li><strong>iOS:</strong> Settings → Personal Hotspot → USB Tethering</li>
              </ul>
            </li>
            <li>Laptop will show network connection notification</li>
          </ol>
          <div className="mt-4 p-3 bg-blue-50 rounded-lg border border-blue-200">
            <p className="text-xs text-blue-800">
              <strong>💡 Note:</strong> USB tethering creates a direct connection between your devices.
              No WiFi or internet required!
            </p>
          </div>
        </div>
      ),
    },
    {
      title: "🌉 Start Vibration Bridge",
      icon: <Zap className="w-8 h-8 text-purple-500" />,
      content: (
        <div className="text-left space-y-3">
          <p className="text-sm text-gray-700">Click the button below to start the vibration bridge:</p>

          <div className="flex justify-center my-6">
            <button
              onClick={async () => {
                if (onStartBridge) {
                  setStartingBridge(true);
                  try {
                    await onStartBridge();
                    setBridgeStarted(true);
                  } catch (error) {
                    console.error('Failed to start bridge:', error);
                    alert('Failed to start bridge. Please try again.');
                  } finally {
                    setStartingBridge(false);
                  }
                }
              }}
              disabled={startingBridge || bridgeStarted}
              className={`px-8 py-4 rounded-xl font-bold text-white text-lg transition-all transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none ${
                bridgeStarted
                  ? 'bg-green-500 hover:bg-green-600'
                  : 'bg-gradient-to-r from-purple-600 to-blue-600 hover:shadow-lg'
              }`}
            >
              {startingBridge ? (
                <div className="flex items-center gap-2">
                  <Loader className="w-5 h-5 animate-spin" />
                  Starting Bridge...
                </div>
              ) : bridgeStarted ? (
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-5 h-5" />
                  Bridge Started! ✓
                </div>
              ) : (
                '🚀 Start Bridge'
              )}
            </button>
          </div>

          <p className="text-sm text-gray-600">
            This will open a popup window on your phone where the vibration bridge runs.
          </p>

          {bridgeStarted && (
            <div className="mt-4 p-3 bg-green-50 rounded-lg border border-green-200">
              <div className="flex items-center gap-2 text-green-800">
                <CheckCircle className="w-4 h-4" />
                <span className="text-sm font-medium">Bridge popup opened successfully!</span>
              </div>
            </div>
          )}
        </div>
      ),
    },
    {
      title: "✅ Ready to Use",
      icon: <CheckCircle className="w-8 h-8 text-green-500" />,
      content: (
        <div className="text-left space-y-3">
          <p className="text-sm text-gray-700">Now you can use vibration output:</p>
          <ol className="list-decimal list-inside space-y-2 text-sm text-gray-600">
            <li>Keep the bridge popup open on your phone</li>
            <li>Enable <strong>Vibration Output</strong> (📱 button) in the app</li>
            <li>Speak text or input Morse code</li>
            <li>Your phone will vibrate in Morse code pattern!</li>
          </ol>

          <div className="mt-4 p-3 bg-blue-50 rounded-lg border border-blue-200">
            <p className="text-xs text-blue-800">
              <strong>🎯 How it works:</strong>
              <br />• Text is converted to Morse code
              <br />• Short vibration = Dot (·)
              <br />• Long vibration = Dash (−)
              <br />• Pause = Letter separator
              <br />• Longer pause = Word separator
            </p>
          </div>

          <div className="mt-4 p-3 bg-green-50 rounded-lg border border-green-200">
            <div className="flex items-center gap-2 text-green-800">
              <CheckCircle className="w-4 h-4" />
              <span className="text-sm font-medium">
                🎉 <strong>Zero Terminal Commands Required!</strong>
                <br />Everything is controlled through this UI.
              </span>
            </div>
          </div>
        </div>
      ),
    },
  ];

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-xl max-w-2xl w-full max-h-[85vh] overflow-hidden flex flex-col animate-in fade-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="bg-gradient-to-r from-purple-600 to-blue-600 px-6 py-4 flex justify-between items-center">
          <h2 className="text-xl font-bold text-white">📱 Vibration Setup Guide</h2>
          <button
            onClick={onClose}
            className="text-white hover:bg-white/20 rounded-lg p-1 transition-colors"
          >
            <X size={24} />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto">
          <div className="p-6">
            {/* Steps Indicator */}
            <div className="flex gap-2 mb-8">
              {steps.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setStep(idx)}
                  className={`h-10 w-10 rounded-full font-bold text-sm transition-all ${
                    idx === step
                      ? 'bg-gradient-to-r from-purple-600 to-blue-600 text-white scale-110'
                      : idx < step
                      ? 'bg-green-500 text-white'
                      : 'bg-gray-200 text-gray-600 hover:bg-gray-300'
                  }`}
                >
                  {idx < step ? '✓' : idx + 1}
                </button>
              ))}
            </div>

            {/* Current Step */}
            <div className="space-y-4">
              <div className="flex items-center gap-3 mb-4">
                {steps[step].icon}
                <h3 className="text-lg font-bold text-gray-800">{steps[step].title}</h3>
              </div>
              <div>{steps[step].content}</div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="border-t border-gray-200 px-6 py-4 flex justify-between gap-3 bg-gray-50">
          <button
            onClick={() => setStep(Math.max(0, step - 1))}
            disabled={step === 0}
            className="px-4 py-2 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            ← Back
          </button>

          <div className="text-sm text-gray-600 flex items-center">
            Step {step + 1} of {steps.length}
          </div>

          {step === steps.length - 1 ? (
            <button
              onClick={onClose}
              className="px-6 py-2 rounded-lg bg-gradient-to-r from-purple-600 to-blue-600 text-white font-medium hover:shadow-lg transition-all"
            >
              Got It! ✓
            </button>
          ) : (
            <button
              onClick={() => setStep(Math.min(steps.length - 1, step + 1))}
              className="px-6 py-2 rounded-lg bg-gradient-to-r from-purple-600 to-blue-600 text-white font-medium hover:shadow-lg transition-all"
            >
              Next →
            </button>
          )}
        </div>
      </div>
    </div>
  );
};