export function utcDateToLocalDate(utcDate: Date): Date {
  const utc = new Date(utcDate);
  const offset = utc.getTimezoneOffset();
  const local = new Date(utc.getTime() + offset * 60000 * (-1));
  return local;
}
