import { CategoryResponse } from "@/Infrastructure/Interfaces/CategoryInterfaces";
import { useUserStore } from "@/store/user.store";
import { useEffect, useState } from "react";
import * as UseCase from '@/core/UseCases';
import { SmallTubeFetcher } from "@/config/adapters/SmallTube-adapters";

export const useCategory = () => {
    const { access } = useUserStore();
    const [isLoading, setIsLoading] = useState(false);
    const [getAllCategoryDetail, setGetAllCategoryDetail] = useState<CategoryResponse | undefined>(undefined);

    useEffect(() => {
        GetAllCategorys();
    }, [access]);

    const GetAllCategorys = async () => {
        setIsLoading(true);

        try {
            const getAllCategoryResponse = await UseCase.GetAllCategorys(SmallTubeFetcher);

            // Aquí aseguramos que la respuesta se ajuste a CategoryResponse
            const formattedResponse: CategoryResponse = {
                message: getAllCategoryResponse.message,  // Asumimos que `message` es un string
                data: getAllCategoryResponse.data,        // `data` debe ser un array de tipo Datum[]
            };

            setGetAllCategoryDetail(formattedResponse);
        } catch (error) {
            console.error("Error en GetAllCategorys:", error);
            throw error;
        } finally {
            setIsLoading(false);
        }
    }

    const GetCategoryById = async (category: number[]) => {
        setIsLoading(true);
        try {
            if (Array.isArray(category)) {
                const results = await Promise.all(
                    category.map(async (categoryId) => {
                        const getCategory = await UseCase.GetCategoryById(
                            SmallTubeFetcher,
                            categoryId,
                        );
                        return getCategory;
                    })
                );
                return results;
            } else {
                console.error('The fetched data is not an array:', category);
            }
        } catch (err) {
            console.error("Error en GetCategoryById:", err);
            throw err;
        } finally {
            setIsLoading(false);
        }
    };


    return {
        isLoading,
        getAllCategoryDetail,
        GetCategoryById
    }
}
