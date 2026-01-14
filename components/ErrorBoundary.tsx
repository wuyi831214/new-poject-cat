import { Component, ErrorInfo, ReactNode } from 'react';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
  errorInfo: ErrorInfo | null;
}

export class ErrorBoundary extends Component<Props, State> {
  state: State = {
    hasError: false,
    error: null,
    errorInfo: null
  };

  static getDerivedStateFromError(error: Error): State {
    return {
      hasError: true,
      error,
      errorInfo: null
    };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Error caught by ErrorBoundary:', error, errorInfo);
    this.setState({
      error,
      errorInfo
    });
  }

  render() {
    const { hasError, error, errorInfo } = this.state;
    const { children, fallback } = this.props;

    if (hasError) {
      if (fallback) {
        return fallback;
      }

      return (
        <div className="flex flex-col items-center justify-center min-h-screen p-6 bg-background-light">
          <div className="text-center max-w-md">
            <div className="mb-6">
              <span className="material-symbols-outlined text-6xl text-red-400">error</span>
            </div>
            <h2 className="text-2xl font-bold text-text-main mb-4">出错了</h2>
            <p className="text-text-secondary mb-6">
              很抱歉,应用遇到了一些问题。请刷新页面重试。
            </p>
            <button
              onClick={() => window.location.reload()}
              className="px-6 py-3 bg-primary text-text-main font-bold rounded-xl shadow-lg hover:bg-opacity-90 transition-colors"
            >
              刷新页面
            </button>
            {process.env.NODE_ENV === 'development' && error && (
              <details className="mt-6 text-left">
                <summary className="cursor-pointer text-sm font-bold text-text-secondary mb-2">
                  错误详情
                </summary>
                <pre className="bg-gray-100 p-4 rounded-lg text-xs overflow-auto max-h-48">
                  {error.toString()}
                  {errorInfo?.componentStack}
                </pre>
              </details>
            )}
          </div>
        </div>
      );
    }

    return children;
  }
}
