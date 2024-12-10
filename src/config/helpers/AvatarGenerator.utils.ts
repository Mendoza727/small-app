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