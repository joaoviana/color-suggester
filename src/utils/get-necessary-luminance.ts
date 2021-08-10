/**
 * Contrast Ratio Formula
 * (L1 + 0.05) / (L2 + 0.05), whereby:
 * L1 is the relative luminance of the lighter of the colors, and
 * L2 is the relative luminance of the darker of the colors.
 *
 * IN ORDER TO MEET WCAG AA
 * CR >= 4.5
 *
 * https://medium.muz.li/the-science-of-color-contrast-an-expert-designers-guide-33e84c41d156
 */

export const getNecessaryLuminance = (bgColorLuminance: number): number =>
  // assuming that colorLuminance NEEDS to have a lower luminance than the bgColor
  (bgColorLuminance + 0.05 - 4.5 * 0.05) / 4.5;
