import { useRouter } from "next/router";

function Search() {
  const location = useRouter();
  const keyword = location.query.keyword;
  console.log(keyword);
}

export default Search;
