import { TrackType } from "@/types";
import styles from "./Track.module.css"
import { useAppDispatch, useAppSelector } from "@/store/store";
import { setTrackState } from "@/store/features/trackSlice";

interface TrackProps {
    track: TrackType

}

export const Track: React.FC<TrackProps> = ({track}) => {
    const dispatch = useAppDispatch();
    

    const onClickTrack = () => {
        dispatch(setTrackState(track));
        
    }
    return (

        <div onClick={onClickTrack} className={styles.playlisTrack}>
            <div className={styles.trackTitle}>
                <div className={styles.trackTitleImage}>
                    <svg className={styles.trackTitleSvg}>
                        <use xlinkHref="/img/icon/sprite.svg#icon-note"></use>
                    </svg>
                </div>
                {/* <div className="track__title-text"> */}
                    <a className={styles.trackTitleLink} href="http://">
                        <span className={styles.trackTitleSpan}></span>
                    {track.name}</a>
                {/* </div> */}
            </div>
            <div className={styles.trackAuthor}>
                <a className={styles.trackAuthorLink}href="http://">{track.author}</a>
            </div>
            <div className={styles.trackAlbum}>
                <a className={styles.trackAlbumLink} href="http://">{track.album}</a>
            </div>
            <div className="track__time">
                <svg className={styles.trackTimeSvg}>
                    <use xlinkHref="/img/icon/sprite.svg#icon-like"></use>
                </svg>
                <span className={styles.trackTimeText}>{Math.floor(track.duration_in_seconds/60)} : {Math.floor(track.duration_in_seconds % 60)}</span>
            </div>
        </div>
    );
}
          
  
