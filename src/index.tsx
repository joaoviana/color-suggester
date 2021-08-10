import React, { FC, useEffect, useState } from 'react';
import { colorSuggester } from './utils/color-suggester';

export type Props = {
  baseColor: string;
};

// TODO: make background changeable by storybook control.
// TODO: improve display of suggested colours.

export const Main: FC<Props> = ({ baseColor }) => {
  const [suggestedColors, setSuggestedColors] = useState<
    string | string[] | undefined
  >();

  useEffect(() => {
    setSuggestedColors(colorSuggester('#ffffff', baseColor));
  }, []);

  return suggestedColors ? (
    <>
      <div>
        <h1>Colour</h1>
        <div
          style={{
            backgroundColor: baseColor,
            width: '100px',
            height: '100px',
          }}
        />
      </div>
      {Array.isArray(suggestedColors) ? (
        suggestedColors.map((color, index) => (
          <p key={index} style={{ color }}>
            color
          </p>
        ))
      ) : (
        <p style={{ color: suggestedColors }}>color</p>
      )}
    </>
  ) : null;
};
