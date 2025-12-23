import { Dimensions, View, Text, Image, ScrollView, Pressable } from 'react-native';
import { useFonts } from 'expo-font';
import { useScreenWidth } from '../hooks/useScreenWidth';

export default function Home() {

  const screen = useScreenWidth();

  const { width } = Dimensions.get('window');

  const [fontsLoaded] = useFonts({
    'Poppins-Regular': require('../assets/fonts/Poppins-Regular.ttf'),
    'Poppins-Bold': require('../assets/fonts/Poppins-Bold.ttf'),
  });

  if (!fontsLoaded) return null;

  return (
    <ScrollView className="h-auto w-screen flex-col items-center justify-start bg-[#FEAE1A]">

      <View className="w-auto py-[calc(0.4vw+0.6rem)] px-[calc(0.6vw+0.8rem)] flex-row items-center justify-start">    
        <View className="flex-1 flex-row items-center justify-start gap-[calc(0.4vw+0.3rem)]">
          <Image source={require('../assets/imgs/Logo.png')} style={{height: 48, width: 48}}></Image>
          <Text style={{ fontFamily: 'Poppins-Bold' }}
            className="text-black text-[calc(0.6vw+1.2rem)]">Vask</Text>
        </View>
        <View className="flex-1 flex-row items-center justify-end gap-[calc(0.4vw+0.3rem)]">
          <Pressable>
            <Text style={{ fontFamily: 'Poppins-Bold' }}
              className="text-black text-[calc(0.4vw+0.6rem)]">Go to Docs</Text>
          </Pressable>
          <Pressable>
            <Text style={{ fontFamily: 'Poppins-Bold' }}
              className="text-[#FEAE1A] bg-black px-[calc(0.4vw+0.6rem)] py-[calc(0.4vw+0.3rem)] rounded-full text-[calc(0.4vw+0.6rem)]">Download App</Text>
          </Pressable>
        </View>
      </View>

      <View className="h-screen w-screen flex-col p-6 items-center justify-center">
        <Text style={{ fontFamily: 'Poppins-Bold' }}
          className="text-black text-[4rem] text-center mt-[-100px] z-10">Stay on track</Text>
        <Image source={require('../assets/gifs/Parcel.gif')} style={{height: 600, width: 600, marginTop: -136, zIndex: 1}} resizeMode="contain"></Image>
        <Text style={{ fontFamily: 'Poppins-Regular' }}
          className="text-black text-[calc(0.4vw+0.9rem)] text-center mt-[-100px] z-10">Vask is a smart and modern vehicle management system designed to make managing vehicles easier, faster, and more efficient.</Text>

      </View>

      <View className="h-auto w-screen flex-col items-center justify-between bg-black">

        <View className="w-screen flex-col p-6 gap-6 flex-col items-center justify-center">
          <Text style={{ fontFamily: 'Poppins-Bold' }}
            className="text-[calc(2.4vw+2.8rem)] my-[6rem] text-center text-[#FEAE1A]">Built with simplicity and precision</Text>
        </View> 

        <View className={`${screen <= 480? 'flex-col items-center justify-center' : 'flex-wrap flex-row items-start justify-start'}
          w-[96%] flex-row p-6 gap-6 border border-t-white`}>
          
          <View className="flex-col items-start gap-3">
            <Image source={require('../assets/imgs/Madlogic.png')}  
              style={{height: 128, width: 128}} ></Image>
          </View>
          <View className="flex-col items-start gap-3">
            <Text style={{ fontFamily: 'Poppins-Bold' }}
              className={`${screen <= 480? 'w-full' : ''} text-[calc(0.4vw+0.9rem)] text-center text-[#FEAE1A]`}>Made by</Text>
            <Text style={{ fontFamily: 'Poppins-Bold' }}
              className="text-[calc(0.6vw+1rem)] text-center text-white">Mad Logic Studio</Text>
          </View>

          <View className={`${screen <= 480? 'ml-0 items-center' : 'flex-1 ml-24 items-start'} flex-col gap-3`}>
            <Text style={{ fontFamily: 'Poppins-Bold' }}
              className="text-[calc(0.4vw+0.8rem)] text-center text-[#FEAE1A]">Our Services</Text>
            <Text style={{ fontFamily: 'Poppins-Regular' }}
              className="text-[calc(0.4vw+0.6rem)] text-center text-white">About Us</Text>
            <Text style={{ fontFamily: 'Poppins-Regular' }}
              className="text-[calc(0.4vw+0.6rem)] text-center text-white">Our Work</Text>
            <Text style={{ fontFamily: 'Poppins-Regular' }}
              className="text-[calc(0.4vw+0.6rem)] text-center text-white">Help Center</Text>
            <Text style={{ fontFamily: 'Poppins-Regular' }}
              className="text-[calc(0.4vw+0.6rem)] text-center text-white">Talk to Us</Text>
          </View>

          <View className={`${screen <= 480? 'items-center' : 'flex-1 items-start'} flex-col gap-3`}>
            <Text style={{ fontFamily: 'Poppins-Bold' }}
              className="text-[calc(0.4vw+0.8rem)] text-center text-[#FEAE1A]">Our Team</Text>
            <Text style={{ fontFamily: 'Poppins-Regular' }}
              className="text-[calc(0.4vw+0.6rem)] text-center text-white">Terms of Use</Text>
            <Text style={{ fontFamily: 'Poppins-Regular' }}
              className="text-[calc(0.4vw+0.6rem)] text-center text-white">Contact Us</Text>
          </View>

          <View className={`${screen <= 480? 'items-center' : 'flex-1 items-start'} flex-col gap-3`}>
            <Text style={{ fontFamily: 'Poppins-Bold' }}
              className="text-[calc(0.4vw+0.8rem)] text-center text-[#FEAE1A]">Follow Us</Text>
            <Text style={{ fontFamily: 'Poppins-Regular' }}
              className="text-[calc(0.4vw+0.6rem)] text-center text-white">Facebook</Text>
            <Text style={{ fontFamily: 'Poppins-Regular' }}
              className="text-[calc(0.4vw+0.6rem)] text-center text-white">LinkedIn</Text>
            <Text style={{ fontFamily: 'Poppins-Regular' }}
              className="text-[calc(0.4vw+0.6rem)] text-center text-white">Instagram</Text>
            <Text style={{ fontFamily: 'Poppins-Regular' }}
              className="text-[calc(0.4vw+0.6rem)] text-center text-white">Github</Text>
          </View>

        </View>
      </View>

    </ScrollView>
  );
}
