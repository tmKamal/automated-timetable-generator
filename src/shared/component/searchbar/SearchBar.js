import React from 'react';
import TextField from '@material-ui/core/TextField';
import Autocomplete, {
    createFilterOptions
} from '@material-ui/lab/Autocomplete';

const filter = createFilterOptions();

const SearchBar = ({ opt }) => {
    const [value, setValue] = React.useState(null);

    return (
        <Autocomplete
            value={value}
            onChange={(event, newValue) => {
                if (typeof newValue === 'string') {
                    setValue({
                        title: newValue
                    });
                } else if (newValue && newValue.inputValue) {
                    // Create a new value from the user input
                    setValue({
                        title: newValue.inputValue
                    });
                } else {
                    setValue(newValue);
                }
            }}
            filterOptions={(options, params) => {
                const filtered = filter(options, params);

                // Suggest the creation of a new value
                // if (params.inputValue !== '') {
                //   filtered.push({
                //     inputValue: params.inputValue,
                //     title: `Add "${params.inputValue}"`,
                //   });
                // }

                return filtered;
            }}
            selectOnFocus
            clearOnBlur
            handleHomeEndKeys
            id='search-bar'
            options={opt}
            getOptionLabel={(option) => {
                // Value selected with enter, right from the input
                if (typeof option === 'string') {
                    return option;
                }
                // // Add "xxx" option created dynamically
                // if (option.inputValue) {
                //   return option.inputValue;
                // }
                // Regular option
                return option.title;
            }}
            renderOption={(option) => option.title}
            style={{ width: 600 }}
            freeSolo
            renderInput={(params) => (
                <TextField {...params} label='Search' variant='outlined' />
            )}
        />
    );
};

export default SearchBar;
