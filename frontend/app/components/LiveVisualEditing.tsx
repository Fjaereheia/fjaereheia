import { VisualEditing } from "@sanity/visual-editing/remix";
import { client } from "sanity/clientConfig";
import { useLiveMode } from "@sanity/react-loader";

export default function LiveVisualEditing() {
  useLiveMode({ client });

  return <VisualEditing />;
}
