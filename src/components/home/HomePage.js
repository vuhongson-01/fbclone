import React, {useState, useEffect, useRef} from 'react';
import {
  StatusBar,
  ScrollView,
  View,
  RefreshControl,
  Text,
  ActivityIndicator,
} from 'react-native';
import {Input} from '@rneui/themed';
import AppBar from './AppBar';
import ToolBar from './ToolBar';
import Feed from './Feed';

import Notification from '../../utils/Notification';
import PostService from '../../helper/services/PostService';
import {isCloseToBottom} from '../../utils/utils';
import {COLOR} from '../../constants/constants';
import {Dialog} from '@rneui/themed';

const styles = {
  Container: {
    flex: 1,
    backgroundColor: COLOR.background,
  },
};

const HomePageComponent = ({navigation}) => {
  const [feeds, setFeeds] = useState([]);
  const scrollViewRef = useRef();
  const [refreshing, setRefreshing] = useState(false);
  const [reportDialogVisible, setReportDialogVisible] = useState(false);
  const [postId, setPostId] = useState('');
  const [title, setTitle] = useState('');
  const [desc, setDesc] = useState('');
  const [isSending, setIsSending] = useState(false);
  const [appending, setAppending] = useState(false);

  useEffect(() => {
    setRefreshing(true);
    loadData(0, 10);
  }, []);

  useEffect(() => {
    const unsubscribe = navigation.addListener('tabLongPress', e => {
      scrollViewRef.current?.scrollTo({
        y: 0,
        animated: true,
      });
    });
    return unsubscribe;
  }, [navigation]);

  const loadData = (skip, limit) => {
    PostService.getList('', skip, limit)
      .then(res => {
        setFeeds(res.data.data);
      })
      .catch(error => {
        Notification.showErrorMessage(
          'Đã xảy ra lỗi khi lấy danh sách bài viết',
        );
      })
      .finally(() => {
        setRefreshing(false);
      });
  };

  const onRefresh = () => {
    setRefreshing(true);
    setFeeds([]);
    loadData(0, 10);
  };

  handleAvatarPress = id => {
    navigation.navigate('ProfileScreen', {userId: id});
  };

  handleFocus = () => {
    navigation.navigate('CreatePost');
  };

  handleCommentPress = id => {
    navigation.navigate('CommentPage', {
      postId: id,
    });
  };

  handlePostDetail = (post, avatar, username) => {
    navigation.navigate('DetailPost', {
      post: post,
      avatar: avatar,
      username: username
    });
  };

  handleChat = () => {
    navigation.navigate('Chat');
  };

  showReportDialog = id => {
    setReportDialogVisible(!reportDialogVisible);
    setPostId(id);
  };

  const toggleReportDialog = () => {
    setReportDialogVisible(!reportDialogVisible);
  };

  const sendReport = () => {
    setIsSending(true);
    if (title.length <= 0 || desc.length <= 0 || postId.length <= 0) {
      setIsSending(false);
      return;
    }
    PostService.report(postId, {
      subject: title,
      details: desc,
    })
      .then(res => {
        Notification.showSuccessMessage('Gửi báo cáo thành công.');
        setDesc('');
        setTitle('');
        setPostId('');
        toggleReportDialog();
      })
      .catch(error =>
        Notification.showErrorMessage('Đã xảy ra lỗi khi gửi báo cáo.'),
      )
      .finally(() => setIsSending(false));
  };

  const appendData = () => {
    try {
      setAppending(true);
      PostService.getList('', feeds.length, 3)
        .then(res => {
          if (res.data?.data?.length > 0) {
            setFeeds([...feeds, ...res.data.data]);
          } else {
            return;
          }
        })
        .catch(error => {
          Notification.showErrorMessage(
            'Đã xảy ra lỗi khi lấy danh sách bài viết',
          );
          return;
        })
        .finally(() => {
          setAppending(false);
        });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <StatusBar backgroundColor={COLOR.background} barStyle="dark-content" />
      <View style={styles.Container}>
        {
          <ScrollView
            ref={scrollViewRef}
            contentContainerStyle={{flexGrow: 1}}
            refreshControl={
              <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }
            onScroll={({nativeEvent}) => {
              if (isCloseToBottom(nativeEvent) && !appending) {
                appendData();
              }
            }}>
            <AppBar />
            <View
              style={{
                width: '100%',
                height: 1,
                backgroundColor: COLOR.mainGraySmoke,
              }}
            />
            <ToolBar />
            {feeds.length > 0 &&
              feeds.map(item => (
                <View key={item._id}>
                  <Feed
                    id={item._id}
                    described={item.described ? item.described : ''}
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
        }
      </View>
      <Dialog
        isVisible={reportDialogVisible}
        onBackdropPress={toggleReportDialog}>
        <Dialog.Title
          title="Báo cáo bài viết"
          titleStyle={{
            fontFamily: 'Roboto',
            fontSize: 22,
            fontWeight: 'bold',
            color: COLOR.text,
          }}
        />
        {
          <View>
            <View>
              <Text style={{color: COLOR.text, fontSize: 20}}>Tiêu đề</Text>
              <Input
                placeholder="Nhập tiêu đề..."
                placeholderTextColor={COLOR.placeholder}
                errorMessage="Hãy nhập tiêu đề"
                errorStyle={{
                  color: title.length > 0 ? COLOR.background : 'red',
                }}
                onChangeText={value => setTitle(value)}
              />
            </View>
            <View>
              <Text style={{color: COLOR.text, fontSize: 20}}>Mô tả</Text>
              <Input
                placeholder="Nhập mô tả..."
                placeholderTextColor={COLOR.placeholder}
                errorMessage="Hãy nhập mô tả"
                errorStyle={{color: desc.length > 0 ? COLOR.background : 'red'}}
                onChangeText={value => setDesc(value)}
              />
            </View>
          </View>
        }
        <Dialog.Actions>
          <Dialog.Button
            title={!isSending ? 'Gửi' : 'Đang gửi...'}
            onPress={sendReport}
          />
          <Dialog.Button
            title="Hủy"
            onPress={toggleReportDialog}
            titleStyle={{color: 'red'}}
          />
        </Dialog.Actions>
      </Dialog>
    </>
  );
};

export default HomePageComponent;
