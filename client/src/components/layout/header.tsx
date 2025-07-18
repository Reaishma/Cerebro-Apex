
import { Bell, Settings } from "lucide-react";

interface HeaderProps {
  isConnected: boolean;
}

export default function Header({ isConnected }: HeaderProps) {
  return (
    <header className="glassmorphism border-b border-slate-700/50 sticky top-0 z-50">
      <div className="px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-primary to-blue-600 rounded-lg flex items-center justify-center">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"></path>
                </svg>
              </div>
              <div>
                <h1 className="text-xl font-semibold text-white">Spring Boot Microservices</h1>
                <p className="text-sm text-slate-400">Architecture Dashboard</p>
              </div>
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <div className={`w-2 h-2 rounded-full ${isConnected ? 'bg-success status-pulse' : 'bg-destructive'}`}></div>
              <span className="text-sm text-slate-400">
                {isConnected ? 'Connected' : 'Disconnected'}
              </span>
            </div>
            
            <button className="p-2 text-slate-400 hover:text-white transition-colors">
              <Bell className="w-5 h-5" />
            </button>
            
            <button className="p-2 text-slate-400 hover:text-white transition-colors">
              <Settings className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
