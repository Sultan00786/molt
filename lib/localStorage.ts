export const getLocalData = <T>(key: string): T | null => {
  if (typeof window === "undefined") return null;
  const data = localStorage.getItem(key);
  return data ? JSON.parse(data) : null;
};
