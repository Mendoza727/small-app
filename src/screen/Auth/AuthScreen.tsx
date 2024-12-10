import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button, Label, TextInput, Checkbox, Avatar } from "flowbite-react";
import { Mail, User } from "lucide-react";
import imageLogin from "@/assets/authImage.webp";
import { Register } from "@/Infrastructure/Interfaces/AuthInterfaces";
import { LoadingComponent } from "@/components/Loading/LoadingComponent";
import animationLogin from "@/lotties/lottie-loading.json";
import { useLogin } from "@/hooks/AuthHooks/useAuth";
import Swal from "sweetalert2";
import { avatarGenerator } from "@/config/helpers/AvatarGenerator.utils";

export const AuthScreen = () => {
  const { isLoading, login, RegisterUser } = useLogin();

  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [avatarUrl, setAvatarUrl] = useState("");
  const [avatarFile, setAvatarFile] = useState<File>();
  const [userForm, setUserForm] = useState<Register>({
    name: "",
    last_name: "",
    email: "",
    avatars: "",
  });

  const toggleForm = () => setIsLogin(!isLogin);
  
  useEffect(() => {
    if (userForm?.name !== "" && userForm?.last_name !== "") {
      
      avatarGenerator({
        name: userForm.name,
        lastName: userForm.last_name
      }).then((results) => {
        setAvatarUrl(results.fileUrl);
        setAvatarFile(results.file);
      });
      
    }
  }, [userForm?.name, userForm?.last_name]);

  const handleFormSubmit = async() => {
    if (isLogin) {
      const authLogin = login(email);

      authLogin
        .then((response) => {
          if (response.access !== "") {
            Swal.fire({
              icon: 'success',
              title: '¡Éxito!',
              toast: true,
              position: 'top-end',
              showConfirmButton: false,
              timer: 3000,
              timerProgressBar: true,
              background: '#4CAF50',
              color: '#ffffff',
              iconColor: '#ffffff',
              customClass: {
                popup: 'rounded-lg shadow-lg',
                title: 'text-xl font-bold',
              },
              didClose: () => {
                window.location.href = '/';
              },
            });
          }
        })
        .catch((error) => {
          Swal.fire({
            icon: 'error',
            title: '¡Algo salió mal!',
            text: "Hubo un problema al procesar tu solicitud. Por favor, inténtalo de nuevo."+error,
            confirmButtonColor: '#D32F2F',
            confirmButtonText: 'Cerrar',
            customClass: {
              popup: 'rounded-lg shadow-lg',
              title: 'text-xl font-bold text-red-700',
            },
          });
        });
    } else {
      const { name, last_name, email, avatars } = userForm;

      if (!name || !last_name || !email || !avatars ) {
        Swal.fire({
          icon: 'error',
          title: '¡Campos incompletos!',
          text: 'Por favor, asegúrate de llenar todos los campos.',
          confirmButtonColor: '#D32F2F',
          confirmButtonText: 'Cerrar',
          customClass: {
            popup: 'rounded-lg shadow-lg',
            title: 'text-xl font-bold text-red-700',
          },
        });
        return;
      } 
      
      await RegisterUser({
        name,
        last_name,
        email,
        avatars: avatarFile
      })
      .then(() => {
          Swal.fire({
            icon: 'success',
            title: '¡Registro Exitoso!',
            text: 'Tu cuenta ha sido creada correctamente.',
            confirmButtonText: 'Ir al inicio',
            confirmButtonColor: '#4CAF50',
            customClass: {
              popup: 'rounded-lg shadow-lg',
              title: 'text-xl font-bold',
            },
            didClose: () => {
              window.location.href = '/Verify';
            },
          });
      })
      .catch((error) => {
        Swal.fire({
          icon: 'error',
          title: '¡Error en el registro!',
          text: 'Hubo un problema al registrar tu cuenta. ' + error,
          confirmButtonColor: '#D32F2F',
          confirmButtonText: 'Cerrar',
          customClass: {
            popup: 'rounded-lg shadow-lg',
            title: 'text-xl font-bold text-red-700',
          },
        });
      });
    }
  };

  return (
    <div className="flex h-screen bg-happyblue-100">
      <div className="hidden lg:flex lg:w-1/2">
        <img
          src={imageLogin}
          alt="Video platform illustration"
          width={1920}
          height={1080}
          className="object-cover w-full h-full"
        />
      </div>
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8">
        <div className="w-full max-w-md">
          <AnimatePresence mode="wait">
            <motion.div
              key={isLogin ? "login" : "register"}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <h1 className="text-3xl text-center font-bold mb-6 text-happyblue-950">
                {isLogin ? "Iniciar Sesión" : "Crear Cuenta"}
              </h1>
              <form className="space-y-4">
                {!isLogin && (
                  <>
                    <div className="flex justify-center mb-4">
                      <Avatar
                        img={
                          avatarUrl ||
                          "https://www.gravatar.com/avatar/?d=mp&s=200"
                        }
                        size="xl"
                        rounded
                      />
                    </div>
                    <div>
                      <Label htmlFor="name">Nombre</Label>
                      <TextInput
                        id="name"
                        type="text"
                        icon={User}
                        placeholder="Tu nombre"
                        required
                        value={userForm?.name}
                        onChange={(e) =>
                          setUserForm({ ...userForm, name: e.target.value })
                        }
                      />
                    </div>
                    <div>
                      <Label htmlFor="lastname">Apellido</Label>
                      <TextInput
                        id="lastname"
                        type="text"
                        icon={User}
                        placeholder="Tu apellido"
                        required
                        value={userForm?.last_name}
                        onChange={(e) =>
                          setUserForm({
                            ...userForm,
                            last_name: e.target.value,
                          })
                        }
                      />
                    </div>
                  </>
                )}

                <div>
                  <Label htmlFor="email">Email</Label>
                  <TextInput
                    id="email"
                    type="email"
                    icon={Mail}
                    placeholder="nombre@ejemplo.com"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>

                {isLogin && (
                  <div className="flex items-center gap-2">
                    <Checkbox id="remember" />
                    <Label htmlFor="remember">Recordarme</Label>
                  </div>
                )}

                {!isLogin && (
                  <div className="flex items-center gap-2">
                    <Checkbox id="agree" />
                    <Label htmlFor="agree">
                      Acepto los{" "}
                      <a href="#" className="text-blue-600 hover:underline">
                        Términos y Condiciones
                      </a>
                    </Label>
                  </div>
                )}

                <Button
                  type="button"
                  onClick={handleFormSubmit}
                  className="w-full bg-happyblue-500 text-white rounded-full py-1 px-6 text-lg font-semibold shadow-lg hover:bg-happyblue-600 focus:outline-none focus:ring-4 focus:ring-happyblue-300"
                >
                  {isLogin ? "Iniciar Sesión" : "Registrarse"}
                </Button>
              </form>
              <div className="mt-4 text-center">
                <p className="text-happyblue-700">
                  {isLogin
                    ? "¿No tienes una cuenta?"
                    : "¿Ya tienes una cuenta?"}
                </p>
                <a
                  onClick={toggleForm}
                  className="mt-1 inline-block text-happyblue-600 hover:text-happyblue-800 focus:outline-none cursor-pointer"
                >
                  {isLogin ? "Regístrate" : "Inicia sesión"}
                </a>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
      {isLoading && (
        <LoadingComponent lottie={animationLogin} width={300} height={300} />
      )}
    </div>
  );
};
