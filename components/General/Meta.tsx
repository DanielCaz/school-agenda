import Head from "next/head";
import { title } from "process";

interface Props {
  title: string;
}

const Meta = ({ title }: Props) => {
  return (
    <Head>
      <title>{title}</title>
    </Head>
  );
};

export default Meta;
