import Image from "next/image";

const SearchResult = ({ show }) => {
  return (
    <div>
      <h3>Search Result</h3>
      <p>name = {show.name}</p>
    </div>
  );
};

export default SearchResult;
