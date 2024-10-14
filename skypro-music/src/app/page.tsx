"use client"
import { Bar } from "@/components/Bar/Bar";
import { MainContent } from "@/components/MainContent/MainContent";
import { NavBar } from "@/components/NavBar/NavBar";
import { Sidebar } from "@/components/Sidebar/Sidebar";
import styles from "./page.module.css";
import { TrackType } from "@/types";
import { useState } from "react";



export default function Home() {
  const [currentTrack, setCurrentTrack] = useState<TrackType | null>(null)
  console.log(currentTrack)
  return (
    <div className={styles.wrapper}>
    <div className={styles.container}>
      <main className={styles.main} >
        <NavBar />
        <MainContent setCurrentTrack={setCurrentTrack}/>
        <Sidebar />
      </main>
      {currentTrack && <Bar currentTrack={currentTrack}/>}
      <footer className="footer"></footer>
    </div>
  </div>
  );
}
