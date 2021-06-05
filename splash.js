import React, { useState, useEffect, useRef } from 'react';
import { Animated, View, Image, Dimensions, StyleSheet } from 'react-native';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const circleSize=150;
const poz=circleSize*2-(circleSize*2/5);


export default function Splash(props){

	const translationDown = useRef(new Animated.Value(-2*circleSize)).current;
	const translationUp = useRef(new Animated.Value(windowHeight+circleSize*2)).current;
	const grow = useRef(new Animated.Value(1)).current;
	const show = useRef(new Animated.Value(0)).current;

	useEffect(() => {
		Animated.sequence([
			Animated.parallel([
				Animated.timing(translationDown, {
					toValue: windowHeight-poz,
					duration: 3000,
					useNativeDriver: true
				}),
				Animated.timing(translationUp, {
					toValue: poz,
					duration: 3000,
					useNativeDriver: true
				})
			]),
			Animated.parallel([
				Animated.spring(grow, {
					toValue: 15,
					speed:6,
					bounciness:15,
					useNativeDriver: true
				}),
				Animated.spring(show, {
					toValue: 1,
					duration: 500,
					useNativeDriver: true
				})
			])
		]).start(() => {
			console.log("Animation DONE");
			props.onFinish(true);
		});
	}, []);

	return (
    <View style={{maxHeight:windowHeight}}>
			
		<Animated.View /*upper circles*/ style={{
			zIndex:1,
			flex:1,
			alignItems:"center",
			transform: [{ translateY: translationDown }],
		}}>
			<View style={[styles.circle, {backgroundColor: '#ffa67c'} ]}/>
			<View style={[styles.circle, {backgroundColor: '#249ffc'} ]}/>
		</Animated.View>

		<Animated.View /*bottom circles*/ style={{
			zIndex:1,
			flex:1,
			justifyContent:"flex-end",
			alignItems:"center",
			transform: [{ translateY: translationUp }],
		}}>
			<View style={[styles.circle, {backgroundColor: '#c4c4c4'} ]}/>
			<View style={[styles.circle, {backgroundColor: '#0075d2'} ]}/>
		</Animated.View>
		
		<Animated.Image
			style={[styles.image, {transform: [{ scale: grow }], opacity:show} ]}
			source={require('./logo-full.png')}
		/>
		
	</View>
	);

}//SplashScreen
const styles = StyleSheet.create({
	image: {
		shadowColor: "black",
		shadowRadius: 5,
		shadowOffset: {
			width: 3,
			height: 4,
		},
		shadowOpacity: 0.35,		
		position: 'absolute',
		zIndex:3,
		left: windowWidth/2-8,
		top: windowHeight/2-10,
		resizeMode: 'contain',
		height: 20,
		width: 20,
	},
	circle: {
		opacity:0.3,
		width: circleSize,
		aspectRatio:1,
		backgroundColor: 'blue',
		borderRadius: circleSize/2,
	}
});
