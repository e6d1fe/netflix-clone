import styled from "styled-components";
import { useQuery } from "react-query";
import { getMovies, IGetMoviesResult } from "./api/api";
import { makeImagePath } from "@/utils";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import dynamic from "next/dynamic";

const Wrapper = styled.div`
  background-color: black;
`;

const Loader = styled.div`
  height: 20vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Banner = styled.div<{ bgPhoto: string }>`
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 60px;
  background-image: linear-gradient(rgba(0, 0, 0, 0), rgba(0, 0, 0, 1)),
    url(${(props) => props.bgPhoto});
  background-size: cover;
`;

const Title = styled.h2`
  font-size: 58px;
  margin-bottom: 10px;
  font-weight: 600;
`;

const Overview = styled.p`
  font-size: 18px;
  width: 60%;
`;

const Slider = styled.div`
  position: relative;
  top: -150px;
`;

const Row = styled(motion.div)`
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  gap: 10px;
  position: absolute;
  width: 100%;
`;

const RowWithNoSSR = dynamic<{ props: type }>;

const Box = styled(motion.div)`
  background-color: red;
  height: 200px;
  font-size: 64px;
`;

const rowVariants = {
  hidden: {
    x: window.outerWidth + 10,
  },
  visible: {
    x: 0,
  },
  exit: {
    x: -window.outerWidth - 10,
  },
};

function Home() {
  const { data, isLoading } = useQuery<IGetMoviesResult>(["movies", "nowPlaying"], getMovies);
  console.log(data, isLoading);
  const [index, setIndex] = useState(0);
  const [leaving, setLeaving] = useState(false);
  const increaseIndex = () => {
    if (leaving) return;
    setLeaving(true);
    setIndex((prev) => prev + 1);
  };
  const toggleLeaving = () => setLeaving((prev) => !prev);

  return (
    <>
      <Wrapper>
        {isLoading ? (
          <Loader>Loading...</Loader>
        ) : (
          <>
            <Banner
              onClick={increaseIndex}
              bgPhoto={makeImagePath(data?.results[0].backdrop_path || "")}
            >
              <Title>{data?.results[0].title}</Title>
              <Overview>{data?.results[0].overview}</Overview>
            </Banner>
            <Slider>
              <AnimatePresence onExitComplete={toggleLeaving}>
                <Row
                  variants={rowVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  transition={{ type: "tween", duration: 0.5 }}
                  key={index}
                >
                  {[1, 2, 3, 4, 5, 6].map((i) => (
                    <Box key={i}>{i}</Box>
                  ))}
                </Row>
              </AnimatePresence>
            </Slider>
          </>
        )}
      </Wrapper>
    </>
  );
}

export default Home;
