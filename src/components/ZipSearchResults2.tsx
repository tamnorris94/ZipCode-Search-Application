import { IPlace } from "../IPlace";

const SearchResultsComponent2 = (props: {places:[], zipSearch: String}) =>{

    console.log("App4 used");

    const {places, zipSearch} = props;
    return (
        <div className="table-container">
          <table>
            <thead>
              <tr>
                <th><span>Zip Search</span></th>
                <th><span>State</span></th>
                <th><span>Longitude</span></th>
                <th><span>Latitude</span></th>
                <th><span>Place Name</span></th>
              </tr>
            </thead>
            {places.map((place) => {
              console.log(place);
              
              return (
                <tbody key={place["latitude"]}>
                  <tr>
                    <td>{zipSearch}</td>
                    <td>{place["state"]}</td>
                    <td>{place["longitude"]}</td>
                    <td>{place["latitude"]}</td>             
                    <td>{place["place name"]}</td>
                  </tr>
                </tbody>
              );
            })}
          </table>
        </div>
      );
}

export default SearchResultsComponent2;