import { StyleSheet, Text, TouchableOpacity, View, Image, FlatList, ScrollView, ActivityIndicator } from 'react-native'
import React, { useState, useEffect } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import images from '../constants/images'
import { AntDesign } from '@expo/vector-icons';
import Tabs from '../navigation/tabs'
import { getDetailedNewsData } from '../api'
import { useRoute } from '@react-navigation/native';

const NewsDetails = () => {
  const [newsInfo, setNewsInfo] = useState(null)
  const [loading, setLoading] = useState(false)
  const route = useRoute();
  const {params: {newsId}} = route;

  const fetchNewsData = async () => {
    setLoading(true);
    const fetchedNewsData = await getNewsData(newsId)
    setNewsInfo(fetchedNewsData)
    setLoading(false)
  }

  useEffect(() => {
    fetchNewsData()
  }, [])

    if (loading || !newsInfo ) {
      return <ActivityIndicator size="large" />
    }

    const {
      id,
      mainMedia : {thumbnail : { alt }}
  } = newsInfo

    //Header
    function renderHeader() {
      return (
          <View style={{ 
                  flexDirection: 'row',
                  paddingTop: 10,
                  alignItems: 'center',
                  justifyContent: 'space-between'
                  
              }}>
              <Image
                  source={images.profile}
                  resizeMode="contain"
                  style={{
                      width: 35,
                      height: 35,
                      borderRadius: 50
                  }}
              />
              <Text style={{fontSize: 20, fontWeight: '500'}}>News</Text>
              <TouchableOpacity style={{
                  backgroundColor: '#fff',
                  width: 40,
                  height: 40,
                  borderRadius: 50,
                  alignItems: 'center',
                  justifyContent: 'center',
              }}>
                  <AntDesign name="search1" size={22} color="black" />
              </TouchableOpacity>
          </View>
      )
  }

  function renderNewsDetails(){
      return (
         <View><Text>{id}</Text></View>
      )
  }

  return (
    <SafeAreaView 
        showsVerticalScrollIndicator={false} 
        style={{
            paddingHorizontal: 15, 
            backgroundColor: '#f5f7fb',
            marginBottom: 20
        }}>
    
        {renderHeader()}
        {renderNewsDetails()}
    </SafeAreaView>
  )
}

export default NewsDetails