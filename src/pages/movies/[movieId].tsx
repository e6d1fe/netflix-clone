import { useRouter } from "next/router";
import styled from "styled-components";
import { useQuery } from "react-query";
import { BASE_PATH, API_KEY } from "../api/api";
import { makeImagePath } from "@/utils";

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
  width: 100vw;
  top: 300px;
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 500px;
`;

const Poster = styled.img`
  width: 100%;
  height: auto;
  border-radius: 10px;
  margin-bottom: 10px;
`;

const Title = styled.div`
  font-weight: 500;
  font-size: 30px;
  margin: 15px;
`;

const ReleaseDate = styled.div`
  font-size: 16px;
  margin: 10px;
`;

const Runtime = styled.div`
  font-size: 13px;
  margin: 10px;
  color: ${(props) => props.theme.white.lighter};
  opacity: 50%;
`;

const Overview = styled.div`
  width: 90%;
  font-size: 15px;
  overflow: hidden;
  word-wrap: break-word;
  line-height: 20px;
  margin: 20px;
`;

interface IGetMovieDetails {
  backdrop_path: string;
  title: string;
  overview: string;
  poster_path: string;
  release_date: string;
  runtime: number;
}

function MovieId() {
  const router = useRouter();
  const id = router.asPath.slice(8, router.asPath.length);
  function getMovieDetail() {
    return fetch(`${BASE_PATH}/movie/${id}?api_key=${API_KEY}&language=en-US`).then((response) =>
      response.json()
    );
  }
  const { data, isSuccess } = useQuery<IGetMovieDetails>([], getMovieDetail);
  console.log(data);
  console.log(isSuccess);

  return (
    <Wrapper>
      {isSuccess && (
        <Content>
          <Poster src={makeImagePath(data?.backdrop_path || "")} />
          <Title>{data?.title}</Title>
          <ReleaseDate>
            {data?.release_date?.slice(0, 4)}. {data?.release_date?.slice(5, 7)}.{" "}
            {data?.release_date?.slice(8)}
          </ReleaseDate>
          <Runtime>{data?.runtime} minutes</Runtime>
          <Overview>{data?.overview}</Overview>
        </Content>
      )}
    </Wrapper>
  );
}

export default MovieId;
