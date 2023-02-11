import { motion } from "framer-motion";

// test
const list = {
  visible: { opacity: 1 },
  hidden: { opacity: 0 },
};

const item = {
  visible: { opacity: 1, x: 0 },
  hidden: { opacity: 0, x: -100 },
};

const ClosedInterviewsTable = () => {
  return (
    <div>
      <h1>Closed Interviews Table</h1>
      <motion.ul initial="hidden" animate="visible" variants={list}>
        <motion.li variants={item} />
        <motion.li variants={item} />
        <motion.li variants={item} />
      </motion.ul>
    </div>
  );
};
export default ClosedInterviewsTable;
