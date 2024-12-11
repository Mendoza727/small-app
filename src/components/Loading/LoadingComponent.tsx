import Lottie from "react-lottie";
import { BarLoader } from 'react-spinners'
import logoApp from '@/assets/android-chrome-192x192.png';
interface Props {
  lottie: any;
  height?: number;
  width?: number;
}

export const LoadingComponent = ({
  lottie,
  height = 400,
  width = 400,
}: Props) => {
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: lottie,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-8 rounded-lg shadow-lg">
        <Lottie options={defaultOptions} height={height} width={width} />
      </div>
    </div>
  );
};


export const LoadingComplete = () => {
  return (
    <div className="flex flex-col justify-center items-center h-screen bg-happyblue-100">
      <img 
        src={logoApp}
        className="mb-4"
      />
      <div className="flex justify-center items-center space-x-2">
        <BarLoader color="black" width={90} height={10} />
      </div>
    </div>
  );
};