import { StyleSheet, Text, View , Image} from 'react-native'
import React, {memo} from 'react'
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import { Foundation } from '@expo/vector-icons';

const BottomSheetPaymentContent = () => {
  return (
    <View style={{flex:1, backgroundColor:"white", margin:10}}>
      <Text style={{alignSelf:"center", fontSize:15, fontWeight:"500"}}>Do more with Amazone</Text>


      <View style={{
        flexDirection:"row", backgroundColor:"rgb(244, 240, 240)", justifyContent:"space-around", padding:28,
        borderRadius:10, elevation:3, marginTop:20,borderWidth:0.4, borderColor:"#a6a6a6"
        }}>
        <View style={{alignItems:"center", gap:10}}>
            <Image style={{height:60, width:60, borderRadius:30}} source={require("../assets/amazon-pay.png")} />
            <Text style={{textAlign:"center", fontSize:15, fontWeight:"500"}}>Pay Anyone,{'\n'}Anywhere</Text>
        </View>
        <View style={{alignItems:"center", gap:10}} >
            <Image style={{height:60, width:60, borderRadius:30}} source={require("../assets/category/minitv.jpeg")} />
            <Text style={{textAlign:"center", fontSize:15, fontWeight:"500"}}>Free {"\n"}Entertainment</Text>
        </View>
      </View>


      <View style={{flexDirection:"row", justifyContent:"space-around", marginTop:25}}>

        <View style={{alignItems:"center", gap:14}}>
        <MaterialCommunityIcons name="qrcode-scan" size={35} color="#245e5e" />
        <Text style={{textAlign:"center"}}>Scan QR to{"\n"}Pay</Text>
        </View>

        <View style={{alignItems:"center", gap:14}}>
        <AntDesign name="contacts" size={35} color="#245e5e" />
        <Text style={{textAlign:"center"}}>Pay Mobile{"\n"}Number</Text>
        </View>

        <View style={{alignItems:"center", gap:14}}>
        <Foundation name="clipboard-notes" size={35} color="#245e5e" />
        <Text style={{textAlign:"center"}}>Bills &{"\n"}Recharges</Text>
        </View>

      </View>


    </View>
  )
}

export default memo(BottomSheetPaymentContent)

const styles = StyleSheet.create({})