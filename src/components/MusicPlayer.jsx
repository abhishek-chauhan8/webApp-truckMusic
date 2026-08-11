import { useEffect, useState, useRef } from "react";
import {
    currentTime,
    duration,
    seek
} from "../youtube/player";
import Icon from "./Icon";
import QueuePopup from "./QueuePopup";
import Lyrics from "./Lyrics";


export default function MusicPlayer({
    playlist,
    index,
    playing,
    setPlaying,
    next,
    previous,
    showPlaylist,
    setShowPlaylist,
    onSelect,
    shuffle,
    setShuffle
}) {

    const song = playlist[index];
    const popupRef = useRef(null);
    const [elapsed, setElapsed] = useState(0);
    const [total, setTotal] = useState(0);

    useEffect(() => {

        const interval = setInterval(() => {

            const current = currentTime();
            const totalDuration = duration();

            console.log("Current:", current);
            console.log("Duration:", totalDuration);

            setElapsed(current);
            setTotal(totalDuration);

        }, 500);

        return () => clearInterval(interval);

    }, []);

    useEffect(() => {

        function handleClickOutside(event) {

            if (
                popupRef.current &&
                !popupRef.current.contains(event.target)
            ) {

                setShowPlaylist(false);

            }

        }


        document.addEventListener(
            "mousedown",
            handleClickOutside
        );


        return () => {

            document.removeEventListener(
                "mousedown",
                handleClickOutside
            );

        };


    }, []);

    if (!song) {
        return null;
    }

    function formatTime(seconds) {

        seconds = Math.floor(seconds || 0);

        const minutes = Math.floor(seconds / 60);

        const secs = seconds % 60;

        return `${minutes}:${secs.toString().padStart(2, "0")}`;

    }

    function handleSeek(e) {

        const value = Number(e.target.value);

        seek(value);

        setElapsed(value);

    }

    return (

        <section className="listening-area">
            
            <div className="player-pill">

                <img
                    src={song.thumbnail}
                    alt={song.title}
                    className={`album-art ${playing ? "playing" : ""}`}

                />

                <div className="track-details">

                    <strong>{song.title}</strong>

                    <small>{song.artist}</small>

                    <input
                        type="range"
                        min="0"
                        max={total || 1}
                        value={elapsed}
                        onChange={handleSeek}
                        style={{
                            '--progress': `${total ? (elapsed / total) * 100 : 0}%`
                        }}
                    />

                    <div
                        style={{
                            display: "flex",
                            justifyContent: "space-between",
                            marginTop: "6px",
                            fontSize: "12px"
                        }}
                    >
                        <span>{formatTime(elapsed)}</span>

                        <span>{formatTime(total)}</span>

                    </div>

                </div>


                <div className="controls-wrapper">

                    <div className="pill-controls">

                        {/* Shuffle */}
                        <button
                            className={shuffle ? "small-control on" : "small-control"}
                            onClick={() => setShuffle(!shuffle)}
                        >
                            <Icon name="shuffle" size={15} />
                        </button>


                        <button
                            className="small-control"
                            onClick={previous}
                        >
                            <Icon name="previous" size={16} />
                        </button>


                        <button
                            className="main-play"
                            onClick={() => setPlaying(!playing)}
                        >
                            <Icon
                                name={playing ? "pause" : "play"}
                                size={22}
                            />
                        </button>


                        <button
                            className="small-control"
                            onClick={next}
                        >
                            <Icon name="next" size={16} />
                        </button>


                        <button
                            className="small-control"
                            onClick={(e) => {
                                e.stopPropagation();
                                setShowPlaylist(!showPlaylist);
                            }}
                        >
                            <Icon name="list" size={17} />
                        </button>
                    </div>
                    <div ref={popupRef}>

                        <QueuePopup
                            open={showPlaylist}
                            playlist={playlist}
                            index={index}
                            onSelect={onSelect}
                        />

                    </div>
                </div>
            </div>

        </section>

    );

}