import { motion } from "framer-motion";
import { useState } from "react";
import { ArrowButton } from "./ArrowButton";

type Props = {
  value: {
    title: string;
    content: string;
  };
};

export const ExpandableBlockComponent = ({ value }: Props) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const buttonVariants = { clicked: { rotate: 180 } };
  return (
    <div className="border self-start w-full my-4">
      <div className="flex w-full items-center h-12 justify-between px-5">
        <div>{value.title}</div>
        <motion.div
          animate={isExpanded ? "clicked" : "notClicked"}
          transition={{ duration: 0.7 }}
          variants={buttonVariants}
        >
          <ArrowButton isExpanded={isExpanded} setIsExpanded={setIsExpanded} />
        </motion.div>
      </div>
      <motion.div
        initial={{ height: 0, opacity: 0 }}
        animate={{
          height: isExpanded ? "auto" : 0,
          opacity: isExpanded ? 1 : 0,
        }}
        exit={{ height: 0, opacity: 0 }}
        transition={{ duration: 0.7 }}
        style={{ overflow: "hidden" }}
      >
        <div className="mx-4 mb-4">
          <div className="flex flex-row mt-4 gap-6">{value.content}</div>
        </div>
      </motion.div>
    </div>
  );
};
