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
  artists: Artist[]
}

export interface Artist {
  id: number;
  name: string;
}

