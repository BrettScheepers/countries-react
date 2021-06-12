import React from 'react'
import {HomeInput} from './HomeInput'
import { useGlobalContext } from '../context'
import { Link } from 'react-router-dom'

export const Home = () => {
    const {AllCountries, searchFilter, regionFilter, loading} = useGlobalContext()

    const filterBySearch = (item) => {
        if (item.toLowerCase().includes(searchFilter)) return true
        else return false
    }
    const filterByRegion = (item) => {
        if (regionFilter === "All") return true
        if (item === regionFilter) return true
    }

    if (loading) {
        return null
    }

    return (
        <>
            <section className="container dark-container">
                <HomeInput />
                <div className="home-country-container">
                {
                    AllCountries.current
                        .filter(item => filterBySearch(item.name) && filterByRegion(item.region))
                        .map(item => {
                            const {flag,name,population,region,capital} = item
                            // let flagUrl = `url(${flag})`
                            // style={{backgroundImage: flagUrl}}

                            return (
                                <Link to={`/details/${name}`} key={name} id={name}>
                                    <div className="home-country-card dark-element dark-shadow">
                                        <div className="home-flag-div">
                                            <img className="home-flag" src={flag} alt={name}/>
                                        </div>
                                        <div className="home-country-info">
                                            <div className="home-country-name">
                                                <h2>{name}</h2>
                                            </div>
                                            <div className="home-country-stats">
                                                <ul>
                                                    <li><span className="stats">Population:</span> {population}</li>
                                                    <li><span className="stats">Region:</span> {region}</li>
                                                    <li><span className="stats">Capital:</span> {capital}</li>
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                </Link>
                            )
                        })
                }
                </div>
            </section>
      </>
    )
}
