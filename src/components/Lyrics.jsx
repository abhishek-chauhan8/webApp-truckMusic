import { lyrics } from "../lyrics/songs";

export default function Lyrics({
    videoId,
    currentTime
}) {

    const songLyrics = lyrics[videoId] || [];

    let currentIndex = 0;

    for (let i = 0; i < songLyrics.length; i++) {

        if (currentTime >= songLyrics[i].time) {

            currentIndex = i;

        } else {

            break;

        }

    }

    return (

    <div className="lyrics-box">

        {songLyrics
            .slice(
                Math.max(0, currentIndex - 1),
                currentIndex + 2
            )
            .map((line, i) => {

                const actualIndex =
                    Math.max(0, currentIndex - 1) + i;

                return (

                    <p
                        key={actualIndex}
                        className={
                            actualIndex === currentIndex
                                ? "lyric active"
                                : "lyric"
                        }
                    >
                        {line.text}
                    </p>

                );

            })}

    </div>

);

}