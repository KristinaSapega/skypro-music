import { TrackType } from "@/types";
import { Track } from "../Track/Track";
import styles from "./TrackList.module.css"
import { useAppDispatch, useAppSelector } from "@/store/store";

// interface TrackListProps {
//     setCurrentTrack: (track: TrackType) => void
// }

export const TrackList: React.FC = () => {
  

  // export const TrackList: React.FC<TrackListProps> = ({ setCurrentTrack }) => {
    const {tracks} = useAppSelector(state => state.tracksSlice);
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



