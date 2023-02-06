import React, { useState } from 'react';
import {
    BackHandler,
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Alert,
} from 'react-native';
import { faPowerOff, faSignOut, faKey, faEyeSlash, faEye } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { COLOR } from '../constants/constants';
import { useDispatch, useSelector } from 'react-redux';
import { logoutUser, selectAuth } from '../store/auth/authSlice';
import { Avatar } from 'react-native-ui-lib';
import UserService from '../helper/services/UserService';
import Notification from '../utils/Notification';
import { Dialog, Input } from '@rneui/themed';

const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: COLOR.background,
        fontFamily: 'Roboto',
        padding: 10,
    },
    topContainer: {
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
    },
    exitContainer: {
        width: '90%',
        display: 'flex',
        flexDirection: 'row',
        padding: 10,
        marginLeft: '5%',
    },
    logoutContainer: {
        width: '90%',
        display: 'flex',
        flexDirection: 'row',
        padding: 10,
        borderTopColor: COLOR.mainGray,
        borderTopWidth: 1,
        marginLeft: '5%',
        backgroundColor: COLOR.mainGraySmoke,
    },
    userContainer: {
        display: 'flex',
        width: '90%',
        flexDirection: 'row',
        alignItems: 'center',
        borderBottomColor: COLOR.mainGray,
        borderBottomWidth: 1,
        marginLeft: '5%',
        paddingTop: 5,
        paddingBottom: 5,
    },
    textContainer: {
        display: 'flex',
        flexDirection: 'column',
        marginLeft: 10,
    },
    username: {
        fontFamily: 'Roboto',
        fontSize: 18,
        fontWeight: 'bold',
        color: COLOR.text,
    },
    viewProfile: {
        fontFamily: 'Roboto',
        fontSize: 16,
        fontWeight: 'normal',
        color: COLOR.placeholder,
    },
});

