/** @jsxImportSource @emotion/react */
import { css, CSSObject, SerializedStyles } from "@emotion/react";

const breakpoints = [0, 800];

const mq = breakpoints.map((bp) => `@media (min-width: ${bp}px)`);

/**
 * This function converts css with array values to css with media query values
 * where the media query is based on the width of the page.
 * Using the above breakpoints, we can simplify applying CSS throughout the app
 * by having arrays where we want css to differ on mobile and desktop
 * This can be expanded to include tablet, but no need in this use case.
 *
 * @param template - css object with arrays in place of css values where mobile and desktop differ
 */
export const cssWithMq = (template: CSSObject): SerializedStyles => {
  let finalCss = {};
  let mq0 = {};
  let mq1 = {};
  Object.keys(template).forEach((key) => {
    const mqValues = template[key];
    if (Array.isArray(mqValues)) {
      mq0 = {
        ...mq0,
        [key]: mqValues[0],
      };
      mq1 = {
        ...mq1,
        [key]: mqValues[1],
      };
    } else {
      finalCss = { ...finalCss, [key]: mqValues };
    }
  });
  console.log(mq1);

  return css({ ...finalCss, [mq[0]]: mq0, [mq[1]]: mq1 });
};
