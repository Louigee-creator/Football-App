import axios from "axios";

const URL = 'https://livescore6.p.rapidapi.com/matches/v2/list-by-date'
const NewsURL = 'https://livescore6.p.rapidapi.com/news/v2/list'
//const DetailedNewsURL = 'https://livescore6.p.rapidapi.com/news/v2/list'
const ResultsURL = 'https://livescore6.p.rapidapi.com/matches/v2/list-live'

const options = {
    params: {Category: 'soccer', Date: '20220920'},
    headers: {
      'X-RapidAPI-Key': 'xxxxxxxxxxxxxxx', //Your key here
      'X-RapidAPI-Host': 'livescore6.p.rapidapi.com'
    }
  };

export const getFixturesData = async () => {
    try {
        const {data: { Stages } } = await axios.get(URL, options);

        return Stages;
      } catch (error) {
        console.log(error)
      }
      console.log(Stages)
}


const news = {
  method: 'GET',
  headers: {
    'X-RapidAPI-Key': 'xxxxxxxxxxxxxxxxxxx', // your key here
    'X-RapidAPI-Host': 'livescore6.p.rapidapi.com'
  }
};

export const getNewsData = async () => {
  try {
      const {data : { topStories }} = await axios.get(NewsURL, news);

      return topStories;
    } catch (error) {
      console.log(error)
    }
    console.log(topStories)
}






const results = {
  method: 'GET',
  params: {Category: 'soccer'},
  headers: {
    'X-RapidAPI-Key': 'xxxxxxxxxxxxxxxxx', //your key here
    'X-RapidAPI-Host': 'livescore6.p.rapidapi.com'
  }
};

export const getResultsData = async () => {
  try {
      const {data : { Stages }} = await axios.get(ResultsURL, results);

      return Stages;
    } catch (error) {
      console.log(error)
    }
    console.log(Stages)
}

