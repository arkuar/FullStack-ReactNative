export const roundCount = (count) => {
  if (count >= 1000) {
    return `${Number.parseFloat(count / 1000).toFixed(1)}k`;
  }
  return count;
};