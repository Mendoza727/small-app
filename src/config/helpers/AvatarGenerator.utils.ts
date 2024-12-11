interface Props {
    name: string;
    lastName: string;
}

export const avatarGenerator = async({ name, lastName }: Props) => {
    const avatar = `https://ui-avatars.com/api/?name=${name}+${lastName}`;

    const response = await fetch(avatar);
    const blob = await response.blob();

    // creamos el archivo 
    const file = new File([blob], `avatar_${name}-${lastName}.png`, {
        type: "image/png",
    });

    const fileUrl = URL.createObjectURL(file);
    
    return {
        file,
        fileUrl
    };
}

export async function fileUrlToFile(fileUrl: any) {
    // Hacer el fetch al fileUrl
    const response = await fetch(fileUrl);
    const blob = await response.blob();

    // Crear el archivo a partir del blob
    const file = new File([blob], "downloaded_avatar.png", {
        type: blob.type,
    });

    return file;
}