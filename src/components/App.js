import React, { Component, Fragment } from 'react';
import Header from './Header';
import SearchBar from './SearchBar';
import DogGallery from './DogGallery';
import Error from './Error';
import Loader from './Loader';
import '../index.css';
import { dogsAPI } from '../api';
import { capitalize } from '../utilities';

class App extends Component {
  state = {
    loading: false,
    dogs: {},
    formattedDogs: [],
    selectedDog: '',
    dogImageUrls: [],
    error: false
  };

  componentDidMount() {
    this.getBreeds();
  }

  getBreeds = async () => {
    try {
      const response = await dogsAPI.get('/breeds/list/all');
      const dogs = response.data.message;
      const formattedDogs = this.formatDogsOptions(dogs);
      this.setState({dogs, formattedDogs});
    } catch (err) {
      this.setState({error: true});
    }
  };

  getBreedImage = async (dog) => {
    try {
      this.setState({loading: true});
      const response = await dogsAPI.get(`/breed/${dog}/images`);
      this.setState({
        loading: false,
        dogImageUrls: response.data.message,
        selectedDog: dog
      });
    } catch(err) {
      this.setState({error: true});
    } finally {
      this.setState({loading: false});
    }
  };

  getSubBreedImage = async (dogs, subBreed) => {
    try {
      const breed = Object.keys(dogs).filter((breed) => dogs[breed].includes(subBreed));

      this.setState({loading: true});
      const response = await dogsAPI.get(`/breed/${breed}/${subBreed}/images`);
      this.setState({
        loading: false,
        dogImageUrls: response.data.message,
        selectedDog: subBreed
      });
    } catch(err) {
      this.setState({error: true});
    } finally {
      this.setState({loading: false});
    }
  };

  fetchDogInfo = (dog) => {
    const { dogs } = this.state;
    if (Object.keys(dogs).includes(dog)) {
      this.getBreedImage(dog);
    } else {
      this.getSubBreedImage(dogs, dog);
    }
  };

  formatDogsOptions = (dogsObj) => {
    return Object.keys(dogsObj)
      .reduce((acc, cur) => {
        if (dogsObj[cur].length) {
          acc.push({
            label: capitalize(cur),
            options: this.formatSubBreedsOptions(dogsObj, cur)
          })
        } else {
          acc.push({value: cur, label: capitalize(cur)});
        }
        return acc;
      }, []);
  };

  formatSubBreedsOptions = (dogsObj, primaryBreed) => {
    return dogsObj[primaryBreed].map((subBreed) => (
      {value: subBreed, label: capitalize(subBreed)}
    ));
  };

  render() {
    const {
      formattedDogs, 
      dogImageUrls, 
      selectedDog,
      error
    } = this.state;

    const imagesInfo = {
      urls: dogImageUrls,
      breed: selectedDog
    };

    return (
      <Fragment>
        <Header />
        <div className="ui container">
          {formattedDogs.length > 0 && (
            <SearchBar
              placeholder="Select a Dog Breed..."
              options={formattedDogs}
              onSelectChange={this.fetchDogInfo}
            />
          )}

          {error && <Error />}

          {this.state.loading
            ? <Loader />
            : <div className="dog-content">
                <DogGallery imagesInfo={imagesInfo} error={error} />
              </div>
          }
        </div>
      </Fragment>
    );
  }
}

export default App;