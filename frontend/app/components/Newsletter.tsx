import { useState } from "react";
import NewsletterForm from "./NewsletterForm";

export default function Newsletter() {
  const [showForm, setShowForm] = useState(false);
  return (
    <div>
      <p>Knus problemet med å holde deg oppdatert på hva som skjer. </p>
      <button className="underline" onClick={() => setShowForm(true)}>
        Meld deg på vårt nyhetsbrev
      </button>
      {showForm && <NewsletterForm setShowForm={setShowForm} />}
    </div>
  );
}
