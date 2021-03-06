import React from 'react'
// import { FaSearch } from 'react-icons/fa'
import { useGlobalContext } from '../context'

export const HomeInput = () => {
    const { AllRegions, setSearchFilter, setRegionFilter } = useGlobalContext()

    return (
        <section className="home-input-container">
            <div className="country-search-div">
                {/* <FaSearch /> */}
                <input 
                    type="text" 
                    className="dark-element" 
                    id="country-search"
                    placeholder="Search for a country..."
                    onChange={(e) => setSearchFilter(e.target.value.toLowerCase())}
                />
            </div>
            <div className="region-filter-div">
                <select id="region-select" 
                        className="dark-element" 
                        onChange={(e) => setRegionFilter(e.target.value)}
                >
                    <option value="All" disabled selected hidden>Filter by Region</option>
                    <option value="All">All</option>
                    {
                        AllRegions.current.map((option, index) => {
                            return <option key={index} value={option}>{option}</option>
                        })
                    }
                </select>
            </div>
        </section>
    )
}
