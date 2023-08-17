/** @jsxImportSource @emotion/react */
import { LegacyRef, ReactNode, useMemo } from "react";
import { SerializedStyles, css } from "@emotion/react";
import { Avocado, Neutral } from "../../styles/brandColors";
import { cssWithMq } from "../../styles/cssWithMq";
import { ReactComponent as ChevronDown } from "../../assets/chevronDown.svg";
import { ReactComponent as ChevronUp } from "../../assets/chevronUp.svg";

const iconCss = cssWithMq({
  display: "flex",
  padding: ".75rem",
  justifyContent: "center",
  alignItems: "center",
  marginRight: "1.5rem",

  borderRadius: "6.25rem",
  backgroundColor: Avocado[200],
});

const buttonCss = cssWithMq({
  display: "flex",
  padding: ".75rem",
  alignItems: "center",
  flex: "1 0 0",
  width: ["100%", ""],

  borderRadius: "6.25rem",
  "&:hover": {
    backgroundColor: `${Neutral[100]}80`,
  },
  backgroundColor: "#00000000",
  border: "0px",
});

const textCss = cssWithMq({
  display: "flex",
  flexDirection: "column",
  textAlign: "start",
  fontFamily: "Poppins",
  width: "10rem",
});

export interface ButtonProps {
  onClick: () => void;
  styles?: SerializedStyles;
  buttonRef?: LegacyRef<HTMLButtonElement> | null;
  popperRef: LegacyRef<HTMLDivElement> | null;
  title: string;
  selection: string;
  Icon: ReactNode;
  iconStyles: SerializedStyles;
  active: boolean;
}
export const IconButton = (props: ButtonProps) => {
  const {
    onClick,
    title,
    selection,
    styles,
    buttonRef,
    iconStyles,
    active,
    popperRef,
  } = props;

  const buttonActiveCss = useMemo(
    () => (active ? css({ backgroundColor: `${Neutral[100]}80` }) : null),
    [active],
  );

  return (
    <div ref={popperRef}>
      <button
        onClick={onClick}
        css={css(buttonCss, styles, buttonActiveCss)}
        ref={buttonRef}
        id={title}
      >
        <div css={css(iconCss, iconStyles)}>{props.Icon}</div>
        <div css={textCss}>
          <section css={css({ color: Neutral[500] })}>
            {title} {active ? <ChevronUp /> : <ChevronDown />}
          </section>
          <div css={css({ lineHeight: "1.5rem", zIndex: 0 })}>{selection}</div>
        </div>
      </button>
    </div>
  );
};
