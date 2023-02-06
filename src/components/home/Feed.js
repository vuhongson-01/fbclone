import React, {useEffect, useState} from 'react';

import {View, Image, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {Avatar} from 'react-native-ui-lib';

import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faEarthAsia} from '@fortawesome/free-solid-svg-icons/faEarthAsia';
import {faCircleExclamation} from '@fortawesome/free-solid-svg-icons';
import Video from 'react-native-video';

import {faCircle} from '@fortawesome/free-solid-svg-icons/faCircle';

import {faThumbsUp as solidFaThumbsUp} from '@fortawesome/free-solid-svg-icons/faThumbsUp';
import {faThumbsUp} from '@fortawesome/free-regular-svg-icons/faThumbsUp';
import {faMessage} from '@fortawesome/free-regular-svg-icons/faMessage';

import UserService from '../../helper/services/UserService';
import Notification from '../../utils/Notification';
import {setDateDiff} from '../../utils/utils';
import PostService from '../../helper/services/PostService';
import {COLOR} from '../../constants/constants';

const styles = StyleSheet.create({
  Container: {
    flex: 1,
  },
  Header: {
    paddingHorizontal: 12,
    height: 50,
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    marginTop: 2,
    paddingVertical: 11,
  },
  Row: {
    alignItems: 'center',
    flexDirection: 'row',
  },
  User: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#222121',
  },
  Time: {
    fontSize: 9,
    color: '#747476',
    marginRight: 4,
  },
  Post: {
    paddingHorizontal: 12,
    fontSize: 16,
    color: '#222121',
    lineHeight: 24,
    paddingVertical: 11,
  },
  Photo: {
    marginTop: 9,
    width: '100%',
    height: 300,
  },
  PhotoHalf: {
    width: '50%',
    height: 300,
  },
  PhotoQuater: {
    width: '100%',
    height: 150,
  },
  ButtonComment: {
    top: 3,
  },
  ActionTitle: {
    fontWeight: '500',
    color: COLOR.text,
  },
  Footer: {
    paddingVertical: 11,
  },
  FooterCount: {
    paddingHorizontal: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  IconCount: {
    backgroundColor: COLOR.icon,
    width: 20,
    height: 20,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 6,
  },
  TextCount: {
    fontSize: 11,
    color: '#424040',
  },
  Separator: {
    width: '100%',
    height: 1,
    background: '#f9f9f9',
  },
  FooterMenu: {
    paddingHorizontal: 36,
    marginTop: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  Button: {
    flexDirection: 'row',
  },
  Icon: {
    marginRight: 6,
  },
  Text: {
    fontSize: 12,
    color: '#424040',
  },
  BottomDivider: {
    width: '100%',
    height: 9,
    backgroundColor: '#bbb',
  },
});

const Feed = ({
  id,
  described,
  countComments,
  authorId,
  images,
  videos,
  likes,
  createdAt,
  isLike,
}) => {
  const [author, setAuthor] = useState({});
  const [isSeeMore, setSeeMore] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const [initIsLiked, setInitIsLiked] = useState(false);
  const [bonus, setBonus] = useState(0);
  const params = {
    id,
    described,
    countComments,
    authorId,
    images,
    videos,
    likes,
    createdAt,
    isLike,
  };

  useEffect(() => {
    setIsLiked(isLike);
    setInitIsLiked(isLike);
    setBonus(0);
    UserService.get(authorId)
      .then(res => {
        setAuthor(res.data.data);
      })
      .catch(error => {
        Notification.showErrorMessage(
          'Đã xảy ra lỗi khi lấy danh sách bài viết',
        );
      });
  }, [authorId]);

  const handleLikePress = () => {
    PostService.like(id)
      .then(res => {
        if ((initIsLiked && !isLiked) || (!initIsLiked && isLiked)) {
          setBonus(0);
        } else if (initIsLiked && isLiked) {
          setBonus(-1);
        } else if (!initIsLiked && !isLiked) {
          setBonus(1);
        }
        setIsLiked(!isLiked);
      })
      .catch(err => console.log(err));
  };

  return (
    <>
      <View style={styles.Container}>
        <View style={styles.Header}>
          <View style={styles.Row}>
            <Avatar
              source={{uri: author.avatar}}
              size={36}
              onPress={() => handleAvatarPress(author?._id)}
            />
            <View style={{paddingLeft: 10}}>
              <TouchableOpacity onPress={() => handleAvatarPress(author?._id)}>
                <Text style={styles.User}>{author.username}</Text>
              </TouchableOpacity>
              <View style={styles.Row}>
                <Text style={styles.Time}>{setDateDiff(createdAt)}</Text>
                <FontAwesomeIcon
                  icon={faCircle}
                  size={2}
                  color={COLOR.mainGray}
                  style={{marginRight: 4}}
                />
                <FontAwesomeIcon
                  icon={faEarthAsia}
                  size={10}
                  color={COLOR.mainGray}
                />
              </View>
            </View>
          </View>

          <View
            style={{
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
            }}>
            <TouchableOpacity onPress={() => showReportDialog(id)}>
              <FontAwesomeIcon
                icon={faCircleExclamation}
                size={18}
                color={COLOR.mainBlack}
              />
            </TouchableOpacity>
          </View>
        </View>
        {described.length > 36 && !isSeeMore ? (
          <View>
            <TouchableOpacity
              onPress={e =>
                images?.length <= 1 || videos?.length == 1
                  ? e.preventDefault()
                  : handlePostDetail(params, author.avatar, author.username)
              }>
              <Text numberOfLines={1} style={styles.Post}>
                {described}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => setSeeMore(true)}
              style={{fontSize: 16, marginLeft: 12}}>
              <Text style={{fontSize: 15, color: COLOR.placeholder}}>
                Xem Thêm
              </Text>
            </TouchableOpacity>
          </View>
        ) : (
          <TouchableOpacity
            onPress={e =>
              images?.length <= 1 || videos?.length == 1
                ? e.preventDefault()
                : handlePostDetail(params, author.avatar, author.username)
            }>
            <Text style={styles.Post}>{described}</Text>
          </TouchableOpacity>
        )}

        {images &&
          images.length === 0 &&
          ((videos && videos.length === 0) || videos === null) && <View />}
        {videos?.length > 0 && (
          <Video
            source={{uri: videos[0]}} // Can be a URL or a local file.
            ref={ref => {
              this.player = ref;
            }}
            style={{width: '100%', height: 450}} // Callback when video cannot be loaded
            resizeMode={'cover'}
            controls={true} // Hien thi pause next, ...
            // paused={true}
          />
        )}
        {images?.length === 1 && (
          <Image style={styles.Photo} source={{uri: images[0]}} />
        )}
        {images?.length === 2 && (
          <TouchableOpacity onPress={() => handlePostDetail(params, author.avatar, author.username)}>
            <View
              style={{
                display: 'flex',
                width: '100%',
                height: 300,
                marginTop: 9,
                flexDirection: 'row',
              }}>
              {images.map((image, index) => (
                <Image style={styles.PhotoHalf} source={{uri: images[index]}} />
              ))}
            </View>
          </TouchableOpacity>
        )}
        {images?.length === 3 && (
          <TouchableOpacity onPress={() => handlePostDetail(params, author.avatar, author.username)}>
            <View style={{display: 'flex', flexDirection: 'row', marginTop: 9}}>
              <View
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  width: '50%',
                  height: 300,
                }}>
                <Image style={styles.PhotoQuater} source={{uri: images[0]}} />
                <Image style={styles.PhotoQuater} source={{uri: images[1]}} />
              </View>
              <Image style={styles.PhotoHalf} source={{uri: images[2]}} />
            </View>
          </TouchableOpacity>
        )}
        {images?.length === 4 && (
          <TouchableOpacity onPress={() => handlePostDetail(params, author.avatar, author.username)}>
            <View
              style={{
                display: 'flex',
                flexDirection: 'row',
                width: '100%',
                height: 300,
                marginTop: 9,
              }}>
              <View
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  width: '50%',
                  height: 300,
                }}>
                <Image style={styles.PhotoQuater} source={{uri: images[0]}} />
                <Image style={styles.PhotoQuater} source={{uri: images[1]}} />
              </View>
              <View
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  width: '50%',
                  height: 300,
                }}>
                <Image style={styles.PhotoQuater} source={{uri: images[2]}} />
                <Image style={styles.PhotoQuater} source={{uri: images[3]}} />
              </View>
            </View>
          </TouchableOpacity>
        )}

        <View style={styles.Footer}>
          <View style={styles.FooterCount}>
            <View style={styles.Row}>
              <View style={styles.IconCount}>
                <FontAwesomeIcon
                  icon={solidFaThumbsUp}
                  size={12}
                  color="white"
                />
              </View>
              <Text style={styles.TextCount}>
                {likes.length + bonus} lượt thích
              </Text>
            </View>
            <TouchableOpacity onPress={() => handleCommentPress(id)}>
              <Text style={styles.TextCount}>{countComments} bình luận</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.Separator} />
          <View
            style={{
              width: '100%',
              height: 1,
              backgroundColor: '#F2F4F4',
              marginTop: 5,
            }}
          />
          <View style={styles.FooterMenu}>
            <View style={styles.Button}>
              <View style={styles.Icon}>
                <TouchableOpacity onPress={() => handleLikePress()}>
                  {isLiked ? (
                    <FontAwesomeIcon
                      icon={solidFaThumbsUp}
                      size={20}
                      color={COLOR.icon}
                    />
                  ) : (
                    <FontAwesomeIcon
                      icon={faThumbsUp}
                      size={20}
                      color={COLOR.mainBlack}
                    />
                  )}
                </TouchableOpacity>
              </View>
              <TouchableOpacity onPress={() => handleLikePress()}>
                <Text
                  style={[
                    styles.ActionTitle,
                    {color: isLiked ? COLOR.icon : COLOR.text},
                  ]}>
                  Thích
                </Text>
              </TouchableOpacity>
            </View>

            <View style={[styles.Button]}>
              <View style={[styles.Icon, styles.ButtonComment]}>
                <TouchableOpacity onPress={() => handleCommentPress(id)}>
                  <FontAwesomeIcon
                    icon={faMessage}
                    size={19}
                    color={COLOR.mainBlack}
                  />
                </TouchableOpacity>
              </View>
              <TouchableOpacity onPress={() => handleCommentPress(id)}>
                <Text style={styles.ActionTitle}>Bình luận</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
        <View style={styles.BottomDivider} />
      </View>
    </>
  );
};

export default Feed;
