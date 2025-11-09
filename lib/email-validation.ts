/**
 * Robust email validation utility
 * Implements RFC 5322 compliant email validation with additional security checks
 */

const MAX_EMAIL_LENGTH = 254; // RFC 5321
const MAX_LOCAL_PART_LENGTH = 64; // RFC 5321
const MAX_DOMAIN_LENGTH = 255; // RFC 1035

/**
 * Common disposable email domains to block
 * In production, this should be maintained as a comprehensive list or use a service
 */
const DISPOSABLE_EMAIL_DOMAINS = new Set([
  'tempmail.com',
  'throwaway.email',
  'guerrillamail.com',
  'mailinator.com',
  '10minutemail.com',
  'temp-mail.org',
  'yopmail.com',
]);

/**
 * More comprehensive regex for email validation
 * Based on simplified RFC 5322 compliance
 */
const EMAIL_REGEX = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;

/**
 * Validates email format with comprehensive checks
 */
export function isValidEmail(email: string): boolean {
  // Check if email is a string
  if (typeof email !== 'string') {
    return false;
  }

  // Trim and normalize
  const trimmedEmail = email.trim();

  // Check length
  if (trimmedEmail.length === 0 || trimmedEmail.length > MAX_EMAIL_LENGTH) {
    return false;
  }

  // Check for basic format
  if (!EMAIL_REGEX.test(trimmedEmail)) {
    return false;
  }

  // Split into local and domain parts
  const parts = trimmedEmail.split('@');
  if (parts.length !== 2) {
    return false;
  }

  const [localPart, domain] = parts;

  // Validate local part length
  if (localPart.length === 0 || localPart.length > MAX_LOCAL_PART_LENGTH) {
    return false;
  }

  // Validate domain length
  if (domain.length === 0 || domain.length > MAX_DOMAIN_LENGTH) {
    return false;
  }

  // Check for consecutive dots
  if (localPart.includes('..') || domain.includes('..')) {
    return false;
  }

  // Check local part doesn't start or end with dot
  if (localPart.startsWith('.') || localPart.endsWith('.')) {
    return false;
  }

  // Check domain has at least one dot and valid TLD
  const domainParts = domain.split('.');
  if (domainParts.length < 2) {
    return false;
  }

  // Validate TLD (top-level domain) - must be at least 2 characters
  const tld = domainParts[domainParts.length - 1];
  if (tld.length < 2) {
    return false;
  }

  // Check domain doesn't start or end with hyphen
  if (domain.startsWith('-') || domain.endsWith('-')) {
    return false;
  }

  // All checks passed
  return true;
}

/**
 * Checks if email domain is a known disposable email provider
 */
export function isDisposableEmail(email: string): boolean {
  const domain = email.toLowerCase().split('@')[1];
  return DISPOSABLE_EMAIL_DOMAINS.has(domain);
}

/**
 * Normalizes email address for storage and comparison
 */
export function normalizeEmail(email: string): string {
  return email.toLowerCase().trim();
}

/**
 * Validates email with additional security checks
 * Returns validation result with error message if invalid
 */
export interface EmailValidationResult {
  isValid: boolean;
  error?: string;
  normalizedEmail?: string;
}

export function validateEmail(
  email: string,
  options: {
    blockDisposable?: boolean;
  } = {}
): EmailValidationResult {
  // Check if email exists
  if (!email || typeof email !== 'string') {
    return {
      isValid: false,
      error: 'ኢሜይል ያስፈልጋል። (Email is required.)',
    };
  }

  const trimmedEmail = email.trim();

  // Check basic validity
  if (!isValidEmail(trimmedEmail)) {
    return {
      isValid: false,
      error: 'እባክዎ ትክክለኛ የኢሜይል አድራሻ ያስገቡ። (Please enter a valid email address.)',
    };
  }

  // Check for disposable email if option is enabled
  if (options.blockDisposable && isDisposableEmail(trimmedEmail)) {
    return {
      isValid: false,
      error: 'እባክዎ ጊዜያዊ ኢሜይል አድራሻ ሳይሆን ቋሚ ኢሜይል ያስገቡ። (Please use a permanent email address, not a temporary one.)',
    };
  }

  // All validation passed
  return {
    isValid: true,
    normalizedEmail: normalizeEmail(trimmedEmail),
  };
}
