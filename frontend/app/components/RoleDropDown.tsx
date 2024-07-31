import { useState } from "react";
import { createTexts, useTranslation } from "../utils/i18n";
import urlFor from "../utils/imageUrlBuilder";
import ArrowUp from "../assets/arrow-up.svg";
import ArrowDown from "../assets/arrow-down.svg";
import { motion } from "framer-motion";

interface RoleDropDownProps {
  roleGroups: Array<{
    name: string;
    persons: Array<{
      occupation: string | null;
      person: {
        name: string;
        image: {
          asset?: {
            _ref: string;
          };
          alt: string;
          _type: "customImage";
        };
        text: string | null;
      } | null;
    }> | null;
  }>;
}

export default function RoleDropDown({ roleGroups }: RoleDropDownProps) {
  const { t } = useTranslation();
  const [openRoleStates, setOpenRoleStates] = useState(
    Array(roleGroups.length).fill(false)
  );
  const toggleDropDown = (index: number) => {
    setOpenRoleStates((prev) => {
      const newStates = prev.map((state, i) => (i === index ? !state : state));
      return newStates;
    });
  };

  return (
    <>
      {roleGroups?.map((roleGroup, index) => (
        <div
          key={index}
          className="border self-start w-full min-w-52 max-w-96 my-4"
        >
          <button
            className="w-full h-16 py-4 px-6 grid grid-flow-col"
            onClick={() => toggleDropDown(index)}
          >
            <span className="self-center justify-self-start text-xl">
              {roleGroup.name}{" "}
            </span>
            <img
              className="w-6 h-6 self-center justify-self-end"
              src={openRoleStates[index] ? ArrowUp : ArrowDown}
              alt={
                openRoleStates[index]
                  ? t(texts.roleDropDownAltUp)
                  : t(texts.roleDropDownAltDown)
              }
            />
          </button>
          <motion.div
            key={index}
            initial={{ height: 0, opacity: 0 }}
            animate={{
              height: openRoleStates[index] ? "auto" : 0,
              opacity: openRoleStates[index] ? 1 : 0,
            }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 1.0 }}
            style={{ overflow: "hidden" }}
          >
            <div id={index.toString()} className="mx-4 mb-4">
              {roleGroup.persons?.map((role, roleIndex) => (
                <div key={roleIndex} className="flex flex-row mt-4 gap-6">
                  <img
                    src={urlFor(role.person?.image?.asset?._ref ?? "")}
                    alt={role.person?.image?.alt ?? ""}
                    className="w-28 h-36 object-cover"
                  />
                  <div>
                    <h4 className="text-2xl mb-2">{role.occupation}</h4>
                    <h5 className="text-lg mb-2">{role.person?.name}</h5>
                    <span className="text-base">{role.person?.text}</span>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      ))}
    </>
  );
}

const texts = createTexts({
  roleDropDown: {
    nb: "Medvirkende",
    en: "Participants",
  },
  roleDropDownAltUp: {
    nb: "Pil opp",
    en: "Arrow Up",
  },
  roleDropDownAltDown: {
    nb: "Pil ned",
    en: "Arrow Down",
  },
});
