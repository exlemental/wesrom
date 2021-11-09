import React, {useEffect} from 'react';
import {
  View,
  Text,
  FlatList,
  ActivityIndicator,
  TouchableHighlight,
  StyleSheet,
  Button,
  Image,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import apiCall from '../stores/actions/ApiActionCreator';
import _ from 'lodash';

const DetailsScreen = ({route, navigation}) => {
  const {dict, currentMechanic} = route.params;

  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <Text style={{fontSize: 16}}>
        Cards contains mechanic {currentMechanic}
      </Text>
      <FlatList
        numColumns={2}
        data={dict[currentMechanic]}
        renderItem={({item}) => (
          <Image
            source={{
              uri: item,
            }}
            keyExtractor={(item, index) => item}
            style={styles.imageStyle}
          />
        )}
      />
      <Button title="Go back" onPress={() => navigation.goBack()} />
    </View>
  );
};

export default DetailsScreen;

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
  imageStyle: {
    paddingTop: 10,
    width: 193,
    height: 250,
  },
});
