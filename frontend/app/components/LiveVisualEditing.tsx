import { useLiveMode } from "@sanity/react-loader";
import { VisualEditing } from "@sanity/visual-editing/remix";
import { useEffect } from "react";
import { client } from "sanity/clientConfig";

export default function LiveVisualEditing() {
  /*useEffect(
    () =>
      enableVisualEditing({
        history: {
          // setup Remix router integration
        },
      }),
    []
  );*/
  useLiveMode({ client });

  return <VisualEditing />;
}
