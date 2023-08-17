/** @jsxImportSource @emotion/react */
import { cssWithMq } from "../styles/cssWithMq";
import { Avocado, Green, Neutral } from "../styles/brandColors";

interface SearchButtonProps {
  search: () => void;
}

const searchButtonCss = cssWithMq({
  display: "flex",
  padding: ".75rem 1.5rem",
  justifyContent: "center",
  alignItems: "center",
  alignSelf: "stretch",
  gap: ".5rem",
  border: "0px",
  width: ["100%", "10rem"],
  borderRadius: "6.25rem",
  backgroundColor: Green[500],
  flexShrink: 0,
  "&:hover": {
    border: `1px solid ${Avocado[200]}`,
  },

  // text styles
  fontFamily: "Poppins",
  color: Neutral[0],
  fontSize: "1rem",
  fontWeight: 500,
  lineHeight: "1.5rem",
});

export const SearchButton = (props: SearchButtonProps) => {
  const { search } = props;

  return (
    <button onClick={search} css={searchButtonCss}>
      Search
    </button>
  );
};
