import { TrackType } from "@/types";

const URL = "https://webdev-music-003b5b991590.herokuapp.com";
export const GetTracks = async (): Promise<TrackType[]> => {
  const response = await fetch(URL + "/catalog/track/all/");
  if (!response.ok) {
    throw new Error("Ошибка при получении данных");
  }
  const data = await response.json();
  return data.data;
};

export const GetFavoriteTracks = async () => {
  const token = localStorage.getItem("accessToken");
  if (!token) {
    throw new Error("Токен отсутствует. Авторизуйтесь снова.");
  }
  const response = await fetch(URL + "/catalog/track/favorite/all/", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  if (!response.ok) {
    console.error("Ошибка запроса:", response.status, response.statusText);
    throw new Error("Данные не получены");
  }

  const data = await response.json();
  return data.data;
};

export interface LikeTypesProps {
  _id: number;
  token: string;
}

export const AddTrackFavorite = async ({ _id, token }: LikeTypesProps) => {
  try {
    const response = await fetch(`${URL}/catalog/track/${_id}/favorite/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    return response.json();
  } catch (error) {
    if (error instanceof Error) console.error(error.message);
  }
};

export const DeleteTrackFavorite = async ({ _id, token }: LikeTypesProps) => {
  try {
    const response = await fetch(`${URL}/catalog/track/${_id}/favorite/`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    return response.json();
  } catch (error) {
    if (error instanceof Error) console.error(error.message);
  }
};

export const GetSelectionById = async (id: string) => {
  try {
    const token = localStorage.getItem("accessToken");
    const fullId = Number(id) + 1;
    const response = await fetch(`${URL}/catalog/selection/${fullId}/`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    if (!response.ok) {
      throw new Error("Ошибка при загрузке подборки");
    }
    const data = await response.json();
    return data.data;
  } catch (error) {
    console.error("Ошибка при получении подборки:", error);
    throw error;
  }
};
