/** @jsxImportSource @emotion/react */
import "react-day-picker/dist/style.css";
import { cssWithMq } from "../styles/cssWithMq";
import { Black, Marigold, Neutral } from "../styles/brandColors";
import {
  Dispatch,
  SetStateAction,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import { ReactComponent as Results } from "../assets/results.svg";
import { IconButton } from "./reusable/IconButton";
import { css } from "@emotion/react";

const modalCss = cssWithMq({
  position: "absolute",
  display: "flex",
  padding: "2rem 1rem",
  flexDirection: "column",

  backgroundColor: Neutral[0],
  borderRadius: "1.5rem",
  boxShadow: `0px 4px 24px 0px ${Black[0]}1F`,
  width: "12.5rem",
  gap: "1.5rem",
});

const countOptionCss = cssWithMq({
  border: "0px",
  backgroundColor: Neutral[0],
  alignSelf: "stretch",
  fontFamily: "Poppins",
  fontSize: "1rem",
  lineHeight: "1.5rem",
  "&:hover": {
    backgroundColor: `${Neutral[100]}80`,
  },
});

const resultsIconCss = cssWithMq({
  backgroundColor: Marigold[200],
});

const COUNT_OPTIONS = [25, 50, 75, 100, 200];

export interface CountPickerProps {
  count: number;
  setCount: Dispatch<SetStateAction<number>>;
}

export const CountPicker = (props: CountPickerProps) => {
  const { count, setCount } = props;
  const [isPopperOpen, setIsPopperOpen] = useState(false);

  const popperRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const [popperElement, setPopperElement] = useState<HTMLDivElement | null>(
    null,
  );

  const closePopper = useCallback(() => {
    setIsPopperOpen(false);
    buttonRef?.current?.focus();
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: any) => {
      if (popperElement && !popperElement.contains(event.target)) {
        closePopper();
        if (buttonRef.current?.contains(event.target)) {
          event.stopPropagation();
        }
      }
    };
    document.addEventListener("click", handleClickOutside, true);
    return () => {
      document.removeEventListener("click", handleClickOutside, true);
    };
  }, [closePopper, popperElement]);

  const handleButtonClick = () => {
    setIsPopperOpen(true);
  };

  const handleCountSelect = (selectedCount?: number) => {
    if (selectedCount) {
      setCount(selectedCount);
    }
    closePopper();
  };

  return (
    <div css={css({ zIndex: 1 })}>
      <IconButton
        popperRef={popperRef}
        buttonRef={buttonRef}
        onClick={handleButtonClick}
        iconStyles={css(resultsIconCss)}
        active={isPopperOpen}
        selection={count.toString()}
        title="NUM RESULTS"
        Icon={<Results />}
      />
      {isPopperOpen && (
        <div
          css={modalCss}
          ref={setPopperElement}
          tabIndex={-1}
          // onClick={(e) => e.stopPropagation()}
        >
          {COUNT_OPTIONS.map((option: number) => (
            <button
              onClick={() => handleCountSelect(option)}
              key={option}
              css={countOptionCss}
            >
              {option}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};
