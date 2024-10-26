import Image from "next/image";
import styles from "./page.module.css";

const sleep = (ms: number): Promise<void> => new Promise((resolve) => setTimeout(resolve, ms));

export default async function Home() {
    await sleep(2000); // Espera 2 segundos
    throw new Error("error Eres demasiado wap@");

  return (
    <h1>aa</h1>
  );
}
