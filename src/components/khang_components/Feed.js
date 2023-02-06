import React, { useEffect, useState } from 'react';

import { View, Image, Text, StyleSheet, TouchableOpacity } from 'react-native';

import Avatar from './Avatar';

import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faEarthAsia } from '@fortawesome/free-solid-svg-icons/faEarthAsia';
import { faEllipsis } from '@fortawesome/free-solid-svg-icons/faEllipsis';
import { faTimes } from '@fortawesome/free-solid-svg-icons/faTimes';

import { faCircle } from '@fortawesome/free-solid-svg-icons/faCircle';

import { faThumbsUp as solidFaThumbsUp } from '@fortawesome/free-solid-svg-icons/faThumbsUp';
import { faThumbsUp } from '@fortawesome/free-regular-svg-icons/faThumbsUp';
import { faMessage } from '@fortawesome/free-regular-svg-icons/faMessage';
import { faShare } from '@fortawesome/free-solid-svg-icons/faShare';

import UserService from '../../helper/services/UserService';
import Notification from "../../utils/Notification";
import { setDateDiff } from "../../utils/utils";

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
    backgroundColor: '#1878f3',
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

const Feed = ({ id, described, countComments, authorId, images, videos, likes, createdAt, isLike }) => {
  const [author, setAuthor] = useState({})
  const [isSeeMore, setSeeMore] = useState(false)
  useEffect(() => {
    UserService.get(authorId)
      .then(res => {
        // console.log("authorData: " + res.data.data)
        setAuthor(res.data.data)
      })
      .catch(error => {
        Notification.showErrorMessage('Đã xảy ra lỗi khi lấy danh sách bài viết');
      })
  }, [authorId]);
  return (
    <>
      <View style={styles.Container}>
        <View style={styles.Header}>
          <View style={styles.Row}>
            <Avatar
              source={author.avatar}
            />
            <View style={{ paddingLeft: 10 }}>
              <Text style={styles.User}>{author.username}</Text>
              <View style={styles.Row}>
                <Text style={styles.Time}>{setDateDiff(createdAt)}</Text>
                <FontAwesomeIcon
                  icon={faCircle}
                  size={2}
                  color="#747476"
                  style={{ marginRight: 4 }}
                />
                <FontAwesomeIcon icon={faEarthAsia} size={10} color="#747476" />
              </View>
            </View>
          </View>

          <View
            style={{
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
            }}>
            <FontAwesomeIcon icon={faEllipsis} size={18} color="#222121" />
            <FontAwesomeIcon
              icon={faTimes}
              size={24}
              color="#555"
              style={{ marginLeft: 12 }}
            />
          </View>
        </View>
        {
          described.length > 36 && !isSeeMore ?
            <View>
              <Text numberOfLines={1} style={styles.Post}>
                {described}
              </Text>
              <TouchableOpacity onPress={() => setSeeMore(true)} style={{ fontSize: 16, marginLeft: 12 }}>
                <Text style={{ fontSize: 15 }}>Xem Thêm</Text>
              </TouchableOpacity>
            </View>
            :
            <Text style={styles.Post}>
              {described}
            </Text>
        }

        {
          images && images.length === 0 && (videos && videos.length === 0 || videos === null) && <Image
            style={styles.Photo}
            source={{ uri: 'https://chim-chimneyinc.com/wp-content/uploads/2019/12/GettyImages-1128826884.jpg' }}
          />
        }
        {
          images.length === 1 && <Image
            style={styles.Photo}
            source={{ uri: images[0] }}
          />
        }
        {
          images.length === 2 && <View style={{ display: 'flex', width: '100%', height: 300, marginTop: 9 }}>
            {images.map((image, index) => <Image
              style={styles.PhotoHalf}
              source={{ uri: images[index] }}
            />
            )
            }
          </View>
        }
        {
          images.length === 3 && <View style={{ display: 'flex', flexDirection: 'row', marginTop: 9 }}>
            <View style={{ display: 'flex', flexDirection: 'column', width: '50%', height: 300 }}>
              <Image
                style={styles.PhotoQuater}
                source={{ uri: images[0] }}
              />
              <Image
                style={styles.PhotoQuater}
                source={{ uri: images[1] }}
              />
            </View>
            <Image
              style={styles.PhotoHalf}
              source={{ uri: images[2] }}
            />
          </View>
        }
        {
          images.length === 4 && <View style={{ display: 'flex', flexDirection: 'row', width: '100%', height: 300, marginTop: 9 }}>
            <View style={{ display: 'flex', flexDirection: 'column', width: '50%', height: 300 }}>
              <Image
                style={styles.PhotoQuater}
                source={{ uri: images[0] }}
              />
              <Image
                style={styles.PhotoQuater}
                source={{ uri: images[1] }}
              />
            </View>
            <View style={{ display: 'flex', flexDirection: 'column', width: '50%', height: 300 }}>
              <Image
                style={styles.PhotoQuater}
                source={{ uri: images[2] }}
              />
              <Image
                style={styles.PhotoQuater}
                source={{ uri: images[3] }}
              />
            </View>
          </View>
        }

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
              <Text style={styles.TextCount}>{likes.length} likes</Text>
            </View>
            <Text style={styles.TextCount}>{countComments} comments</Text>
          </View>

          <View style={styles.Separator} />

          <View style={styles.FooterMenu}>
            <View style={styles.Button}>
              <View style={styles.Icon}>
                {isLike ? <FontAwesomeIcon
                  icon={solidFaThumbsUp}
                  size={20}
                  color="#1878f3"
                /> : <FontAwesomeIcon icon={faThumbsUp} size={20} color="#424040" />}
              </View>
              <Text style={styles.ActionTitle}>Like</Text>
            </View>

            <View style={[styles.Button]}>
              <View style={[styles.Icon, styles.ButtonComment]}>
                <FontAwesomeIcon icon={faMessage} size={19} color="#424040" />
              </View>
              <Text style={styles.ActionTitle}>Comment</Text>
            </View>

            <View style={styles.Button}>
              <View style={styles.Icon}>
                <FontAwesomeIcon icon={faShare} size={20} color="#424040" />
              </View>
              <Text style={styles.ActionTitle}>Share</Text>
            </View>
          </View>
        </View>
        <View style={styles.BottomDivider} />
      </View>
    </>
  );
};

export default Feed;
