"use client"
import styles from "./Bar.module.css"
import { ChangeEvent, SyntheticEvent, useRef, useState } from "react"
import ProgressBar from "../ProgressBar/ProgressBar"
import { useAppDispatch, useAppSelector } from "@/store/store"
import { setIsPlaying, setIsShuffle, setNextTrack, setPrevTrack, setShuffle } from "@/store/features/trackSlice"
import { useLikeTrack } from "@/hooks/useLikeTrack"
import { formatTime } from "@/utils/timeUtils"


export const Bar = () => {
    const { currentTrack, isShuffle } = useAppSelector(state => state.tracksSlice);
    const [isPlay, setIsPlay] = useState(false);
    const [isLoop, SetIsLoop] = useState(false);
    const { tokens } = useAppSelector((state) => state.auth);
    const { toggleLike, isLiked } = useLikeTrack(currentTrack?._id || 0);
    const dispatch = useAppDispatch();


    const onClickNextTrack = () => {
        dispatch(setNextTrack());
    };

    const onClickPrevTrack = () => {
        dispatch(setPrevTrack());
    };

    const onToggleShuffle = () => {
        dispatch(setIsShuffle(!isShuffle));
        dispatch(setShuffle());
    }


    const [progress, setProgress] = useState({
        currentTime: 0,
        duration: 0,
    });


    const audioRef = useRef<HTMLAudioElement | null>(null);


    const onTogglePLay = () => {
        if (audioRef.current) {
            if (isPlay) {
                setIsPlay(false)
                dispatch(setIsPlaying(false));  // Обновляем Redux-состояние
                audioRef.current.pause()
            } else {
                setIsPlay(true)
                dispatch(setIsPlaying(true));
                audioRef.current.play()
            }
        }
    };

    const onToggleLoop = () => {
        if (audioRef.current) {
            SetIsLoop(!isLoop);
            audioRef.current.loop = !isLoop;
        }
    };

    const onChangeVolume = (e: ChangeEvent<HTMLInputElement>) => {
        const volume = Number(e.target.value) / 100
        if (audioRef.current) {
            audioRef.current.volume = volume
        }
    };

    const onChangeTime = (e: SyntheticEvent<HTMLAudioElement, Event>) => {
        setProgress({
            currentTime: e.currentTarget.currentTime || 0,
            duration: e.currentTarget.duration || 0
        })
    };

    const onSeek = (e: ChangeEvent<HTMLInputElement>) => {
        if (audioRef.current) {
            audioRef.current.currentTime = Number(e.target.value);
            setProgress({ ...progress, currentTime: Number(e.target.value) })
        }
    };

    const handleCanPlay = () => {
        audioRef.current?.play();
        setIsPlay(true);
    }

    // const showAlert = () => {
    //     alert("Еще не реализовано");
    // };

    if (!currentTrack) {
        return
    }

    return (
        <>
            <audio onTimeUpdate={onChangeTime}
                ref={audioRef}
                onCanPlay={handleCanPlay}
                autoPlay
                onEnded={onClickNextTrack}
                //controls 
                src={currentTrack.track_file} />
            <div className={styles.bar}>
                <div className={styles.barContent}>
                    <div className={styles.timeDisplay}>
                    <span>{progress.currentTime > 0 ? formatTime(progress.currentTime) : "00:00"}</span>
                    <span> / {progress.duration > 0 ? formatTime(progress.duration) : "00:00"}</span>
                    </div>
                    <ProgressBar
                        max={progress.duration}
                        value={progress.currentTime}
                        step={0.1}
                        onChange={onSeek}
                    />
                    <div className={styles.barPlayerBlock}>

                        <div className={styles.barPlayer}>
                            <div className={styles.playerControls}>
                                <div onClick={onClickPrevTrack} className={styles.playerBtnPrev}>
                                    <svg className={styles.playerBtnPrevSvg}>
                                        <use xlinkHref="/img/icon/sprite.svg#icon-prev"></use>
                                    </svg>
                                </div>
                                <div role="button" aria-label="Play"
                                onClick={onTogglePLay} className={`${styles.playerBtnPlay} ${styles.btn}`}>
                                    {isPlay ? (
                                        <svg width="15" height="20" viewBox="0 0 15 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <rect x="0" y="0" width="5" height="20" fill="#D9D9D9" />
                                            <rect x="10" y="0" width="5" height="20" fill="#D9D9D9" />
                                        </svg>
                                    ) : (
                                        <svg className={styles.playerBtnPlaySvg}>
                                            <use xlinkHref="/img/icon/sprite.svg#icon-play"></use>
                                        </svg>
                                    )}
                                </div>
                                <div onClick={onClickNextTrack} className={styles.playerBtnNext}>
                                    <svg className={styles.playerBtnNextSvg}>
                                        <use xlinkHref="/img/icon/sprite.svg#icon-next"></use>
                                    </svg>
                                </div>
                                <div onClick={onToggleLoop}
                                    className={`${styles.playerBtnRepeat} ${styles.btnIcon} ${isLoop ? styles.playerBtnRepeatActive : ''}`}>
                                    <svg className={styles.playerBtnRepeatSvg}>
                                        <use xlinkHref="/img/icon/sprite.svg#icon-repeat"></use>
                                    </svg>
                                </div>
                                <div role="button" aria-label="Shuffle"
                                onClick={onToggleShuffle}
                                    className={`${styles.playerBtnShuffle} ${styles.btnIcon} ${isShuffle ? styles.playerBtnShuffleActive : ''}`}>
                                    <svg className={styles.playerBtnShuffleSvg}>
                                        <use xlinkHref="/img/icon/sprite.svg#icon-shuffle"></use>
                                    </svg>
                                </div>
                            </div>

                            <div className={`${styles.playerTrackPlay} ${styles.trackPlay}`}>
                                <div className={styles.trackPlayContain}>
                                    <div className={styles.trackPlayImage}>
                                        <svg className={styles.trackPlaySvg}>
                                            <use xlinkHref="/img/icon/sprite.svg#icon-note"></use>
                                        </svg>
                                    </div>
                                    <div className={styles.trackPlayAuthor}>
                                        <a className={styles.trackPlayAuthorLink} href="http://"
                                        >{currentTrack.name}</a>
                                    </div>
                                    <div className={styles.trackPlayAlbum}>
                                        <a className={styles.trackPlayAlbumLink} href="http://">{currentTrack.author}</a>
                                    </div>
                                </div>

                                <div className={styles.trackPlayLikeDis}>
                                    <div className={`${styles.trackPlayLike} ${styles.btnIcon}`}
                                        onClick={(e) => {
                                            if (tokens.access) {
                                                toggleLike(e);
                                            } else {
                                                alert("Необходимо авторизоваться, чтобы ставить лайки!");
                                            }
                                        }}
                                    >
                                        <svg className={styles.trackPlayLikeSvg}>
                                        <use
                                                xlinkHref={`/img/icon/sprite.svg#icon-${isLiked ? "like" : "dislike"
                                                    }`}
                                            ></use>
                                        </svg>
                                    </div>
                                    <div className={`${styles.barVolumeBlock} ${styles.volume}`}>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className={`${styles.barVolumeBlock} ${styles.volume}`}>
                            <div className={styles.volumeContent}>
                                <div className={styles.volumeImage}>
                                    <svg className={styles.volumeSvg}>
                                        <use xlinkHref="/img/icon/sprite.svg#icon-volume"></use>
                                    </svg>
                                </div>
                                <div className={`${styles.volumeProgress} ${styles.btn}`}>
                                    <input onChange={onChangeVolume}
                                        className={`${styles.volumeProgressLine} ${styles.btn}`}
                                        type="range"
                                        name="range" 
                                        aria-label="Volume"/>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div></>
    )
}
