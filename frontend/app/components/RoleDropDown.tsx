import { useState } from "react";
import {
  SanityImageCrop,
  SanityImageHotspot,
  internalGroqTypeReferenceTo,
} from "sanity/types";
import { createTexts, useTranslation } from "~/utils/i18n";
import urlFor from "~/utils/imageUrlBuilder";
import ArrowUp from "/arrow-up.svg";
import ArrowDown from "/arrow-down.svg";
import { motion } from "framer-motion";

interface RoleDropDownProps {
  roleGroups: Array<{
    name: string | null;
    roles: Array<{
      name: string | null;
      occupation: string | null;
      image: {
        asset?: {
          _ref: string;
          _type: "reference";
          _weak?: boolean;
          [internalGroqTypeReferenceTo]?: "sanity.imageAsset";
        };
        hotspot?: SanityImageHotspot;
        crop?: SanityImageCrop;
        alt?: string;
        _type: "customImage";
      } | null;
      text: string | null;
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
    <div>
      {roleGroups?.map((roleGroup, index) => (
        <div key={index} className="border m-4">
          <button
            className="w-96 h-16 py-4 px-6 grid grid-flow-col"
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
              display: openRoleStates[index] ? "block" : "none",
              height: openRoleStates[index] ? "auto" : 0,
              opacity: openRoleStates[index] ? 1 : 0,
            }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div id={index.toString()} className="m-4 mb-10">
              {roleGroup.roles?.map((role, roleIndex) => (
                <div key={roleIndex} className="flex flex-row mt-8 gap-6">
                  <img
                    src={urlFor(role.image?.asset?._ref ?? "")}
                    alt={role.image?.alt ?? ""}
                    className="w-28 h-36 object-cover"
                  />
                  <div>
                    <h4 className="text-2xl mb-2">{role.occupation}</h4>
                    <h5 className="text-lg mb-2">{role.name}</h5>
                    <span className="text-base">{role.text}</span>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      ))}
    </div>
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
