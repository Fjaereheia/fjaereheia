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
  }> | null;
}

export default function RoleDropDown({ roleGroups }: RoleDropDownProps) {
  const { t } = useTranslation();
  const [openRole, setOpenRole] = useState(false);
  return (
    <div className="border border-black m-4">
      <button
        className="w-80 h-16 py-4 px-6 grid grid-flow-col"
        onClick={() => setOpenRole(!openRole)}
      >
        <span className="self-center justify-self-start text-xl">
          {t(texts.roleDropDown)}{" "}
        </span>
        <img
          className="w-6 h-6 self-center justify-self-end"
          src={openRole ? ArrowUp : ArrowDown}
          alt={
            openRole ? t(texts.roleDropDownAltUp) : t(texts.roleDropDownAltDown)
          }
        />
      </button>
      {openRole && (
        <div className="w-80">
          {roleGroups?.map((roleGroup, index) => (
            <div key={index} className="m-4 mb-10">
              <h3 className="text-base font-semibold">{roleGroup.name}</h3>
              <div>
                {roleGroup.roles?.map((role, index) => (
                  <div key={index} className="flex flex-row mt-8 w-fit gap-6">
                    <img
                      src={urlFor(role.image?.asset?._ref ?? "")}
                      alt={role.image?.alt ?? ""}
                      className="w-36 h-36 object-cover"
                    />
                    <div>
                      <h4 className="text-lg mb-2">{role.occupation}</h4>
                      <h5 className="text-base mb-2">{role.name}</h5>
                      <span>{role.text}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
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
