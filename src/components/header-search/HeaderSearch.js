import {COLOR} from '../../constants/constants';
import {faArrowLeft} from '@fortawesome/free-solid-svg-icons/faArrowLeft';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {StyleSheet, TouchableHighlight, View} from 'react-native';
import InputBar from '../input-bar';

const HeaderSearch = ({setSearchKeyword, actionFn}) => {
  return (
    <View style={styles.container}>
      <TouchableHighlight
        underlayColor={COLOR.mainGraySmoke}
        onPress={() => {
          // navigation.goBack();
        }}
        style={{
          padding: 12,
          borderRadius: 32,
        }}>
        <FontAwesomeIcon icon={faArrowLeft} />
      </TouchableHighlight>
      <InputBar
        placeholder={'Tìm kiếm'}
        setInput={setSearchKeyword}
        actionFn={actionFn}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  searchBar: {
    marginHorizontal: 16,
    marginVertical: 4,
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#e1e1e1',
    flex: 1,
    borderRadius: 50,
  },
});
export default HeaderSearch;
