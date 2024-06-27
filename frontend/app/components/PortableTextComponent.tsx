import { PortableText, PortableTextComponentProps } from "@portabletext/react";

interface PortabelTextProps {
  textData: any;
}

export default function PortableTextConverter({ textData }: PortabelTextProps) {
  const customComponents = {
    types: {
      image: ({
        value,
      }: PortableTextComponentProps<{ asset: { url: string } }>) => {
        return (
          <img src={value.asset.url} style={{ maxWidth: "100%" }} /> //missing alt: alt={value.alt || 'Image'}
        );
      },
    },
  };

  return (
    <div>
      {textData && (
        <PortableText value={textData} components={customComponents} />
      )}
    </div>
  );
}
