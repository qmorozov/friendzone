export function classnames(classCondition: {
  [p: number]: boolean | string | undefined;
}): string {
  return Object.entries(classCondition)
    .filter(([_, value]) => value)
    .map(([key]) => key)
    .join(' ');
}

export const getCookie = (name: string): string | undefined => {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) {
    const token = parts.pop()?.split(';').shift()?.trim();
    return token || undefined;
  }
  return undefined;
};
