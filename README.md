# Smalltube App

![Smalltube Logo](https://via.placeholder.com/150) <!-- Reemplaza este enlace con la URL de tu logo -->

## Badges

![React](https://img.shields.io/badge/React-%5E18.3.1-blue) 
![Vite](https://img.shields.io/badge/Vite-%5E6.0.1-lightgreen)
![TypeScript](https://img.shields.io/badge/TypeScript-%5E5.6.2-blue)

## Descripción

Smalltube es una aplicación moderna de frontend construida con React, Vite y TypeScript, usando TailwindCSS para la estilización y Flowbite para los componentes UI.

## Dependencias

### Producción

- `autoprefixer`: ^10.4.20
- `axios`: ^1.7.9
- `crypto-js`: ^4.2.0
- `flowbite-react`: ^0.10.2
- `framer-motion`: ^11.13.3
- `lucide-react`: ^0.468.0
- `path`: ^0.12.7
- `postcss`: ^8.4.49
- `prop-types`: ^15.8.1
- `react`: ^18.3.1
- `react-dom`: ^18.3.1
- `react-dropzone`: ^14.3.5
- `react-lottie`: ^1.2.10
- `react-router-dom`: ^7.0.2
- `react-spinners`: ^0.15.0
- `sweetalert2`: ^11.14.5
- `tailwindcss`: ^3.4.16
- `zustand`: ^5.0.2

### Desarrollo

- `@eslint/js`: ^9.15.0
- `@types/crypto-js`: ^4.2.2
- `@types/node`: ^22.10.1
- `@types/react`: ^18.3.12
- `@types/react-dom`: ^18.3.1
- `@types/react-lottie`: ^1.2.10
- `@vitejs/plugin-react`: ^4.3.4
- `eslint`: ^9.15.0
- `eslint-plugin-react-hooks`: ^5.0.0
- `eslint-plugin-react-refresh`: ^0.4.14
- `globals`: ^15.12.0
- `typescript`: ~5.6.2
- `typescript-eslint`: ^8.15.0
- `vite`: ^6.0.1

## Instalación

Para comenzar con la aplicación, primero clona el repositorio y instala las dependencias.

```bash
git clone https://github.com/tu-usuario/smalltube-app.git
cd smalltube-app
npm install
```

## Correr la aplicación
Para correr la aplicación en desarrollo, usa el siguiente comando:

```bash
npm run dev
```
## Esto arrancará el servidor de desarrollo en http://localhost:3000.

## Correr en Docker
Construir la imagen Docker:

```bash
docker build -t smalltube-app .
```
# Correr el contenedor:
```bash
docker run -p 3000:3000 smalltube-app
```

Esto hará que la aplicación esté disponible en http://localhost:3000 dentro de tu contenedor Docker.

```Scripts
dev: Ejecuta el servidor de desarrollo con Vite.
build: Compila el proyecto y construye los archivos estáticos.
lint: Corre ESLint para verificar la calidad del código.
preview: Previsualiza la aplicación construida.
```
## Contribuciones
Las contribuciones son bienvenidas. Si tienes alguna sugerencia o encuentras algún bug, no dudes en abrir un issue o enviar un pull request.

Este proyecto fue creado con ❤️ por Tu Juan Camilo.
