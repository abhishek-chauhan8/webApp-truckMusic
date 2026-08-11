import { fetchPlaylistVideos } from "./api";

export async function loadPlaylist() {

    const items = await fetchPlaylistVideos();

    return items.map((item) => ({

        id: item.snippet.resourceId.videoId,

        title: item.snippet.title,

        artist:
            item.snippet.videoOwnerChannelTitle ||
            item.snippet.channelTitle,

        thumbnail:
            item.snippet.thumbnails.high?.url ??
            item.snippet.thumbnails.default.url,

        youtubeId: item.snippet.resourceId.videoId

    }));
}