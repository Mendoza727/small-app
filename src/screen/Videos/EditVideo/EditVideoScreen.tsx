import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { HeaderComponent } from '@/components/Header/HeaderComponent';
import { useCategory } from '@/hooks/CategoryHooks/useCategory';
import { useVideos } from '@/hooks/VideoHooks/useVideos';
import { Videos } from '@/Infrastructure/Interfaces/VideoInterfaces';
import { Category } from '@/Infrastructure/Interfaces/CategoryInterfaces';
import axios from 'axios';
import { useDropzone } from 'react-dropzone';
import { URL_MEDIA } from '@/App';

const EditVideoScreen = () => {
    const navigate = useNavigate();
    const [videoDetails, setVideoDetails] = useState<Videos | null>(null);
    const [categoryDetails, setCategoryDetails] = useState<Category[]>([]);
    const { GetVideoById, isLoading } = useVideos();
    const { GetCategoryById } = useCategory();
    const { id } = useParams();

    useEffect(() => {
        consult();
    }, []);

    const consult = async () => {
        const video = await GetVideoById(Number(id));
        if (!video) return;

        console.log(categoryDetails)
        const category = await GetCategoryById(video.video.category);
        const accumulatedCategoryDetails: Category[] = [];

        category?.forEach((results) => {
            results.data?.forEach((value) => {
                accumulatedCategoryDetails.push(value);
            });
        });

        setVideoDetails(video.video);

        if (video.video?.is_deleted) {
            return navigate('/home');
        }

        setCategoryDetails(accumulatedCategoryDetails);
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setVideoDetails((prevState) => ({
            ...prevState!,
            [name]: value,
        }));
    };

    const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedOptions = Array.from(e.target.selectedOptions, (option) => option.value);
        setVideoDetails((prevState) => ({
            ...prevState!,
            category: selectedOptions,
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!videoDetails) return;

        const { title, description, video, banner, type_video, is_active, category } = videoDetails;

        const formData = {
            title,
            description,
            video,
            banner,
            type_video,
            is_active,
            category,
        };

        try {
            await axios.put(`/api/videos/${id}/`, formData, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                },
            });
            navigate('/home');
        } catch (error) {
            console.error(error);
        }
    };

    const { getRootProps, getInputProps } = useDropzone({
        accept: {
            'image/*': [],
            'video/*': []
        },
        onDrop: (acceptedFiles) => {
            if (acceptedFiles.length > 0) {
                const file = acceptedFiles[0];
                const isVideo = file.type.startsWith('video');
                if (isVideo) {
                    setVideoDetails((prevState) => ({
                        ...prevState!,
                        video: URL.createObjectURL(file),
                    }));
                } else {
                    setVideoDetails((prevState) => ({
                        ...prevState!,
                        banner: URL.createObjectURL(file),
                    }));
                }
            }
        },
    });

    if (isLoading) {
        return <div>Loading...</div>;
    }

    return (
        <div className="min-h-screen bg-happyblue-50 text-happyblue-50 flex flex-col items-center justify-center py-6 p-5">
            <div className="w-full max-w-4xl">
                <HeaderComponent />
                <h1 className="text-3xl text-black font-bold mb-6 mt-16">Editar Video</h1>
                <div className="flex flex-col md:flex-row gap-8">
                    <div className="w-full md:w-1/2">
                        <div {...getRootProps()} className="dropzone w-full p-4 bg-gray-200 text-gray-700 border-2 border-dashed rounded-lg">
                            <input {...getInputProps()} />
                            <p className="text-center">Drag and drop a file here, or click to select a file</p>
                        </div>
                        {videoDetails?.video && <video src={`${URL_MEDIA}${videoDetails?.video}`} controls className="mt-4 w-full h-auto" />}
                        {videoDetails?.banner && <img src={`${URL_MEDIA}${videoDetails?.banner}`} alt="Banner" className="mt-4 w-full h-auto" />}
                    </div>
                    <form onSubmit={handleSubmit} className="w-full md:w-1/2 space-y-4">
                        <div>
                            <label htmlFor="title" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Title</label>
                            <input
                                type="text"
                                id="title"
                                name="title"
                                value={videoDetails?.title || ''}
                                onChange={handleInputChange}
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                required
                            />
                        </div>
                        <div>
                            <label htmlFor="description" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Description</label>
                            <textarea
                                id="description"
                                name="description"
                                value={videoDetails?.description || ''}
                                onChange={handleInputChange}
                                rows={4}
                                className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            ></textarea>
                        </div>
                        <div>
                            <label htmlFor="type_video" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Tipo de video</label>
                            <select id="type_video" name="type_video" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" value={videoDetails?.type_video}>
                                <option value="">Seleccione una opción</option>
                                <option value="VT">Video con título</option>
                                <option value="VBL">Video con banner lateral</option>
                                <option value="BT">Banner lateral</option>
                            </select>
                        </div>
                        <div>
                            <label htmlFor="category" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Categorías</label>
                            <select
                                id="category"
                                name="category"
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                                multiple
                                value={videoDetails?.category}
                                onChange={handleCategoryChange}
                            >
                                <option value="" disabled>
                                    Seleccione
                                </option>
                                {/* {getAllCategoryDetail?.data.map((value: Category) => (
                                    <option key={value.id} value={value.id}>
                                        {value.name}
                                    </option>
                                ))} */}
                            </select>
                        </div>
                        <div>
                            <label htmlFor="videoDate" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                Fecha del Video
                            </label>
                            {/* <input
                                type="date"
                                id="videoDate"
                                name="videoDate"
                                value={videoDetails?.date_show as any}
                                onChange={handleDateChange}
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                            /> */}
                        </div>
                        <div className="flex justify-between">
                            <button
                                type="submit"
                                className="bg-blue-500 text-white py-2 px-4 rounded-lg disabled:opacity-50"
                                disabled={isLoading}
                            >
                                Save Changes
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default EditVideoScreen;
