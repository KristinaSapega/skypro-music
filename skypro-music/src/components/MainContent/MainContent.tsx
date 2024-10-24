"use client"
import { GetTracks } from "@/api/apiTrack";
import { TrackList } from "../TrackList/TrackList";
import styles from "./MainContent.module.css";
import { TrackType } from "@/types";
import { useEffect, useState } from "react";
import Filter from "../Filter/Filter";
import { useAppDispatch, useAppSelector } from "@/store/store";
import { setTracks } from "@/store/features/trackSlice";



export const MainContent = () => {
    // const [tracks, setTracks] = useState<TrackType[]>([]);
    const [error, setError] = useState<string | null>(null);
    const [openFilter, setOpenFilter] = useState<string | null>(null);

    const dispatch = useAppDispatch(); 
    const {tracks} = useAppSelector((state) => state.tracksSlice) ;

    useEffect(() => {
    const fetchTracks = async () => {
        try {
            const data = await GetTracks();
            console.log("API Data:", data);
            // setTracks(data);
            dispatch(setTracks(data)); // Диспатчим данные треков в Redux
        }catch (error) {
            if(error instanceof Error) {
                setError(error.message)
              }
          }
    };
    fetchTracks(); 
  }, []); 

  const uniqueAuthors = Array.from(new Set(tracks.map((track) => track.author)));
  const uniqueGenres = Array.from(new Set(tracks.flatMap((track) => track.genre)));
  const uniqueReleaseDate = Array.from(new Set(tracks.map((track) => new Date(track.release_date).getFullYear().toString())));
  console.log(tracks.map((track) => track.genre)); 

  
  const toggleFilter = (filterType: string) => {
    if (openFilter === filterType) {
        setOpenFilter(null); 
    }else {
        setOpenFilter(filterType); 
    }
  };

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
            <TrackList  />
          </div>
        </div>

    );
}
