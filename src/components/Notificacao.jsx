import { X } from 'phosphor-react';

export default function Notification({ message, onClose, progress }) {
  return (
    <div className="fixed top-6 right-6 z-50 bg-red-500 text-white px-6 py-3 rounded shadow-lg animate-slide-in min-w-[260px]">
      <div className="flex items-center justify-between gap-4">
        <span>{message}</span>
        <button onClick={onClose} className="ml-4 p-1 rounded hover:bg-red-600 transition">
          <X size={20} />
        </button>
      </div>
      <div className="w-full h-1 bg-red-300 mt-2 rounded overflow-hidden">
        <div
          className="h-full bg-white transition-all duration-100 linear"
          style={{ width: `${progress}%` }}
        ></div>
      </div>
    </div>
  );
}
