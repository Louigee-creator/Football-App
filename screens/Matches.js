import { StyleSheet, Text, TouchableOpacity, View, Image, FlatList, ScrollView, ActivityIndicator } from 'react-native'
import React, {useState, useEffect} from 'react'
import { getFixturesData } from '../api';
import { SafeAreaView } from 'react-native-safe-area-context'
import images from '../constants/images'
import icons from '../constants/icons'
import { AntDesign } from '@expo/vector-icons';


const Matches = ({navigation}) => {

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
const [fixtures, setFixtures] = useState(null);
const [loading, setLoading] = useState(false)

const baseURL = 'https://lsm-static-prod.livescore.com/medium/'




useEffect(() => {
  setLoading(true);
  getFixturesData().then((data) => {
    console.log(data);

    setFixtures(data);
    setLoading(false);
  })
}, [])



console.log(fixtures)

  if(loading || !fixtures) {
    return <ActivityIndicator size='large' />
  }
  

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
          <Text style={{fontSize: 20, fontWeight: '500'}}>Matches</Text>
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

          />
      </View>
  )
}


function renderFixtures(){
    const renderItem = ({item}) => {

        const {
            Cnm,
            Events : { 0 :
                {T1 : { 0 : { Nm } } },
                
            },
           
        } = item;
        return (
        
            <TouchableOpacity style={{
                marginTop: 20,
                height: 100,
                backgroundColor: '#fff',
                borderRadius: 15,
                padding: 8,
                shadowColor: '#171717',
                shadowOffset: {width: -2, height: 2},
                shadowOpacity: 0.1,
                shadowRadius: 3,
                
            }}
            onPress={() => navigation.push('Results')}
            >
            
                <Text style={{color: 'grey', fontSize: 12, textAlign: 'center'}}>{item.Cnm}</Text>
                <View style={{
                    flexDirection: 'row',
                    padding: 15,
                    alignItems: 'center',
                    justifyContent: 'space-between'
                }}>
                    <Text style={{fontWeight: '500', fontSize: 16}}>{Nm.substr(0, 10)}</Text>
                    <Image 
                            source={{url : baseURL + item.Events[0].T1[0].Img}}
                            resizeMethod="contain"
                            style={{
                                width: 30,
                                height: 30,
                                
                            }}
                    />
                    <View>
                        <Text style={{fontWeight: '500', fontSize: 16}}>VS</Text>
                        {/* <Text style={{fontSize: 12, color: 'grey', paddingVertical: 2}}>14 SEP</Text> */}
                    </View>
                    <Image 
                        source={{url : baseURL + item.Events[0].T2[0].Img}}
                        resizeMethod='contain'
                        style={{
                            width: 30,
                            height: 30,
                            borderRadius: 50,
                            
                        }}
                    />
                    <Text style={{fontWeight: '500', fontSize: 16}}>{item.Events[0].T2[0].Nm.substr(0, 10)}</Text>
                </View>
                
            </TouchableOpacity>
        )
    }
        
            
            
        
    

  return (
    <View style={{marginTop: 10}}>
        <FlatList 
            data={fixtures}
            renderItem={renderItem}
            keyExtractor={(item) => item.Sid}
            showsVerticalScrollIndicator={false}

        />
    </View>
  )
}

  return (
    <SafeAreaView style={{paddingHorizontal: 25, backgroundColor: '#f5f7fb'}}>
    
        {renderHeader()}
        {renderGames()}
        {renderFixtures()}
    </SafeAreaView>
  )
}

export default Matches

const styles = StyleSheet.create({})