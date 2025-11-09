/**
 * Ethiopian Calendar Conversion Utility
 * Converts Gregorian dates to Ethiopian calendar dates
 */

// Ethiopian month names in Amharic
const ETHIOPIAN_MONTHS = [
  "መስከረም", // Meskerem
  "ጥቅምት",   // Tikimt
  "ኅዳር",    // Hidar
  "ታኅሣሥ",   // Tahsas
  "ጥር",     // Tir
  "የካቲት",   // Yekatit
  "መጋቢት",   // Megabit
  "ሚያዝያ",   // Miazia
  "ግንቦት",   // Ginbot
  "ሰኔ",      // Sene
  "ሐምሌ",    // Hamle
  "ነሐሴ",    // Nehasse
  "ጳጉሜ",    // Pagumen
];

interface EthiopianDate {
  year: number;
  month: number;
  day: number;
  monthName: string;
}

/**
 * Check if a Gregorian year is a leap year
 */
function isGregorianLeapYear(year: number): boolean {
  return (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;
}

/**
 * Check if an Ethiopian year is a leap year
 */
function isEthiopianLeapYear(year: number): boolean {
  return (year % 4 === 3);
}

/**
 * Convert Gregorian date to Ethiopian date
 * Algorithm based on the standard conversion formulas
 * Fixed: Corrected Ethiopian New Year day calculation
 */
export function gregorianToEthiopian(date: Date): EthiopianDate {
  const year = date.getFullYear();
  const month = date.getMonth() + 1; // JavaScript months are 0-indexed
  const day = date.getDate();

  // Calculate day number from start of Gregorian year
  const monthDays = [0, 31, 59, 90, 120, 151, 181, 212, 243, 273, 304, 334];
  let dayOfYear = monthDays[month - 1] + day;

  if (month > 2 && isGregorianLeapYear(year)) {
    dayOfYear++;
  }

  // Ethiopian New Year in Gregorian calendar
  // September 11 (or 12 in Gregorian leap years preceding Ethiopian leap year)
  let ethNewYearDay = 11;
  const ethYearIfAfterNewYear = year - 7;

  if (isGregorianLeapYear(year) && isEthiopianLeapYear(ethYearIfAfterNewYear)) {
    ethNewYearDay = 12;
  }

  // Day of year for Ethiopian New Year (Sept 11 or 12)
  const ethNewYearDayOfYear = 243 + ethNewYearDay; // 254 or 255

  // Calculate Ethiopian date
  let ethYear: number;
  let ethDayOfYear: number;

  // Before Ethiopian New Year (before Sept 11/12)
  if (dayOfYear < ethNewYearDayOfYear) {
    ethYear = year - 8;
    // Days remaining in previous Ethiopian year
    const daysInEthYear = isEthiopianLeapYear(ethYear) ? 366 : 365;
    ethDayOfYear = daysInEthYear - (ethNewYearDayOfYear - dayOfYear);
  } else {
    // After or on Ethiopian New Year
    ethYear = year - 7;
    ethDayOfYear = dayOfYear - ethNewYearDayOfYear + 1;
  }

  // Convert day of year to month and day
  // Ethiopian months are 30 days each, except Pagumen (13th month) which has 5 or 6 days
  let ethMonth: number;
  let ethDay: number;

  if (ethDayOfYear <= 360) {
    // First 12 months (30 days each)
    ethMonth = Math.floor((ethDayOfYear - 1) / 30) + 1;
    ethDay = ((ethDayOfYear - 1) % 30) + 1;
  } else {
    // 13th month (Pagumen)
    ethMonth = 13;
    ethDay = ethDayOfYear - 360;
  }

  // Safety checks
  if (ethMonth < 1) ethMonth = 1;
  if (ethMonth > 13) ethMonth = 13;
  if (ethDay < 1) ethDay = 1;

  return {
    year: ethYear,
    month: ethMonth,
    day: ethDay,
    monthName: ETHIOPIAN_MONTHS[ethMonth - 1] || "ልክ ያልሆነ",
  };
}

/**
 * Format Ethiopian date as a readable string
 * Example: "መስከረም 29, 2018" or "ጳጉሜ 5, 2018"
 */
export function formatEthiopianDate(date: Date | string | number): string {
  try {
    const gregorianDate = new Date(date);

    if (isNaN(gregorianDate.getTime())) {
      console.error("Invalid date:", date);
      return "ልክ ያልሆነ ቀን";
    }

    const ethDate = gregorianToEthiopian(gregorianDate);

    // Format: "ወር ቀን, ዓመት" (Month Day, Year)
    return `${ethDate.monthName} ${ethDate.day}, ${ethDate.year}`;
  } catch (error) {
    console.error("Error formatting Ethiopian date:", error);
    return "ልክ ያልሆነ ቀን";
  }
}

/**
 * Get full Ethiopian date information
 */
export function getEthiopianDateInfo(date: Date | string | number): EthiopianDate | null {
  try {
    const gregorianDate = new Date(date);

    if (isNaN(gregorianDate.getTime())) {
      return null;
    }

    return gregorianToEthiopian(gregorianDate);
  } catch (error) {
    console.error("Error getting Ethiopian date info:", error);
    return null;
  }
}
