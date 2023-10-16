import { StyleSheet, Text, ScrollView, Pressable, Image, Dimensions} from 'react-native'
import React, {memo} from 'react'
import categoryList from '../data/categoryList' 
import { useNavigation } from '@react-navigation/native'


const screenWidth = Dimensions.get("window").width
const Category = () => {
  const navigation = useNavigation();
  return (
    <ScrollView horizontal showsHorizontalScrollIndicator={false}>
      {
        categoryList.map((item, index)=>{
          return <Pressable key={index} style={{
            marginHorizontal:5, justifyContent:"center", alignItems:"center", marginVertical:5
          }}
          onPress={()=> navigation.navigate("SearchItem", {search: item?.title})}
          >
            <Image style={{width:screenWidth/9, height:screenWidth/9, resizeMode:"contain"}} source={item?.image} />
            <Text style={{
              textAlign:"center",
              fontSize:11,
              fontWeight:"500",
              marginTop:1
            }}>{item?.title}</Text>
          </Pressable>
        })
      }
    </ScrollView>
  )
}

export default memo(Category)

const styles = StyleSheet.create({})