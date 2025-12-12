import { useCallback, useEffect, useState } from "react";
import _, { set } from "lodash";
const API_URL = "https://dummyjson.com/products";

interface Product
{
    id: number;
    title: string;
}

const SearchComponent = () =>
{
    const [inputValue, setInputValue] = useState("");
    const [suggestions, setSuggestions] = useState<Product[]>([]);
    const [citiesList, setCitiesList] = useState<Product[]>([]);
    useEffect(() =>
    {
        fetch(API_URL)
            .then((response) => response.json())
            .then((data) =>
            {
                setCitiesList(data.products);
            });
    }, []);
    const debouncedSearhCities = useCallback(
        _.debounce((value) =>
        {
            const filteredSuggestions = citiesList.filter(city =>
                city.title.toLowerCase().includes(value.toLowerCase())
            );
            setSuggestions(filteredSuggestions);
        }, 500), [citiesList]
    )

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    {
        const value = e.target.value;
        setInputValue(value);
        if (!value) return;
        debouncedSearhCities(value);
    };
    return (
        <>
            <input
                name="typehead"
                type="text"
                placeholder="Search..."
                value={inputValue}
                onChange={(e) => handleChange(e)}
            />
            <div>
                {inputValue &&
                    suggestions.map((suggestion) =>
                        (<div key={suggestion.id}>{suggestion.title}</div>)
                    )}
            </div>
        </>
    )
}

export default SearchComponent
