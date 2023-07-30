export function classnames(classCondition: {
  [p: number]: boolean | string | undefined;
}): string {
  return Object.entries(classCondition)
    .filter(([_, value]) => value)
    .map(([key]) => key)
    .join(' ');
}

export function getCookie(name: string) {
  const cookieValue = document.cookie
    .split('; ')
    .find((row) => row.startsWith(name + '='));

  if (cookieValue) {
    return decodeURIComponent(cookieValue.split('=')[1]);
  }

  return null;
}
