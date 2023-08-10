/** @jsxImportSource @emotion/react */
import {cssWithMq} from "../styles/cssWithMq";
import {Green, Neutral} from "../styles/brandColors";

const bannerCss = cssWithMq({
    display: "flex",
    position: 'relative',
    width: '100%',
    height: ['4.5rem', '5rem'],
    alignItems: "center",
    gap: '0.5rem',
    background: Neutral[0],
    boxShadow: `0px 2px 0px 0px ${Green[500]}1A`,
    zIndex: 2,
})
export const Banner = () => {

    return (<div css={bannerCss} />)
}