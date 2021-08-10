import { getLuminance, parseToRgb, mix, rgba } from 'polished';
import { RgbaColor, RgbColor } from 'polished/lib/types/color';

const EPS = 1e-7;

const isRgba = (color: RgbColor | RgbaColor): color is RgbaColor =>
  'alpha' in color;

export const setLuminance = (amount: number, color: string): string => {
  const parsedColor = parseToRgb(color);
  const parsedColorAlpha = isRgba(parsedColor) ? parsedColor.alpha : undefined;
  let rgb;
  // https://github.com/styled-components/polished/issues/148
  if (amount === 0) {
    rgb = rgba(0, 0, 0, parsedColorAlpha);
  } else if (amount === 1) {
    rgb = rgba(255, 255, 255, parsedColorAlpha);
  } else {
    let maxIteration = 20;
    const test = (color1: string, color2: string): string => {
      const mixed = mix(0.5, color1, color2);
      const mixedLuminance = getLuminance(mixed);
      if (Math.abs(amount - mixedLuminance) < EPS || !maxIteration--) {
        return mixed;
      }
      if (mixedLuminance > amount) {
        return test(color1, mixed);
      }
      return test(mixed, color2);
    };
    rgb =
      getLuminance(color) > amount ? test('#000', color) : test(color, '#fff');
  }
  return rgb;
};
