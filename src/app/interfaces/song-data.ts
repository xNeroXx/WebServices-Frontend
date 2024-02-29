export interface SongData {
  file_id: number,
  duration: number,
  title: string,
  release_date: number,
  song_id: number,
  album: string,
  genre: string,
  artists: Artist[]
}

export function createAutofillData(data: Partial<SongData> = {}): SongData {
  return {
    'file_id': data.file_id || 0,
    'duration': data.duration || 0,
    'title': data.title || '',
    'release_date': data.release_date || 0,
    'song_id': data.song_id || 0,
    'album': data.album || '',
    'genre': data.genre || '',
    'artists': data.artists || [],
  };
}

export interface Artist {
  name: string;
  artist_id: number;
}

