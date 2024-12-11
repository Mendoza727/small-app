import { HttpAdpater } from "@/config/adapters/HttpAdapter/Http.adapters";
import {
  Video,
  VideoResponse,
  VideoStastisticsResponse,
} from "@/Infrastructure/Interfaces/VideoInterfaces";

export const GetAllVideos = async (
  fetcher: HttpAdpater,
  token: string
): Promise<VideoResponse[]> => {
  try {
    const getAllVideos = await fetcher.get<VideoResponse[]>("get-all-videos/", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return getAllVideos;
  } catch (err) {
    throw new Error("Error trying to get videos: " + err);
  }
};

export const GetVideoById = async (
  fetcher: HttpAdpater,
  idVideo: number,
  token: string
): Promise<any> => {
  try {
    const getVideoId = await fetcher.get<any>(
      `getVideo/${idVideo}/`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return getVideoId["data"];
  } catch (error) {
    throw new Error("Error trying to get videos: " + error);
  }
};

export const GetVideoByAutor = async (
  fetcher: HttpAdpater,
  id_autor: number,
  token: string
): Promise<VideoResponse[]> => {
  try {
    const getAllVideos = await fetcher.get<VideoResponse[]>(
      `get-video-by-autor/?autor=${id_autor}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return getAllVideos;
  } catch (err) {
    throw new Error("Error trying to get videos: " + err);
  }
};

export const CreateVideo = async (
  fetcher: HttpAdpater,
  data: Video,
  token: string
): Promise<Video> => {
  try {
    const createVideo = await fetcher.post<Video>("video/", data, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data",
      },
    });

    return createVideo;
  } catch (err) {
    throw new Error(
      "Error trying to register: " + (err instanceof Error ? err.message : err)
    );
  }
};

export const EditVideo = async (
  fetcher: HttpAdpater,
  idVideo: number,
  token: string
): Promise<Video> => {
  try {
    const editVideo = await fetcher.put<Video>(`videos-edit/${idVideo}/`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return editVideo;
  } catch (err) {
    throw new Error("Error trying to edit video: " + err);
  }
};

export const DeleteVideo = async (
  fetcher: HttpAdpater,
  idVideo: number,
  token: string
): Promise<any> => {
  try {
    const deleteVideo = await fetcher.delete<any>(`videos-delete/${idVideo}/`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return deleteVideo;
  } catch (err) {
    throw new Error("Error trying to edit video: " + err);
  }
};

export const GetVideoStatistics = async (
  fetcher: HttpAdpater,
  idVideo: number,
  token: string
): Promise<VideoStastisticsResponse> => {
  try {
    const getStatisticsVideo = await fetcher.get<VideoStastisticsResponse>(
      `videos-statistics/${idVideo}/`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return getStatisticsVideo;
  } catch (err) {
    throw new Error(
      "Error trying get statistic: " +
        (err instanceof Error ? err.message : err)
    );
  }
};
