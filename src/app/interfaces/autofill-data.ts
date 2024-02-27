export interface AutofillData{
  title: string[];
  interpret: string[];
  album: string[];
  genre: string[];
}

export function createAutofillData(data: Partial<AutofillData> = {}): AutofillData {
  return {
    'title': data.title || [],
    'interpret': data.interpret || [],
    'album': data.album || [],
    'genre': data.genre || []
  };
}
