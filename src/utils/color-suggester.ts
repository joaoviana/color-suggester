import { meetsContrastGuidelines, adjustHue } from 'polished';
import { getSuggestedColor } from './get-suggested-color';

export const colorSuggester = (
  bgColor: string,
  color: string
): string | string[] => {
  if (meetsContrastGuidelines(bgColor, color).AA) {
    return color;
  }
  const firstSuggestion = getSuggestedColor(bgColor, color);

  // https://www.tigercolor.com/color-lab/color-theory/color-harmonies.htm
  const hues = [0, 340, 60, 270, 180];

  const suggestions = hues.map((hue) =>
    meetsContrastGuidelines(bgColor, adjustHue(hue, firstSuggestion)).AA
      ? adjustHue(hue, firstSuggestion)
      : getSuggestedColor(bgColor, adjustHue(hue, firstSuggestion))
  );

  console.log({ suggestions });
  return suggestions;
};
