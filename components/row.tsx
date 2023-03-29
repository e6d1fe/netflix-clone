import styled from "styled-components";
import { motion } from "framer-motion";
import { ReactNode } from "react";

const RowStyle = styled(motion.div)`
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  gap: 10px;
  position: absolute;
  width: 100%;
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

type KeyProps = {
  children: ReactNode;
  key: number;
};

function Row({ children, key }: KeyProps) {
  return (
    <RowStyle
      //   variants={rowVariants}
      //   initial="hidden"
      //   animate="visible"
      //   exit="exit"
      //   transition={{ type: "tween", duration: 0.5 }}
      key={key}
    ></RowStyle>
  );
}

// export default Row;
export default rowVariants;
