type DateInput = Date | string | number;

const SECONDS_IN_MINUTE = 60;
const SECONDS_IN_HOUR = 3600;
const SECONDS_IN_DAY = 86400;
const SECONDS_IN_MONTH = 2592000;
const SECONDS_IN_YEAR = 31536000;

export const humanize = (dateInput: DateInput): string => {
  const date = new Date(dateInput);

  if (isNaN(date.getTime())) {
    console.error("Invalid date provided:", dateInput);
    return "Tanggal tidak valid";
  }

  const now = new Date();
  const diffMs = now.getTime() - date.getTime();

  if (diffMs < 0 && Math.abs(diffMs) < 1000) {
    return "Barusan saja";
  } else if (diffMs < 0) {
    console.warn("Date provided is in the future:", date);
    return "Barusan saja";
  }

  const diffSeconds = Math.floor(diffMs / 1000);

  if (diffSeconds < SECONDS_IN_MINUTE) {
    return "Barusan saja";
  } else if (diffSeconds < SECONDS_IN_HOUR) {
    const minutes = Math.floor(diffSeconds / SECONDS_IN_MINUTE);
    return `${minutes} menit yang lalu`;
  } else if (diffSeconds < SECONDS_IN_DAY) {
    const hours = Math.floor(diffSeconds / SECONDS_IN_HOUR);
    return `${hours} jam yang lalu`;
  } else if (diffSeconds < SECONDS_IN_MONTH) {
    const days = Math.floor(diffSeconds / SECONDS_IN_DAY);
    return `${days} hari yang lalu`;
  } else if (diffSeconds < SECONDS_IN_YEAR) {
    const months = Math.floor(diffSeconds / SECONDS_IN_MONTH);

    return `${months} bulan yang lalu`;
  } else {
    const years = Math.floor(diffSeconds / SECONDS_IN_YEAR);
    return `${years} tahun yang lalu`;
  }
};
