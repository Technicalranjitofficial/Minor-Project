import React from 'react';

import Select from 'react-select';


export const MultiSelect=({data}:{data:any}) => (
  <Select
    defaultValue={[data[2], data[3]]}
    isMulti
    name="colors"
    options={data}
    className="my-react-select-container"

    styles={{
      
    }}
    
    classNamePrefix="my-react-select"
    />
);