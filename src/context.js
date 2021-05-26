import React, { useState, useContext, useEffect, useRef } from 'react'
// import {AllCountryStats} from './AllCountries'

const AppContext = React.createContext();

export const AppProvider = ({children}) => {
    const [loading, setLoading] = useState(true)
    let allCountryStats = null;
    const AllCountries = useRef(allCountryStats)
    const AllRegions = useRef([])

    useEffect(() => {
        fetch('https://restcountries.eu/rest/v2/all')
            .then(response => response.json())
            .then(data => {
                allCountryStats = data
                AllCountries.current = allCountryStats
                AllRegions.current = [
                    ...new Set(
                        AllCountries.current
                            .map(item => item.region)
                            // .filter(item => item !== "")
                            .sort((a,b) => a.localeCompare(b))
                    )
                ]
                setLoading(false)
            })
            .catch(error => console.log(error))
    }, [])
    
    // const AllCountries = useRef(allCountryStats)
    // const AllRegions = useRef([
    //     ...new Set(
    //         AllCountries.current
    //             .map(item => item.region)
    //             // .filter(item => item !== "")
    //             .sort((a,b) => a.localeCompare(b))
    //     )
    // ])
    const [searchFilter, setSearchFilter] = useState('')
    const [regionFilter, setRegionFilter] = useState('All')
    
    return (
        <AppContext.Provider value={{
            AllCountries, AllRegions, searchFilter, setSearchFilter, regionFilter, setRegionFilter, loading
        }}>
            {children}
        </AppContext.Provider>
    )
}

//custom hook
export const useGlobalContext = () => {
    return useContext(AppContext)
}

export { AppContext }