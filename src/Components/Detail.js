import React, { useRef } from 'react'
import { useGlobalContext } from '../context'
import { Link } from 'react-router-dom'

export const Detail = ({ match }) => {   
    const { AllCountries, setSearchFilter, setRegionFilter } = useGlobalContext()
    let country = AllCountries.current.filter(item => item.name === match.params.name)[0]

    const selectedCountry = useRef(country)
    const {name, flag, nativeName, population, region, subregion, capital, topleveldomain, currencies, languages, borders} = selectedCountry.current
    let languagesStr = languages.map(lang => lang.name).join(', ') 
    
    let borderCountries = 
        AllCountries
        .current
        .filter(item => {
            let isBorder = false
            borders.forEach(border => {
                if (border === item.alpha3Code) isBorder = true
            })
            if (isBorder) return true
            else return false
        })
        .map(item => item.name)

    return (
        <section className="container dark-container">
            <div className="detail-country-container">
                <div className="back-btn-container">
                    <Link to="/">
                        <button className="dark-element dark-shadow" onClick={() => {
                            setSearchFilter('')
                            setRegionFilter('All')
                        }}>
                            Back
                        </button>
                    </Link>
                </div>
                <div className="detail-wrapper">
                    <div className="detail-country-flag dark-shadow">
                        <img src={flag} alt="" className="detail-flag" />
                    </div>
                    <div className="detail-country-info">
                        <div className="detail-name-div">
                            <h2>{name}</h2>
                        </div>
                        <div className="detail-country-stats">
                            <div className="stats-ul1">
                                <ul>
                                    <li><span className="stats">Native Name:</span> {nativeName}</li>
                                    <li><span className="stats">Population:</span> {population}</li>
                                    <li><span className="stats">Region:</span> {region}</li>
                                    <li><span className="stats">Sub Region:</span> {subregion}</li>
                                    <li><span className="stats">Capital:</span> {capital}</li>
                                </ul>
                            </div>
                            <div className="stats-ul2">
                                <ul>
                                    <li><span className="stats">Top Level Domain:</span> {topleveldomain}</li>
                                    <li><span className="stats">Currencies:</span> {currencies.name}</li>
                                    <li><span className="stats">Languages:</span> {languagesStr}</li>
                                </ul>
                            </div>
                        </div>
                        <div className="detail-borders">
                            <h3>Border Countries:</h3>
                            <ul className="borders-list">
                                {
                                    borderCountries.map((name,index) => (
                                        // <Link to={`/${name}`} key={index}>
                                        //     <button className="dark-element dark-shadow">
                                        //         {name}
                                        //     </button>
                                        // </Link>
                                        <button className="dark-element dark-shadow" key={index}>
                                            {name}
                                        </button>
                                    ))
                                }
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
