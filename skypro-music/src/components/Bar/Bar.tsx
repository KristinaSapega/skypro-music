"use client"
import { TrackType } from "@/types"
import styles from "./Bar.module.css"
import { ChangeEvent, SyntheticEvent, useRef, useState } from "react"
import ProgressBar from "../ProgressBar/ProgressBar"

type props = {
    currentTrack: TrackType 
}

export const Bar = ({currentTrack}: props) => {
    const [isPlay, setIsPlay] = useState(false)
    const [isLoop, SetIsLoop] = useState(false)


    const [progress, setProgress] = useState({
        currentTime: 0,
        duration: 0,
    });
    

    const audioRef = useRef<HTMLAudioElement | null>(null);

    const formatTime = (time: number) => {
        const minutes = Math.floor(time / 60);
        const seconds = Math.floor(time % 60).toString().padStart(2, '0');
        return `${minutes}:${seconds}`;
    };



    const onTogglePLay = () => {
        if (audioRef.current) {
            if (isPlay) {
                setIsPlay(false)
                audioRef.current.pause()
            } else {
                setIsPlay(true)
                audioRef.current.play()
            }  
        } 
    };

    const onToggleLoop = () => {
        if (audioRef.current) {
            SetIsLoop(!isLoop);
            console.log('Loop toggled:', !isLoop); 
            audioRef.current.loop = !isLoop;
        }
    };

    const onChangeVolume = (e: ChangeEvent<HTMLInputElement>) => {
        const volume = Number(e.target.value)/100
        if (audioRef.current) {
            audioRef.current.volume = volume
        }
    };

    const onChangeTime = (e: SyntheticEvent<HTMLAudioElement, Event>) => {
        setProgress({
            currentTime:e.currentTarget.currentTime, 
            duration: e.currentTarget.duration
        })
    };

    const onSeek = (e: ChangeEvent<HTMLInputElement>) => {
        if(audioRef.current) {
            audioRef.current.currentTime = Number(e.target.value);
            setProgress({...progress, currentTime: Number(e.target.value)})
        }
    };

    const showAlert = () => {
        alert("Еще не реализовано");
    };

    return (    

        <>
        <audio onTimeUpdate={onChangeTime} 
        ref={audioRef} 
        // controls 
        src={currentTrack.track_file} />
        <div className={styles.bar}>
            <div className={styles.barContent}>
            <div className={styles.timeDisplay}>
                        <span>{formatTime(progress.currentTime)}</span>
                        <span> / {formatTime(progress.duration)}</span>
                    </div>
                <ProgressBar 
                max={progress.duration}
                value={progress.currentTime}
                step={1}
                onChange={onSeek}
                />
                {/* <div className={styles.barPlayerProgress}></div> */}
                <div className={styles.barPlayerBlock}>

                    <div className={styles.barPlayer}>
                        <div className={styles.playerControls}>
                            <div onClick={showAlert} className={styles.playerBtnPrev}>
                                <svg className={styles.playerBtnPrevSvg}>
                                    <use xlinkHref="/img/icon/sprite.svg#icon-prev"></use>
                                </svg>
                            </div>
                            <div onClick={onTogglePLay} className={`${styles.playerBtnPlay} ${styles.btn}`}>
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
                            <div onClick={showAlert} className={styles.playerBtnNext}>
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
                            <div onClick={showAlert} className={`${styles.playerBtnShuffle} ${styles.btnIcon}`}>
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
                                <div className={`${styles.trackPlayLike} ${styles.btnIcon}`}>
                                    <svg className={styles.trackPlayLikeSvg}>
                                        <use xlinkHref="/img/icon/sprite.svg#icon-like"></use>
                                    </svg>
                                </div>
                                <div className={`${styles.barVolumeBlock} ${styles.volume}`}>
                                    <svg className={styles.trackPlayDislikeSvg}>
                                        <use
                                            xlinkHref="/img/icon/sprite.svg#icon-dislike"
                                        ></use>
                                    </svg>
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
                                    name="range" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div></>
    )
}
