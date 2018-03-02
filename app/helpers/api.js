import axios from 'axios'
import slug from 'slug'
const apiKey='1ff3bef3bffe4304ab651b9beb389276';
import { ref, firebaseAuth } from 'config/firebase'
const baseUrl='http://localhost:8080/api'
const sports=['football','cricket','golf','tennis','rugby-league','rugby-union','boxing','horse-racing']
/*
export function fetchArticles(sport) {
  //const uri = `https://newsapi.org/v2/top-headlines?sources=talksport&apiKey=${apiKey}`
  const uri = `${baseUrl}/${sport}/v1.0/`
  return new Promise((resolve, reject) => {
    axios
    .get(encodeURI(uri))
    .then((response) => {
      resolve(response)
    })
    .catch((err) => { reject(err.message) })
  })
}
*/
export function saveUser(user) {
  console.log('user',user)
  return ref.child(`users/${user.uid}`)
  .set(user)
  .then(() => user)
}

export function fetchArticle(articles, titleSlug) {
   const filtered = articles.filter((article) => {
     return slug(article.title).toLowerCase() === titleSlug})
   return filtered[0]
}

export function fetchLatest() {
  const uri = `${baseUrl}/getlatest/v1.0/`
  return axios.get(encodeURI(uri))
}

export function fetchArticles(sport) {
  const uri = `${baseUrl}/getnews/${sport}/v1.0/`
  return axios(encodeURI(uri),{
    method: 'GET'
  }).then((response) => (response.data))
}

export function fetchTeamArticles(team) {
  const teamSlug = slug(team).toLowerCase()
  const uri = `${baseUrl}/football/getteamnews/${teamSlug}/v1.0/`
  console.log(uri)
  return axios(encodeURI(uri),{
    method: 'GET'
  }).then((response) => (response.data))
}

export function fetchAllUserTeamArticles(teams) {
  const promises = teams.map((team) => (fetchTeamArticles(team)) )
  return axios.all(promises)
    .then((response) => {
      let teamArticles = [];
      response.map((articles) => {
        articles.map((article) => {
          teamArticles = [...teamArticles, article]
        })
       
      })
      console.log('ALL TEAM ARTICLES', teamArticles)
      return teamArticles
    })
}

export function getArticleCategory(url) {
  const split = url.split('/')
  return split[3]
}

export function getArticleId(url) {
  const split = url.split('/')
  return split[6]
}

export function formatArticles(articles) {
  let formatted = []
  articles.map((article) => {
    const { title, imgsrc, link, shortdesc } =  article
    formatted.push({
      title,
      imgsrc,
      link,
      shortdesc,
      category: getArticleCategory(link)
    })
  })
  return formatted
}

export function getUserTeams(uid) {
  console.log('get user teams=', uid)
  return ref.child(`/userTeams/${uid}/teams`).once('value')
  .then((snapshot) => {
    console.log(snapshot)
    return snapshot.val()
  })
}

export function updateUserTeams(uid, teams) {
  //firebase.database().ref(`/userTeams/${uid}`).once('value')
    return ref.child(`userTeams/${uid}/teams`)
    .set(teams)
    return teams
}

export function saveToUserTeams(uid, teams) {
  //firebase.database().ref(`/userTeams/${uid}`).once('value')
    return ref.child(`userTeams/${uid}/teams`)
    .set(teams)
    return teams
}

export function removeFromUserTeams(uid, teams) {
  return ref.child(`userTeams/${uid}/teams`)
  .set(teams)
  return teams
}
