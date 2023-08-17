/** @jsxImportSource @emotion/react */
import { Dispatch, SetStateAction, useEffect, useMemo, useRef } from "react";
import { PER_PAGE } from "./SearchPage";
import { cssWithMq } from "../styles/cssWithMq";
import { Avocado, Green, Neutral } from "../styles/brandColors";
import { css } from "@emotion/react";
import { ReactComponent as ChevronRight } from "../assets/chevronRight.svg";
import { ReactComponent as ChevronLeft } from "../assets/chevronLeft.svg";

const SHOWN_PAGES = 4;

const buttonCss = cssWithMq({
  display: "flex",
  width: "2.5rem",
  height: "2.5rem",
  padding: ".625rem",
  justifyContent: "center",
  alignItems: "center",
  textAlign: "center",
  borderRadius: "6.25rem",
  backgroundColor: Neutral[0],
});

const pageButtonCss = css(
  cssWithMq({
    border: `1px solid ${Neutral[400]}`,
    margin: ["0em .25em", "0em .5em"],
  }),
  buttonCss,
);

const selectedButtonCss = css(
  pageButtonCss,
  cssWithMq({
    backgroundColor: Avocado[300],
    color: Green[500],
    border: "0px",
  }),
);
interface PageButtonProps {
  selected: boolean;
  page: number;
  onClick: () => void;
}

const PageButton = (props: PageButtonProps) => {
  const { page, onClick, selected } = props;

  return (
    <button
      css={selected ? selectedButtonCss : pageButtonCss}
      onClick={onClick}
    >
      {page}
    </button>
  );
};

const arrowButtonCss = css(
  cssWithMq({
    margin: "0em 1.5em",
    border: `1px solid ${Neutral[400]}`,
    color: Green[500],
    fontSize: "1em",
    "&:hover": {
      backgroundColor: `${Neutral[100]}80`,
    },
    "&:active": {
      backgroundColor: `${Neutral[300]}`,
    },
  }),
  buttonCss,
);

const disabledArrowCss = css(
  arrowButtonCss,
  cssWithMq({
    background: Neutral[400],
    border: "0px",
    color: Neutral[600],
    "&:hover": {
      background: Neutral[400],
    },
  }),
);

const chevronCss = css({
  fill: Green[500],
});

const disabledChevronCss = css({
  fill: Neutral[600],
});
enum Direction {
  "left",
  "right",
}
const ArrowButton = (props: {
  disabled: boolean;
  onClick: () => void;
  direction: Direction;
}) => {
  const { disabled, onClick, direction } = props;

  const appliedChevronCss = disabled ? disabledChevronCss : chevronCss;
  return (
    <button
      css={disabled ? disabledArrowCss : arrowButtonCss}
      onClick={onClick}
      disabled={disabled}
      data-testid={direction}
    >
      {direction === Direction.left && <ChevronLeft css={appliedChevronCss} />}
      {direction === Direction.right && (
        <ChevronRight css={appliedChevronCss} />
      )}
    </button>
  );
};

const paginationCss = cssWithMq({
  display: "flex",
  justifyContent: "center",
  marginBottom: "2em",
});
interface PaginationProps {
  page: number;
  setPage: Dispatch<SetStateAction<number>>;
  count: number;
}

export const Pagination = (props: PaginationProps) => {
  const { page, setPage, count } = props;
  const paginationRef = useRef<null | HTMLDivElement>(null);
  const pages = useMemo(() => Math.ceil(count / PER_PAGE), [count]);

  const pageButtonArray = useMemo(() => {
    const pips = Math.min(SHOWN_PAGES, pages);
    const leftShift = page > 0 ? Math.min(pages - page - pips, -1) : 0;
    const pagesArray = [];
    for (let i = 0; i < pips; i++) {
      pagesArray.push(page + leftShift + i);
    }
    return pagesArray;
  }, [pages, page]);

  useEffect(() => paginationRef.current?.scrollIntoView(), [page]);
  const leftClick = () => {
    setPage(page - 1);
  };

  const rightClick = () => {
    setPage(page + 1);
  };

  return (
    <div css={paginationCss} ref={paginationRef}>
      <ArrowButton
        onClick={leftClick}
        disabled={page === 0}
        direction={Direction.left}
      />
      {pageButtonArray.map((pageNumber) => (
        <PageButton
          selected={pageNumber === page}
          page={pageNumber + 1}
          onClick={() => setPage(pageNumber)}
          key={pageNumber}
        />
      ))}
      <ArrowButton
        onClick={rightClick}
        disabled={page + 1 === pages}
        direction={Direction.right}
      />
    </div>
  );
};
