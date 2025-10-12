import React from 'react'
import { KeyboardAvoidingView, ScrollView, Text, View } from 'react-native'


const Home = () => {
  return (
    <ScrollView>
        <KeyboardAvoidingView>
            <View>
              <Text>Hello home</Text>
            </View>
        </KeyboardAvoidingView>
    </ScrollView>
  )
}

export default Home