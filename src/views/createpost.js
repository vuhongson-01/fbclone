import React, { useState, useEffect } from 'react';
import { SafeAreaView, ScrollView, StatusBar, StyleSheet, Text, TextInput, TouchableOpacity, Image } from 'react-native';
import { Avatar, Incubator, View, Button, Dialog, PanningProvider, ModalProps } from 'react-native-ui-lib';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import Picture from '../../assets/icon/image';
import Demo from '../../assets/icon/icon-demo';
import { uploadImageToFirebase } from '../utils/upload_image';
import { COLOR, FIREBASE_CONFIG } from '../constants/constants';
import PostService from '../helper/services/PostService';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faImage } from "@fortawesome/free-regular-svg-icons";
import ListImageComponent from '../components/ListImageComponent';
import Video from 'react-native-video';
import Notification from '../utils/Notification';


const { TextField } = Incubator;
const CreatePost = () => {
    const [isVideo, setVideo] = useState(false);
    const [asset, setAsset] = useState([]);
    const [content, setContent] = useState('');
    const [dialogVisible, setVisible] = useState(false);
    // image uris after saving to firebase
    const [imageURI, setImageURI] = useState([]);

    const modalProps = { supportedOrientations: ['portrait', 'landscape'] };
    const headerProps = { title: 'Lựa chọn phương thức' };

    const [widenInput, setWiden] = useState(false);

    const removeImageOrVideo = (item) => {
        setAsset(current => current.filter(value => {
            return value.uri !== item.uri;
        }));
    };

    const runCamera = () => {
        let options = {
            mediaType: 'mixed',
            videoQuality: 'high',
            durationLimit: 10,
            selectionLimit: 1,
            presentationStyle: 'pageSheet'
        };
        launchCamera(options, (response) => {
            if (response.didCancel) {
                console.log('User cancelled image picker');
            } else if (response.error) {
                console.log('ImagePicker Error: ', response.error);
            } else if (response.customButton) {
                console.log('User tapped custom button: ', response.customButton);
                alert(response.customButton);
            } else {
                if (response) {
                    let list = response.assets;
                    for (value of list) {
                        if (value.type.includes('video')) {
                            if (!isVideo && asset.length === 0) {
                                setAsset([...asset, value]);
                                setVideo(true);
                                break;
                            } else {
                                // Thong bao chi duoc 1 video hoac 4 anh
                                Notification.showWarningMessage('Chỉ được đăng 1 video hoặc tối đa 4 ảnh');
                            }
                        } else 
                        if (value.type.includes('image')) {
                            if (!isVideo && asset.length < 4) {
                                setAsset([...asset, value]);
                            } else {
                                Notification.showWarningMessage('Chỉ được đăng 1 video hoặc tối đa 4 ảnh');
                            }
                        }
                    }
                }
            }
        });
        setVisible(false);
        
    };

    const runImageLibrary = () => {
        let options = {
            mediaType: 'mixed',
            videoQuality: 'high',
            durationLimit: 10,
            selectionLimit: 1,
            presentationStyle: 'pageSheet'
        };
        launchImageLibrary(options, (response) => {
            if (response.didCancel) {
                console.log('User cancelled image picker');
            } else if (response.error) {
                console.log('ImagePicker Error: ', response.error);
            } else if (response.customButton) {
                console.log('User tapped custom button: ', response.customButton);
                alert(response.customButton);
            } else {
                if (response) {
                    let list = response.assets;
                    for (value of list) {
                        console.log("value", value);
                        if (value.type.includes('video')) {
                            if (!isVideo && asset.length === 0) {
                                setAsset([...asset, value]);
                                setVideo(true);
                                break;
                            } else {
                                // Thong bao chi duoc 1 video hoac 4 anh
                                Notification.showWarningMessage('Chỉ được đăng 1 video hoặc tối đa 4 ảnh');
                            }
                        } else 
                        if (value.type.includes('image')) {
                            if (!isVideo && asset.length < 4) {
                                setAsset([...asset, value]);
                            } else {
                                Notification.showWarningMessage('Chỉ được đăng 1 video hoặc tối đa 4 ảnh');
                            }
                        }
                    }
                }
            }
        }
        );
        setVisible(false);
    };

    const handleUploadPhoto = async () => {
        console.log("asset before upload to firebase", asset);
        const images = await uploadImageToFirebase(asset, `${FIREBASE_CONFIG.IMAGES_STORAGE}`);
        // setImageURI([...imageURI, ...images]);
        // console.log(imageURI);
        if (!isVideo) {
            const requestBody = {
                described: content,
                images: images,
                videos: null,
            };
            await PostService.create(requestBody)
            .then(res => {
                console.log(res.data.data);
                Notification.showSuccessMessage('Tạo bài viết thành công');
            })
            .catch(err => {
                console.log(err);
                Notification.showErrorMessage('Lỗi khi tạo bài viết');
            });
        } else {
            const requestBody = {
                described: content,
                images: null,
                videos: images,
            };
            await PostService.create(requestBody)
                .then(res => {
                    console.log(res.data.data)
                    Notification.showSuccessMessage('Tạo bài viết thành công');
                })
                .catch(err => {
                    console.log(err);
                    Notification.showErrorMessage('Lỗi khi tạo bài viết');
                });
        }
        // console.log(images);
        // console.log(imageURI);
    };

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView style={styles.scrollView}>
                <View flex row style={styles.infoBar}>
                    <View flex row>
                        <Avatar source={{
                            uri: 'https://lh3.googleusercontent.com/-cw77lUnOvmI/AAAAAAAAAAI/AAAAAAAAAAA/WMNck32dKbc/s181-c/104220521160525129167.jpg',
                        }} size={60}></Avatar>
                        <View marginL-10>
                            <Text style={styles.userName}>Nguyễn Quang Vũ</Text>
                            <Text marginL-10>Chia sẻ cảm xúc của bạn</Text>
                        </View>
                    </View>
                    <TouchableOpacity style={styles.iconWrap} onPress={() => setVisible(true)}>
                        <FontAwesomeIcon size={30} icon={faImage} color={COLOR.icon} />
                    </TouchableOpacity>
                </View>
                <View flex style={styles.input}>
                    <View>
                        <TextInput
                            multiline={true}
                            // numberOfLines={widenInput?4:1}
                            onChangeText={text => setContent(text)}
                            style={styles.text}
                            placeholder='Bạn đang nghĩ gì?'
                            value={content}
                            // onFocus={() => setWiden(true)}
                            // onBlur={() => setWiden(false)}
                        />
                    </View>
                </View>

                {!isVideo && <ListImageComponent listImage={asset} isVideo={false} removeMethod={removeImageOrVideo} />}
                {isVideo && <ListImageComponent video={asset[0]} isVideo={true} removeMethod={removeImageOrVideo}/>}
            </ScrollView>
            <Button margin-10 borderRadius={0} label="Đăng bài" onPress={() => handleUploadPhoto()} />
            <Incubator.Dialog
                visible={dialogVisible}
                onDismiss={() => setVisible(false)}
                panDirection={PanningProvider.Directions.UP}
                center
                modalProps={modalProps}
                headerProps={headerProps}
            >
                {
                    <View style={styles.dialog}>
                        <Button size={Button.sizes.medium}
                            label="Chụp ảnh"
                            borderRadius={0}
                            onPress={runCamera}
                            style={{ width: 100, height: 50, marginLeft: 10 }}
                        />
                        <Button size={Button.sizes.medium}
                            label="Chọn ảnh"
                            borderRadius={0}
                            onPress={runImageLibrary}
                            style={{ width: 100, height: 50 }} />

                    </View>
                }
            </Incubator.Dialog>
        </SafeAreaView>
    );
}

export default CreatePost;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignContent: 'center',
        color: COLOR.background,
    },
    scrollView: {

    },
    infoBar: {
        paddingHorizontal: 10,
        // borderBottomWidth: 1,
        // borderBottomColor: '#b9b9b9',
        paddingVertical: 10,
        alignItems: 'center',
    },
    input: {
        fontSize: 25,
        fontWeight: '500',
        lineHeight: 80,
        paddingBottom: 10
        // borderBottomWidth: 1,
        // borderBottomColor: '#b9b9b9',
    },
    text: {
        paddingHorizontal: 10,
        fontSize: 20,
    },
    button: {
        padding: 10
    },
    userName: {
        fontSize: 20,
        fontWeight: '700'
    },
    dialog: {
        display: 'flex',
        padding: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
    }
});
