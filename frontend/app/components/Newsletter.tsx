import { useState } from "react";
import NewsletterForm from "./NewsletterForm";

export default function Newsletter() {
  const [showForm, setShowForm] = useState(false);
  return (
    <div>
      <p>
        Knus problemet med å holde deg oppdatert på hva som skjer. Meld deg på
        vårt <button onClick={() => setShowForm(true)}>nyhetsbrev</button>
      </p>
      {showForm ? <NewsletterForm setShowForm={setShowForm} /> : null}
    </div>
  );
}
