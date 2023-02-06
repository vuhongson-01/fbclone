import React from "react";
import { View, Image, Button, Text } from "react-native";
import { launchImageLibrary } from "react-native-image-picker";
import { uploadImageToFirebase } from "../utils/upload_image";
import { FIREBASE_CONFIG } from "../constants/constants";

export const UploadImage = () => {
    const [photo, setPhoto] = React.useState([]);
    const [photoURI, setPhotoURI] = React.useState([]);

    const handleChoosePhoto = async () => {
        let options = {
            mediaType: 'mixed',
            videoQuality: 'high',
            durationLimit: 10,
            selectionLimit: 4,
            presentationStyle: 'pageSheet'
        };
        let response = (await launchImageLibrary(options)).assets;
        setPhoto(response);
    };

    const handleUploadPhoto = async () => {
        const assets = [];
        photo.forEach(e => {
            assets.push(e.assets);
        });
        const images = await uploadImageToFirebase(photo, FIREBASE_CONFIG.IMAGES_STORAGE+ '/' + 'test');
        setPhotoURI(images);
    };

    return (
        <View>
            {photo && (
                <>
                    <Image style={{ height: 100, width: 100 }} source={{ uri: photoURI[0] }} />
                    <Image style={{ height: 100, width: 100 }} source={{ uri: photoURI[1] }} />
                    <Image style={{ height: 100, width: 100 }} source={{ uri: photoURI[2] }} />
                    <Image style={{ height: 100, width: 100 }} source={{ uri: photoURI[3] }} />
                    <Button title="Upload Photo" onPress={handleUploadPhoto} />
                </>
            )}
            <Button title="Choose Photo" onPress={handleChoosePhoto} />
            <Text> { photoURI } </Text>
        </View>
    );
}