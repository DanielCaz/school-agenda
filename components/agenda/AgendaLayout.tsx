interface Props {
  children: React.ReactNode;
}

const AgendaLayout = ({ children }: Props) => {
  return (
    <>
      <h1>Agenda</h1>
      {children}
    </>
  );
};

export default AgendaLayout;
