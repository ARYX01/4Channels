import { StyleSheet } from 'react-native';

export default StyleSheet.create({
	container: {
		flex:1,
		marginLeft: 10,
		marginRight: 10,
		alignItems: "center",
	},
	sectionTitle: {
		color: "#B2B2B2",
		fontSize: 20,
		fontFamily: 'ArialRoundedMT-Light',
		marginLeft:10,
	},
	title: {
		color: "#6A6A6A",
		fontFamily: 'ArialRoundedMT-Light',
		fontSize: 24,
		textAlign: "center",
		marginBottom: 20,
	},
	row: {
		flexDirection: "row",
		flexWrap: "wrap",
		justifyContent: "space-between",
		marginBottom: 30,
	},
	image: {
        resizeMode: 'contain',
        width: "100%",
        aspectRatio: 10,
		marginTop: 10,
		marginBottom: 10,
    },
	label: {
		textAlign: "center",
		fontWeight: "400",
		color: "#B2B2B2",
	},
	labelSelected: {
		color: "white",
	},
	button: {
		padding: 8,
		borderRadius: 4,
		backgroundColor: "white",	
		width:"49%",
		borderWidth:  1,
		borderColor: "black",
	},
	buttonSelected: {
		backgroundColor: "black",
		borderColor: "lightgray",
	},
	buttonSave: {
		backgroundColor: "#0075D2",
		borderRadius: 10,
		padding: 8,
	},
	buttonSaveTxt: {
		textAlign: "center",
		color: "white",
		fontSize: 24,
		fontFamily: 'Antonio-Regular',
	},
	boxWrap: {
		height: 72,
		width: "100%",
		marginTop: 10,
		marginBottom: 10,
		borderRadius: 10,
		backgroundColor: "#F9F9F7",
		shadowOffset: {
			width: 4,
			height: 4,
		},
		shadowColor: "#E5E5E5",
		shadowRadius: 4,
		elevation: 4,
		flexDirection: "row",
		justifyContent:"space-evenly",
		alignItems: "center",
	},
	boxWrapDisabled: {
		backgroundColor: "lightgray",
		borderColor: "gray",
	},
	box: {
		borderColor: "white",
		justifyContent: "center",
		borderRadius: 40/2,
		width: "12%",
		maxWidth: 40,
		aspectRatio : 1,
		backgroundColor: "#E5E5E5",
	},
	boxSelected: {
		backgroundColor: "#007AFF",
	},
	boxSelectedDisabled: {
		borderWidth: 1,
		borderColor: "#E5E5E5",
		backgroundColor: "lightgray",
	},
	boxTxt: {
		color: "#6A6A6A",
		fontFamily: 'ArialRoundedMT-Regular',
		fontSize: 36,
		flex: 1,
		textAlignVertical: "center"
	},
	boxFull: {
		flex:1,
		justifyContent: "center",
	},
	radioBox:{
		flexDirection: "row",
		alignItems: "center",
	},
	radioLabel:{
		fontFamily: 'ArialRoundedMT-Light',
		fontSize: 20,
		marginLeft: 9,
		color: "#6A6A6A",
	},
	radioBorder:{
		borderWidth:  2,
		borderColor: "#B2B2B2",
		borderRadius: 35/2,
		width: 35,
		height: 35,
		aspectRatio : 1,
	},
	radioButton:{
		backgroundColor: "transparent",
		borderWidth:  5,
		borderColor: "transparent",
		borderRadius: 35/2,
		flex:1
	},
	radioSelected:{
		backgroundColor: "#FFA67C",
	},
	
});