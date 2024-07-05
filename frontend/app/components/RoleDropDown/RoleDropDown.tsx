import {
  Content,
  SanityImageCrop,
  SanityImageHotspot,
  internalGroqTypeReferenceTo,
} from "sanity/types";
import urlFor from "~/functions/imageUrlBuilder";
import PortableTextComponent from "../PortableTextComponent";

interface RoleDropDownProps {
  roles: Array<{
    _id: string;
    _type: "role";
    _createdAt: string;
    _updatedAt: string;
    _rev: string;
    name?: string;
    language?: string;
    image?: {
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
    };
    text?: Content;
  }> | null;
}

export default function RoleDropDown({ roles }: RoleDropDownProps) {
  return (
    <div>
      {roles?.map((role, index) => (
        <div key={index}>
          <h3>{role.name}</h3>
          {role?.image && (
            <img
              src={urlFor(role.image.asset?._ref || "")}
              alt={role.image?.alt}
            />
          )}
          {role.text && <PortableTextComponent textData={role.text} />}
        </div>
      ))}
    </div>
  );
}
