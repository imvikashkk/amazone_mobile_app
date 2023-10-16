import { StyleSheet, Text, View } from 'react-native'
import React, {memo} from 'react'
import { NavigationContainer } from '@react-navigation/native'
import StackNavigator from './StackNavigator'

const Navigation = () => {
  return (
    <NavigationContainer >
      <StackNavigator />
    </NavigationContainer>
  )
}

export default memo(Navigation)

const styles = StyleSheet.create({})