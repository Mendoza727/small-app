import { Button, Tabs } from "flowbite-react";
import { HeaderComponent } from "@/components/Header/HeaderComponent";
import { Play } from "lucide-react";
import { useUserStore } from "@/store/user.store";
import { VideoThumbnailComponent } from "@/components/VideoThumnailComponent/VideoThumbnailComponent";
import { useVideos } from "@/hooks/VideoHooks/useVideos";
import { useEffect, useState } from "react";
import { VideoResponse } from "@/Infrastructure/Interfaces/VideoInterfaces";
interface Video {
  title: string
  views: string
  duration: string
  thumbnail: string
}

const videos: Video[] = [
  { title: "Ocean Depths Explored", views: "1.5M views", duration: "15:30", thumbnail: "https://flowbite.s3.amazonaws.com/docs/gallery/masonry/image.jpg" },
  { title: "Coral Reef Ecosystems", views: "2.2M views", duration: "22:45", thumbnail: "https://flowbite.s3.amazonaws.com/docs/gallery/masonry/image-1.jpg" },
  { title: "Marine Life Behaviors", views: "3.7M views", duration: "18:20", thumbnail: "https://flowbite.s3.amazonaws.com/docs/gallery/masonry/image-2.jpg" },
  { title: "Underwater Photography", views: "980K views", duration: "12:15", thumbnail: "https://flowbite.s3.amazonaws.com/docs/gallery/masonry/image-3.jpg" },
  { title: "Deep Sea Creatures", views: "1.1M views", duration: "20:00", thumbnail: "https://flowbite.s3.amazonaws.com/docs/gallery/masonry/image-4.jpg" },
  { title: "Ocean Conservation", views: "2.8M views", duration: "25:10", thumbnail: "https://flowbite.s3.amazonaws.com/docs/gallery/masonry/image-5.jpg" },
  { title: "Scuba Diving Adventures", views: "1.9M views", duration: "17:40", thumbnail: "https://flowbite.s3.amazonaws.com/docs/gallery/masonry/image-6.jpg" },
  { title: "Underwater Volcanoes", views: "3.2M views", duration: "19:55", thumbnail: "https://flowbite.s3.amazonaws.com/docs/gallery/masonry/image-7.jpg" },
  { title: "Marine Biology Insights", views: "2.5M views", duration: "21:30", thumbnail: "https://flowbite.s3.amazonaws.com/docs/gallery/masonry/image-8.jpg" },
  { title: "Ocean Plastic Pollution", views: "1.8M views", duration: "16:45", thumbnail: "https://flowbite.s3.amazonaws.com/docs/gallery/masonry/image-9.jpg" },
  { title: "Underwater Cave Exploration", views: "2.1M views", duration: "23:15", thumbnail: "https://flowbite.s3.amazonaws.com/docs/gallery/masonry/image-10.jpg" },
  { title: "Bioluminescent Sea Life", views: "1.6M views", duration: "14:50", thumbnail: "https://flowbite.s3.amazonaws.com/docs/gallery/masonry/image-11.jpg" },
]


export const HomeScreen = () => {
  const { access } = useUserStore();
  const { isLoading, GetAllVideos, getAllVideosDetail } = useVideos();

  useEffect(() => {
    GetAllVideos();
  }, []);

  if (isLoading) {
    return <p>cargando...</p>
  }

  return (
    <div className="min-h-screen bg-happyblue-50 text-happyblue-50">
      {/* header component */}
      <HeaderComponent />

      {/* main content */}
      <main className="pt-20">
        <div className="container mx-auto px-4 py-8">
          {/* Featured Video */}
          <section className="mb-12">
            <div className="relative aspect-video rounded-xl overflow-hidden group">
              <img
                src="https://placehold.co/600x400"
                alt="Featured Video"
                width={1280}
                height={720}
                className="object-cover w-full h-full transform group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-happyblue-950 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="absolute bottom-8 left-8 right-8">
                  <h3 className="text-3xl font-bold mb-2 text-happyblue-50">
                    Ocean Wonders: Deep Sea Exploration
                  </h3>
                  <p className="text-xl text-happyblue-200 mb-4">
                    Dive into the mysteries of the deep blue sea
                  </p>
                  <Button className="bg-happyblue-500 hover:bg-happyblue-600 text-happyblue-50">
                    <Play className="mr-2 h-4 w-4" /> Watch Now
                  </Button>
                </div>
              </div>
            </div>
          </section>

          <section>
            <Tabs.Item
              aria-label="Tabs for videos"
              title="trending"
              className="mb-8"
            >
              <Tabs.Item active={true} title="Trending">
                <div className="columns-2 md:columns-3 lg:columns-4 gap-2 space-y-2">
                  {videos.map((video, index) => (
                    <VideoThumbnailComponent
                      key={index}
                      video={video}
                    />
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
