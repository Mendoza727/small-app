import { HeaderComponent } from "@/components/Header/HeaderComponent"
import { LoadingComplete, LoadingComponent } from "@/components/Loading/LoadingComponent";
import { useVideos } from "@/hooks/VideoHooks/useVideos"
import { Avatar, Badge, Card } from "flowbite-react"
import { useEffect, useState } from "react";
import animationData from '@/lotties/lottie-loading.json';
import { useNavigate, useParams } from "react-router-dom";
import { Author, Videos } from "@/Infrastructure/Interfaces/VideoInterfaces";
import { useCategory } from "@/hooks/CategoryHooks/useCategory";
import { Category } from "@/Infrastructure/Interfaces/CategoryInterfaces";
import { EditIcon, EyeIcon, TrashIcon } from "lucide-react";
import { useUserStore } from "@/store/user.store";
import Swal from "sweetalert2";



export const ViewVideoScreen = () => {
    const navigate = useNavigate();

    const [videoDetails, setVideoDetails] = useState<Videos>();
    const [authorDetails, setAuthorDetails] = useState<Author>();
    const [viewNumber, setViewNumber] = useState<any>();
    const [categoryDetails, setCategoryDetails] = useState<Category[]>();
    const { GetVideoById, DeleteVideo, isLoading } = useVideos();
    const [isLoadingFunction, setIsLoadingFunction] = useState(false);
    const { GetCategoryById } = useCategory();
    const { role } = useUserStore();
    const { id } = useParams();

    useEffect(() => {
        consult();
    }, []);

    const consult = async () => {
        const video = await GetVideoById(Number(id));
        const category = await GetCategoryById(video.video.category);

        const accumulatedCategoryDetails: any = [];

        category?.forEach((results) => {
            results.data?.forEach((value) => {
                accumulatedCategoryDetails.push(value); // Agregar los valores al array acumulado
            });
        });



        setVideoDetails(video.video);

        if (video.video?.is_deleted) {
            return navigate('/home')
        }

        setAuthorDetails(video.author);
        setViewNumber(video.views_count);
        setCategoryDetails(accumulatedCategoryDetails);

        console.log(video.video)

        categoryDetails?.map((results) => {
            console.log(results.description)
        })

    }

    const deleteVideo = async (idVideo: number) => {
        setIsLoadingFunction(true);

        const result = await Swal.fire({
            title: '¿Estás seguro?',
            text: '¡Este video se eliminará permanentemente!',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Sí, borrar',
            cancelButtonText: 'Cancelar'
        });

        if (result.isConfirmed) {
            try {
                const response = await DeleteVideo(idVideo);

                if (response) {
                    Swal.fire(
                        'Borrado!',
                        'El video ha sido eliminado.',
                        'success'
                    );

                }
            } catch (err) {
                Swal.fire(
                    'Error',
                    'Hubo un problema al eliminar el video.',
                    'error'
                );
            } finally {
                setIsLoadingFunction(false);
                navigate('/home');
            }
        } else {
            setIsLoadingFunction(false);
        }
    };

    const editVideo = async (idVideo: number) => {
        navigate(`/edit-video/${idVideo}`)
    }

    if (isLoading) {
        return <LoadingComplete
        />
    }

    const URL_MEDIA = 'http://www.localhost:8000';

    return (

        <>

            <div className="min-h-screen bg-gradient-to-b from-blue-100 to-blue-200 text-blue-900">
                <HeaderComponent />

                {
                    videoDetails?.type_video === 'VBL' && (
                        <div className="container mx-auto px-4 py-8 mt-16">
                            <h1 className="text-4xl font-bold text-center mb-8">{videoDetails?.title || "Video Title"}</h1>

                            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                                {/* Video Section */}
                                <div className="lg:col-span-2 space-y-4">
                                    <div className="aspect-video rounded-lg overflow-hidden shadow-xl">
                                        {videoDetails?.video ? (
                                            <video
                                                src={`${URL_MEDIA}${videoDetails.video}`}
                                                controls
                                                className="w-full h-full object-cover"
                                            >
                                                Tu navegador no soporta el elemento de video.
                                            </video>
                                        ) : (
                                            <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                                                <p>Video not available</p>
                                            </div>
                                        )}
                                    </div>
                                    <div className="flex flex-wrap gap-2">
                                        {categoryDetails?.map((category) => (
                                            <Badge key={category.id}>
                                                {category.name}
                                            </Badge>
                                        )) || <p>No categories available</p>}
                                    </div>
                                    <Card>
                                        <div className="flex items-center space-x-4">
                                            <Avatar
                                                img={`${URL_MEDIA}${authorDetails?.avatars}`}
                                                rounded
                                                size="lg"
                                            >
                                                <div className="space-y-1 font-medium dark:text-white">
                                                    <div>{authorDetails?.name || "Unknown Uploader"}</div>
                                                    <div className="text-sm text-gray-500 dark:text-gray-400">
                                                        <EyeIcon className="w-4 h-4 inline mr-1" />
                                                        {viewNumber || 0} views
                                                    </div>
                                                </div>
                                            </Avatar>
                                        </div>

                                        {
                                            role.includes('admin') && (
                                                <div className="mt-4 flex justify-end space-x-4">
                                                    <button className="bg-happyblue-500 text-white p-2 rounded-lg hover:bg-happyblue-600 hidden"
                                                        onClick={() => editVideo(videoDetails.id)}>
                                                        <EditIcon className="w-5 h-5 inline mr-2" />
                                                        Editar
                                                    </button>
                                                    <button className="bg-red-500 text-white p-2 rounded-lg hover:bg-red-600"
                                                        onClick={() => deleteVideo(videoDetails.id)}>
                                                        <TrashIcon className="w-5 h-5 inline mr-2" />
                                                        Eliminar
                                                    </button>
                                                </div>
                                            )
                                        }
                                    </Card>
                                </div>

                                {/* Banner and Description Section */}
                                <div className="space-y-4">
                                    <Card className="overflow-hidden shadow-lg">
                                        {videoDetails?.banner ? (
                                            <img
                                                src={`${URL_MEDIA}${videoDetails.banner}`}
                                                alt="Banner del video"
                                                className="w-full h-48 object-cover"
                                            />
                                        ) : (
                                            <div className="w-full h-48 bg-gray-200 flex items-center justify-center">
                                                <p>Banner not available</p>
                                            </div>
                                        )}
                                        <div className="p-4">
                                            <h2 className="text-2xl font-semibold mb-2">Descripción</h2>
                                            <p className="text-blue-700">
                                                {videoDetails?.description || "No description available"}
                                            </p>
                                        </div>
                                    </Card>
                                </div>
                            </div>
                        </div>
                    )
                    ||
                    videoDetails?.type_video === 'VT' && (
                        <div className="container mx-auto px-4 py-8 mt-16">
                            <div className="container mx-auto px-4 max-w-4xl">
                                <h1 className="text-4xl font-bold text-center mb-8">{videoDetails?.title || "Video Title"}</h1>

                                <div className="space-y-6">
                                    {/* Video Section */}
                                    <div className="aspect-video rounded-lg overflow-hidden shadow-xl">
                                        {videoDetails?.video ? (
                                            <video
                                                src={`${URL_MEDIA}${videoDetails.video}`}
                                                controls
                                                className="w-full h-full object-cover"
                                            >
                                                Tu navegador no soporta el elemento de video.
                                            </video>
                                        ) : (
                                            <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                                                <p>Video not available</p>
                                            </div>
                                        )}
                                    </div>

                                    {/* Badges */}
                                    <div className="flex flex-wrap justify-center gap-2">
                                        {categoryDetails?.map((category) => (
                                            <Badge key={category.id} color="info">
                                                {category.name}
                                            </Badge>
                                        )) || <p>No categories available</p>}
                                    </div>

                                    {/* Uploader Info */}
                                    <Card className="w-full">
                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center space-x-4">
                                                <Avatar
                                                    img={`${URL_MEDIA}${authorDetails?.avatars}`}
                                                    rounded
                                                    size="lg"
                                                />
                                                <div className="space-y-1 font-medium dark:text-white">
                                                    <div className="text-xl">{authorDetails?.name || "Unknown Uploader"}</div>
                                                    <div className="text-sm text-gray-500 dark:text-gray-400">
                                                        <EyeIcon className="w-4 h-4 inline mr-1" />
                                                        {viewNumber || 0} views
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        {
                                            role.includes('admin') && (
                                                <div className="mt-4 flex justify-end space-x-4">
                                                    <button className="bg-happyblue-500 text-white p-2 rounded-lg hover:bg-happyblue-600 hidden"
                                                        onClick={() => editVideo(videoDetails.id)}>
                                                        <EditIcon className="w-5 h-5 inline mr-2" />
                                                        Editar
                                                    </button>
                                                    <button className="bg-red-500 text-white p-2 rounded-lg hover:bg-red-600"
                                                        onClick={() => deleteVideo(videoDetails.id)}>
                                                        <TrashIcon className="w-5 h-5 inline mr-2" />
                                                        Eliminar
                                                    </button>
                                                </div>
                                            )
                                        }
                                    </Card>
                                </div>
                            </div>
                        </div>
                    )
                    ||
                    videoDetails?.type_video === 'BT' && (
                        <div className="container mx-auto px-4 py-8 mt-16">
                            <div className="container mx-auto px-4 max-w-4xl">
                                <div className="space-y-6">
                                    {/* Banner Section */}
                                    <div className="w-full h-64 rounded-lg overflow-hidden shadow-xl">
                                        {videoDetails?.banner ? (
                                            <img
                                                src={`${URL_MEDIA}${videoDetails.banner}`}
                                                alt="Video banner"
                                                className="w-full h-full object-cover"
                                            />
                                        ) : (
                                            <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                                                <p>Banner not available</p>
                                            </div>
                                        )}
                                    </div>

                                    {/* Description */}
                                    <Card>
                                        <h2 className="text-2xl font-bold mb-2">{videoDetails?.title || "Video Title"}</h2>
                                        <p className="text-gray-700 dark:text-gray-400">
                                            {videoDetails?.description || "No description available"}
                                        </p>
                                    </Card>

                                    {/* Badges */}
                                    <div className="flex flex-wrap gap-2">
                                        {categoryDetails?.map((category) => (
                                            <Badge key={category.id} color="info">
                                                {category.name}
                                            </Badge>
                                        )) || <p>No categories available</p>}
                                    </div>

                                    {/* Uploader Info */}
                                    <Card className="w-full">
                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center space-x-4">
                                                <Avatar
                                                    img={`${URL_MEDIA}${authorDetails?.avatars}`}
                                                    rounded
                                                    size="lg"
                                                />
                                                <div className="space-y-1 font-medium dark:text-white">
                                                    <div className="text-xl">{authorDetails?.name || "Unknown Uploader"}</div>
                                                    <div className="text-sm text-gray-500 dark:text-gray-400">
                                                        <EyeIcon className="w-4 h-4 inline mr-1" />
                                                        {viewNumber || 0} views
                                                    </div>
                                                </div>
                                            </div>
                                            {
                                                role.includes('admin') && (
                                                    <div className="mt-4 flex justify-end space-x-4">
                                                        <button className="bg-happyblue-500 text-white p-2 rounded-lg hover:bg-happyblue-600 hidden"
                                                            onClick={() => editVideo(videoDetails.id)}>
                                                            <EditIcon className="w-5 h-5 inline mr-2" />
                                                            Editar
                                                        </button>
                                                        <button className="bg-red-500 text-white p-2 rounded-lg hover:bg-red-600"
                                                            onClick={() => deleteVideo(videoDetails.id)}>
                                                            <TrashIcon className="w-5 h-5 inline mr-2" />
                                                            Eliminar
                                                        </button>
                                                    </div>
                                                )
                                            }
                                        </div>
                                    </Card>
                                </div>
                            </div>
                        </div>
                    )
                }
            </div>

            {isLoadingFunction ?? (
                <LoadingComponent lottie={animationData} />
            )}
        </>
    )
}   