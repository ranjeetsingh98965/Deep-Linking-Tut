import React, {useEffect, useState} from 'react';
import {View, Text, TouchableOpacity, TextInput, Share} from 'react-native';
import dynamicLinks from '@react-native-firebase/dynamic-links';

const ProductDetails = ({route}) => {
  const {productId} = route.params;
  console.log('productId -> ' + productId);

  const [link1, setLink] = useState('');

  useEffect(() => {}, [link1]);

  const generateLink = async () => {
    try {
      const link = await dynamicLinks().buildShortLink(
        {
          // link: `https://deeplinkingdemoo.page.link/rniX?screen=ProductDetails&&productId=${productId}`,
          link: `https://deeplinkingdemoo.page.link/rniX?screen=Home`,
          domainUriPrefix: 'https://deeplinkingdemoo.page.link',
          android: {
            packageName: 'com.deeplinkingdemo',
          },
        },
        dynamicLinks.ShortLinkType.DEFAULT,
      );
      console.log('link:', link);
      setLink(link);
      return link;
    } catch (error) {
      console.log('Generating Link Error:', error);
    }
  };

  const shareProduct = async () => {
    const getLink = await generateLink();
    try {
      Share.share({
        message: getLink,
      });
    } catch (error) {
      console.log('Sharing Error:', error);
    }
  };

  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Text>ProductDetails</Text>
      <Text>productId : {productId}</Text>

      <TextInput
        placeholder="link"
        value={link1}
        style={{
          width: '90%',
          height: 60,
          backgroundColor: 'skyblue',
          borderRadius: 10,
          padding: 8,
          marginTop: 10,
        }}
      />

      <TouchableOpacity
        onPress={() => generateLink()}
        style={{
          width: 100,
          height: 40,
          backgroundColor: 'green',
          borderRadius: 15,
          justifyContent: 'center',
          alignItems: 'center',
          marginTop: 20,
        }}>
        <Text style={{color: '#fff'}}>Generate Link</Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => shareProduct()}
        style={{
          width: 100,
          height: 40,
          backgroundColor: 'green',
          borderRadius: 15,
          justifyContent: 'center',
          alignItems: 'center',
          marginTop: 20,
        }}>
        <Text style={{color: '#fff'}}>Share</Text>
      </TouchableOpacity>
    </View>
  );
};

export default ProductDetails;
