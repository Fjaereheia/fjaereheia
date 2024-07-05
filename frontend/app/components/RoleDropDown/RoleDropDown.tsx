import {
  Content,
  SanityImageCrop,
  SanityImageHotspot,
  internalGroqTypeReferenceTo,
} from "sanity/types";
import urlFor from "~/utils/imageUrlBuilder";
import PortableTextComponent from "../PortableTextComponent";

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
      text: Content | null;
    }> | null;
  }> | null;
}

export default function RoleDropDown({ roleGroups }: RoleDropDownProps) {
  return (
    <div className="m-2 lg:w-1/3">
      {roleGroups?.map((roleGroup, index) => (
        <div key={index} className="w-fit m-4">
          <h3 className="text-xl">{roleGroup.name}</h3>
          <div>
            {roleGroup.roles?.map((role, index) => (
              <div key={index} className="grid grid-flow-col w-fit gap-6">
                <img
                  src={urlFor(role.image?.asset?._ref || "")}
                  alt={role.image?.alt || ""}
                  className="w-36 h-36 object-cover"
                />
                <div>
                  <h4 className="text-lg">{role.occupation}</h4>
                  <h5>{role.name}</h5>
                  {role.text && <PortableTextComponent textData={role.text} />}
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
