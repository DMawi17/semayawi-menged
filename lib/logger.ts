/**
 * Centralized logging utility
 * Provides structured logging with environment-aware behavior
 */

type LogLevel = 'debug' | 'info' | 'warn' | 'error';

interface LogOptions {
  context?: string;
  data?: unknown;
}

class Logger {
  private isDevelopment: boolean;

  constructor() {
    this.isDevelopment = process.env.NODE_ENV === 'development';
  }

  /**
   * Log debug messages (only in development)
   */
  debug(message: string, options?: LogOptions): void {
    if (this.isDevelopment) {
      this.log('debug', message, options);
    }
  }

  /**
   * Log informational messages
   */
  info(message: string, options?: LogOptions): void {
    if (this.isDevelopment) {
      this.log('info', message, options);
    }
  }

  /**
   * Log warning messages
   */
  warn(message: string, options?: LogOptions): void {
    this.log('warn', message, options);
  }

  /**
   * Log error messages (always logged)
   */
  error(message: string, options?: LogOptions): void {
    this.log('error', message, options);
  }

  /**
   * Internal logging method
   */
  private log(level: LogLevel, message: string, options?: LogOptions): void {
    const timestamp = new Date().toISOString();
    const context = options?.context ? `[${options.context}]` : '';
    const prefix = `${timestamp} ${level.toUpperCase()} ${context}`;

    switch (level) {
      case 'debug':
        console.debug(`${prefix} ${message}`, options?.data || '');
        break;
      case 'info':
        console.info(`${prefix} ${message}`, options?.data || '');
        break;
      case 'warn':
        console.warn(`${prefix} ${message}`, options?.data || '');
        break;
      case 'error':
        console.error(`${prefix} ${message}`, options?.data || '');
        break;
    }
  }
}

// Export singleton instance
export const logger = new Logger();

// Convenience exports
export const logDebug = (message: string, options?: LogOptions) => logger.debug(message, options);
export const logInfo = (message: string, options?: LogOptions) => logger.info(message, options);
export const logWarn = (message: string, options?: LogOptions) => logger.warn(message, options);
export const logError = (message: string, options?: LogOptions) => logger.error(message, options);
