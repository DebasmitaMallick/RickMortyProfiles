import React, { useEffect, useState } from 'react'
import { useCharacterContext } from '../context/CharacterProvider'

const Filters = () => {
    const {dispatch, locations, episodes, character_types,
        state: {byStatus, byLocation, byEpisode, byGender, bySpecies, byType }
    } = useCharacterContext();

    const [filterOptions, setFilterOptions] = useState([]);

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

    useEffect(() => {
        handleOptions()
    }, [locations, episodes, byStatus, byLocation, byEpisode, byGender, bySpecies, byType]);

    return (
        <div className='filterBar'>
            <h2>Filters</h2>
            <div className='filters'>
                {
                    filterOptions.map(filter =>
                        <div key={filter.label}>
                            <label>{filter.label}:</label>
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
    )
}

export default Filters