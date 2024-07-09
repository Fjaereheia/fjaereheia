import { useState } from "react";
import NewsletterForm from "./NewsletterForm";

export default function Newsletter() {
  const [showForm, setShowForm] = useState(false);
  return (
    <div className="flex flex-col justify-center">
      <p className="text-center font-serif">
        Knus problemet med å holde deg oppdatert på hva som skjer.{" "}
      </p>
      <button className="underline" onClick={() => setShowForm(true)}>
        Meld deg på vårt nyhetsbrev
      </button>
      {showForm && <NewsletterForm setShowForm={setShowForm} />}
    </div>
  );
}
