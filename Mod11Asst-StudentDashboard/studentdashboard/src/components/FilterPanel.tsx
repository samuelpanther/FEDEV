import React from "react";

interface Props {
    setFilter: (value: string) => void; 
    search: string; 
    setSearch: (value: string) => void;
}

const FilterPanel: React.FC<Props> = ({
    setFilter, 
    search, 
    setSearch, 
}) => {

const buttonStyle = {
    backgroundColor:"#5559ff",
    color: "#ecedfd",
    border: "none",
    padding: "6px 12px",
    borderRadius: "6px",
    cursor: "pointer",
    fontSize: "clamp(14px, 2vw, 14px)",
    fontWeight: "500"
};

    return (

      <div>
        
        {/*this is where the search is */}
            
          <input
            type="text"
            placeholder="Student search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="search-input"
            style={{
                padding: "10px 12px",
                backgroundColor:"#5559ff",
                color: "#ecedfd",
                border: "none",
                borderRadius: "6px",
                marginBottom: "15px",
                outline: "none"
            }}
           />
        
            
            
        {/*filter buttons*/}
        <div style={{ 
            display: "flex", 
            justifyContent: "center",
            gap: "15px", 
            marginTop: "15px", 
            marginBottom: "15px",
            flexWrap: "wrap"
            }}>

            <button style={buttonStyle} onClick={() => setFilter("all")}>All Students</button>
            <button style={buttonStyle} onClick={() => setFilter("active")}>Active</button>
            <button style={buttonStyle} onClick={() => setFilter("inactive")}>Inactive</button>

            <button style={buttonStyle} onClick={() => setFilter("passed")}>Passed</button>
            <button style={buttonStyle} onClick={() => setFilter("failed")}>Failed</button>

        </div>
      </div>
    );
};

export default FilterPanel; 