/** @jsxImportSource @emotion/react */
import {css, CSSObject, SerializedStyles} from "@emotion/react";

const breakpoints = [0, 500];

const mq = breakpoints.map(bp => `@media (min-width: ${bp}px)`);
export const cssWithMq = (template: CSSObject): SerializedStyles => {
    let finalCss = {};
    Object.keys(template).forEach((key) => {
        const mqValues = template[key];
        if (Array.isArray(mqValues)) {
            finalCss = {
                ...finalCss,
                [mq[0]]: {
                    [key]: mqValues[0]
                },
                [mq[1]]: {
                    [key]: mqValues[1]
                }
            }
        } else {
            finalCss = {...finalCss, [key]: mqValues}
        }
    });
    console.log(finalCss);
    return css(finalCss);
}