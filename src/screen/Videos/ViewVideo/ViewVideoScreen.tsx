import { HeaderComponent } from "@/components/Header/HeaderComponent"
import { LoadingComponent } from "@/components/Loading/LoadingComponent";
import { useVideos } from "@/hooks/VideoHooks/useVideos"
import { Card } from "flowbite-react"
import animationLogin from "@/lotties/lottie-loading.json";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { VideoResponse } from "@/Infrastructure/Interfaces/VideoInterfaces";
import { useCategory } from "@/hooks/CategoryHooks/useCategory";

export const ViewVideoScreen = () => {
    const [videoDetails, setVideoDetails] = useState<VideoResponse>();
    const [categoryDetails, setCategoryDetails] = useState<any>();
    const { GetVideoById, isLoading } = useVideos();
    const { GetCategoryById } = useCategory();
    const { id } = useParams();

    useEffect(() => {
        consult();
    }, []);

    const consult = async () => {
        const video = await GetVideoById(Number(id));
        const category = await GetCategoryById(video.category);

        const accumulatedCategoryDetails: any = [];

        category?.forEach((results) => {
            results.data.forEach((value) => {
                accumulatedCategoryDetails.push(value); // Agregar los valores al array acumulado
            });
        });


        setVideoDetails(video);
        setCategoryDetails(accumulatedCategoryDetails);

        console.log(video.id)
        console.log(categoryDetails)

    }

    if (isLoading) {
        return <LoadingComponent
            lottie={animationLogin}
        />
    }

    const URL_MEDIA = 'http://www.localhost:8000';

    return (
        <div className="min-h-screen bg-happyblue-50 text-happyblue-50">
            <HeaderComponent />

            <div className="container mx-auto px-4 py-8 mt-16">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {/* Banner and Description Section */}
                    <div className="space-y-4">
                        <Card className="w-full overflow-hidden">
                            <img
                                src={`${URL_MEDIA}${videoDetails?.banner}`}
                                alt="Banner del video"
                                className="w-full h-48 object-cover"
                            />
                        </Card>
                        <Card>
                            <h2 className="text-2xl font-semibold mb-2 text-happyblue-800">Descripción</h2>
                            <p className="text-happyblue-600">
                                {videoDetails?.description}
                            </p>
                        </Card>
                    </div>

                    {/* Video Section */}
                    <div className="space-y-4">
                        <h1 className="text-3xl font-bold text-happyblue-900">{videoDetails?.title}</h1>
                        <div className="aspect-video rounded-lg overflow-hidden">
                            <video
                                src={`${URL_MEDIA}${videoDetails?.video}`}
                                controls
                                className="w-full h-full object-cover"
                            >
                                Tu navegador no soporta el elemento de video.
                            </video>
                        </div>
                        <div className="space-y-2">
                            {
                                categoryDetails.map((value: any, index: number) => {
                                    <span key={index} className="inline-block bg-happyblue-50 text-happyblue-900 rounded-full px-4 py-2 text-sm font-semibold">
                                        {value}
                                    </span>
                                })
                            }
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
