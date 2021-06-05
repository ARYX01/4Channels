import React, { Component, useState } from 'react';
import {
	ScrollView,
	StyleSheet,
	Image,
	Text,
	View,
	Button,
	Pressable,
	TouchableOpacity,
	TouchableWithoutFeedback
} from 'react-native';
import styles from './style.js';
//import file from './savedConfig.json';

import AsyncStorage from '@react-native-async-storage/async-storage';

import DateTimePicker from '@react-native-community/datetimepicker';
// --Data / Time Picker--
const DatePicker = (props) => {
	const [date, setDate] = useState(new Date(props.data));
	const [mode, setMode] = useState('date');
	const [show, setShow] = useState(false);

	const onChange = (event, selectedDate) => {
		const currentDate = selectedDate || date;
		setShow(Platform.OS === 'ios');
		setDate(currentDate);
		console.log("date changed");
		props.onDateChange(Date.parse(currentDate.toISOString())); //Send selected date to app state
	};

	const showMode = (currentMode) => {
		setShow(true);
		setMode(currentMode);
	};

	const showDatepicker = () => {
		showMode('date');
	};

	const showTimepicker = () => {
		showMode('time');
	};

	return (
	  <>
		<View style={styles.container}>
			<Text style={[styles.sectionTitle, {marginLeft:0}]}> Date </Text>
			<View style={styles.boxWrap}>
				<Pressable style={styles.boxFull} onPress={showDatepicker} >
					<Text style={[styles.label, styles.boxTxt]}> {("0" + date.getDate()).slice(-2) + "/" + ("0"+(date.getMonth()+1)).slice(-2)} </Text>
				</Pressable>
			</View>
		</View>
		<View style={styles.container}>
			<Text style={[styles.sectionTitle, {marginLeft:0}]}> Time </Text>
			<View style={styles.boxWrap}>
				<Pressable style={styles.boxFull} onPress={showTimepicker} >
					<Text style={[styles.label, styles.boxTxt]}> {("0"+date.getHours()).slice(-2)+":"+("0"+date.getMinutes()).slice(-2)} </Text>
				</Pressable>
			</View>
		</View>
		{show && (
			<DateTimePicker
				minimumDate={(date.getFullYear()>"2020") ? new Date(2020, 0, 1):new Date(2000, 0, 1)}
				value={date}
				mode={mode}
				is24Hour={true}
				display="spinner"
				onChange={onChange}
			/>
		)}
	  </>
	);
};

// -- MAIN --
class Timer extends Component {

	constructor(props) {
		super(props)
		this.saved = true; //onmount nothing changed
		
		if(props.data != null){
			this.state = props.data;
		}else{
			let d = new Date()
			console.log("NO cfg loaded, new date: "+Date.parse(d.toISOString()) )
			this.state = {
				repeat: false,
				day: false,
				status: true,
				week : [{"name":"sun","on":false}, 
						{"name":"mon","on":false}, 
						{"name":"tue","on":false}, 
						{"name":"wed","on":false}, 
						{"name":"thur","on":false}, 
						{"name":"fri","on":false}, 
						{"name":"sat","on":false}],
				date : d,
				updatedKey:1
			}
		}
		this.handleDateChange = this.handleDateChange.bind(this);
		//console.log("test constructor load: done")
		//this.loadConfig(); //debug
	}
	
	componentDidUpdate(){
		this.saved ? this.saved=false:''
	}
	
	// --day of the week picker toggle--
	toggleOnDay(day){
		if(this.state.week[day].on)
			this.state.week[day].on=false;
		else
			this.state.week[day].on=true;
		this.setState({
			week: this.state.week
		});
	}
	
	/*async loadConfig() {
		try {
			let value	= await AsyncStorage.getItem('config');
			if (value !== null) {
				console.log("load cfg start")
				var cfg = JSON.parse(value);
				//console.log(cfg);
				this.setState( cfg );
				this.setState( {updatedKey:this.state.updatedKey+1} );
			}
		} catch (e) {
			console.log("error"+e)
		}
	}*/
	
	async saveConfig() {
		if(!this.saved){ //prevent saving again if nothing was changed
			this.state.updatedKey=1;
			console.log("save cfg start"+ JSON.stringify(this.state));
			try {
				await AsyncStorage.setItem('config',JSON.stringify(this.state));
				this.saved=true;
			} catch (error) {
				// Error saving data
			}
		}
	}
	// --get selected date from DateTime picker--
	handleDateChange(newDate) {
		console.log("getDate:"+newDate);
		if(newDate)
			this.setState({ date:newDate });
	}
	
