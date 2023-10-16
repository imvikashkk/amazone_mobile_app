import { StyleSheet, Text, View, Dimensions, Pressable } from 'react-native'
import React, {memo} from 'react'
import { AntDesign } from '@expo/vector-icons';


const Proceding = ({step, setStep}) => {
    const screenWidth = Dimensions.get("window").width
    const lineWidth = (screenWidth-185)/3
  return (
    <View style={{flexDirection:"row", paddingVertical:10, paddingHorizontal:24, backgroundColor:"white"}}>

    {/* First step */}
    <Pressable style={{alignItems:"center", width: 55}}>
        <View style={{borderWidth:1, height:20, width:20, borderRadius:10, borderColor:"#005334", justifyContent:"center", alignItems:"center" }}>
            {
                step === 1 ? (
                    <View style={{height:13, width:13, borderRadius:6.5, backgroundColor:"#005334"}} />
                )
                :(
                    <AntDesign name="check" size={15} color="#005334" />
                )
            }
        </View>
        <Text style={{color:"#005334"}}>Address</Text>
    </Pressable>
    <Text style={{borderTopWidth:0.5, width:lineWidth, marginTop:10, color:"#005334", marginHorizontal:-15}} />

    {/* Second step */}
    <View style={{alignItems:"center", width: 55}}>
        <View style={{borderWidth:1, height:20, width:20, borderRadius:10, borderColor:"#005334", justifyContent:"center", alignItems:"center" }}>
          {
            step < 2 ? null : (step === 2 ? (
                <View style={{height:13, width:13, borderRadius:6.5, backgroundColor:"#005334"}} />
            ) : (
                <AntDesign name="check" size={15} color="#005334" />
            ))
          }
        </View>
        <Text style={{color:"#005334"}}>Delivery</Text>
    </View>
    <Text style={{borderTopWidth:0.5, width:lineWidth, marginTop:10, color:"#005334", marginHorizontal:-15}} />

    {/* Third Step */}
    <View style={{alignItems:"center", width: 55}}>
        <View style={{borderWidth:1, height:20, width:20, borderRadius:10, borderColor:"#005334", justifyContent:"center", alignItems:"center" }}>
         {
            step < 3 ? null : (step === 3 ? (
                <View style={{height:13, width:13, borderRadius:6.5, backgroundColor:"#005334"}} />
            ) : (
                <AntDesign name="check" size={15} color="#005334" />
            ))
          }
        </View>
        <Text style={{color:"#005334"}}>Payment</Text>
    </View>
    <Text style={{borderTopWidth:0.5, width:lineWidth, marginTop:10, color:"#005334", marginLeft:-15, marginRight:-28}} />

    {/* Fourth Step */}
    <View style={{alignItems:"center", width: 80}}>
        <View style={{borderWidth:1, height:20, width:20, borderRadius:10, borderColor:"#005334", justifyContent:"center", alignItems:"center" }}>
        {
            step < 4 ? null : (step === 4 ? (
                <View style={{height:13, width:13, borderRadius:6.5, backgroundColor:"#005334"}} />
            ) : (
                <AntDesign name="check" size={15} color="#005334" />
            ))
          }
        </View>
        <Text style={{color:"#005334"}}>Place Order</Text>
    </View>

</View>
  )
}

export default memo(Proceding)

const styles = StyleSheet.create({})