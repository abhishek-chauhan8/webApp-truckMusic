export default function QueuePopup({
    open,
    playlist,
    index,
    onSelect
}) {

    if (!open) return null;


    return (

        <div className="queue-popup">

            {playlist.map((song, i) => (

                <button
                    key={song.youtubeId}
                    className={
                        i === index
                        ? "queue-item active"
                        : "queue-item"
                    }
                    onClick={() => onSelect(i)}
                >

                    <span className="queue-number">
                        {String(i + 1).padStart(2,"0")}
                    </span>


                    <div className="queue-info">

                        <strong>
                            {song.title}
                        </strong>

                        <small>
                            {song.artist}
                        </small>

                    </div>


                </button>

            ))}


        </div>

    );
}