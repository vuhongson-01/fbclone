import {
  View,
  Text,
  TouchableHighlight,
  Image,
  StyleSheet,
  TextInput,
  ActivityIndicator,
} from 'react-native';
import React, {memo, useEffect, useState} from 'react';
import {ScrollView} from 'react-native-gesture-handler';
import InfoView from './personal-info';
import {
  ActionSheet,
  DateTimePicker,
  Dialog,
  RadioButton,
  RadioGroup,
} from 'react-native-ui-lib';
import UserService from '../../helper/services/UserService';
import {faCakeCandles} from '@fortawesome/free-solid-svg-icons/faCakeCandles';
import {faHouse} from '@fortawesome/free-solid-svg-icons/faHouse';
import {faLocationDot} from '@fortawesome/free-solid-svg-icons/faLocationDot';
import {faUser} from '@fortawesome/free-solid-svg-icons/faUser';
import {faCalendarDay} from '@fortawesome/free-solid-svg-icons/faCalendarDay';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import UploadImageProfile from './upload-image-component';
import {COLOR} from '../../constants/constants';
const UpdateInfoComponent = ({userId}) => {
  const [somethingChanged, callback] = useState(false);
  const [userInfo, setUserInfo] = useState({});
  const getData = () => {
    UserService.getCurrentUser()
      .then(res => {
        setUserInfo(res.data.data);
      })
      .catch(error => {
        Notification.showErrorMessage(
          'Đã xảy ra lỗi khi lấy thông tin người dùng',
        );
      });
  };
  useEffect(() => {
    getData();
  }, [somethingChanged]);
  // console.log('update', userInfo);
  return (
    <ScrollView
      style={{
        backgroundColor: COLOR.background,
        flex: 1,
        paddingHorizontal: 16,
      }}>
      <View>
        <ProfileItemComponent
          type={1}
          userInfo={userInfo}
          callback={() => {
            callback(!somethingChanged);
          }}
        />
        <ProfileItemComponent
          type={2}
          userInfo={userInfo}
          callback={() => {
            callback(!somethingChanged);
          }}
        />
        <ProfileItemComponent
          type={3}
          userInfo={userInfo}
          callback={() => {
            callback(!somethingChanged);
          }}
        />
        <ProfileItemComponent
          type={4}
          userInfo={userInfo}
          callback={() => {
            callback(!somethingChanged);
          }}
        />
      </View>
    </ScrollView>
  );
};

const ProfileItemComponent = ({type, userInfo, callback}) => {
  const [open, setOpen] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);
  const [openUpload, setOpenUpload] = useState(false);
  const saveBioFunction = value => {
    // console.log(value);
    UserService.edit(value)
      .then(res => {
        setOpenDialog(false);
        setOpen(false);
        callback();
      })
      .catch(e => {
        console.log(e);
      });
  };
  return (
    <>
      <View
        style={{
          paddingVertical: 16,
          alignItems: 'center',
          borderBottomColor: COLOR.mainGraySmoke,
          borderBottomWidth: 0.5,
        }}>
        <View
          style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
            width: '100%',
          }}>
          <Text
            style={{fontSize: 18, fontWeight: 'bold', color: COLOR.mainBlack}}>
            {type == 1
              ? 'Ảnh đại diện'
              : type == 2
              ? 'Ảnh bìa'
              : type == 3
              ? 'Mô tả'
              : 'Chi tiết'}
          </Text>
          <TouchableHighlight
            underlayColor={'transparent'}
            onPress={() => {
              setOpen(true);
            }}>
            <Text style={{fontSize: 18, color: COLOR.mainBlue}}>Sửa</Text>
          </TouchableHighlight>
        </View>
        {(type == 1 || type == 2) && (
          <TouchableHighlight
            underlayColor={'transparent'}
            style={{marginTop: 16, width: '100%', alignItems: 'center'}}
            onPress={() => {
              setOpen(true);
            }}>
            <Image
              source={{
                uri: type == 1 ? userInfo.avatar : userInfo.cover_image,
              }}
              style={{
                resizeMode: 'cover',
                width: type == 1 ? 128 : '100%',
                height: type == 1 ? 128 : 196,
                backgroundColor: COLOR.mainGray,
                borderRadius: type == 1 ? 128 : 8,
              }}
            />
          </TouchableHighlight>
        )}
        {type == 3 && (
          <View>
            <Text>{userInfo?.description}</Text>
          </View>
        )}
        {type == 4 && (
          <View style={{width: '100%'}}>
            <View
              style={{
                display: 'flex',
                flexDirection: 'row',
                paddingVertical: 8,
                marginTop: 8,
                width: '100%',
                alignItems: 'center',
              }}>
              <Text
                style={{
                  marginLeft: 8,
                  fontSize: 16,
                  fontWeight: '500',
                  color: COLOR.mainBlack,
                }}>
                {'Họ tên: '}
              </Text>
              <Text
                style={{
                  marginLeft: 8,
                  fontSize: 18,
                  fontWeight: '600',
                  color: COLOR.mainBlack,
                }}>
                {userInfo.username}
              </Text>
            </View>
            <InfoView userInfo={userInfo} />
          </View>
        )}
      </View>

      {(type == 1 || type == 2) && (
        <ActionSheet
          useNativeIOS={false}
          migrateDialog
          options={[
            {
              label: type == 1 ? 'Chọn ảnh đại diện' : 'Chọn ảnh bìa',
              onPress: () => {
                setOpenUpload(true);
              },
            },
          ]}
          visible={open}
          onDismiss={() => setOpen(false)}
        />
      )}
      <UploadImageProfile
        type={type}
        open={openUpload}
        setOpen={setOpenUpload}
        userInfo={userInfo}
        callback={() => callback()}
      />
      {type == 3 && (
        <ActionSheet
          useNativeIOS={false}
          migrateDialog
          options={[
            {
              label: 'Thêm mô tả',
              onPress: () => {
                setOpenDialog(true);
              },
            },
            {
              label: 'Xóa mô tả',
              onPress: () => {
                saveBioFunction('');
              },
            },
          ]}
          visible={open}
          onDismiss={() => setOpen(false)}
        />
      )}
      <DialogBioView
        open={openDialog}
        setOpen={setOpenDialog}
        userInfo={userInfo}
        saveAction={saveBioFunction}
      />
      {type == 4 && (
        <DialogDetailView
          open={open}
          setOpen={setOpen}
          userInfo={userInfo}
          saveAction={saveBioFunction}
        />
      )}
    </>
  );
};

