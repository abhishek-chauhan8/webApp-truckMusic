import {
  useCallback,
  useEffect,
  useRef,
  useState
} from 'react'

import {
  ref,
  push,
  onValue,
  onDisconnect,
  set
} from "firebase/database";

import { database } from "./firebase";

import { loadPlaylist } from "./youtube/playlist";
import {
  createPlayer,
  load,
  play,
  pause,
  onVideoEnd
} from "./youtube/player";

import MusicPlayer from "./components/MusicPlayer";
import Icon from "./components/Icon";
import QueuePopup from "./components/QueuePopup";



const truckArt = '/art/user-truck-background.png'


const formatTime = (value) => `${Math.floor((value || 0) / 60)}:${String(Math.floor((value || 0) % 60)).padStart(2, '0')}`

export default function App() {

  const nextRef = useRef();
  const [index, setIndex] = useState(0)
  const [playing, setPlaying] = useState(false)
  const [elapsed, setElapsed] = useState(0)
  const [duration, setDuration] = useState(0)
  const [shuffle, setShuffle] = useState(false)
  const [showPlaylist, setShowPlaylist] = useState(false)
  const [onlineUsers, setOnlineUsers] = useState(0)
  const [playlist, setPlaylist] = useState([]);



  const selectTrack = useCallback((newIndex) => {

    if (!playlist.length) return;

    const actualIndex =
      (newIndex + playlist.length) % playlist.length;

    setIndex(actualIndex);

    load(playlist[actualIndex].youtubeId);

    setPlaying(true);

    setTimeout(() => {
      play();
    }, 300);

  }, [playlist]);

  const next = useCallback(() => {

    if (playlist.length === 0) return;

    let randomIndex;

    do {
      randomIndex = Math.floor(Math.random() * playlist.length);
    } while (playlist.length > 1 && randomIndex === index);

    setIndex(randomIndex);

    load(playlist[randomIndex].youtubeId);

    if (playing) {
      setTimeout(() => play(), 300);
    }

  }, [index, playlist, playing]);

  const previous = useCallback(() => {

    if (playlist.length === 0) return;

    const previousIndex =
      index === 0
        ? playlist.length - 1
        : index - 1;

    setIndex(previousIndex);

    load(playlist[previousIndex].youtubeId, playing);

  }, [index, playlist, playing]);


  useEffect(() => {

    const usersRef = ref(database, "onlineUsers");

    // Create a unique entry for this visitor
    const myUserRef = push(usersRef);

    // Mark this visitor as online
    set(myUserRef, true);

    // Remove automatically when disconnected
    onDisconnect(myUserRef).remove();

    // Listen for live changes
    const unsubscribe = onValue(usersRef, (snapshot) => {

      if (snapshot.exists()) {
        setOnlineUsers(Object.keys(snapshot.val()).length);
      } else {
        setOnlineUsers(0);
      }

    });

    return () => unsubscribe();

  }, []);



  useEffect(() => {

    async function initPlayer() {

      await createPlayer("youtube-player");

      console.log("Player Ready");

      const songs = await loadPlaylist();

      setPlaylist(songs);

      if (songs.length > 0) {

        const randomIndex = Math.floor(Math.random() * songs.length);

        setIndex(randomIndex);

        load(songs[randomIndex].youtubeId);
        setPlaying(true);
        onVideoEnd(() => {

          nextRef.current();

        });

      }

    }
    initPlayer();

  }, []);

  useEffect(() => {

    nextRef.current = next;

  }, [next]);

  useEffect(() => {

    if (playing) {

      play();

    } else {

      pause();

    }

  }, [playing]);


  useEffect(() => {
    const handler = (event) => { if (event.target.tagName === 'INPUT') return; if (event.code === 'Space') { event.preventDefault(); setPlaying(value => !value) }; if (event.key === 'ArrowRight') next(); if (event.key === 'ArrowLeft') selectTrack(index - 1) }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [index, next, selectTrack])


  return <main className="highway-app">
    <div className="highway-background" style={{ backgroundImage: `url(${truckArt})` }} />
    <div className="page-tint" />
    
    <div
      id="youtube-player"
      style={{
        position: "absolute",
        width: "1px",
        height: "1px",
        overflow: "hidden",
        opacity: 0
      }}
    />

    <header className="status-bar">
      <time>{new Intl.DateTimeFormat('en-IN', { hour: 'numeric', minute: '2-digit' }).format(new Date()).toLowerCase()}</time>
      <p>
        <span className="live-dot" style={{ marginRight: "8px" }} />
        <b>{onlineUsers * 10}</b>&nbsp; Listening now
      </p>
      <button className="round-icon" aria-label="Open playlist" onClick={() => setShowPlaylist(true)}><Icon name="compass" size={26} /></button>
    </header>

    <section className="hero-content">
      <h1>ट्रक  वाला</h1>

      {/* <button className="request-chip" type="button">
        <span><Icon name="volume" size={15} /></span>
        <strong>हॉर्न</strong>
        <small>horn of the pleassee</small>
      </button> */}
    </section>

    <MusicPlayer
      playlist={playlist}
      index={index}
      playing={playing}
      setPlaying={setPlaying}
      next={next}
      previous={previous}
      showPlaylist={showPlaylist}
      setShowPlaylist={setShowPlaylist}
      onSelect={selectTrack}
      shuffle={shuffle}
      setShuffle={setShuffle}
    />

    <div className="contact-reference">
      <h5>Any suggestions?</h5>
      <a href="mailto:abhishek882chauhan@gmail.com">
        abhishek882chauhan@gmail.com
      </a>
    </div>
  </main>
}