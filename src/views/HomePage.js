import React, { useState, useEffect } from 'react';

import { StatusBar, ScrollView, View, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';

import AppBar from '../components/khang_components/AppBar';
import ToolBar from '../components/khang_components/ToolBar';
import Users from '../components/khang_components/Users';
import Story from '../components/khang_components/Story';
import Feed from '../components/khang_components/Feed';

import Notification from "../utils/Notification";
import PostService from "../helper/services/PostService";

import { faHouse } from '@fortawesome/free-solid-svg-icons/faHouse';
// import { faUser } from '@fortawesome/free-regular-svg-icons/f';

import { faClapperboard } from '@fortawesome/free-solid-svg-icons/faClapperboard';
import { faUserGroup } from '@fortawesome/free-solid-svg-icons/faUserGroup';
import { faBell } from '@fortawesome/free-solid-svg-icons/faBell';
import { faBars } from '@fortawesome/free-solid-svg-icons/faBars';



const styles = {
    Container: {
        flex: 1,
    },
    NavBar: {
        width: '100%',
        height: 48,
        backgroundColor: 'white',
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center'
    },
    NavbarItem: {
        height: '100%',
        flex: 1,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
    },
    NavbarItemActive: {
        height: '100%',
        flex: 1,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: '#1878f3',
        borderTopWidth: 2,
        borderTopColor: '#1878f3',
    },
    NavbarItemText: {
        color: '#333',
        fontSize: 10,
    },
    NoActiveNavbarIcon: {
        color: '#ccc',
        border: 1,
        // borderColor: '#333',
        // borderStyle: 'solid',
    }
}

const Homepage = () => {
    const navbarItems = [
        { icon: faHouse, text: 'Home' },
        { icon: faUserGroup, text: 'Friends' },
        { icon: faClapperboard, text: 'Watch' },
        { icon: faBell, text: 'Notifications' },
        { icon: faBars, text: 'Menu' }
    ];
    const [navbarItemActiveIndex, setNavbarItemActiveIndex] = useState(0);
    const [feeds, setFeeds] = useState([]);
    const sortFnc = (a, b) => b.createdAt > a.createdAt ? 1 : -1
    useEffect(() => {
        PostService.getList()
            .then(res => {
                console.log("res: " + res.data.data)
                setFeeds(res.data.data);
                console.log(res.data.data.length);
            })
            .catch(error => {
                Notification.showErrorMessage('Đã xảy ra lỗi khi lấy danh sách bài viết');
            })
    }, []);
    return (
        <>
            <StatusBar
                backgroundColor="#FFFFFF"
                barStyle="dark-content"
            />
            <View style={styles.Container}>
                <ScrollView>
                    <AppBar />
                    <ToolBar />
                    {/* <Users /> */}
                    <Story />
                    {/* <Feed /> */}
                    {
                        feeds.sort(sortFnc).length > 0 && feeds.map(item => (
                            <View key={item._id}>
                                <Feed
                                    id={item._id}
                                    described={item.described ? item.described : "No description"}
                                    countComments={item.countComments}
                                    authorId={item.author}
                                    images={item.images}
                                    videos={item.videos}
                                    likes={item.like}
                                    createdAt={item.createdAt}
                                    isLike={item.isLike}
                                />
                            </View>
                        ))
                    }
                </ScrollView>
                <View style={styles.NavBar}>
                    {
                        navbarItems.map((item, index) => {
                            return index === navbarItemActiveIndex ?
                                <TouchableOpacity key={index} style={styles.NavbarItemActive}>
                                    <FontAwesomeIcon
                                        icon={item.icon}
                                        size={24}
                                        color='#1878f3'
                                    />
                                    <Text style={[styles.NavbarItemText, { color: '#1878f3' }]}>{item.text}</Text>
                                </TouchableOpacity> :
                                <TouchableOpacity onPress={(e) => { e.preventDefault(); setNavbarItemActiveIndex(index) }} key={index} style={styles.NavbarItem}>
                                    <FontAwesomeIcon
                                        style={styles.NoActiveNavbarIcon}
                                        icon={item.icon}
                                        size={24}
                                    />
                                    <Text style={[styles.NavbarItemText]}>{item.text}</Text>
                                </TouchableOpacity>
                        }
                        )
                    }
                </View>
            </View>
        </>
    );
};



export default Homepage;
