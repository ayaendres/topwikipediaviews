/** @jsxImportSource @emotion/react */
import {
  CaptionProps,
  DayPicker,
  DayProps,
  useDayRender,
  useNavigation,
} from "react-day-picker";
import "react-day-picker/dist/style.css";
import { cssWithMq } from "../styles/cssWithMq";
import { Avocado, Black, Green, Ivy, Neutral } from "../styles/brandColors";
import {
  Dispatch,
  SetStateAction,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import { ReactComponent as CalendarIcon } from "../assets/calendar.svg";
import { ReactComponent as ChevronRight } from "../assets/chevronRight.svg";
import { ReactComponent as ChevronLeft } from "../assets/chevronLeft.svg";

import { IconButton } from "./reusable/IconButton";
import { css } from "@emotion/react";

const MONTH = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const captionCss = css({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  alignSelf: "stretch",
  fontFamily: "Poppins",
  fontWeight: 500,
  margin: "2rem 0rem",
});

const navButtonCss = css({
  border: "0px",
  backgroundColor: "#00000000",
  width: "1.5rem",
  height: "1.5rem",
});

const chevronCss = css({
  fill: Black[0],
});

const CustomCaption = (props: CaptionProps) => {
  const { displayMonth } = props;
  const { goToMonth, nextMonth, previousMonth } = useNavigation();
  const month = MONTH[displayMonth.getMonth()];
  return (
    <div css={captionCss}>
      <button
        css={navButtonCss}
        onClick={() => previousMonth && goToMonth(previousMonth)}
        data-testid="monthLeft"
      >
        <ChevronLeft css={chevronCss} />
      </button>
      {month} {displayMonth.getFullYear()}
      <button
        css={navButtonCss}
        onClick={() => nextMonth && goToMonth(nextMonth)}
        data-testid="monthRight"
      >
        <ChevronRight css={chevronCss} />
      </button>
    </div>
  );
};

const weekdayCss = css({
  textAlign: "center",
  fontFamily: "Poppins",
  fontSize: ".75rem",
  lineHeight: "1.125rem",
  color: Neutral[500],
});
const WEEKDAYS = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];
const CustomHead = () => {
  return (
    <tr key="weekdays">
      {WEEKDAYS.map((day) => (
        <td css={weekdayCss} key={day}>
          {day}
        </td>
      ))}
    </tr>
  );
};

const dayButtonCss = css({
  justifyContent: "center",
  width: "100%",
  height: "100%",
  color: Neutral[900],
  border: "0px",
  backgroundColor: "#00000000",
  fontFamily: "Poppins",
  lineHeight: "1.375rem",
});

const selectedDateCss = css({
  borderRadius: "1.5rem",
  backgroundColor: Ivy[300],
  color: Green[500],
});

const outsideMonthCss = css({
  color: Neutral[400],
});
const CustomDayButton = (props: DayProps) => {
  const { displayMonth, date } = props;
  const buttonRef = useRef<HTMLButtonElement>(null);
  const dayRender = useDayRender(date, displayMonth, buttonRef);

  const onClick = dayRender.buttonProps.onClick;
  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);
  const outsideMonth = date.getMonth() !== displayMonth.getMonth();
  const appliedCss = css(
    dayButtonCss,
    dayRender.activeModifiers.selected ? selectedDateCss : null,
    outsideMonth ? outsideMonthCss : null,
  );
  return (
    <button
      css={appliedCss}
      disabled={date >= yesterday || outsideMonth}
      onClick={onClick}
    >
      {date.getDate()}
    </button>
  );
};

const modalCss = cssWithMq({
  position: "absolute",
  display: "flex",
  padding: "0rem 1rem",
  flexDirection: "column",

  backgroundColor: Neutral[0],
  borderRadius: "1.5rem",
  boxShadow: `0px 4px 24px 0px ${Black[0]}1F`,
});

const dateIconCss = cssWithMq({
  backgroundColor: Avocado[200],
});

const getDateString = (date: Date) => {
  const month = MONTH[date.getMonth()];
  const day = date.getDate();
  const year = date.getFullYear();
  return `${month} ${day}, ${year}`;
};
export interface DatePickerProps {
  date: Date;
  setDate: Dispatch<SetStateAction<Date>>;
}

export const DatePicker = (props: DatePickerProps) => {
  const { date, setDate } = props;
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

  const handleDateSelect = (date?: Date) => {
    if (date) {
      setDate(date);
    }
    closePopper();
  };

  return (
    <div css={css({ zIndex: 2 })}>
      <IconButton
        buttonRef={buttonRef}
        popperRef={popperRef}
        onClick={handleButtonClick}
        iconStyles={dateIconCss}
        active={isPopperOpen}
        selection={getDateString(date)}
        title="DATE"
        Icon={<CalendarIcon />}
      />
      {isPopperOpen && (
        <div
          css={modalCss}
          ref={setPopperElement}
          tabIndex={-1}
          onClick={(e) => e.stopPropagation()}
        >
          <DayPicker
            mode="single"
            selected={date}
            defaultMonth={date}
            onSelect={handleDateSelect}
            components={{
              Caption: CustomCaption,
              Day: CustomDayButton,
              HeadRow: CustomHead,
            }}
            showOutsideDays
          />
        </div>
      )}
    </div>
  );
};
