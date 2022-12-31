import React, {  useState } from "react";
import { useForm } from "react-hook-form";
import { ErrorMessage } from '@hookform/error-message';
import axios from "axios";
import "./App.css";
import { IPlace } from "./IPlace";
import ZipSearhResults from "./components/ZipSearchResults";

type FormInputs = {
    zipSearchInput: number
  }

export default function App4() {
  const [placeFound, setPlaceFound] = useState<IPlace[]>([]);
  const [errorFound, setErrorFound] = React.useState<String>("");
  const [zipSearch, setZipSearch] = useState<String>("");
  const { register, formState: { errors }, handleSubmit } = useForm<FormInputs>();

  const search = (values: FormInputs) => {
    const query = encodeURIComponent(values.zipSearchInput);
    setErrorFound("");

    axios
      .get(`https://api.zippopotam.us/us/${query}`, {})
      .then((response) => {
        setPlaceFound(response.data.places);
        setErrorFound("");
        setZipSearch(query);
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
      <section id="zipSearch-form">
        <h1>Place Search using Zip Code</h1>
          <form onSubmit={handleSubmit(search)}>
              <label htmlFor="zipSearchInput">Zip Code</label>
                <input 
                  {...register("zipSearchInput", 
                  { required: "Please enter a numeric zip code", 
                    minLength: {value: 5, message: "Zip code must be 5 numbers long"},
                    maxLength: {value: 5, message: "Zip code must be 5 numbers long"}})}
                  id="zipSearchInput" 
                  name="zipSearchInput" 
                  type="number"/>
                <ErrorMessage
                  errors={errors}
                  name="zipSearchInput"
                  render={({ message }) => <p className="error">{message}</p>} />
            <button type="submit">Search</button>
          </form>
      </section>
      {placeFound.length !== 0 && <ZipSearhResults places={placeFound} zipSearch={zipSearch}/> }
      {errorFound !== "" && <p className="error">{errorFound}</p>}
    </div>
  );
}