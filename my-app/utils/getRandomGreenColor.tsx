export function getRandomGreenColor(GREEN_COLORS: string[]) {
  const randomIndex = Math.floor(Math.random() * GREEN_COLORS.length);
  return GREEN_COLORS[randomIndex];
}
