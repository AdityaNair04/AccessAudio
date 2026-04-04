import { X, Smartphone, Wifi, Zap, AlertCircle } from "lucide-react";
import { useState, useEffect } from "react";

export const VibrationSetupModal = ({ isOpen, onClose, connectionStatus, hapticBridgeConnected }) => {
  const [laptopIP, setLaptopIP] = useState('');
  const [step, setStep] = useState(0);

  useEffect(() => {
    // Try to get local IP address
    if (isOpen && !laptopIP) {
      fetch('https://api.ipify.org?format=json')
        .then(r => r.json())
        .then(data => {
          // This is WAN IP, for local network we'd need the LAN IP
          // Better: use window.location.hostname or similar
          const hostname = window.location.hostname;
          setLaptopIP(hostname || 'localhost');
        })
        .catch(() => {
          setLaptopIP(window.location.hostname || 'localhost');
        });
    }
  }, [isOpen, laptopIP]);

  if (!isOpen) return null;

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
        </div>
      ),
    },
    {
      title: "🖥️ Start Haptic Bridge",
      icon: <Zap className="w-8 h-8 text-yellow-500" />,
      content: (
        <div className="text-left space-y-3">
          <p className="text-sm text-gray-700">On your laptop, open Terminal/PowerShell and run:</p>
          <div className="bg-gray-900 text-white p-3 rounded-lg font-mono text-xs overflow-x-auto">
            cd ml<br />
            python haptic_bridge.py
          </div>
          <p className="text-xs text-gray-500">Wait until you see: <strong>"📱 MOBILE HAPTIC BRIDGE STARTED"</strong></p>
          <div className={`p-2 rounded-lg text-xs font-mono ${hapticBridgeConnected ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
            {hapticBridgeConnected ? '✅ Bridge is running' : '⏳ Waiting for bridge to start...'}
          </div>
        </div>
      ),
    },
    {
      title: "📲 Visit on Mobile",
      icon: <Wifi className="w-8 h-8 text-purple-500" />,
      content: (
        <div className="text-left space-y-3">
          <p className="text-sm text-gray-700">On your phone browser, visit:</p>
          <div className="bg-gray-100 p-3 rounded-lg">
            <code className="text-sm font-mono break-all">
              http://{laptopIP}:5000
            </code>
            <button
              onClick={() => {
                navigator.clipboard.writeText(`http://${laptopIP}:5000`);
                alert('Copied to clipboard!');
              }}
              className="ml-2 text-blue-600 text-xs hover:underline"
            >
              Copy
            </button>
          </div>
          <p className="text-xs text-gray-500">
            You should see a purple page saying "<strong>Haptic Receiver</strong>" with connection status.
          </p>
        </div>
      ),
    },
    {
      title: "✅ Ready to Use",
      icon: <Zap className="w-8 h-8 text-green-500" />,
      content: (
        <div className="text-left space-y-3">
          <p className="text-sm text-gray-700">Now you can use vibration output:</p>
          <ol className="list-decimal list-inside space-y-2 text-sm text-gray-600">
            <li>Keep the Haptic Bridge running on your laptop</li>
            <li>Keep the mobile page open on your phone</li>
            <li>Enable <strong>Vibration Output</strong> (📱 button) in the app</li>
            <li>Speak text or input Morse code</li>
            <li>Your phone will vibrate in Morse code pattern!</li>
          </ol>
          <div className="mt-4 p-3 bg-blue-50 rounded-lg border border-blue-200">
            <p className="text-xs text-blue-800">
              <strong>💡 Tip:</strong> The vibration pattern is:
              <br />• Short vibration = Dot (·)
              <br />• Long vibration = Dash (−)
              <br />• Pause = Letter separator
            </p>
          </div>
        </div>
      ),
    },
  ];

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

              {/* Warning Box if Bridge Not Connected */}
              {step === 2 && !hapticBridgeConnected && (
                <div className="flex gap-2 p-3 bg-yellow-50 border border-yellow-200 rounded-lg mt-4">
                  <AlertCircle className="w-5 h-5 text-yellow-600 flex-shrink-0 mt-0.5" />
                  <div className="text-sm text-yellow-800">
                    <strong>⚠️ Haptic Bridge Not Running:</strong> Make sure you completed Step 2 and the bridge is running on your laptop.
                  </div>
                </div>
              )}
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
