import Link from "next/link";
import { useRouter } from "next/router";
import Meta from "../General/Meta";

interface Props {
  children: React.ReactNode;
}

const AgendaLayout = ({ children }: Props) => {
  const router = useRouter();
  const { groupId } = router.query as { groupId: string };

  return (
    <>
      <Meta title={`Horarios ISC 8°${groupId ? groupId.toUpperCase() : ""}`} />
      <header className="bg-gray-700 text-white p-4 flex items-center justify-between">
        <h1 className="text-2xl font-medium">Horario ISC</h1>
        <div className="flex justify-between w-50 space-x-5">
          <Link href="/group/a" className={groupId === "a" ? "underline" : ""}>
            Grupo A
          </Link>
          <Link href="/group/b" className={groupId === "b" ? "underline" : ""}>
            Grupo B
          </Link>
        </div>
      </header>
      {children}
    </>
  );
};

export default AgendaLayout;
