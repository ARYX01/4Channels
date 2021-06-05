import React, { Component, useState } from 'react';
//import { createStore } from 'redux';
//import { Provider, connect } from 'react-redux';

import {View} from 'react-native';

import AsyncStorage from '@react-native-async-storage/async-storage';
import Splash from './splash.js';
import Timer from './timer.js';


class App extends Component {
	constructor() {
		super()
		
		this.state = { loaded:false }
		this.loadApp = this.loadApp.bind(this)
		this.state.data = null
		this.loadConfig();
	}
	
	async loadConfig() {
		try {
			let value	= await AsyncStorage.getItem('config');
			if (value !== null) {
				console.log("load cfg start")
				var cfg = JSON.parse(value);
				//console.log(cfg);
				this.setState({ data: cfg});
			}
		} catch (e) {
			console.log("error"+e)
		}
	}
	
	loadApp(done){
		if(done)
			this.setState({ loaded:true });
	}
	
	render() {
	return(
		<>{this.state.loaded?<Timer data={this.state.data}/>:<Splash onFinish={this.loadApp} />}</>
	);
	}
}

export default App;
