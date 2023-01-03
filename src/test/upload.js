import React from "react";
import { View, Image, Button, Text } from "react-native";
import { launchImageLibrary } from "react-native-image-picker";
import { uploadImageToFirebase } from "../utils/upload_image";

export const UploadImage = () => {
    const [photo, setPhoto] = React.useState(null);
    const [photoURI, setPhotoURI] = React.useState(null);

    const handleChoosePhoto = () => {
        launchImageLibrary({ noData: true }, (response) => {
            if (response) {
                setPhoto(response);
            }
        });
    };

    const handleUploadPhoto = async () => {
        const images = await uploadImageToFirebase(photo, 'test');
        setPhotoURI(images[0]);
    };

    return (
        <View>
            {photo && (
                <>
                    <Image style={{ height: 100, width: 100 }}
                        source={{ uri: photoURI }}/>
                    <Button title="Upload Photo" onPress={handleUploadPhoto} />
                </>
            )}
            <Button title="Choose Photo" onPress={handleChoosePhoto} />
            <Text> { photoURI } </Text>
        </View>
    );
}