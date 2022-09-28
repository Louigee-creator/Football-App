import { StyleSheet, Text, TouchableOpacity, View, Image, FlatList, ScrollView, ActivityIndicator } from 'react-native'
import React, { useState, useEffect } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import images from '../constants/images'
import icons from '../constants/icons'
import { AntDesign } from '@expo/vector-icons';
import Tabs from '../navigation/tabs'
import { getNewsData } from '../api'


const Home = ({ navigation }) => {

    const gameType = [
        {
            id: 1,
            name: "Football",
            icon: icons.football,
        },
        {
            id: 2,
            name: "Basketball",
            icon: icons.basketball,
        },
        {
            id: 3,
            name: "Rugby",
            icon: icons.rugby,
        },
        {
            id: 4,
            name: "Baseball",
            icon: icons.ball,
        },
    ]

    const [games, setGames] = useState(gameType)
    const [news, setNews] = useState(null)
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        setLoading(true);
        getNewsData().then((data) => {
          console.log(data);
      
          setNews(data);
          setLoading(false);
        })
      }, [])

      console.log(news)

  if(loading || !news) {
    return <ActivityIndicator size='large' />
  }
  
      
      
   
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
                <Text style={{fontSize: 20, fontWeight: '500'}}>Live Score</Text>
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


    //Icons
    function renderGames(){
        const renderItem = ({item}) => {
            return (
                <TouchableOpacity style={{
                   backgroundColor: '#fff',
                   borderRadius: 40,
                   alignItems: 'center',
                   justifyContent: 'center',
                   marginRight: 25,
                //    borderRightWidth: (selectedGame?.id == item.id ? 2 : 0)
                }}
                // onPress={() => onSelectGame(item)}
                >
                    <View style={{
                        width: 65,
                        height: 40,
                        alignItems: 'center',
                        justifyContent: 'center'

                        
                    }}>
                        <Image 
                            source={item.icon}
                            resizeMethod='contain'
                            style={{
                                width: 24,
                                height: 24,
                            }}
                        />
                    </View>
                </TouchableOpacity>
            )
        }
        return (
            <View style={{paddingTop: 20}}>
                <FlatList 
                    data={games}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    renderItem={renderItem}
                    keyExtractor={(item) => item.id}
                    showsVerticalScrollIndicator={false}

                />
            </View>
        )
    }

    function renderNews(){
        const renderItem = ({item}) => {

            const {
                id,
                mainMedia : {thumbnail : { alt }}
            } = item
            return (
                <TouchableOpacity style={{
                    marginTop: 30,
                    position: 'relative',        
                }}
                onPress={() => navigation.navigate('NewsDetails', {newsId: id})}
                >
                    <View style={{
                        position: 'absolute',
                        bottom: 10,
                        paddingHorizontal: 25,
                        zIndex: 1,
                    }}>
                        <Text style={{color: '#fff', marginBottom: 10, fontStyle: 'italic', fontSize: 12}}>News</Text>
                        <Text style={{
                            color: '#fff',
                            fontSize: 18,
                            fontWeight: 'bold',
                            marginBottom: 10
    
                        }}>
                            {alt}
                        </Text>
                        <Text style={{color: '#fff', marginBottom: 10, fontSize: 12}}>{}</Text>
                    </View>
                    <Image 
                        source={{url : item.mainMedia.gallery.url}}
                        resizeMethod="contain"
                        style={{
                            width: 350,
                            height: 250,
                            borderRadius: 20,
                            alignSelf: 'center'
    
                        }}
                    />
                </TouchableOpacity>
            )
        }


        return (
            <View>
                <FlatList 
                    data={news}
                    renderItem={renderItem}
                    keyExtractor={(item) => item.id}
                    showsVerticalScrollIndicator={false}
                />
            </View>
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
        {renderGames()}
        {renderNews()}
             
    </SafeAreaView>
  )
}

export default Home

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
      },
})