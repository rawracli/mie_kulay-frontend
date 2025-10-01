// Fungsi untuk memformat angka menjadi format singkat (k, jt, m, t)
export const formatShort = (value) => {
  if (value === 0) return "0";
  const abs = Math.abs(value);

  const formatNum = (num, divisor, suffix) => {
    const v = (num / divisor).toPrecision(3);
    return `${parseFloat(v)}${suffix}`;
  };

  if (abs >= 1e12) return formatNum(value, 1e12, "t");
  if (abs >= 1e9) return formatNum(value, 1e9, "m");
  if (abs >= 1e6) return formatNum(value, 1e6, "jt");
  if (abs >= 1e3) return formatNum(value, 1e3, "k");
  return value.toString();
};
