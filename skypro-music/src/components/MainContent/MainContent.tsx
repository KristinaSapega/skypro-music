"use client";
import { TrackList } from "../TrackList/TrackList";
import styles from "./MainContent.module.css";
import { useCallback, useMemo, useState } from "react";
import Filter from "../Filter/Filter";
import { useAppSelector } from "@/store/store";

export const MainContent = () => {
  const [openFilter, setOpenFilter] = useState<string | null>(null);
  const { tracks } = useAppSelector((state) => state.tracksSlice);
  const [searchQuery, setSearchQuery] = useState<string>(""); //поиск
  const [sortOption, setSortOption] = useState<string | null>("default"); //сортировка
  const [selectedAuthors, setSelectedAuthors] = useState<string[]>([]); //авторы
  const [selectedGenres, setSelectedGenres] = useState<string[]>([]); //жанры

  const uniqueAuthors = useMemo(
    () => Array.from(new Set(tracks.map((track) => track.author))),
    [tracks]
  );
  const uniqueGenres = useMemo(
    () => Array.from(new Set(tracks.flatMap((track) => track.genre))),
    [tracks]
  );

  const toggleFilter = useCallback((filterType: string) => {
    setOpenFilter((prev) => (prev === filterType ? null : filterType));
  }, []);

  const toggleAuthor = useCallback((author: string) => {
    setSelectedAuthors((prev) =>
      prev.includes(author)
        ? prev.filter((a) => a !== author)
        : [...prev, author]
    );
  }, []);

  const toggleGenre = useCallback((genre: string) => {
    setSelectedGenres((prev) =>
      prev.includes(genre) ? prev.filter((g) => g !== genre) : [...prev, genre]
    );
  }, []);

  const handleSort = useCallback((option: string) => {
    setSortOption(option);
    setOpenFilter(null);
  }, []);

  // Фильтрация, поиск и сортировка
  const filteredTracks = useMemo(() => {
    let result = [...tracks];

    // Поиск по ключевому слову
    if (searchQuery) {
      const lowerQuery = searchQuery.toLowerCase();
      result = result.filter(
        (track) =>
          track.name.toLowerCase().includes(lowerQuery) ||
          track.author.toLowerCase().includes(lowerQuery)
      );
    }

    // Фильтрация по авторам
    if (selectedAuthors.length > 0) {
      result = result.filter((track) => selectedAuthors.includes(track.author));
    }

    // Фильтрация по жанрам
    if (selectedGenres.length > 0) {
      result = result.filter((track) =>
        track.genre.some((g) => selectedGenres.includes(g))
      );
    }

    // Сортировка
    if (sortOption === "new") {
      result = result.sort(
        (a, b) =>
          new Date(b.release_date).getTime() -
          new Date(a.release_date).getTime()
      );
    } else if (sortOption === "old") {
      result = result.sort(
        (a, b) =>
          new Date(a.release_date).getTime() -
          new Date(b.release_date).getTime()
      );
    }

    return result;
  }, [tracks, searchQuery, selectedAuthors, selectedGenres, sortOption]);

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
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>
      <h2 className={styles.centerblockH2}>Треки</h2>
      <div className={styles.centerblockFilter}>
        <div className={styles.filterTitle}>Искать по:</div>
        <div
          className={`${styles.filterButton} ${
            openFilter === "author" ? styles.active : ""
          }`}
          onClick={() => toggleFilter("author")}
        >
          исполнителю
          {selectedAuthors.length > 0 && (
            <div className={styles.filterTab}>{selectedAuthors.length}</div>
          )}
          {openFilter === "author" && (
            <Filter
              filterList={uniqueAuthors}
              onItemClick={toggleAuthor}
              selectedItems={selectedAuthors}
            />
          )}
        </div>
        <div
          className={`${styles.filterButton} ${
            openFilter === "releaseDate" ? styles.active : ""
          }`}
          onClick={() => toggleFilter("releaseDate")}
        >
          году выпуска
          {openFilter === "releaseDate" && (
            <div className={styles.filterList}>
              <div
                className={`${styles.filterItem} ${
                  sortOption === "default" ? styles.active : ""
                }`}
                onClick={() => handleSort("default")}
              >
                По умолчанию
              </div>
              <div
                className={`${styles.filterItem} ${
                  sortOption === "new" ? styles.active : ""
                }`}
                onClick={() => handleSort("new")}
              >
                Сначала новые
              </div>
              <div
                className={`${styles.filterItem} ${
                  sortOption === "old" ? styles.active : ""
                }`}
                onClick={() => handleSort("old")}
              >
                Сначала старые
              </div>
            </div>
          )}
        </div>
        <div
          className={`${styles.filterButton} ${
            openFilter === "genre" ? styles.active : ""
          }`}
          onClick={() => toggleFilter("genre")}
        >
          жанру
          {selectedGenres.length > 0 && (
            <div className={styles.filterTab}>{selectedGenres.length}</div>
          )}
          {openFilter === "genre" && (
            <Filter
              filterList={uniqueGenres}
              onItemClick={toggleGenre}
              selectedItems={selectedGenres}
            />
          )}
        </div>
      </div>
      <div className={`${styles.centerblockContent} ${styles.playlistContent}`}>
        <div className={`${styles.contentTitle} ${styles.playlistTitleCol}`}>
          <div className={`${styles.playlistTitleCol} ${styles.col01}`}>
            Трек
          </div>
          <div className={`${styles.playlistTitleCol} ${styles.col02}`}>
            Исполнитель
          </div>
          <div className={`${styles.playlistTitleCol} ${styles.col03}`}>
            Альбом
          </div>
          <div className={`${styles.playlistTitleCol} ${styles.col04}`}>
            <svg className={styles.playlistTitleSvg}>
              <use xlinkHref="/img/icon/sprite.svg#icon-watch"></use>
            </svg>
          </div>
        </div>
        {filteredTracks.length > 0 ? (
          <TrackList tracks={filteredTracks} />
        ) : (
          <div className={styles.noTracks}>Треки не найдены</div>
        )}
      </div>
    </div>
  );
};
