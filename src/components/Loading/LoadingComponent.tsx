import Lottie from "react-lottie";

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
