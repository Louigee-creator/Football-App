import { StyleSheet, Text, TouchableOpacity, View, Image, FlatList, ScrollView, ActivityIndicator } from 'react-native'
import React, {useState, useEffect} from 'react'
import { getResultsData } from '../api';
import { SafeAreaView } from 'react-native-safe-area-context'
import images from '../constants/images'
import icons from '../constants/icons'
import { AntDesign } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';

const Results = ({ navigation }) => {

  const [results, setResults] = useState(null)
  const [loading, setLoading] = useState(false)


  const baseURL = 'https://lsm-static-prod.livescore.com/medium/'

  useEffect(() => {
    setLoading(true);
    getResultsData().then((data) => {
      console.log(data);
  
      setResults(data);
      setLoading(false);
    })
  }, [])

  console.log(results)

  if(loading || !results) {
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
            <Text style={{fontSize: 20, fontWeight: '500'}}>Results</Text>
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

  function renderResults() {

    

    const renderItem = ({item}) => {

      const {
        CompN,
        Events : { 0 :
            {T1 : { 0 : { Nm } } },
            
        },
       
    } = item;
      return (
        <TouchableOpacity style={{
          marginTop: 20,
          height: 100,
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#fff',
          borderRadius: 15,
          padding: 8,
          marginTop: 35,
          shadowColor: '#171717',
          shadowOffset: {width: -2, height: 2},
          shadowOpacity: 0.1,
          shadowRadius: 3,
          position: 'relative'
          
      }}
      onPress={() => navigation.push('ResultsDetails')}
      >
          <View style={{
            width: 80,
            height: 30,
            backgroundColor: '#fd4030',
            position: 'absolute', 
            top: -15 , 
            left: '40%',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: 15,
          }}>
            <MaterialIcons name="online-prediction" size={13} color="white" />
  
          <Text style={{
              color: 'white', 
              fontSize: 14, 
              textAlign: 'center', 
              padding: 5
              
            }}>LIVE</Text>
        </View>
          <View style={{
              flexDirection: 'row',
              //padding: 5,
              alignItems: 'center',
              justifyContent: 'space-between',
              marginTop: 5,
              marginBottom: 10
              
          }}>
              <Text style={{fontWeight: '500', fontSize: 16, marginRight: 5}}>{Nm.substr(0, 10)}</Text>
              <Image 
                  source={{url : baseURL + item.Events[0].T1[0].Img}}
                  resizeMethod="contain"
                  style={{
                      width: 30,
                      height: 30,
                      marginRight: 10
                      
                  }}
                />
              <View style={{
                textAlign: 'center',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                  <Text style={{fontWeight: '600', fontSize: 18, color: 'green'}}>{item.Events[0].Tr1}-{item.Events[0].Tr2}</Text>
                  <Text style={{fontSize: 12, color: 'grey', paddingVertical: 2}}>{item.Events[0].Trh1}-{item.Events[0].Trh2}</Text>
                  
              </View>
              <Image 
                  source={{url : baseURL + item.Events[0].T2[0].Img}}
                  resizeMethod='contain'
                  style={{
                      width: 30,
                      height: 30,
                      borderRadius: 50,
                      marginLeft: 10
                      
                  }}
              />
              <Text style={{fontWeight: '500', fontSize: 16, marginLeft: 5}}>{item.Events[0].T2[0].Nm.substr(0, 10)}</Text>
          </View>
          <Text style={{color: 'grey', fontSize: 12, textAlign: 'center'}}>{CompN}</Text>
      </TouchableOpacity>
      )
    }

    return (
      <View style={{marginTop: 10}}>
          <FlatList 
              data={results}
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
        {renderResults()}
    </SafeAreaView>
  )
}

export default Results