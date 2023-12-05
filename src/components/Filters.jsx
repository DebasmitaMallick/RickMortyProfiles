import React, { useEffect, useState } from 'react'
import { useCharacterContext } from '../context/CharacterProvider'
import { RxHamburgerMenu } from "react-icons/rx";
import { RxCross1 } from "react-icons/rx";

const Filters = () => {

    // Destructure values from the character context
    const {dispatch, locations, episodes, character_types,
        state: {byStatus, byLocation, byEpisode, byGender, bySpecies, byType }
    } = useCharacterContext();

    // State for storing filter options
    const [filterOptions, setFilterOptions] = useState([]);

    // State for toggling filter visibility
    const [isVisible, setIsVisible] = useState(true)

    // Function to set filter options based on context values
    const handleOptions = () => {
        const data = [
            {
                label: "Status",
                options: ["Alive", "Dead", "Unknown"],
                actionType: "FILTER_BY_STATUS",
                val: byStatus
            },
            {
                label: "Location",
                options: locations,
                actionType: "FILTER_BY_LOCATION",
                val: byLocation
            },
            {
                label: "Episode",
                options: episodes,
                actionType: "FILTER_BY_EPISODE",
                val: byEpisode
            },
            {
                label: "Gender",
                options: ["Male", "Female", "Unknown"],
                actionType: "FILTER_BY_GENDER",
                val: byGender
            },
            {
                label: "Species",
                options: ["Human", "Alien"],
                actionType: "FILTER_BY_SPECIES",
                val: bySpecies
            },
            {
                label: "Type",
                options: Array.from(character_types),
                actionType: "FILTER_BY_TYPE",
                val: byType
            }
        ];
        setFilterOptions(data)
    }

    // Call handleOptions whenever context values change
    useEffect(() => {
        handleOptions()
    }, [locations, episodes, byStatus, byLocation, byEpisode, byGender, bySpecies, byType]);

    // Function to handle toggle of filter visibility
    const handleToggle = () => {
        setIsVisible(!isVisible)
    }
    

    return (
        <div className='filterSection'>
            {/* Filter bar */}
            {
                <div className={`filterBar ${isVisible ? '' : 'filterBarHidden'}`}>
                    <div className='filters'>
                        {
                            filterOptions.map(filter =>
                                <div key={filter.label}>
                                    <label>Filter by {filter.label}:</label>
                                    <select 
                                        name={filter.label} 
                                        id={filter.label} 
                                        value={filter.val}
                                        onChange={(e) => dispatch({
                                            type: filter.actionType,
                                            payload: e.target.value
                                        })}
                                    >
                                        <option value={"All"}>All</option>
                                        {
                                            filter.options.map(opt => {
                                                let name = filter.label === "Location" || filter.label === "Episode" ? opt.name : opt;
                                                return <option key={name} value={name}>{name}</option>
                                            })
                                        }
                                    </select>
                                </div>
                            )
                        }
                    </div>
                </div> 
            }
            {/* Toggle button for filter visibility */}
            <div
                className={`toggleFilters ${isVisible ? 'filterBarVisible' : 'filterBarHidden'}`}
                onClick={handleToggle}
            >
                {isVisible ? (
                    <RxHamburgerMenu />
                ) : (
                    <RxCross1 color='white' />
                )}
            </div>
        </div>
    )
}

export default Filters