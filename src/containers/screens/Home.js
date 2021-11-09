import React, {useEffect} from 'react';
import {
  View,
  Text,
  FlatList,
  ActivityIndicator,
  TouchableHighlight,
  StyleSheet,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import apiCall from '../stores/actions/ApiActionCreator';
import _ from 'lodash';

const HomeScreen = ({navigation}) => {
  const dispatch = useDispatch();
  const dict = useSelector(state => state.apiReducer.dict);
  const mechanics = useSelector(state => state.apiReducer.mechanics);

  const loading = useSelector(state => state.apiReducer.loading);
  useEffect(() => {
    dispatch(
      apiCall(
        'https://omgvamp-hearthstone-v1.p.rapidapi.com/cards/sets/Classic',
      ),
    );
  }, []);

  const ListViewItemSeparator = () => {
    return (
      //List Item separator View
      <View style={styles.seperator} />
    );
  };

  const renderHeader = () => {
    //View to set in Header
    return (
      <View style={styles.header_footer_style}>
        <Text style={styles.textStyle}> Mechanics List </Text>
      </View>
    );
  };

  return (
    <View style={styles.outerContainer}>
      {loading ? (
        <ActivityIndicator size="large" color="red" />
      ) : (
        <View style={styles.innerContainer}>
          <FlatList
            data={mechanics}
            ItemSeparatorComponent={ListViewItemSeparator}
            ListHeaderComponent={renderHeader}
            renderItem={({item}) => (
              <TouchableHighlight
                onPress={() => {
                  navigation.navigate('Details', {
                    dict: dict,
                    currentMechanic: item,
                  });
                }}
                underlayColor="green">
                <Text style={{fontSize: 24}}>{item}</Text>
              </TouchableHighlight>
            )}
            keyExtractor={item => item}
            style={{flex: 1, flexDirection: 'column', padding: 20}}
          />
        </View>
      )}
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  header_footer_style: {
    width: '100%',
    height: 45,
    backgroundColor: '#4774bc',
  },
  textStyle: {
    textAlign: 'center',
    color: '#fff',
    fontSize: 18,
    padding: 7,
  },
  seperator: {
    height: 0.5,
    width: '100%',
    backgroundColor: '#606070',
  },
  outerContainer: {
    flex: 1,
    backgroundColor: 'white',
    justifyContent: 'center',
  },
  innerContainer: {
    flex: 1,
    paddingTop: 5,
  },
});
