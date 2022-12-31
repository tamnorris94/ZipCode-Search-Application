import React, {  useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { ErrorMessage } from '@hookform/error-message';
import axios from "axios";
import "./App.css";
import { IPlace } from "./IPlace";

// interface IPlace {
//   state: string;
//   longitude: string;
//   latitude: string;
//   "place name": string;
// }

type FormInputs = {
    zipSearchInput: number
  }

export default function App7() {
  const [placeFound, setPlaceFound] = useState<IPlace[]>([]);
  const [errorFound, setErrorFound] = React.useState("");
  const formMethods = useForm<{ zipSearchInput: string }>();
  const [zipSearch, setZipSearch] = useState("");
  
  //const { register, trigger, formState: { errors } } = useForm();
  const { register, formState: { errors }, handleSubmit } = useForm<FormInputs>();

  const renderPlaces = () => {
    console.log("Render places runs");

    if (placeFound.length !== 0) {
      return (
        <div className="table-container">
          <table>
            <thead>
            <tr>
              <th><span>Zip Code</span></th>
              <th><span>State</span></th>
              <th><span>Longitude</span></th>
              <th><span>Latitude</span></th>
              <th><span>Place Name</span></th>
            </tr>
            </thead>
            {placeFound.map((place) => {
              console.log(place);
              
              return (
                <tbody key={place.latitude}>
                  <tr>
                    <td>{zipSearch}</td>
                    <td>{place.state}</td>
                    <td>{place.longitude}</td>
                    <td>{place.latitude}</td>
                    <td>{place["place name"]}</td>
                  </tr>
                </tbody>
              );
            })}
          </table>
        </div>
      );
    }
  };


  const search = (values: FormInputs) => {
    const query = encodeURIComponent(values.zipSearchInput);
    setErrorFound("");

    axios
      .get(`https://api.zippopotam.us/us/${query}`, {})
      .then((response) => {
        setPlaceFound(response.data.places);
        setZipSearch(query);
        setErrorFound("");
      })
      .catch((ex) => {
        let _errorFound = axios.isCancel(ex)
          ? "Request Cancelled"
          : ex.code === "ECONNABORTED"
          ? "A timeout has occurred"
          : ex.response.status === 404
          ? "Zip Code Not Found"
          : "An unexpected error has occurred";
        setErrorFound(_errorFound);
        setPlaceFound([]);
      });
  };

  return (
    <div className="App">
      <div className="search-container">
        <h1>Place Search using Zip Code</h1>

          <form className="searchForm" onSubmit={handleSubmit(search)}>
            <div>
              <label htmlFor="zipSearchInput">Zip Code</label>
                <input 
                  {...register("zipSearchInput", 
                  { required: "Please enter a numeric zip code", 
                    minLength: {value: 5, message: "Zip code must be 5 numbers long"},
                    maxLength: {value: 5, message: "Zip code must be 5 numbers long"}})}
                  id="zipSearchInput" 
                  name="zipSearchInput" 
                  type="number"
                />
                <ErrorMessage
                  errors={errors}
                  name="zipSearchInput"
                  render={({ message }) => <p className="error">{message}</p>}
                />
            </div>
            <button type="submit">Search</button>
          </form>
      </div>
      {placeFound.length !== 0 && renderPlaces()}
      {errorFound !== "" && <p className="error">{errorFound}</p>}
    </div>
  );
}