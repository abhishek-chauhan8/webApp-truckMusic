const API_KEY = "xyz";
const PLAYLIST_ID = "s1234567";

export async function fetchPlaylistVideos() {

    const url =
        `https://www.googleapis.com/youtube/v3/playlistItems` +
        `?part=snippet` +
        `&playlistId=${PLAYLIST_ID}` +
        `&maxResults=50` +
        `&key=${API_KEY}`;

    const response = await fetch(url);

    if (!response.ok) {
        throw new Error("Unable to fetch playlist");
    }

    const data = await response.json();

    return data.items;
}