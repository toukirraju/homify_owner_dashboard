export const monthIsBeforeOrOn25th = (dateArg) => {
  const today = new Date();
  const date = new Date(dateArg);
  const dayOfMonth = date.getDate() + 1;
  const currentMonth = date.getMonth() + 1;
  const isSameMonth = currentMonth === today.getMonth() + 1;
  if (isSameMonth) {
    if (isSameMonth && dayOfMonth <= 25) return true;
  } else {
    if (date < today && !isSameMonth) return false;
  }
  return false;
};
