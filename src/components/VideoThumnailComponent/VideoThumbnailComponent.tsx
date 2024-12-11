import { useState, useEffect } from 'react';
import { URL_MEDIA } from '@/App';
import { GetDurationVideo } from '@/config/helpers/GetDurationVideo.utils';
import { Videos } from '@/Infrastructure/Interfaces/VideoInterfaces';
import { Button } from 'flowbite-react';
import { motion, AnimatePresence } from 'framer-motion'
import { Play, Volume2 } from 'lucide-react'
import { FormaterDuration } from '../../config/helpers/FormatterDurations.utils';
import { useNavigate } from 'react-router-dom';

interface Props {
  video: Videos;
  isHovered?: boolean;
  onHover?: () => void;
  onLeave?: () => void;
}

export const VideoThumbnailComponent = ({
  video,
  isHovered,
  onHover,
  onLeave,
}: Props) => {
  const [duration, setDuration] = useState<string>("");
  const [aspectRatio, setAspectRatio] = useState<number>(16 / 9); // Default to 16:9 ratio
  const navigation = useNavigate();

  useEffect(() => {
    // Get video duration
    GetDurationVideo(URL_MEDIA + video.video).then((response) => {
      const formattedDuration = FormaterDuration(response);
      setDuration(formattedDuration); 
    });

    // Calculate aspect ratio based on video dimensions (if available)
    const videoElement = document.createElement('video');
    videoElement.src = `${URL_MEDIA}${video.video}`;
    videoElement.onloadedmetadata = () => {
      const ratio = videoElement.videoWidth / videoElement.videoHeight;
      setAspectRatio(ratio);
    };
  }, [video.video]);

  const videoDetails = async (idVideo: number) => {
    navigation(`/video/${idVideo}`);
  }

  // Determine if the video should be large or small based on aspect ratio
  const isWide = aspectRatio > 1;  // Videos with wider aspect ratios

  return (
    <motion.div
      className={`group cursor-pointer break-inside-avoid`}
      onMouseEnter={onHover}
      onMouseLeave={onLeave}
      layout
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.8 }}
      transition={{ duration: 0.3 }}
    >
      <div
        className={`relative rounded-lg overflow-hidden ${isWide ? 'col-span-2' : 'col-span-1'} transition-all duration-300`}
        onClick={() => videoDetails(video.id)}
        style={{
          aspectRatio: `${aspectRatio}`, // Dynamically set the aspect ratio of the video
        }}
      >
        <video
          src={`${URL_MEDIA}${video.video}`}
          width={640}
          height={360}
          className="h-auto max-w-full rounded-lg object-cover transform group-hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute inset-0 bg-happyblue-950 bg-opacity-0 group-hover:bg-opacity-70 transition-opacity duration-300 flex items-center justify-center">
          <AnimatePresence>
            {isHovered && (
              <motion.div
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.5 }}
                transition={{ duration: 0.2 }}
                className="flex flex-col items-center space-y-2"
              >
                <div className="flex space-x-2">
                  <Button
                    size="icon"
                    className="rounded-full bg-happyblue-100 text-happyblue-900 hover:bg-happyblue-200"
                  >
                    <Play className="h-6 w-6" />
                  </Button>
                  <Button
                    size="icon"
                    className="rounded-full bg-happyblue-100 text-happyblue-900 hover:bg-happyblue-200"
                  >
                    <Volume2 className="h-6 w-6" />
                  </Button>
                </div>
                <motion.h3
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  transition={{ duration: 0.2, delay: 0.1 }}
                  className="text-sm font-semibold text-center text-happyblue-50"
                >
                  {video.title}
                </motion.h3>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
        <div className="absolute bottom-2 left-2 bg-happyblue-900 bg-opacity-75 px-2 py-1 rounded text-xs text-happyblue-100">
          {duration}
        </div>
        <div className="absolute top-2 right-2 bg-happyblue-900 bg-opacity-75 px-2 py-1 rounded text-xs text-happyblue-100">
          {video.title}
        </div>
      </div>
    </motion.div>
  );
};