const DialogBioView = memo(({userInfo, open, setOpen, saveAction}) => {
  const [text, setText] = useState('');
  // const [loading, setLoading] = useState(false);
  //   console.log(userInfo);
  useEffect(() => {
    setText(userInfo?.description);
  }, [userInfo]);
  return (
    <Dialog
      useSafeArea
      width={'100%'}
      top={false}
      bottom={false}
      height={'100%'}
      panDirection={null}
      visible={open}
      onDismiss={() => {
        setOpen(false);
      }}>
      <View
        style={{
          width: '100%',
          height: '100%',
          backgroundColor: COLOR.background,
          display: 'flex',
        }}>
        <View
          style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
            borderBottomColor: COLOR.mainGraySmoke,
            borderBottomWidth: 0.5,
            padding: 16,
            paddingBottom: 24,
          }}>
          <TouchableHighlight
            underlayColor={'transparent'}
            onPress={() => {
              setOpen(false);
            }}>
            <Text style={styles.buttonText}>Hủy</Text>
          </TouchableHighlight>
          <TouchableHighlight
            underlayColor={'transparent'}
            onPress={() => {
              saveAction({description: text});
            }}>
            <>
              {/* {loading && (
                <ActivityIndicator
                  style={{position: 'absolute', right: 32, top: 2}}
                  animating={loading}
                  size="small"
                  color={COLOR.mainBlack}
                />
              )} */}
              <Text style={styles.buttonText}>Lưu</Text>
            </>
          </TouchableHighlight>
        </View>
        <View
          style={{
            paddingHorizontal: 12,
            borderBottomColor: COLOR.mainGraySmoke,
            borderBottomWidth: 0.5,
            paddingBottom: 12,
          }}>
          <TextInput
            placeholder="Hãy thêm mô tả về bạn để mọi người hiểu rõ hơn nhé!"
            value={text}
            onChangeText={setText}
            maxLength={101}
          />
        </View>
        <Text
          style={{
            width: '100%',
            textAlign: 'right',
            color: 'black',
            paddingHorizontal: 16,
          }}>
          {text?.length} /101
        </Text>
      </View>
    </Dialog>
  );
});

