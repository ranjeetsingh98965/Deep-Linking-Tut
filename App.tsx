import React, {useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Home from './pages/Home';
import ProductDetails from './pages/ProductDetails';
import dynamicLinks from '@react-native-firebase/dynamic-links';
import {useNavigation} from '@react-navigation/native';

const App = () => {
  const Stack = createNativeStackNavigator();

  const HandleDeepLinking = () => {
    const {navigate} = useNavigation();
    const handleDynamicLinks = async link => {
      console.log('Foreground link handling:', link);
      // let productId = link.url.split('productId=').pop();
      let productId = link.url.split('screen=').pop();
      console.log('After Split link handling:', link);

      console.log('productId::', productId);
      let test = String(productId);
      navigate(test, {productId: productId});
      // navigate('ProductDetails', {productId: productId});
    };
    useEffect(() => {
      const unsubscribe = dynamicLinks().onLink(handleDynamicLinks);
      return () => unsubscribe();
    }, []);
    return null;
  };
  return (
    <NavigationContainer>
      <HandleDeepLinking />

      <Stack.Navigator>
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="ProductDetails" component={ProductDetails} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
