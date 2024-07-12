import { useEffect, useRef, useState } from "react";

interface NewsletterFormProps {
  setShowForm: (showForm: boolean) => void;
}

interface InputFieldProps {
  id: string;
  label: string;
  type: string;
  placeholder: string;
  required?: boolean;
  value: string;
  onChange: (value: string) => void;
}

interface FormField {
  id: string;
  label: string;
  type: string;
  placeholder: string;
  required?: boolean;
}

const formFields: FormField[] = [
  {
    id: "first_name",
    label: "Fornavn*",
    type: "text",
    placeholder: "Ola",
    required: true,
  },
  {
    id: "last_name",
    label: "Etternavn*",
    type: "text",
    placeholder: "Nordmann",
    required: true,
  },
  {
    id: "email",
    label: "E-postadresse*",
    type: "email",
    placeholder: "eksempel@eksempel.com",
    required: true,
  },
  {
    id: "tlf",
    label: "Telefonnummer",
    type: "text",
    placeholder: "999 99 999",
  },
  {
    id: "post_number",
    label: "Postnummer",
    type: "text",
    placeholder: "1234",
  },
];

function InputField(props: InputFieldProps) {
  return (
    <div className="p-2 border-t border-black">
      <label htmlFor={props.id}>
        {props.label}:
        <input
          type={props.type}
          id={props.id}
          placeholder={props.placeholder}
          required={props.required}
          value={props.value}
          className="w-full bg-inherit focus:outline-white focus:outline-none focus:ring-0 placeholder-white"
          onChange={(e) => props.onChange(e.target.value)}
        />
      </label>
    </div>
  );
}

function NewsletterForm(props: NewsletterFormProps) {
  const [formInfo, setFormInfo] = useState<{ [key: string]: string }>({});

  function handleSubmit() {
    const requiredFields = formFields.filter((field) => field.required);
    const missingFields = requiredFields.filter((field) => !formInfo[field.id]);

    if (missingFields.length > 0) {
      const missingFieldLabels = missingFields.map((field) => field.label);
      alert(`${missingFieldLabels.join(", ")} er påkrevd`);
      return;
    }

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

  const handleFieldChange = (fieldId: string, value: string) => {
    setFormInfo({ ...formInfo, [fieldId]: value });
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center">
      <div
        ref={ref}
        className="bg-newsletter border-2 w-auto md:w-1/3 h-4/5 md:h-2/3 m-4 grid grid-cols-1 grid-rows-auto"
      >
        <p className="text-base p-2">
          Meld deg på nyhetsbrev fra Bruddet og få eksklusiv info, billetter til
          redusert pris og andre tilbud!
        </p>
        <form className="grid grid-rows-auto">
          {formFields.map((field) => (
            <InputField
              key={field.id}
              id={field.id}
              label={field.label}
              type={field.type}
              placeholder={field.placeholder}
              required={field.required}
              value={formInfo[field.id] || ""}
              onChange={(value) => handleFieldChange(field.id, value)}
            />
          ))}
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
