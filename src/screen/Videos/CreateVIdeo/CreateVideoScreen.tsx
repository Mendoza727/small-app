import { HeaderComponent } from '@/components/Header/HeaderComponent'
import { useCategory } from '@/hooks/CategoryHooks/useCategory'
import { useVideos } from '@/hooks/VideoHooks/useVideos'
import { Datum } from '@/Infrastructure/Interfaces/CategoryInterfaces'
import { typeVideo, Video } from '@/Infrastructure/Interfaces/VideoInterfaces'
import { useUserStore } from '@/store/user.store'
import { Button, Label, Textarea, TextInput } from 'flowbite-react'
import { Upload, X } from 'lucide-react'
import { useCallback, useState } from 'react'
import { useDropzone } from 'react-dropzone'
import Swal from "sweetalert2";

export const CreateVideoScreen = () => {
  const { isLoading, getAllCategoryDetail } = useCategory();
  const { CreateVideo } = useVideos();

  const { id } = useUserStore();

  const [file, setFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [bannerFile, setBannerFile] = useState<File | null>(null);
  const [bannerPreviewUrl, setBannerPreviewUrl] = useState<string | null>(null);
  const [videoDate, setVideoDate] = useState<string>('');
  const [videoRegister, setVideoRegister] = useState<Video>({
    title: '',
    description: '',
    type_video: typeVideo.BT,
    category: [],
    banner: null,
    date_show: new Date(),
    id_autor: id,
    video: null,
  });

  const onDropVideo = useCallback((acceptedFiles: File[]) => {
    const videoFile = acceptedFiles[0];
    setFile(videoFile);
    setPreviewUrl(URL.createObjectURL(videoFile));
    setVideoRegister((prev) => ({ ...prev, video: videoFile }));
  }, []);

  const onDropBanner = useCallback((acceptedFiles: File[]) => {
    const banner = acceptedFiles[0];
    setBannerFile(banner);
    setBannerPreviewUrl(URL.createObjectURL(banner));
    setVideoRegister((prev) => ({ ...prev, banner }));
  }, []);

  const { getRootProps: getVideoRootProps, getInputProps: getVideoInputProps, isDragActive: isVideoDragActive } = useDropzone({
    onDrop: onDropVideo,
    accept: { 'video/*': [] },
    multiple: false,
  });

  const { getRootProps: getBannerRootProps, getInputProps: getBannerInputProps, isDragActive: isBannerDragActive } = useDropzone({
    onDrop: onDropBanner,
    accept: { 'image/*': [] },
    multiple: false,
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setVideoRegister((prev) => ({ ...prev, [name]: value }));
  };

  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedCategories = Array.from(e.target.selectedOptions, (option) => parseInt(option.value, 10));
    setVideoRegister((prev) => ({ ...prev, category: selectedCategories }));
  };  

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const { title, description, type_video, category, banner, video, date_show } = videoRegister;
  
    if (!title.trim()) {
      Swal.fire({
        icon: "warning",
        title: "Campo obligatorio",
        text: "El título es obligatorio.",
      });
      return;
    }
  
    if (!description.trim()) {
      Swal.fire({
        icon: "warning",
        title: "Campo obligatorio",
        text: "La descripción es obligatoria.",
      });
      return;
    }
  
    if (!type_video) {
      Swal.fire({
        icon: "warning",
        title: "Campo obligatorio",
        text: "Debe seleccionar un tipo de video.",
      });
      return;
    }
  
    if (!category.length) {
      Swal.fire({
        icon: "warning",
        title: "Campo obligatorio",
        text: "Debe seleccionar al menos una categoría.",
      });
      return;
    }
  
    if (!video) {
      Swal.fire({
        icon: "warning",
        title: "Campo obligatorio",
        text: "Debe subir un archivo de video.",
      });
      return;
    }
  
    if (!banner) {
      Swal.fire({
        icon: "warning",
        title: "Campo obligatorio",
        text: "Debe subir un banner.",
      });
      return;
    }
  
    if (!date_show || isNaN(new Date(date_show).getTime())) {
      Swal.fire({
        icon: "warning",
        title: "Campo obligatorio",
        text: "Debe ingresar una fecha válida.",
      });
      return;
    }
  
    // Crear un objeto FormData
    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("type_video", String(type_video));
    formData.append("category", JSON.stringify(category));  // Asumiendo que 'category' es un arreglo
    formData.append("date_show", date_show.toISOString());
    formData.append("id_autor", id.toString()); 
    
    // Adjuntar los archivos
    formData.append("video", video); // Asumiendo que 'video' es un archivo
    formData.append("banner", banner); // Asumiendo que 'banner' es un archivo
    
    try {
      // Hacer la solicitud POST con FormData
      await CreateVideo(formData).then((response) => {
        if (response) {
          Swal.fire({
            icon: "success",
            title: "Formulario enviado",
            text: "El formulario se ha enviado con éxito.",
          });
        } else {
          Swal.fire({
            icon: "error",
            title: "Error al enviar el formulario",
            text: "Hubo un problema al enviar el formulario.",
          });
        }
      });
    } catch (error) {
      console.log(error);
      Swal.fire({
        icon: "error",
        title: "Error al enviar el formulario",
        text: "Hubo un problema al enviar el formulario.",
      });
    }
  
    console.log("Formulario enviado:", videoRegister);
  };
  

  const removeFile = () => {
    setFile(null);
    setPreviewUrl(null);
    setVideoRegister((prev) => ({ ...prev, video: null }));
  };

  const removeBannerFile = () => {
    setBannerFile(null);
    setBannerPreviewUrl(null);
    setVideoRegister((prev) => ({ ...prev, banner: null }));
  };

  if (isLoading) return <p>Cargando....</p>;

  return (
    <div className="min-h-screen bg-happyblue-50 text-happyblue-50 flex flex-col items-center justify-center py-6 p-5">
      <div className="w-full max-w-4xl">
        <HeaderComponent />
        <div className="text-center mb-6 mt-20">
          <h1 className="text-3xl font-bold text-happyblue-900">Subir Video</h1>
        </div>
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2 lg:gap-12">
          <div className="space-y-6">
            <div {...getVideoRootProps()} className={`border-2 border-dashed rounded-lg p-6 text-center cursor-pointer transition-colors ${isVideoDragActive ? 'border-happyblue-500 bg-happyblue-50' : 'border-gray-300 hover:border-happyblue-500'}`}>
              <input {...getVideoInputProps()} />
              {file ? (
                <div className="relative">
                  <video src={previewUrl!} controls className="w-full h-48 object-cover rounded-lg" />
                  <button onClick={removeFile} className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600 transition-colors">
                    <X size={20} />
                  </button>
                </div>
              ) : (
                <div>
                  <Upload className="mx-auto h-12 w-12 text-happyblue-500 mb-4" />
                  <p className="text-happyblue-700">Arrastra y suelta un archivo de video aquí, o haz clic para seleccionar un archivo</p>
                </div>
              )}
            </div>
            {file && <p className="mt-2 text-sm text-happyblue-600">Archivo seleccionado: {file.name}</p>}
          </div>
          <div className="space-y-6">
            <form onSubmit={handleSubmit} className="space-y-4" encType='multipart/form-data'>
              <div>
                <Label htmlFor="title">Título</Label>
                <TextInput id="title" name="title" type="text" placeholder="Ingresa el título del video" required value={videoRegister.title} onChange={handleInputChange} />
              </div>
              <div>
                <Label htmlFor="description">Descripción</Label>
                <Textarea id="description" name="description" placeholder="Ingresa la descripción del video" required rows={4} value={videoRegister.description} onChange={handleInputChange} />
              </div>
              <div>
                <label htmlFor="type_video" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Tipo de video</label>
                <select id="type_video" name="type_video" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" value={videoRegister.type_video} onChange={handleInputChange}>
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
                  value={videoRegister.category}
                  onChange={handleCategoryChange}
                >
                  <option value="" disabled>
                    Seleccione
                  </option>
                  {getAllCategoryDetail?.data.map((value: Datum) => (
                    <option key={value.id} value={value.id}>
                      {value.name}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <Label htmlFor="videoDateTime">Fecha y hora de lanzamiento</Label>
                <TextInput
                  id="videoDateTime"
                  name="date_show"
                  type="datetime-local"
                  value={videoDate}
                  onChange={(e) => {
                    setVideoDate(e.target.value);
                    setVideoRegister((prev) => ({
                      ...prev,
                      date_show: new Date(e.target.value),
                    }));
                  }}
                  required
                />
              </div>
              <div {...getBannerRootProps()} className={`border-2 border-dashed rounded-lg p-6 text-center cursor-pointer transition-colors ${isBannerDragActive ? 'border-happyblue-500 bg-happyblue-50' : 'border-gray-300 hover:border-happyblue-500'}`}>
                <input {...getBannerInputProps()} />
                {bannerFile ? (
                  <div className="relative">
                    <img src={bannerPreviewUrl!} alt="Banner Preview" className="w-full h-48 object-cover rounded-lg" />
                    <button onClick={removeBannerFile} className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600 transition-colors">
                      <X size={20} />
                    </button>
                  </div>
                ) : (
                  <div>
                    <Upload className="mx-auto h-12 w-12 text-happyblue-500 mb-4" />
                    <p className="text-happyblue-700">Arrastra y suelta una imagen de banner aquí, o haz clic para seleccionar un archivo</p>
                  </div>
                )}
              </div>
              {bannerFile && <p className="mt-2 text-sm text-happyblue-600">Archivo de banner seleccionado: {bannerFile.name}</p>}
              <Button type="submit" color="blue" className="w-full">
                <Upload className="mr-2 h-5 w-5" />
                Subir Video
              </Button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