const Settings = ({ navigation }) => {
    const { user } = useSelector(selectAuth);
    const dispatch = useDispatch();
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [newPasswordConfirm, setNewPasswordConfirm] = useState('');
    const [isSame, setIsSame] = useState(true);
    const [isVisible, setIsVisible] = useState(false);
    const [isSending, setIsSending] = useState(false);
    const [isShow1, setIsShow1] = useState(false);
    const [isShow2, setIsShow2] = useState(false);
    const [isShow3, setIsShow3] = useState(false);

    const toggleDialog = () => {
        setIsVisible(!isVisible);
    }

    const logoutAction = () => {
        Alert.alert('Thông báo', 'Bạn có thực sự muốn đăng xuất', [
            {
                text: 'Hủy',
                onPress: () => { },
                style: 'cancel',
            },
            {
                text: 'Có',
                onPress: () => {
                    dispatch(logoutUser());
                    navigation.reset({
                        index: 0,
                        routes: [{ name: 'LogIn' }],
                    });
                },
            },
        ]);
    };

    const changePassword = () => {
        if (newPassword !== newPasswordConfirm) {
            setIsSame(false);
            return;
        }

        setIsSending(true);
        setIsSame(true);
        UserService.changePassword({
            currentPassword: currentPassword,
            newPassword: newPassword,
        })
            .then(res => {
                Notification.showSuccessMessage('Thông báo', 'Đổi mật khẩu thành công.');
                setIsVisible(false);
                dispatch(logoutUser());
                navigation.reset({
                    index: 0,
                    routes: [{ name: 'LogIn' }],
                });
            })
            .catch(error => {
                Notification.showErrorMessage('Thông báo', error?.message);
                console.log(error);
            })
            .finally(() => setIsSending(false))
    };

    return (
        <>
            <View style={styles.container}>
                <View style={styles.topContainer}>
                    <View
                        style={{
                            borderBottomWidth: 2,
                            borderColor: COLOR.placeholder,
                        }}>
                        <View style={{ padding: 10 }}>
                            <Text style={{ fontWeight: 'bold', fontSize: 22, color: COLOR.text }}>
                                Menu
                            </Text>
                        </View>
                    </View>
                    <TouchableOpacity
                        onPress={() =>
                            navigation.navigate('ProfileScreen', { userId: user?._id })
                        }>
                        <View style={styles.userContainer}>
                            <Avatar source={{ uri: user?.avatar }} size={64} />
                            <View style={styles.textContainer}>
                                <Text style={styles.username}>{user?.username}</Text>
                                <Text style={styles.viewProfile}>Xem trang cá nhân của bạn</Text>
                            </View>
                        </View>
                    </TouchableOpacity>
                </View>
                <View style={styles.topContainer}>
                    <View
                        style={{
                            borderBottomWidth: 2,
                            borderColor: COLOR.placeholder,
                        }}>
                        <View style={{ padding: 10 }}>
                            <Text style={{ fontWeight: 'bold', fontSize: 22, color: COLOR.text }}>
                                Thao tác
                            </Text>
                        </View>
                    </View>
                    <TouchableOpacity
                        style={styles.exitContainer}
                        onPress={() => BackHandler.exitApp()}>
                        <FontAwesomeIcon icon={faPowerOff} size={24} />
                        <Text
                            style={{
                                fontSize: 18,
                                fontWeight: '500',
                                color: COLOR.text,
                                marginLeft: 10,
                            }}>
                            Thoát ứng dụng
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.exitContainer} onPress={toggleDialog}>
                        <FontAwesomeIcon icon={faKey} size={24} />
                        <Text
                            style={{
                                fontSize: 18,
                                fontWeight: '500',
                                color: COLOR.text,
                                marginLeft: 10,
                            }}>
                            Đổi mật khẩu
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.logoutContainer} onPress={logoutAction}>
                        <FontAwesomeIcon icon={faSignOut} size={24} />
                        <Text
                            style={{
                                fontSize: 18,
                                fontWeight: '500',
                                color: COLOR.text,
                                marginLeft: 10,
                            }}>
                            Đăng xuất
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
            <Dialog
                isVisible={isVisible}
                onBackdropPress={toggleDialog}>
                <Dialog.Title
                    title="Đổi mật khẩu"
                    titleStyle={{
                        fontFamily: 'Roboto',
                        fontSize: 22,
                        fontWeight: 'bold',
                        color: COLOR.text,
                    }}
                />
                {
                    <View>
                        <Input
                            placeholder="Mật khẩu hiện tại"
                            placeholderTextColor={COLOR.placeholder}
                            secureTextEntry={!isShow1}
                            onChangeText={value => setCurrentPassword(value)}
                            style={{ color: COLOR.text }}
                            rightIcon={
                                <TouchableOpacity onPress={() => setIsShow1(!isShow1)}>
                                    <FontAwesomeIcon icon={isShow1 ? faEye : faEyeSlash} />
                                </TouchableOpacity>
                            }
                        />
                        <Input
                            placeholder="Mật khẩu mới"
                            placeholderTextColor={COLOR.placeholder}
                            onChangeText={value => setNewPassword(value)}
                            secureTextEntry={!isShow2}
                            style={{ color: COLOR.text }}
                            rightIcon={
                                <TouchableOpacity onPress={() => setIsShow2(!isShow2)}>
                                    <FontAwesomeIcon icon={isShow2 ? faEye : faEyeSlash} />
                                </TouchableOpacity>
                            }
                        />
                        <Input
                            placeholder="Nhập lại mật khẩu mới"
                            placeholderTextColor={COLOR.placeholder}
                            errorMessage="Mật khẩu mới không giống nhau"
                            errorStyle={{
                                color: isSame ? COLOR.background : 'red',
                            }}
                            onChangeText={value => setNewPasswordConfirm(value)}
                            secureTextEntry={!isShow3}
                            style={{ color: COLOR.text }}
                            rightIcon={
                                <TouchableOpacity onPress={() => setIsShow3(!isShow3)}>
                                    <FontAwesomeIcon icon={isShow3 ? faEye : faEyeSlash} />
                                </TouchableOpacity>
                            }
                        />
                    </View>
                }
                <Dialog.Actions>
                    <Dialog.Button
                        title={!isSending ? 'Xác nhận' : 'Đang đổi...'}
                        onPress={changePassword}
                    />
                    <Dialog.Button
                        title="Hủy"
                        onPress={toggleDialog}
                        titleStyle={{ color: 'red' }}
                    />
                </Dialog.Actions>
            </Dialog>
        </>
    );
};

export default Settings;
