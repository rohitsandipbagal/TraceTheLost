// --------------------------------------------------
// TODO 2.2
// --------------------------------------------------
const sizeValue = d => d['Total Number of Dead and Missing'];
// defines the maximum radius of a bubble
const maxRadius = 15;

const Bubbles = ({ 
    data,projection
}) => {
    const sizeScale = React.useMemo(() => {
        return d3.scaleSqrt()
            .domain([0, d3.max(data, sizeValue)])
            .range([0, maxRadius]);
    }, [data, sizeValue]);
    
    // TODO 4.2: Memoization for size scale
    return (        
        <g className="bubbleMarks">
            
        {
        data.map((d, i) => {
            const [x, y] = projection(d.coords);
            return (
                <circle
                    key={i}
                    cx={x}
                    cy={y}
                    r={sizeScale(sizeValue(d))}
                />
            );
        })}
    </g>
        
    );
};