export function classnames(classCondition: {
  [p: number]: boolean | string | undefined;
}): string {
  return Object.entries(classCondition)
    .filter(([_, value]) => value)
    .map(([key]) => key)
    .join(' ');
}
