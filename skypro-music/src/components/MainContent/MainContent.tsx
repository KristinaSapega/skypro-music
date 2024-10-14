"use client"
import { GetTracks } from "@/api/apiTrack";
import { TrackList } from "../TrackList/TrackList";
import styles from "./MainContent.module.css";
import { TrackType } from "@/types";
import { useEffect, useState } from "react";
import Filter from "../Filter/Filter";

type props = {
    setCurrentTrack: (track: TrackType) => void
} 

export const MainContent = ({setCurrentTrack}: props) => {
    const [tracks, setTracks] = useState<TrackType[]>([]);
    const [error, setError] = useState<string | null>(null);
    const [openFilter, setOpenFilter] = useState<string | null>(null);

    useEffect(() => {
    const fetchTracks = async () => {
        try {
            const data = await GetTracks();
            console.log("API Data:", data);
            setTracks(data);
        }catch (error) {
            if(error instanceof Error) {
                setError(error.message)
              }
          }
    };
    fetchTracks(); // Вызываем функцию при монтировании компонента
  }, []); // Пустой массив зависимостей означает, что useEffect выполнится один раз при монтировании

  const uniqueAuthors = Array.from(new Set(tracks.map((track) => track.author)));
  const uniqueGenres = Array.from(new Set(tracks.flatMap((track) => track.genre)));
  const uniqueReleaseDate = Array.from(new Set(tracks.map((track) => new Date(track.release_date).getFullYear().toString())));
  console.log(tracks.map((track) => track.genre)); 

  
  const toggleFilter = (filterType: string) => {
    if (openFilter === filterType) {
        setOpenFilter(null); // Закрываем, если тот же фильтр
    }else {
        setOpenFilter(filterType); // Открываем новый фильтр
    }
  };


  // Если ошибка, выводим её на экран
  if (error) {
    return <div className={styles.errorMessage}>Ошибка: {error}</div>;
  }
    return (
        <div className={styles.mainCenterblock}>
          <div className={styles.centerblockSearch}>
            <svg className={styles.searchSvg}>
              <use xlinkHref="/img/icon/sprite.svg#icon-search"></use>
            </svg>
            <input
              className={styles.searchText}
              type="search"
              placeholder="Поиск"
              name="search"
            />
          </div>
          <h2 className={styles.centerblockH2}>Треки</h2>
          <div className={styles.centerblockFilter}>
            <div className={styles.filterTitle}>Искать по:</div>
            <div className={`${styles.filterButton} ${openFilter === "author" ? styles.active : ""}`} 
            onClick={() => toggleFilter("author")}>
              исполнителю 
              {openFilter === "author" && <Filter filterList = {uniqueAuthors} />}
            </div>
            <div className={`${styles.filterButton} ${openFilter === "releaseDate" ? styles.active : ""}`} 
            onClick={() => toggleFilter("releaseDate")}>
              году выпуска
              {openFilter === "releaseDate" && <Filter filterList={uniqueReleaseDate} />}
            </div>
            <div className={`${styles.filterButton} ${openFilter === "genre" ? styles.active : ""}`} 
            onClick={() => toggleFilter("genre")}
            >жанру
            {openFilter === "genre" && <Filter filterList={uniqueGenres} />}
            </div>
          </div>
          {/* Отображение фильтра исполнителей */}
      {/* {openFilter === "author" && (
        <div className={styles.filterList}>
          {uniqueAuthors.map((author, index) => (
            <div key={index} className={styles.filterItem}>
              {author}
            </div>
          ))}
        </div>
      )} */}
      {/* Отображение фильтра годов */}
      {/* {openFilter === "releaseDate" && (
        <div className={styles.filterList}>
          {uniqueReleaseDate.map((release_date, index) => (
            <div key={index} className={styles.filterItem}>
              {release_date}
            </div>
          ))}
        </div>
      )} */}

      {/* Отображение фильтра жанров */}
      {/* {openFilter === "genre" && (
        <div className={styles.filterList}>
          {uniqueGenres.map((genre, index) => (
            <div key={index} className={styles.filterItem}>
              {genre}
            </div>
          ))}
        </div>
      )} */}
          <div className={`${styles.centerblockContent} ${styles.playlistContent}`}>
            <div className={`${styles.contentTitle} ${styles.playlistTitleCol}`}>
              <div className={`${styles.playlistTitleCol} ${styles.col01}`}>Трек</div>
              <div className={`${styles.playlistTitleCol} ${styles.col02}`}>Исполнитель</div>
              <div className={`${styles.playlistTitleCol} ${styles.col03}`}>Альбом</div>
              <div className={`${styles.playlistTitleCol} ${styles.col04}`}>
                <svg className={styles.playlistTitleSvg}>
                  <use xlinkHref="/img/icon/sprite.svg#icon-watch"></use>
                </svg>
              </div>
            </div>
            <TrackList tracks={tracks} setCurrentTrack={setCurrentTrack} />
          </div>
        </div>

    );
}