	render() {
	return (
	<ScrollView>
		<View style={{ padding: 10, flex: 1 }}>
			
			<View style={styles.row}>
				<Image style={styles.image} source={require('./logo.png')} />
			</View>
			<Text style={styles.title}>Timer</Text>
			
			<Text style={styles.sectionTitle}> Repeat</Text>
			<View style={styles.row}>
				<View style={[styles.boxWrap, {flex:1, justifyContent:"space-around",}]} /* WRAPPER DIV */>
					
					<View style={styles.radioBox}>
						<View style={styles.radioBorder}>
							<Pressable 
								style={[styles.radioButton, !this.state.repeat&&styles.radioSelected]}
								onPress={ () => this.setState({ repeat: false, day:false }) }
								android_ripple={{color: 'gray', radius:20}}
							/>
						</View>
						<Text style={styles.radioLabel}>Once</Text>
					</View>
					
					<View style={styles.radioBox}>
						<View style={styles.radioBorder}>
							<Pressable
								style={[styles.radioButton, this.state.repeat&&styles.radioSelected]}
								onPress={ () => this.setState({ repeat: true, day:true }) }
								android_ripple={{color: 'gray', radius:20}}
							/>
						</View>
						<Text style={styles.radioLabel}>Repeat</Text>
					</View>
					
				</View>
				{/* <Text> {this.state.repeat ? "on -Repeat-" : "off -Once-"}! </Text> */}
			</View>
			
			
			<Text style={styles.sectionTitle}> Day</Text>
			<View style={{ flex: 1, marginBottom: 30,}} >
				<View style={[styles.boxWrap, this.state.day?'':styles.boxWrapDisabled]} /* WRAPPER DIV */> 
				
					{this.state.week.map((day, id) => (
					<Pressable
						disabled={this.state.day?false:true}
						key={id}
						style={[styles.box, day.on && styles.boxSelected, !this.state.day&&day.on && styles.boxSelectedDisabled]}
						android_ripple={{color: 'gray', radius:18}}
						onPress={ () => this.toggleOnDay(id) }
					>
						<Text style={[styles.label, day.on && styles.labelSelected]}>{day.name}</Text>
					</Pressable>
					))}
					
				</View>
			</View>
			
			<Text style={styles.sectionTitle}> Turn</Text>
			<View style={styles.row}>
				<View style={[styles.boxWrap, {flex:1, justifyContent:"space-around",}]} /* WRAPPER DIV */>
					
					<View style={styles.radioBox}>
						<View style={styles.radioBorder}>
							<Pressable 
								style={[styles.radioButton, this.state.status&&styles.radioSelected]}
								onPress={ () => this.setState({ status: true }) }
								android_ripple={{color: 'gray', radius:20}}
							/>
						</View>
						<Text style={styles.radioLabel}>ON</Text>
					</View>
					
					<View style={styles.radioBox}>
						<View style={styles.radioBorder}>
							<Pressable
								style={[styles.radioButton, !this.state.status&&styles.radioSelected]}
								onPress={ () => this.setState({ status: false }) }
								android_ripple={{color: 'gray', radius:20}}
							/>
						</View>
						<Text style={styles.radioLabel}>OFF</Text>
					</View>
					
				</View>
				{/* <Text> {this.state.status ? "on" : "off"}! </Text> */}
			</View>
			
			<View style={styles.row} /* DATE / TIME picker */>
				<DatePicker key={this.state.updatedKey} data={ this.state.date } onDateChange={this.handleDateChange}/>
			</View>
			
			<View style={{padding:6}} /* SAVE BUTTON */>
				<TouchableOpacity style={styles.buttonSave} onPress={() => this.saveConfig()} activeOpacity={0.3}>
					<Text style={styles.buttonSaveTxt}>SAVE</Text>
				</TouchableOpacity>
			</View>
			{/*<Button color="#007AFF" onPress={ () => this.saveConfig() } style={[styles.button, styles.buttonSave]} title="SAVE" />*/}
			
		</View>
	</ScrollView>
	);
	}
}

export default Timer;