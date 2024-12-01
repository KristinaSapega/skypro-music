import { TrackType } from "@/types";
import styles from "./Track.module.css"
import { useAppDispatch, useAppSelector } from "@/store/store";
import { setIsPlaying, setTrackState } from "@/store/features/trackSlice";
import { useLikeTrack } from "@/hooks/useLikeTrack";
import { formatTime } from "@/utils/timeUtils";


interface TrackProps {
    track: TrackType

}

export const Track: React.FC<TrackProps> = ({track}) => {
    const dispatch = useAppDispatch();
    const {toggleLike, isLiked} = useLikeTrack(track._id);

    const currentTrack = useAppSelector((state) => state.tracksSlice.currentTrack);
    const isPlaying = useAppSelector((state) => state.tracksSlice.isPlaying);
    const isCurrentTrack = currentTrack?._id === track._id;
    

    const onClickTrack = () => {
        dispatch(setTrackState(track));
        dispatch(setIsPlaying(true));
        
    }


    return (

        <div onClick={onClickTrack} className={styles.playlisTrack}>
            <div className={styles.trackTitle}>
                <div className={styles.trackTitleImage}>
                {isCurrentTrack ? (
                        <div
                            className={`${styles.playingDot} ${isPlaying ? styles.pulsing : ''}`}
                        ></div>
                    ) : (
                    <svg className={styles.trackTitleSvg}>
                        <use xlinkHref="/img/icon/sprite.svg#icon-note"></use>
                    </svg>
                    )}
                </div>
                    <a className={styles.trackTitleLink} href="http://">
                        <span className={styles.trackTitleSpan}></span>
                    {track.name}</a>
            </div>
            <div className={styles.trackAuthor}>
                <a className={styles.trackAuthorLink}href="http://">{track.author}</a>
            </div>
            <div className={styles.trackAlbum}>
                <a className={styles.trackAlbumLink} href="http://">{track.album}</a>
            </div>
            <div onClick={toggleLike} className={`${styles.trackTime} ${isLiked ? styles.liked : ""}`}>
                <svg className={styles.trackTimeSvg}>
                    <use xlinkHref={`/img/icon/sprite.svg#icon-${isLiked ? "like" : "dislike"}`}></use>
                </svg>
                <span className={styles.trackTimeText}>
                {formatTime(track.duration_in_seconds)}
                </span>
            </div>
        </div>
    );
}
          
  
