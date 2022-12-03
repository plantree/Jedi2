// scripts for deployment
import YAML from 'yaml'
import axios from 'axios'
import fs from 'fs'

let nil = ''

async function city2location(city) {
    let token = 'KbHxLNbGzu4Bz1eNe8YQAGGW1GxmBvpg'
    let url = `https://api.map.baidu.com/geocoding/v3/?address=${city}&output=json&ak=${token}`
    // make a request
    try {
        const response = await axios.get(url, { timeout: 2000 })
        if (response.data.status === 0) {
            let location = response.data.result.location
            return [location.lng, location.lat]
        }
    } catch (err) {
        console.error(err)
    }
    return nil
}

function delay(time) {
  return new Promise(resolve => setTimeout(resolve, time));
} 

async function parseVisited() {
    const file = fs.readFileSync('content/.visited.yml', 'utf8')
    const cities = YAML.parse(file).cities
    let coordMap = {}
    for (let city of cities) {
        let location = await city2location(city)
        if (location === nil) {
            console.log(`translate ${city} failed`)
        } else {
            coordMap[city] = location
        }
        // sleep 100 microseconds
        await delay(100)
    }
    return {
        cities: cities,
        coordMap: coordMap
    }
}

async function deployVisitMap() {
    let content = await parseVisited()
    try {
        fs.writeFileSync('static/geo.json', JSON.stringify(content))
    } catch (err) {
        console.error(err)
    }
}

await deployVisitMap()
