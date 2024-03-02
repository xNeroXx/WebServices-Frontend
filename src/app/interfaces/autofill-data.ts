export interface AutofillData {
  title: string[];
  artist_name: string[];
  album_name: string[];
  genre_name: string[];
}

export function createAutofillData(data: Partial<AutofillData> = {}): AutofillData {
  return {
    'title': data.title || [],
    'artist_name': data.artist_name || [],
    'album_name': data.album_name || [],
    'genre_name': data.genre_name || []
  };
}
