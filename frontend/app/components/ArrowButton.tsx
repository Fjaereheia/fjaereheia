import ArrowDown from "../assets/arrow-down.svg";
import { createTexts, useTranslation } from "~/utils/i18n";

type Props = {
  isExpanded: boolean;
  setIsExpanded: (isExpanded: boolean) => void;
};

export const ArrowButton = ({ isExpanded, setIsExpanded }: Props) => {
  const { t } = useTranslation();

  return (
    <button onClick={() => setIsExpanded(!isExpanded)}>
      <img className="m-0" src={ArrowDown} alt={t(texts.buttonText)} />
    </button>
  );
};

const texts = createTexts({
  buttonText: {
    nb: "Utvid tekstbok",
    en: "Expand textbox",
  },
});
