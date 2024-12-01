import { TrackType } from "@/types";
import { Track } from "../Track/Track";
import styles from "./TrackList.module.css"

interface TrackListProps {
    tracks: TrackType[];
}

export const TrackList = ({tracks}:TrackListProps) => {

  return (
    <div className={styles.contentPlaylist}>
      {tracks.map((track, index) => (
        <div key={index} className={styles.playlistItem}>
          <Track
            track={track}
          />
        </div>
      ))}
    </div>
  );
}



