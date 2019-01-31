import React, { Component } from 'react';
import Masonry from 'react-masonry-component';

class DogGallery extends Component {
  render() {
    const { imagesInfo, error } = this.props;
    const childElements = imagesInfo.urls.map((url, idx) => (
      <div className="image-container" key={idx}>
        <img src={url} alt={imagesInfo.breed} />
      </div>
    ));

    return (
      !error && (
        <Masonry onImagesLoaded={this.handleImagesLoaded}>
          {childElements}
        </Masonry>
      )
    );
  }
}

export default DogGallery;