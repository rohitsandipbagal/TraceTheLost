// the URL where the world atlas data is downloaded from
const jsonUrl = 'https://unpkg.com/world-atlas@2.0.2/countries-50m.json';

// place data reading logic in a hook (hooks start with 'use')
const useWorldAtlas = () => {
    // this creates a state that returns a the data (represents the state) and
    // a function that can be used to set the data (state)
    // the state is initially null which tells the user that the data has no yet been loaded
    const [data, setData] = React.useState(null);

    // useEffect ensures that the data is only loaded once. if it was loaded before the function
    // is not executed again
    React.useEffect(() => {
        // using d3's json function we can download the json from the URL
        // when the download has finished the function will be executed
        d3.json(jsonUrl).then(topology => {
            // grab the countries and land masses from the topoJson file
            const { countries, land } = topology.objects;
            // this sets the data to the state defined before above
            setData({
                // convert the topoJson land to geoJson land using "feature(...)"
                land: topojson.feature(topology, land),
                // extract countries that do not face water
                interiors: topojson.mesh(topology, countries, (a, b) => a !== b)
            });
        });
    }, []);
    // with the useState and useEffect combination this function (when called repeatedly) will in the beginning
    // always return null (the data) until the download was finished and the data set. Then the same data will
    // be returned and no additional downloads are necessary.
    return data;
};

// the URL where the missing migrants data is downloaded from
const csvUrl = 'https://gist.githubusercontent.com/1998ashutosh/d07ef9c71723bd0ff8aebb67a116451a/raw/e068a1e6d273cfb4d01cc9812657cce50f5934b4/MissingMigrants-Global-2020-2023.csv';

const parseDate = d3.timeParse("%a, %m/%d/%Y - %H:%M");

const row = d => {
    d.coords = d['Coordinates'] ? d['Coordinates'].split(',').map(value => +value).reverse() : [];
    d['Total Number of Dead and Missing'] = +d['Total Number of Dead and Missing'];
    d['Reported Date'] = parseDate(d['Reported Date']) || null;
    return d;
};


const useData = () => {
    const [data, setData] = React.useState(null);
    React.useEffect(() => {
        d3.csv(csvUrl, row).then(fetchedData => {
            setData(fetchedData);
        });
    },[]);
    return data;
}; 
