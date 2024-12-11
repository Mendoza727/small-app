export const GetDurationVideo = (videoUrl: any) => {
    return new Promise<number>((resolve, reject) => {
        const videoElement = document.createElement("video");
        
        videoElement.onloadedmetadata = () => {
            resolve(videoElement.duration);
        }

        videoElement.onerror = () => {
            reject(new Error("No se pudo cargar el video"));
        }

        videoElement.src = videoUrl;
    })
}