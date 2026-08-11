let player = null;
let pendingPlay = false;


export function createPlayer(elementId) {

    return new Promise((resolve) => {


        window.onYouTubeIframeAPIReady = () => {


            player = new window.YT.Player(elementId, {

                width: "1",
                height: "1",

                videoId: "",

                playerVars: {
                    controls: 0,
                    rel: 0,
                    playsinline: 1
                },

                events: {
                    onReady: () => resolve(player),

                    onStateChange: (event) => {

                        if (
                            event.data === window.YT.PlayerState.CUED &&
                            pendingPlay
                        ) {

                            player.playVideo();

                        }

                    }
                }

            });


        };



        if (!window.YT) {

            const script = document.createElement("script");

            script.src = "https://www.youtube.com/iframe_api";

            document.body.appendChild(script);

        }


    });

}

export function load(videoId, autoPlay = false) {

    if (!player) return;


    if (autoPlay) {

        pendingPlay = true;

        player.loadVideoById(videoId);

    }
    else {

        player.cueVideoById(videoId);

    }

}


export function play() {

    if (!player) return;

    player.playVideo();

}


export function pause() {

    if (!player) return;

    player.pauseVideo();

}


export function currentTime() {

    if (!player) return 0;

    return player.getCurrentTime() || 0;

}


export function duration() {

    if (!player) return 0;

    return player.getDuration() || 0;

}


export function seek(seconds) {

    if (!player) return;

    player.seekTo(seconds, true);

}


export function onVideoEnd(callback) {

    if (!player) return;


    player.addEventListener(
        "onStateChange",
        (event) => {


            if (event.data === window.YT.PlayerState.ENDED) {

                callback();

            }


        }
    );

}