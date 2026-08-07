export default function Loading() {
  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-white/80 backdrop-blur-md animate-in fade-in duration-300">
      <div className="relative flex flex-col items-center">
        {/* Logo/Icon Pulse */}
        <div className="w-16 h-16 mb-6 relative animate-pulse">
          <div className="absolute inset-0 border-4 border-teal-600 rounded-full opacity-20"></div>
          <div className="absolute inset-0 border-4 border-t-teal-600 border-r-teal-600 border-b-transparent border-l-transparent rounded-full animate-spin"></div>
        </div>
        
        {/* Loading Text */}
        <p className="text-lg font-medium text-teal-800 tracking-wider">
          Đang tải...
        </p>
        
        {/* Progress dots */}
        <div className="flex space-x-1 mt-2">
          <div className="w-2 h-2 bg-teal-600 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
          <div className="w-2 h-2 bg-teal-600 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
          <div className="w-2 h-2 bg-teal-600 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
        </div>
      </div>
    </div>
  );
}
