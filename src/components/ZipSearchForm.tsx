import React from "react";
import { useForm } from 'react-hook-form'
import "../App.css";
import axios from "axios";

//import ZipCodeSearchResults from './ZipCodeSearchResults';

type Profile = {
  firstname: string,
  lastname: string,
  age: number
}

type ZipSearchResponse = {
  places: {longitude: string, 
    state: string, 
    latitude: string,
    "place name": string,} [],
  status: number,
  statusText: string
}

export default function ZipSearchForm(){
  const {register, handleSubmit, formState: {errors} } = useForm();

  const zipCodeInput = document.getElementById("zipCode")! as HTMLInputElement;

  const onSubmit = handleSubmit((data) => {
    const enteredZipCode = zipCodeInput.value;

    //alert(JSON.stringify(data))
    axios
    .get<ZipSearchResponse>(`https://api.zippopotam.us/us/${enteredZipCode}`)
      .then(response => {
        if(response.status !== 200){
          throw new Error('Could not fetch data')
        }
        //console.log("Response is " +JSON.stringify(response));
        const places = response.data.places
        document.getElementById('placeName')!.innerHTML = "";
        document.getElementById('placeName')!.innerHTML = "Place name is " +JSON.stringify(places[0]["place name"]);
        document.getElementById('longitude')!.innerHTML = "Longitude is " +JSON.stringify(places[0]["longitude"]);
        document.getElementById('latitude')!.innerHTML = "Latitude is " +JSON.stringify(places[0]["latitude"]);
        document.getElementById('state')!.innerHTML = "State is " +JSON.stringify(places[0]["state"]);
        zipCodeInput.value = "";
      })
      .catch(err => {
        alert(err.message);
        document.getElementById('errorMessage')!.innerHTML = "Zip Code not found";
        zipCodeInput.value = "";
    });
  });

  return (
    <form onSubmit={onSubmit}>
      <div>
        <label htmlFor="zipCode">Zip Code</label>
        <input {...register('zipCode', { required: true, minLength: 5, maxLength: 5 })} id="zipCode" name="zipCode" type="text"/>
        {
          errors.zipCode && <div className="error">Zip Code is required and must be 5 digits long</div>
        }
      </div>
      <button type="submit">Search</button>
    </form>
  ) 
}