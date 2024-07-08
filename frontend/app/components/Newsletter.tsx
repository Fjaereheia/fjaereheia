import { useState } from "react";
import NewsletterForm from "./NewsletterForm";

interface NewsletterProps {
  textColor?: string;
}

export default function Newsletter({ textColor }: NewsletterProps) {
  const [showForm, setShowForm] = useState(false);
  return (
    <div className={`text-${textColor} `}>
      <p>Knus problemet med å holde deg oppdatert på hva som skjer. </p>
      <button className="underline" onClick={() => setShowForm(true)}>
        Meld deg på vårt nyhetsbrev
      </button>
      {showForm && <NewsletterForm setShowForm={setShowForm} />}
    </div>
  );
}
