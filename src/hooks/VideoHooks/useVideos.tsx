import { useState } from "react";
import * as UseCase from '@/core/UseCases';
import { SmallTubeFetcher } from "@/config/adapters/SmallTube-adapters";
import { useUserStore } from "@/store/user.store";


export const useVideos = () => {
    const { access } = useUserStore();
    const [isLoading, setIsLoading] = useState(false);

    // Función para obtener todos los videos
    const GetAllVideos = async () => {
        setIsLoading(true);
        try {
            const getAllVideosResponse = await UseCase.GetAllVideos(SmallTubeFetcher, access);
            return getAllVideosResponse;
        } catch (error) {
            console.error("Error en GetAllVideos:", error);
            throw error;
        } finally {
            setTimeout(() => {
                setIsLoading(false);
            }, 1500);
        }
    };

    // funcion para registrar un video 
    const CreateVideo = async (data: any) => {
        setIsLoading(true);
        try {
            const createVideo = await UseCase.CreateVideo(
                SmallTubeFetcher,
                data,
                access
            )

            return createVideo
        } catch (err) {
            console.error("Error en GetAllVideos:", err);
            throw err;
        }  finally {
            setTimeout(() => {
                setIsLoading(false);
            }, 1500);
        }
    }

    // funcion para obtener informacion de los videos por el autor
    const getVideoByAutor = async (idAutor: number) => {
        setIsLoading(true);
        try {
            const getVideoById = await UseCase.GetVideoByAutor(
                SmallTubeFetcher,
                idAutor,
                access
            );

            return getVideoById;
        } catch (err) {
            console.error("Error en GetAllVideos:", err);
            throw err;
        } finally {
            setTimeout(() => {
                setIsLoading(false);
            }, 1500);
        }
    }

    // funcion para obtener informacion de los videos
    const GetVideoById = async (idVideo: number): Promise<any> => {
        setIsLoading(true);
        try {
            const getVideo = await UseCase.GetVideoById(
                SmallTubeFetcher,
                idVideo,
                access
            );

            return getVideo;
        } catch (err) {
            console.error("Error en GetAllVideos:", err);
            throw err;
        } finally {
            setTimeout(() => {
                setIsLoading(false);
            }, 1500);
        }
    }

    return {
        GetAllVideos,
        isLoading,
        CreateVideo,
        getVideoByAutor,
        GetVideoById
    };
};
