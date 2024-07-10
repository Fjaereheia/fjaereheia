import Button from "./ButtonLink";

export default function PageNotFound() {
  return (
    <div className="h-screen bg-newsletter flex flex-col items-center justify-center">
      <h1 className="text-6xl text-white">404 - OPS! </h1>
      <p className="mt-4n text-white">Siden du leter etter eksisterer ikke</p>
      <Button
        url="/"
        buttonText=" Gå tilbake til hovedsiden"
        styling="text-xl text-white underline mt-6"
      />
    </div>
  );
}
