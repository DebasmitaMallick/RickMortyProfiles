import React, { useEffect, useState } from 'react'
import { useCharacterContext } from '../context/CharacterProvider'
import { RxHamburgerMenu } from "react-icons/rx";

const Filters = () => {
    const {dispatch, locations, episodes, character_types,
        state: {byStatus, byLocation, byEpisode, byGender, bySpecies, byType },
        windowWidth
    } = useCharacterContext();

    const [filterOptions, setFilterOptions] = useState([]);

    const [visible, setVisible] = useState(true)

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

    const handleToggle = () => {
        setVisible(!(visible && windowWidth > 930))
    }
    

    return (
        <div className='filterSection'>
            {
                (visible && windowWidth > 930) ?
                <div className='filterBar'>
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
                </div> :
                <div className='toggleFilters' onClick={handleToggle}>
                    <RxHamburgerMenu />
                </div>
            }
        </div>
    )
}

export default Filters