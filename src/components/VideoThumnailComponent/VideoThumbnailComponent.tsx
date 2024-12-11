import { URL_MEDIA } from '@/App';
import { Videos } from '@/Infrastructure/Interfaces/VideoInterfaces';
import { Button } from 'flowbite-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, Volume2 } from 'lucide-react';

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
  return (
    <motion.div
      className="group cursor-pointer break-inside-avoid"
      onMouseEnter={onHover}
      onMouseLeave={onLeave}
      layout
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.8 }}
      transition={{ duration: 0.3 }}
    >
      <div className="relative rounded-lg overflow-hidden">
        <video
          src={`${URL_MEDIA}${video.video}`}
          width={640}
          height={360}
          className="h-auto max-w-full rounded-lg object-cover group-hover:scale-105 transition-transform duration-300"
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
          {video.title}
        </div>
      </div>
    </motion.div>
  );
};
