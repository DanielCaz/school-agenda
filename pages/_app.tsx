import type { AppProps } from "next/app";
import { useRouter } from "next/router";
import AdminLayout from "../components/admin/AdminLayout";
import AgendaLayout from "../components/agenda/AgendaLayout";
import "../styles/globals.css";

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();

  return router.pathname.startsWith("/admin") ? (
    <AdminLayout>
      <Component {...pageProps} />
    </AdminLayout>
  ) : (
    <AgendaLayout>
      <Component {...pageProps} />
    </AgendaLayout>
  );
}
