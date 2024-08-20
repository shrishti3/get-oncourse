import { StyleSheet } from 'react-native';

export default StyleSheet.create({
    landingSection:{
        flex:1,
        backgroundColor:'#167ADF',
    },
  logoSection: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor:'#167ADF',

  },
  textSection: {
    fontSize: 40,
    fontWeight:"bold",
    color: 'white'
  },

  logoTitleTxt:{
    fontSize: 40,
    color: '#d1e5f9'
  },

  logoImg:{
    height:40,
    width:40
  }
  ,
  titleDiv:{
    display:"flex",
    flexDirection:"row",
    justifyContent:"space-between",
    alignItems:"center",
    gap:"1rem"
  },

});


