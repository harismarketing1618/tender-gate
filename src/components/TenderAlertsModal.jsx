import React, { useState } from 'react';
import { 
  Bell, 
  X, 
  CheckCircle2, 
  Send, 
  Smartphone, 
  Mail, 
  ShieldCheck, 
  Sparkles 
} from 'lucide-react';
import { PROVINCES_AND_REGIONS } from '../data/pakistanMeta';
import { soundFX } from '../services/soundFx';

export default function TenderAlertsModal({
  isOpen,
  onClose,
  agents
}) {
  const [channel, setChannel] = useState('whatsapp'); // 'whatsapp' | 'email'
  const [phoneNumber, setPhoneNumber] = useState('+92 300 1234567');
  const [emailAddress, setEmailAddress] = useState('contractor@company.pk');
  const [selectedAgentIds, setSelectedAgentIds] = useState(agents.map(a => a.id));
  const [selectedProvince, setSelectedProvince] = useState('all');
  const [isSubscribed, setIsSubscribed] = useState(false);

  if (!isOpen) return null;

  const handleToggleAgent = (id) => {
    soundFX.playPop();
    if (selectedAgentIds.includes(id)) {
      setSelectedAgentIds(selectedAgentIds.filter(a => a !== id));
    } else {
      setSelectedAgentIds([...selectedAgentIds, id]);
    }
  };

  const handleSubscribe = (e) => {
    e.preventDefault();
    soundFX.playSuccess();
    setIsSubscribed(true);
    setTimeout(() => {
      setIsSubscribed(false);
      onClose();
    }, 2500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-900/60 backdrop-blur-sm overflow-y-auto">
      <div className="relative w-full max-w-lg bg-white border border-[#e6dacb] rounded-3xl shadow-2xl overflow-hidden my-auto animate-fadeIn text-slate-900">
        
        {/* Header */}
        <div className="bg-[#fbf9f5] border-b border-[#ece4d8] p-5 sm:p-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-2xl bg-[#f5efe6] text-blue-800 border border-[#e2d5c3] flex items-center justify-center">
              <Bell className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <h2 className="text-lg font-black text-slate-900 font-['Outfit']">
                Instant Pakistan Tender Alerts
              </h2>
              <p className="text-xs text-slate-500 font-medium">
                Get notified on WhatsApp or Email whenever our 8 AI agents find matching tenders
              </p>
            </div>
          </div>
          <button
            onClick={() => {
              soundFX.playPop();
              onClose();
            }}
            className="p-2 rounded-xl bg-white hover:bg-[#f5efe6] text-slate-500 hover:text-slate-900 border border-[#e6dacb] transition cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content Body */}
        {isSubscribed ? (
          <div className="p-8 text-center space-y-3">
            <div className="w-16 h-16 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center mx-auto text-2xl border border-blue-300">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h3 className="text-lg font-black text-slate-900 font-['Outfit']">Alerts Active!</h3>
            <p className="text-xs text-slate-600 font-medium max-w-xs mx-auto">
              You will receive automated daily briefings from your selected AI agents via {channel === 'whatsapp' ? 'WhatsApp' : 'Email'}.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubscribe} className="p-6 sm:p-8 space-y-4 text-xs">
            
            {/* Channel Selection */}
            <div>
              <label className="text-xs font-bold text-slate-700 block mb-1.5">
                Delivery Channel:
              </label>
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => {
                    soundFX.playPop();
                    setChannel('whatsapp');
                  }}
                  className={`py-3 px-3 rounded-2xl border flex items-center justify-center gap-2 font-bold transition cursor-pointer ${
                    channel === 'whatsapp'
                      ? 'bg-blue-50 text-blue-900 border-blue-400 shadow-2xs'
                      : 'bg-[#fbf9f5] text-slate-600 border-[#e6dacb]'
                  }`}
                >
                  <Smartphone className="w-4 h-4 text-emerald-600" />
                  <span>WhatsApp Alerts</span>
                </button>

                <button
                  type="button"
                  onClick={() => {
                    soundFX.playPop();
                    setChannel('email');
                  }}
                  className={`py-3 px-3 rounded-2xl border flex items-center justify-center gap-2 font-bold transition cursor-pointer ${
                    channel === 'email'
                      ? 'bg-[#f5efe6] text-[#7a5632] border-[#e2d5c3] shadow-2xs font-bold'
                      : 'bg-[#fbf9f5] text-slate-600 border-[#e6dacb]'
                  }`}
                >
                  <Mail className="w-4 h-4 text-[#8a6742]" />
                  <span>Email Digest</span>
                </button>
              </div>
            </div>

            {/* Contact Input */}
            {channel === 'whatsapp' ? (
              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">
                  WhatsApp Number (with Country Code):
                </label>
                <input
                  type="text"
                  required
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  placeholder="+92 300 1234567"
                  className="w-full bg-[#fbf9f5] border border-[#e2d5c3] rounded-xl px-3.5 py-2.5 text-xs text-slate-900 focus:outline-none focus:border-blue-600 font-medium"
                />
              </div>
            ) : (
              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">
                  Email Address:
                </label>
                <input
                  type="email"
                  required
                  value={emailAddress}
                  onChange={(e) => setEmailAddress(e.target.value)}
                  placeholder="contractor@firm.com.pk"
                  className="w-full bg-[#fbf9f5] border border-[#e2d5c3] rounded-xl px-3.5 py-2.5 text-xs text-slate-900 focus:outline-none focus:border-blue-600 font-medium"
                />
              </div>
            )}

            {/* Province Selection */}
            <div>
              <label className="text-xs font-bold text-slate-700 block mb-1">
                Target Region:
              </label>
              <select
                value={selectedProvince}
                onChange={(e) => setSelectedProvince(e.target.value)}
                className="w-full bg-[#fbf9f5] border border-[#e2d5c3] rounded-xl px-3 py-2 text-xs text-slate-900 focus:outline-none focus:border-blue-600 font-medium"
              >
                {PROVINCES_AND_REGIONS.map(p => (
                  <option key={p.id} value={p.id}>{p.name}</option>
                ))}
              </select>
            </div>

            {/* Agent Category Checkboxes */}
            <div>
              <label className="text-xs font-bold text-slate-700 block mb-1.5">
                Select AI Agent Feeds to Monitor:
              </label>
              <div className="grid grid-cols-2 gap-1.5 max-h-40 overflow-y-auto pr-1">
                {agents.map(a => {
                  const isChecked = selectedAgentIds.includes(a.id);
                  return (
                    <button
                      type="button"
                      key={a.id}
                      onClick={() => handleToggleAgent(a.id)}
                      className={`p-2.5 rounded-xl text-left border flex items-center gap-2 transition cursor-pointer ${
                        isChecked
                          ? 'bg-white text-slate-900 border-blue-500 shadow-2xs font-bold'
                          : 'bg-[#fbf9f5] text-slate-600 border-[#e6dacb] font-medium'
                      }`}
                    >
                      <span>{a.avatar}</span>
                      <span className="truncate text-[11px]">{a.shortCategory}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Submit Button */}
            <div className="pt-3 border-t border-slate-200">
              <button
                type="submit"
                className="w-full py-3.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-black transition shadow-md shadow-blue-700/20 cursor-pointer flex items-center justify-center gap-1.5"
              >
                <Sparkles className="w-4 h-4" />
                <span>Activate Daily Automated Alerts</span>
              </button>
            </div>

          </form>
        )}

      </div>
    </div>
  );
}
