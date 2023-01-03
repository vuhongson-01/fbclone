import React, { Component, useEffect, useState } from 'react'
import { TextInput, StyleSheet, ScrollView, ActivityIndicator, Alert, BackHandler } from 'react-native';
import { Avatar, Incubator, View, RadioGroup, RadioButton, Text, Checkbox, Colors, Button, Icon, Assets, Image, TouchableOpacity } from 'react-native-ui-lib';
import _ from 'lodash';
import { StyleCustom } from '../assets/styles';
import { Dimensions } from 'react-native';
import NotifyIcon from '../assets/svg/notification';
import LogoutIcon from '../assets/svg/logout';
import PostService from '../helper/services/PostService';
import UserService from '../helper/services/UserService';


const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

StyleCustom();

const { TextField } = Incubator;
const options = ['Nam', 'Nữ'];

const Settings = () => {
    const [notify, setNotify] = useState("Turn off Notification");
    const [login, setLogin] = useState("Logout");

    function changeNotify() {
        if(notify === "Turn on Notification") {
            setNotify("Turn off Notification");
        }
        else setNotify("Turn on Notification");
    }

    function changeAuth() {
        if(login === "Login") {
            setLogin("Logout");
        }
        else setLogin("Login");
    }

    return (
        <View>
            <View paddingT-5 bg-white 
            flex-apply spread
            style={{height:windowHeight}}>
            <View>
                <View style={{
                        borderBottomWidth: 2,
                        borderColor: '#f0f0f1'
                    }}>
                    <View sh30 flex-apply row centerV paddingH-10>
                        <TouchableOpacity onPress={() => console.log('pressed')}>
                            <Icon source={require('../assets/icons/arrow_left.png')} size={24}></Icon>
                        </TouchableOpacity>
                        
                        <Text h3 marginL-20 style={{fontWeight:'bold'}}>
                            Cài Đặt
                        </Text>
                    </View>
                </View>
                <View marginT-10>
                    <TouchableOpacity flex-apply row paddingH-20 paddingV-10
                    onPress={changeNotify}>
                        <NotifyIcon></NotifyIcon>
                        <Text marginL-20>{notify}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity flex-apply row paddingH-20 paddingV-10
                    onPress={changeAuth}>
                        <LogoutIcon></LogoutIcon>
                        <Text marginL-20>{login}</Text>
                    </TouchableOpacity>
                </View>
            </View>
            <TouchableOpacity bg-redButton
            marginH-20
            paddingH-20 paddingV-10 br40
            flex-apply center marginB-30
            onPress={() => BackHandler.exitApp()}>
                <Text white>Thoát ứng dụng</Text>
            </TouchableOpacity>
        </View>

        </View>
    );
}

// const Settings = ({navigation}) => {
    
//     var post_id = '639db920e1077b28b889119f';
//     const [username, setUsername] = useState(''); 
//     const [avatar, setAvatar] = useState('');
//     const [post, setPost] = useState({});

//     useEffect(() => {
//         PostService.getById(post_id).then( (res) => {
//             setPost(res.data.data);
//             console.log(post._id);
//             UserService.get(res.data.data.author).then((response) => {
//                 // console.log(response.data.data.username);
//                 setUsername(response.data.data.username);
//                 setAvatar(response.data.data.avatar);
//                 console.log(username);
//                 console.log(avatar); 
//             })
//         })
//         // .then(result => {
        
//         // })
//         .catch((err) => {
//             console.log(err);
//         });
//     }, []);

//     return (
//         <View flex-apply center>
//             <TouchableOpacity onPress={() => {
//                 console.log(avatar);
//                 navigation.navigate('DetailPost', 
//                 {
//                     post: post,
//                     avatar: avatar, 
//                     username: username
//                 });
//             }}>
//                 <Text grey20>
//                     click me
//                 </Text>
//             </TouchableOpacity>
//         </View>
//     );

// }

export default Settings;