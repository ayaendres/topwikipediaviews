/** @jsxImportSource @emotion/react */
import { cssWithMq } from "../../styles/cssWithMq";
import { Black, Neutral } from "../../styles/brandColors";
import { ReactComponent as PinFilled } from "../../assets/pinFilled.svg";
import { ReactComponent as PinOutlined } from "../../assets/pinOutlined.svg";
import { PINNED } from "../SearchPage";
import { Dispatch, useMemo } from "react";

const articleRowCss = cssWithMq({
  display: "flex",
  padding: "1.5rem",
  alignItems: "center",
  alignSelf: "stretch",
  borderRadius: ".75rem",
  border: `1px solid ${Neutral[300]}`,
});

const rankCss = cssWithMq({
  width: "2rem",
  color: Neutral[500],
  lineHeight: "150%",
});

const articleCss = cssWithMq({
  flex: "1 0 0",
  fontWeight: 500,
  color: Black["0"],
});

const viewCss = cssWithMq({
  color: Neutral[600],
  fontSize: ".875rem",
  fontFamily: "Poppins",
});

const pinCss = cssWithMq({
  display: "flex",
  alignItems: "center",
  border: "0px",
  backgroundColor: "#00000000",
});

interface ArticleRowProps {
  article: string;
  views?: number;
  rank?: number;
  pinnedArticles: Array<string>;
  setPinnedArticles: Dispatch<Array<string>>;
}
export const ArticleRow = (props: ArticleRowProps) => {
  const { article, views, rank, pinnedArticles, setPinnedArticles } = props;

  const isArticlePinned = useMemo(
    () => pinnedArticles?.length && pinnedArticles.includes(article),
    [pinnedArticles, article],
  );
  const onClick = () => {
    let updatedPinned = [];
    if (isArticlePinned) {
      updatedPinned = pinnedArticles.filter((name) => article !== name);
    } else {
      updatedPinned = [...pinnedArticles, article];
    }
    sessionStorage.setItem(PINNED, JSON.stringify(updatedPinned));
    setPinnedArticles(updatedPinned);
  };

  return (
    <div css={articleRowCss}>
      {rank && <section css={rankCss}>{rank}</section>}
      <section css={articleCss}>{article.replace(/_/g, " ")}</section>
      <section css={viewCss}>
        {views?.toLocaleString() ?? "Views data not found"} {views && "views"}
      </section>
      <button css={pinCss} onClick={onClick}>
        {isArticlePinned ? <PinFilled /> : <PinOutlined />}
      </button>
    </div>
  );
};
