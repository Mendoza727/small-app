import { HttpAdpater } from "@/config/adapters/HttpAdapter/Http.adapters";
import { CategoryResponse } from "@/Infrastructure/Interfaces/CategoryInterfaces";
import { getEncryptedLocalStorage } from "@/storage/StorageServices";

const token = getEncryptedLocalStorage('data');

export const GetAllCategorys = async (
  fetcher: HttpAdpater,
): Promise<CategoryResponse> => {
  try {
    const category = await fetcher.get<CategoryResponse>("get-categorys/", {
      headers: {
        Authorization: `Bearer ${token["access"]}`,
      },
    });

    return category;
  } catch (err) {
    throw new Error("Error trying to get categorys: " + err);
  }
};

export const GetCategoryById = async (
  fetcher: HttpAdpater,
  idCategory: number,
): Promise<CategoryResponse> => {
  try {
    console.log("toke", token["access"])

    if (!token["access"]) {
      throw new Error("Authorization token is missing.");
    }

    const category = await fetcher.get<CategoryResponse>(
      `get-categories-by-id/?id_category=${idCategory}`,
      {
        headers: {
          Authorization: `Bearer ${token["access"]}`,
        },
      }
    );

    return category;
  } catch (err) {
    throw new Error("Error trying to get category: " + err);
  }
};
