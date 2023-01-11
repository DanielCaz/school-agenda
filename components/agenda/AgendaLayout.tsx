import Meta from "../General/Meta";

interface Props {
  children: React.ReactNode;
}

const AgendaLayout = ({ children }: Props) => {
  return (
    <>
      <Meta title="Horarios ISC" />
      <h1>Agenda</h1>
      {children}
    </>
  );
};

export default AgendaLayout;
