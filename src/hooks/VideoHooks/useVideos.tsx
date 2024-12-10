import { useState } from "react";
import * as UseCase from '@/core/UseCases';
import { SmallTubeFetcher } from "@/config/adapters/SmallTube-adapters";
import { VideoResponse } from "@/Infrastructure/Interfaces/VideoInterfaces";
import { useUserStore } from "@/store/user.store";


export const useVideos = () => {
    const { access } = useUserStore();
    const [isLoading, setIsLoading] = useState(false);
    const [getAllVideosDetail, setGetAllVideosDetail] = useState<VideoResponse[]>([]);

    // Función para obtener todos los videos
    const GetAllVideos = async () => {
        setIsLoading(true);
        try {
            const getAllVideosResponse = await UseCase.GetAllVideos(SmallTubeFetcher, access);
            setGetAllVideosDetail(getAllVideosResponse);
        } catch (error) {
            console.error("Error en GetAllVideos:", error);
            throw error;
        } finally {
            setIsLoading(false);
        }
    };

    return {
        GetAllVideos,
        isLoading,
        getAllVideosDetail,
    };
};
