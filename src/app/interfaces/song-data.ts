export interface SongData {
  id: number,
  title: string,
  interpret: string[],
  album: string,
  genre: string,
  releaseYear: number,
  duration: number,
  song_id: number,
  file_id: number,
}

export function createSongData(data: Partial<SongData> = {}): SongData {
  return {
    'id': data.id || 0,
    'title': data.title || '',
    'interpret': data.interpret || [],
    'album': data.album || '',
    'genre': data.genre || '',
    'releaseYear': data.releaseYear || 0,
    'duration': data.duration || 0
  };
}
