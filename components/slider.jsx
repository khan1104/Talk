// Slider.js

import { useNavigation } from 'expo-router';
import React, { useState, useRef } from 'react';
import { View, FlatList, Image, Dimensions, StyleSheet, Text, TouchableOpacity, Pressable, SafeAreaView } from 'react-native';
import { ZoomIn, ZoomOut } from 'react-native-reanimated'
import Animated from 'react-native-reanimated';

// Sample data for the slider
const DATA = [
  { id: '0', source: require('.././assets/images/firts1.png') },
  { id: '1', source: require('.././assets/images/second (2).png') },
  { id: '2', source: require('.././assets/images/third1.png') },
];

const { width, height } = Dimensions.get('window'); // Get the width of the screen


const Slider = () => {
  const navigation = useNavigation();
  const [currentSlide, setCurrentSlide] = useState(0);
  const flatListRef = useRef(null);

  const viewConfigRef = useRef({ viewAreaCoveragePercentThreshold: 50 });
  const handleViewableItemsChanged = useRef(({ viewableItems }) => {
    if (viewableItems.length > 0) {
      setCurrentSlide(viewableItems[0].index);
    }
  }).current;
  const handleNextSlide = () => {
    const nextIndex = (currentSlide + 1) % DATA.length;
    flatListRef.current.scrollToIndex({ index: nextIndex, animated: true });
    setCurrentSlide(nextIndex);
  };
  const handleGetStarted = () => {
    // Add your "Get Started" logic here
    navigation.replace('auth/login');
  };

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={DATA}
        keyExtractor={(item) => item.id}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
        bounces={false}
        renderItem={({ item }) => (
          <Image source={item.source} style={styles.image} />

        )}
        onViewableItemsChanged={handleViewableItemsChanged}
        viewabilityConfig={viewConfigRef.current}
        ref={flatListRef}
        removeClippedSubviews

      />

      <View style={{
        flexDirection: "row",
        justifyContent: "center",
        marginBottom:50,
      }}>
        {
          DATA.map((_, index) => (
            <View key={index} style={[styles.indicator, currentSlide == index &&
            {
              backgroundColor: "black",
              width: 20
            }
            ]} />
          ))
        }
      </View>
      {currentSlide === DATA.length - 1 && (
        <Animated.View entering={ZoomIn} style={{
          height: 150,
          alignItems: "center"
        }}>
          <Pressable style={styles.getStartedButton} onPress={handleGetStarted}>
            <Text style={styles.getStartedText}>Get Started</Text>
          </Pressable>
        </Animated.View>
      )}
      {currentSlide < DATA.length - 1 && (
        <Pressable style={[styles.arrorbutton, styles.arrow]}
          onPress={handleNextSlide}>
          <Image source={require(".././assets/images/right-arrow.png")} style={{
            height: 50,
            width: 50,
          }} />
        </Pressable>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    // width: width,
    flex: 1,
    backgroundColor: "#e6f7fa",
  },
  image: {
    marginTop: 40,
    // width: width,
    // height: 550,
    width:width,
    height:530
  },
  indicator: {
    height: 4,
    width: 10,
    backgroundColor: "grey",
    marginHorizontal: 3,
    borderRadius: 5,
  },
  arrorbutton: {
    width: 100,
    height: 100,
    borderRadius: 100,
    padding: 25,
    marginLeft: 130,
    marginBottom: 50,
    backgroundColor: "#e6f7fa"
  },
  arrow: {
    elevation: 20,
    shadowColor: "black"
  },
  getStartedButton: {
    height: 65,
    width: 180,
    borderRadius: 20,
    backgroundColor: "#e6f7fa",
    elevation: 20,
    shadowColor: "black",
    justifyContent: "center",
    alignItems: "center"
  },
  getStartedText: {
    fontSize: 25,
    color: "black",
    fontWeight: "500",
    letterSpacing: 1
  },
});

export default Slider;

