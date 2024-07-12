import { useState } from "react";
import NewsletterForm from "./NewsletterForm";

export default function Newsletter() {
  const [showForm, setShowForm] = useState(false);
  return (
    <div className=" w-4/5 lg:max-w-1/3 ">
      <p className="text-center font-serif">
        Knus problemet med å holde deg oppdatert på hva som skjer.{" "}
        <button className="underline" onClick={() => setShowForm(true)}>
          Meld deg på vårt nyhetsbrev
        </button>{" "}
      </p>
      {showForm && <NewsletterForm setShowForm={setShowForm} />}
    </div>
  );
}
