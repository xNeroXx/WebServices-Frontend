export interface UpdatedSongData {
  song_id: number;
  artists?: { name: string; }[];
  title?: string;
  album?: string;
  genre?: string;
  date?: number;
}
