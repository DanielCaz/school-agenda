import Meta from "../General/Meta";

interface Props {
  children: React.ReactNode;
}

const AgendaLayout = ({ children }: Props) => {
  return (
    <>
      <Meta title="Horarios ISC" />
      <header className="bg-gray-700 text-white p-4">
        <h1 className="text-2xl font-medium">Horario ISC</h1>
      </header>
      {children}
    </>
  );
};

export default AgendaLayout;
