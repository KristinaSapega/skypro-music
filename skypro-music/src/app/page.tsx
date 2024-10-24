"use client"
import { Bar } from "@/components/Bar/Bar";
import { MainContent } from "@/components/MainContent/MainContent";
import { NavBar } from "@/components/NavBar/NavBar";
import { Sidebar } from "@/components/Sidebar/Sidebar";
import styles from "./page.module.css";




export default function Home() {

  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <main className={styles.main} >
          <NavBar />
          <MainContent />
          <Sidebar />
        </main>
        <Bar />
        <footer className="footer"></footer>
      </div>
    </div>
  );
}
