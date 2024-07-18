import {
  SanityImageCrop,
  SanityImageHotspot,
  internalGroqTypeReferenceTo,
} from "sanity/types";
import urlFor from "~/utils/imageUrlBuilder";

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
  return (
    <div className="m-2 lg:w-1/3 border">
      {roleGroups?.map((roleGroup, index) => (
        <div key={index} className="w-fit m-4 mb-10">
          <h3 className="text-base font-semibold mb-3">{roleGroup.name}</h3>
          <div>
            {roleGroup.roles?.map((role, index) => (
              <div key={index} className="w-fit gap-6">
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
  );
}
