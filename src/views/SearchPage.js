import {useEffect, useState} from 'react';

import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {
  ScrollView,
  StatusBar,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {SceneMap, TabView, ViewPagerBackend} from 'react-native-tab-view';

import HeaderSearch from '../components/header-search/HeaderSearch';
import Feed from '../components/khang_components/Feed';
import PostService from '../helper/services/PostService';
import UserService from '../helper/services/UserService';
import Notification from '../utils/Notification';

import {faBars} from '@fortawesome/free-solid-svg-icons/faBars';
import {faBell} from '@fortawesome/free-solid-svg-icons/faBell';
import {faClapperboard} from '@fortawesome/free-solid-svg-icons/faClapperboard';
import {faHouse} from '@fortawesome/free-solid-svg-icons/faHouse';
import {faUserGroup} from '@fortawesome/free-solid-svg-icons/faUserGroup';
import {COLOR} from '../constants/constants';

const styles = {
  Container: {
    flex: 1,
  },
  NavBar: {
    width: '100%',
    height: 48,
    backgroundColor: COLOR.mainWhite,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  NavbarItem: {
    height: '100%',
    flex: 1,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  NavbarItemActive: {
    height: '100%',
    flex: 1,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: COLOR.mainBlue,
    borderTopWidth: 2,
    borderTopColor: COLOR.mainBlue,
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
  },
};

const SearchPage = () => {
  const [searchPageType, setSearchPageType] = useState('post');
  const navbarItems = [
    {icon: faHouse, text: 'Home'},
    {icon: faUserGroup, text: 'Friends'},
    {icon: faClapperboard, text: 'Watch'},
    {icon: faBell, text: 'Notifications'},
    {icon: faBars, text: 'Menu'},
  ];
  const [keyword, setKeyword] = useState('');
  const [navbarItemActiveIndex, setNavbarItemActiveIndex] = useState(0);
  const sortFnc = (a, b) => (b.createdAt > a.createdAt ? 1 : -1);
  const [searchPosts, setSearchPosts] = useState([]);
  const [searchUsers, setSearchUsers] = useState([]);
  if (searchPageType === 'post') {
    useEffect(() => {
      PostService.search({keyword: ''})
        .then(res => {
          console.log('res: ' + res.data.data);
          setSearchPosts(res.data.data);
          console.log(res.data.data.length);
        })
        .catch(error => {
          Notification.showErrorMessage('Đã xảy ra lỗi khi tìm kiếm bài viết');
        });
    }, []);
  } else {
    useEffect(() => {
      UserService.search({keyword: ''})
        .then(res => {
          console.log('res: ' + res.data.data);
          setSearchUsers(res.data.data);
          console.log(res.data.data.length);
        })
        .catch(error => {
          Notification.showErrorMessage(
            'Đã xảy ra lỗi khi tìm kiếm người dùng',
          );
        });
    }, []);
  }

  const searchFuntion = keyword => {
    if (searchPageType === 'post') {
      PostService.search({keyword: keyword})
        .then(res => {
          console.log('res: ' + res.data.data);
          setSearchPosts(res.data.data);
          console.log(res.data.data.length);
        })
        .catch(error => {
          Notification.showErrorMessage('Đã xảy ra lỗi khi tìm kiếm bài viết');
        });
    } else {
      UserService.search({keyword: keyword})
        .then(res => {
          console.log('res: ' + res.data.data);
          setSearchUsers(res.data.data);
          console.log(res.data.data.length);
        })
        .catch(error => {
          Notification.showErrorMessage(
            'Đã xảy ra lỗi khi tìm kiếm người dùng',
          );
        });
    }
  };

  const PostList = () => {
    return (
      <ScrollView>
        {searchPosts.sort(sortFnc).length > 0 &&
          searchPosts.map(item => (
            <View key={item._id}>
              <Feed
                id={item._id}
                described={item.described ? item.described : 'No description'}
                countComments={item.countComments}
                authorId={item.author}
                images={item.images}
                videos={item.videos}
                likes={item.like}
                createdAt={item.createdAt}
                isLike={item.isLike}
              />
            </View>
          ))}
      </ScrollView>
    );
    // console.log(1)
  };

  const User = props => {
    <>Đây là người dùng</>;
  };

  const UserList = () => {
    return (
      <ScrollView>
        {searchUsers.sort(sortFnc).length > 0 &&
          searchUsers.map(item => (
            <View key={item._id}>
              <User id={item._id} />
            </View>
          ))}
      </ScrollView>
    );
  };

  const [navigation, setNavigation] = useState({
    index: 0,
    routes: [
      {
        key: 'post',
        title: 'Bài viết',
      },
      {
        key: 'user',
        title: 'Mọi người',
      },
    ],
  });

  const renderScene = SceneMap({
    post: PostList,
    user: UserList,
  });

  return (
    <>
      <StatusBar backgroundColor={COLOR.background} barStyle="dark-content" />
      <HeaderSearch
        setSearchKeyword={setKeyword}
        actionFn={() => searchFuntion(keyword)}
      />
      <View style={styles.Container}>
        <TabView
          navigationState={navigation}
          renderScene={renderScene}
          onIndexChange={index => {
            setNavigation({...navigation, index: index});
            setSearchPageType(navigation.routes[index].key);
          }}
          renderPager={props => (
            <ViewPagerBackend {...props} transitionStyle="curl" />
          )}
        />
        <View style={styles.NavBar}>
          {navbarItems.map((item, index) => {
            return index === navbarItemActiveIndex ? (
              <TouchableOpacity key={index} style={styles.NavbarItemActive}>
                <FontAwesomeIcon
                  icon={item.icon}
                  size={24}
                  color={COLOR.mainBlue}
                />
                <Text style={[styles.NavbarItemText, {color: COLOR.mainBlue}]}>
                  {item.text}
                </Text>
              </TouchableOpacity>
            ) : (
              <TouchableOpacity
                onPress={e => {
                  e.preventDefault();
                  setNavbarItemActiveIndex(index);
                }}
                key={index}
                style={styles.NavbarItem}>
                <FontAwesomeIcon
                  style={styles.NoActiveNavbarIcon}
                  icon={item.icon}
                  size={24}
                />
                <Text style={[styles.NavbarItemText]}>{item.text}</Text>
              </TouchableOpacity>
            );
          })}
        </View>
      </View>
    </>
  );
};

export default SearchPage;
