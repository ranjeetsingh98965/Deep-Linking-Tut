import React, {useEffect, useState} from 'react';
import {View, Text, TouchableOpacity, FlatList} from 'react-native';
import {useNavigation} from '@react-navigation/native';

const Home = () => {
  const navigation = useNavigation();
  const [data, setData] = useState(null);

  const getApiData = async () => {
    try {
      const url = 'https://dummyjson.com/products';
      let result = await fetch(url);
      result = await result.json();
      setData(result.products);
      console.log('data from state:', data.products);
      console.log('single data:', data.brand);
    } catch (e) {
      console.log('error -> ' + e);
    }
  };

  useEffect(() => {
    getApiData();
  }, []);

  const getParamsFromUrl = url => {
    const queryString = url.split('?')[1]; // Splitting the URL to get the query string
    const params = {};

    if (queryString) {
      const keyValuePairs = queryString.split('&'); // Splitting the query string by '&'

      keyValuePairs.forEach(pair => {
        const [key, value] = pair.split('='); // Splitting each key-value pair
        params[key] = value; // Assigning key-value pairs to the 'params' object
      });
    }

    return params;
  };

  const url =
    'https://www.ixambee.com/online-course/rbi-grade-b-phase-2?id=123&sum=234&user_id=567';

  const getUrlValues = () => {
    const queryParams = getParamsFromUrl(url);
    console.log(queryParams); // Output: { id: '123', sum: '234', user_id: '234' }

    // Accessing specific parameters
    console.log(queryParams.id); // Output: '123'
    console.log(queryParams.sum); // Output: '234'
    console.log(queryParams.user_id);
  };

  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Text>Home</Text>
      <View style={{backgroundColor: 'pink', width: '100%', height: ' 50%'}}>
        {/* <FlatList
          data={data}
          renderItem={({item}) => (
            <TouchableOpacity
              onPress={() =>
                navigation.navigate('ProductDetails', {productId: item.id})
              }
              style={{
                backgroundColor: 'dodgerblue',
                borderRadius: 10,
                borderWidth: 1,
                margin: 8,
                padding: 5,
              }}>
              <Text>id : {item.id} </Text>
              <Text>title : {item.title}</Text>
            </TouchableOpacity>
          )}
        /> */}
      </View>

      <TouchableOpacity
        onPress={() => {
          // getApiData();
          getUrlValues();
          console.log('Tapped!!');
        }}
        style={{
          width: 100,
          height: 40,
          backgroundColor: 'green',
          borderRadius: 15,
          justifyContent: 'center',
          alignItems: 'center',
          marginTop: 20,
        }}>
        <Text style={{color: '#fff'}}>Get Api Data</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Home;
