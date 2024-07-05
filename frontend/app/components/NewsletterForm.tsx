import { c } from "node_modules/vite/dist/node/types.d-aGj9QkWt";
import React, { useEffect, useRef, useState } from "react";

interface NewsletterFormProps {
  setShowForm: (showForm: boolean) => void;
}

function NewsletterForm(props: NewsletterFormProps) {
  const [firstName, setFirstname] = useState("");
  const [lastName, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [tlf, setTlf] = useState("");
  const [postNumber, setPostNumber] = useState("");

  function handleSubmit() {
    if (firstName === "" || lastName === "" || email === "") {
      alert("Fornavn, etternavn og e-post er påkrevd");
      return;
    }
    const data = {
      firstName,
      lastName,
      email,
      tlf,
      postNumber,
    };
    alert("Du er meldt på nyhetsbrev");
  }

  const ref = useRef<HTMLDivElement>(null);

  function handleClickOutside(event: MouseEvent) {
    if (ref.current && !ref.current.contains(event.target as Node)) {
      props.setShowForm(false);
    }
  }

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [ref]);

  return (
    <div className="fixed inset-0 flex items-center justify-center">
      <div
        ref={ref}
        className="bg-newsletter w-auto md:w-1/3 h-4/5 md:h-2/3 m-4 grid grid-cols-1 grid-rows-auto"
      >
        <p className="text-base p-2">
          Meld deg på nyhetsbrev fra Bruddet og få eksklusiv info, billetter til
          redusert pris og andre tilbud!
        </p>
        <form className="grid grid-rows-auto">
          <div className="p-2 border-t border-black">
            <label htmlFor="first_name" className="w-full">
              Fornavn*:
              <input
                type="text"
                id="first_name"
                placeholder="Ola"
                required
                value={firstName}
                className="w-full bg-inherit focus:outline-white focus:outline-none focus:ring-0 placeholder-white"
                onChange={(e) => setFirstname(e.target.value)}
              />
            </label>
          </div>
          <div className="p-2 border-t border-black">
            <label htmlFor="last_name">
              Etternavn*:
              <input
                type="text"
                id="last_name"
                placeholder="Nordmann"
                required
                value={lastName}
                className="w-full bg-inherit focus:outline-white focus:outline-none focus:ring-0 placeholder-white"
                onChange={(e) => setLastname(e.target.value)}
              />
            </label>
          </div>
          <div className="p-2 border-t border-black">
            <label htmlFor="email">E-postadresse*:</label>
            <input
              id="email"
              type="email"
              placeholder="eksempel@eksempel.com"
              required
              value={email}
              className="w-full bg-inherit focus:outline-white focus:outline-none focus:ring-0 placeholder-white"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="p-2 border-t border-black">
            <label htmlFor="tlf">Telefonnummer:</label>
            <input
              id="tlf"
              type="text"
              placeholder="999 99 999"
              value={tlf}
              className="w-full bg-inherit focus:outline-white focus:outline-none focus:ring-0 placeholder-white"
              onChange={(e) => setTlf(e.target.value)}
            />
          </div>
          <div className="p-2 border-t border-black">
            <label htmlFor="post_number">Postnummer:</label>
            <input
              id="post_number"
              type="text"
              placeholder="1234"
              value={postNumber}
              className="w-full bg-inherit focus:outline-white focus:outline-none focus:ring-0 placeholder-white"
              onChange={(e) => setPostNumber(e.target.value)}
            />
          </div>
        </form>
        <p className="text-xs p-2 border-t border-black">
          Ved å melde meg på nyhetsbrev samtykker jeg til at Brudd AS kan sende
          meg nyheter, tilbud om billetter og annen nyttig informasjon om Brudd
          og forestillinger, i kanalene jeg samtykker til under. *
        </p>
        <button
          type="submit"
          className="w-full h-full underline border-t border-black"
          onClick={handleSubmit}
        >
          Meld på nyhetsbrev
        </button>
      </div>
    </div>
  );
}

export default NewsletterForm;
