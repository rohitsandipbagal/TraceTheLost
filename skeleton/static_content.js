
const Introduction = () => {

    const introText = "Explore the global impact of missing migrants through interactive visualizations.";
    const data = useData();

    return (
        <>
        
        <div className="introTitle">
                Description
                <br/>
            </div>

            <div className="intro" style={{ fontSize: '12px' }}>
                <i>
            {introText + " Data count is " + data?.length + " rows &  " + (data?.length ? Object.keys(data[0]).length : 0) + " columns"}
            </i>
            </div>
            <br></br>
        </>
        )
};


const projection = d3.geoNaturalEarth1();
const path = d3.geoPath().projection(projection);
const graticule = d3.geoGraticule();

const WorldGraticule = ({ width, height }) => {

    return (
        <g className="worldGraticule">
            
            <path d={path({ type: "Sphere" })}
            style={{ fill: "Lightgrey" }}/>
            
            <path className="graticule" d={path(graticule())}/>
        </g>
    );
};


const Countries = ({ 
    worldAtlas: {land, interiors}, 
}) => 
(

                <g className="countries">
                {
                    
                    <>
                        {
                        
                            land.features.map((feature, i) => (
                                <path 
                                    key={`land-${i}`} 
                                    className="land" 
                                    d={path(feature)} 
                                />
                            ))
                        }
                        {
                           
                            <path 
                                className="interiors" 
                                d={path(interiors)} 
                            />
                        }
                    </>
                }
            </g>
            
);