const DialogDetailView = memo(({userInfo, open, setOpen, saveAction}) => {
  //   console.log(userInfo);
  // const [loading, setLoading] = useState(false);
  const [birthday, setBirthday] = useState(
    userInfo?.birthday ? userInfo?.birthday.substring(0, 10) : '',
  );
  const [value, setValue] = useState({});
  useEffect(() => {
    setValue({
      username: userInfo?.username,
      address: userInfo?.address,
      city: userInfo?.city,
      gender:
        userInfo?.gender && ['male', 'female'].includes(userInfo?.gender)
          ? userInfo?.gender
          : 'male',
    });
  }, [userInfo]);
  //   console.log(username);
  return (
    <>
      <Dialog
        useSafeArea
        width={'100%'}
        top={false}
        bottom={false}
        height={'100%'}
        panDirection={null}
        visible={open}
        onDismiss={() => {
          setOpen(false);
        }}>
        <View
          style={{
            width: '100%',
            height: '100%',
            backgroundColor: COLOR.background,
            display: 'flex',
          }}>
          <View
            style={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'space-between',
              borderBottomColor: COLOR.mainGraySmoke,
              borderBottomWidth: 0.5,
              padding: 16,
              paddingBottom: 24,
            }}>
            <TouchableHighlight
              underlayColor={'transparent'}
              onPress={() => {
                setOpen(false);
              }}>
              <Text style={styles.buttonText}>Hủy</Text>
            </TouchableHighlight>
            <TouchableHighlight
              underlayColor={'transparent'}
              onPress={() => {
                saveAction(value);
              }}>
              <>
                {/* {loading && (
                  <ActivityIndicator
                    style={{position: 'absolute', right: 32, top: 2}}
                    animating={loading}
                    size="small"
                    color={COLOR.mainBlack}
                  />
                )} */}
                <Text style={styles.buttonText}>Lưu</Text>
              </>
            </TouchableHighlight>
          </View>
          <View style={styles.infoField}>
            <Text style={styles.labelText}>Họ tên:</Text>
            <TextInput
              placeholder="Tên của bạn là gì"
              value={value?.username}
              onChangeText={v => setValue({...value, username: v})}
              maxLength={101}
            />
          </View>
          <RadioGroup
            initialValue={
              ['male', 'female'].includes(value?.gender)
                ? value?.gender
                : 'male'
            }
            onValueChange={v => setValue({...value, gender: v})}
            style={styles.infoField}>
            <FontAwesomeIcon icon={faUser} />
            <Text style={styles.labelText}>Giới tính:</Text>
            <View
              style={{
                padding: 12,
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-around',
                flex: 1,
              }}>
              <RadioButton value={'male'} label={'Nam'} />
              <RadioButton value={'female'} label={'Nữ'} />
            </View>
          </RadioGroup>
          {/* <View style={styles.infoField}>
            <View
              style={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                paddingVertical: 16,
              }}>
              <FontAwesomeIcon icon={faCakeCandles} />
              <Text style={styles.labelText}>{'Ngày sinh: ' + birthday} </Text>
            </View>

            <DateTimePicker
              title={'Chọn ngày sinh'}
              placeholder={birthday}
              onChange={v => {
                console.log(v.toISOString().substring(0, 10));
                setBirthday(v.toISOString().substring(0, 10));
              }}
              maximumDate={new Date('2010-01-31')}
              value={new Date('2010-01-01')}
              mode={'DATE'}
              dateFormat={'DD.MM.YYYY'}
              renderInput={() => (
                <FontAwesomeIcon
                  icon={faCalendarDay}
                  style={{marginLeft: 6, color: COLOR.mainBlue}}
                />
              )}
              dismiss
            />
          </View> */}
          <View style={styles.infoField}>
            <FontAwesomeIcon icon={faLocationDot} />
            <Text style={styles.labelText}>Địa chỉ:</Text>
            <TextInput
              placeholder="Nơi bạn đang sinh sống"
              value={value?.city}
              onChangeText={v => setValue({...value, city: v})}
              maxLength={101}
            />
          </View>
          <View style={styles.infoField}>
            <FontAwesomeIcon icon={faHouse} />
            <Text style={styles.labelText}>Thành phố:</Text>
            <TextInput
              placeholder="Bạn đến từ đâu"
              value={value?.address}
              onChangeText={v => setValue({...value, address: v})}
              maxLength={101}
            />
          </View>
        </View>
      </Dialog>
    </>
  );
});
const styles = StyleSheet.create({
  buttonText: {
    fontSize: 18,
    color: COLOR.mainBlack,
    fontWeight: '400',
  },
  labelText: {
    fontSize: 16,
    color: COLOR.mainBlack,
    fontWeight: '600',
    marginLeft: 6,
  },
  infoField: {
    marginHorizontal: 16,
    borderBottomColor: COLOR.mainGraySmoke,
    borderBottomWidth: 0.5,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 6,
  },
});
export default memo(UpdateInfoComponent);
