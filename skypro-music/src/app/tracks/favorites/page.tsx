"use client";
import styles from "./page.module.css";
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/store/store";
import { fetchFavoriteTracks } from "@/store/features/trackSlice";
import { TrackList } from "@/components/TrackList/TrackList";
import Filter from "@/components/Filter/Filter";

export default function Favorites() {
  const dispatch = useAppDispatch();
  const { tokens } = useAppSelector((state) => state.auth);
  const tracks = useAppSelector((state) => state.tracksSlice.tracks);
  const likedTracks = useAppSelector((state) => state.tracksSlice.likedTracks);

  const filteredFavoriteTracks = tracks.filter((track) =>
    likedTracks.includes(track._id)
  );

  const [openFilter, setOpenFilter] = useState<string | null>(null);

  const uniqueAuthors = Array.from(
    new Set(filteredFavoriteTracks.map((track) => track.author))
  );
  const uniqueGenres = Array.from(
    new Set(filteredFavoriteTracks.flatMap((track) => track.genre))
  );
  const uniqueReleaseDate = Array.from(
    new Set(
      filteredFavoriteTracks.map((track) =>
        new Date(track.release_date).getFullYear().toString()
      )
    )
  );

  const toggleFilter = (filterType: string) => {
    setOpenFilter(openFilter === filterType ? null : filterType);
  };

  useEffect(() => {
    if (tokens.access) {
      dispatch(fetchFavoriteTracks());
    }
  }, [dispatch, tokens]);

  return (
    <div className={styles.mainCenterblock}>
      <h2 className={styles.centerblockH2}>Мои треки</h2>
      <div className={styles.centerblockFilter}>
        <div className={styles.filterTitle}>Искать по:</div>
        <div
          className={`${styles.filterButton} ${
            openFilter === "author" ? styles.active : ""
          }`}
          onClick={() => toggleFilter("author")}
        >
          исполнителю
          {openFilter === "author" && <Filter filterList={uniqueAuthors} />}
        </div>
        <div
          className={`${styles.filterButton} ${
            openFilter === "releaseDate" ? styles.active : ""
          }`}
          onClick={() => toggleFilter("releaseDate")}
        >
          году выпуска
          {openFilter === "releaseDate" && (
            <Filter filterList={uniqueReleaseDate} />
          )}
        </div>
        <div
          className={`${styles.filterButton} ${
            openFilter === "genre" ? styles.active : ""
          }`}
          onClick={() => toggleFilter("genre")}
        >
          жанру
          {openFilter === "genre" && <Filter filterList={uniqueGenres} />}
        </div>
      </div>
      <div className={`${styles.centerblockContent} ${styles.playlistContent}`}>
      {filteredFavoriteTracks.length > 0 ? (
          <TrackList tracks={filteredFavoriteTracks} />
        ) : (
          <div className={styles.noTracks}>Треки не добавлены</div>
        )}
      </div>
    </div>
  );
}
