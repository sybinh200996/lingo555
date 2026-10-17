import React from 'react';
import { AlertTriangle, RotateCcw, Home, Sparkles, Key } from 'lucide-react';

export class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
      errorInfo: null
    };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('ErrorBoundary caught an unhandled error:', error, errorInfo);
    this.setState({ errorInfo });
  }

  handleReset = () => {
    this.setState({ hasError: false, error: null, errorInfo: null });
    if (this.props.onReset) {
      this.props.onReset();
    }
  };

  handleReload = () => {
    window.location.reload();
  };

  handleOpenAiSettings = () => {
    // Dispatch custom event to open AISettingsModal from anywhere
    window.dispatchEvent(new CustomEvent('lingo555:open-ai-settings'));
    this.handleReset();
  };

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback(this.state.error, this.handleReset);
      }

      return (
        <div className="min-h-[400px] w-full flex items-center justify-center p-6 select-none animate-in fade-in">
          <div className="duo-card max-w-lg w-full p-6 text-center space-y-5 border-2 border-b-6 border-amber-300 dark:border-amber-700 bg-white dark:bg-slate-900 shadow-xl">
            {/* Friendly Mascot Warning Icon */}
            <div className="w-16 h-16 mx-auto rounded-3xl bg-amber-100 dark:bg-amber-950/60 border-2 border-amber-300 dark:border-amber-700 flex items-center justify-center text-amber-600 dark:text-amber-400 shadow-sm animate-bounce-short">
              <AlertTriangle className="w-9 h-9" />
            </div>

            <div className="space-y-1.5">
              <h3 className="text-xl font-black text-slate-800 dark:text-white">
                {this.props.title || 'Đã có sự cố hiển thị xảy ra'}
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 max-w-sm mx-auto leading-relaxed">
                Hệ thống đã tự động bảo vệ dữ liệu học tập của bạn. Tiến trình học, điểm XP và chuỗi streak vẫn được lưu an toàn.
              </p>
            </div>

            {/* Error Message Snippet */}
            {this.state.error && (
              <div className="p-3 rounded-xl bg-slate-100 dark:bg-slate-800/70 border border-slate-200 dark:border-slate-700 text-left text-[11px] font-mono text-slate-600 dark:text-slate-300 max-h-24 overflow-y-auto">
                {this.state.error.message || String(this.state.error)}
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center justify-center gap-2.5 pt-2">
              <button
                type="button"
                onClick={this.handleReset}
                className="duo-btn duo-btn-green px-4 py-2.5 rounded-xl text-xs flex items-center gap-1.5"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Thử lại ngay</span>
              </button>

              <button
                type="button"
                onClick={this.handleReload}
                className="duo-btn duo-btn-blue px-4 py-2.5 rounded-xl text-xs flex items-center gap-1.5"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Tải lại trang</span>
              </button>

              <button
                type="button"
                onClick={this.handleOpenAiSettings}
                className="duo-btn duo-btn-outline px-4 py-2.5 rounded-xl text-xs flex items-center gap-1.5 text-slate-700 dark:text-slate-200"
              >
                <Key className="w-3.5 h-3.5 text-emerald-500" />
                <span>Cấu hình API Key AI</span>
              </button>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
