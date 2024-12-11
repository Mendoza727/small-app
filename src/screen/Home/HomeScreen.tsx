import { Button, Tabs } from "flowbite-react";
import { HeaderComponent } from "@/components/Header/HeaderComponent";
import { Play } from "lucide-react";
import { VideoThumbnailComponent } from "@/components/VideoThumnailComponent/VideoThumbnailComponent";
import { useVideos } from "@/hooks/VideoHooks/useVideos";
import { useEffect, useState } from "react";
import { LoadingComplete, } from "@/components/Loading/LoadingComponent";
import { URL_MEDIA } from "@/App";
import { Videos } from "@/Infrastructure/Interfaces/VideoInterfaces";

export const HomeScreen = () => {
  const { isLoading, GetAllVideos, } = useVideos();
  const [videoDetails, setVideoDetails] = useState<Videos[]>([]);



  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    try {
      const response: any = await GetAllVideos();

      // Verifica si 'data' existe y es un arreglo
      const videos = Array.isArray(response.data) ? response.data : [];

      if (Array.isArray(videos)) {
        setVideoDetails(videos);
      } else {
        console.log('No hay videos disponibles o no es un arreglo.');
      }

      console.log(videoDetails);

    } catch (error) {
      console.error("Error fetching videos:", error);
    }
  };

  const getRandomVideo = () => {
    if (videoDetails.length > 0) {
      const randomIndex = Math.floor(Math.random() * videoDetails.length);
      return videoDetails[randomIndex];
    }
    return null;
  }

  const random = getRandomVideo();

  if (isLoading) {
    return <LoadingComplete />
  }

  return (
    <div className="min-h-screen bg-happyblue-50 text-happyblue-50">
      <HeaderComponent />

      <main className="pt-20">
        <div className="container mx-auto px-4 py-8">
          <section className="mb-12">
            <h1 className=" text-3xl mb-2 font-bold text-transparent bg-clip-text bg-gradient-to-r from-happyblue-300 to-happyblue-100">
              Videos
            </h1>

            {
              random ? (
                <div className="relative aspect-video rounded-xl overflow-hidden group">
                  <video
                    src={`${URL_MEDIA}${random.video}`}
                    width={920}
                    height={600}
                    className="object-cover w-full h-full transform group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-happyblue-950 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="absolute bottom-8 left-8 right-8">
                      <h3 className="text-3xl font-bold mb-2 text-happyblue-50">
                        {random.title}
                      </h3>
                      <p className="text-xl text-happyblue-200 mb-4">
                        {random.description}
                      </p>
                      <Button className="bg-happyblue-500 hover:bg-happyblue-600 text-happyblue-50">
                        <Play className="mr-2 h-4 w-4" /> Watch Now
                      </Button>
                    </div>
                  </div>
                </div>
              ) : ("")
            }
          </section>

          <section>
            <Tabs.Item
              aria-label="Tabs for videos"
              title="trending"
              className="mb-8"
            >
              <Tabs.Item active={true} title="Trending">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                  {videoDetails.map((video) => (
                    <div key={video.id} className="flex flex-col break-inside-avoid">
                      <VideoThumbnailComponent video={video} />
                    </div>
                  ))}
                </div>
              </Tabs.Item>
            </Tabs.Item>
          </section>
        </div>
      </main>
    </div>
  );
};
