/** @jsxImportSource @emotion/react */
import { cssWithMq } from "../styles/cssWithMq";
import { Neutral } from "../styles/brandColors";
import { Dispatch, SetStateAction } from "react";
import { DatePicker } from "./DatePicker";
import { CountPicker } from "./CountPicker";
import { SearchButton } from "./SearchButton";
import { css } from "@emotion/react";

export interface SearchBarProps {
  date: Date;
  setDate: Dispatch<SetStateAction<Date>>;
  count: number;
  setCount: Dispatch<SetStateAction<number>>;
  search: () => void;
}

const searchBarCss = cssWithMq({
  display: "flex",
  flexDirection: ["column", "row"],
  alignItems: ["stretch", "center"],
  padding: "1rem",
  height: ["", "4rem"],
  marginBottom: "1.5rem",
  borderRadius: ["0", "6.25rem"],
  backgroundColor: Neutral[0],
  justifyContent: "space-between",
  boxShadow: `0px 2px 0px 0px ${Neutral[900]}0F`,
});
export const SearchBar = (props: SearchBarProps) => {
  const { date, setDate, count, setCount, search } = props;
  return (
    <div css={searchBarCss}>
      <DatePicker date={date} setDate={setDate} />
      <div
        css={css({
          borderRight: `.0625rem solid ${Neutral[300]}`,
          margin: "0rem 2rem",
          alignSelf: "stretch",
        })}
      />
      <CountPicker count={count} setCount={setCount} />
      <div
        css={cssWithMq({
          margin: "0rem 1rem",
        })}
      />
      <SearchButton search={search} />
    </div>
  );
};
