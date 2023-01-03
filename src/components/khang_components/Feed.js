import React from 'react';

import {View, Image, Text, StyleSheet} from 'react-native';

import Avatar from './Avatar';

import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faEarthAsia} from '@fortawesome/free-solid-svg-icons/faEarthAsia';
import {faEllipsis} from '@fortawesome/free-solid-svg-icons/faEllipsis';
import {faTimes} from '@fortawesome/free-solid-svg-icons/faTimes';

import {faCircle} from '@fortawesome/free-solid-svg-icons/faCircle';

import {faThumbsUp as solidFaThumbsUp} from '@fortawesome/free-solid-svg-icons/faThumbsUp';
import {faThumbsUp} from '@fortawesome/free-regular-svg-icons/faThumbsUp';
import {faMessage} from '@fortawesome/free-regular-svg-icons/faMessage';
import {faShare} from '@fortawesome/free-solid-svg-icons/faShare';

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
    fontSize: 12,
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

    fontSize: 13,
    color: '#222121',
    lineHeight: 16,
    paddingVertical: 11,
  },
  Photo: {
    marginTop: 9,
    width: '100%',
    height: 300,
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

const Feed = () => {
  return (
    <>
      <View style={styles.Container}>
        <View style={styles.Header}>
          <View style={styles.Row}>
            <Avatar
              source={require('../../../assets/khang_assets/user3.jpg')}
            />
            <View style={{paddingLeft: 10}}>
              <Text style={styles.User}>Regi P</Text>
              <View style={styles.Row}>
                <Text style={styles.Time}>9m</Text>
                <FontAwesomeIcon
                  icon={faCircle}
                  size={2}
                  color="#747476"
                  style={{marginRight: 4}}
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
              style={{marginLeft: 12}}
            />
          </View>
        </View>

        <Text style={styles.Post}>
          Crie na prática uma aplicação utilizando NextJS, ReactJS, React Native
          e Strap Api.
        </Text>
        <Image
          style={styles.Photo}
          source={require('../../../assets/khang_assets/post1.jpg')}
        />

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
              <Text style={styles.TextCount}>88 likes</Text>
            </View>
            <Text style={styles.TextCount}>2k comments</Text>
          </View>

          <View style={styles.Separator} />

          <View style={styles.FooterMenu}>
            <View style={styles.Button}>
              <View style={styles.Icon}>
                <FontAwesomeIcon icon={faThumbsUp} size={20} color="#424040" />
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

      <View style={styles.Container}>
        <View style={styles.Header}>
          <View style={styles.Row}>
            <Avatar
              source={require('../../../assets/khang_assets/user3.jpg')}
            />
            <View style={{paddingLeft: 10}}>
              <Text style={styles.User}>Regi P</Text>
              <View style={styles.Row}>
                <Text style={styles.Time}>9m</Text>
                <FontAwesomeIcon
                  icon={faCircle}
                  size={2}
                  color="#747476"
                  style={{marginRight: 4}}
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
              style={{marginLeft: 12}}
            />
          </View>
        </View>

        <Text style={styles.Post}>
          Crie na prática uma aplicação utilizando NextJS, ReactJS, React Native
          e Strap Api.
        </Text>
        <Image
          style={styles.Photo}
          source={require('../../../assets/khang_assets/post1.jpg')}
        />

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
              <Text style={styles.TextCount}>88 likes</Text>
            </View>
            <Text style={styles.TextCount}>2k comments</Text>
          </View>

          <View style={styles.Separator} />

          <View style={styles.FooterMenu}>
            <View style={styles.Button}>
              <View style={styles.Icon}>
                <FontAwesomeIcon icon={faThumbsUp} size={20} color="#424040" />
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
