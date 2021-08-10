import { getLuminance } from 'polished';
import { getNecessaryLuminance } from './get-necessary-luminance';
import { setLuminance } from './set-luminance';

export const getSuggestedColor = (bgColor: string, color: string): string => {
  const bgColorLuminance = getLuminance(bgColor);
  const minimumLuminanceRequired = getNecessaryLuminance(bgColorLuminance);

  return setLuminance(minimumLuminanceRequired, color);
};
