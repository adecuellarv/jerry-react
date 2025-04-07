import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes, faCircleChevronDown, faAngleDown, faCircleChevronLeft } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import icondDown from './arrow_down_button.png';
import './Discography.css';

//const API_BASE_URL = 'https://monorama.com.mx/jerryordonezadmin/wp-json/wp/v2/discografia';
//const API_BASE_URL = 'https://monorama.com.mx/jerryordonezadmin/wp-json/wp/v2/discografia?per_page=200&_embed';
const API_BASE_URL = 'https://monorama.com.mx/jerryordonezadmin/wp-json/wp/v2';
const Discography = ({ onClose }) => {
  const [albums, setAlbums] = useState([]);
  const [filteredAlbums, setFilteredAlbums] = useState([]);
  const [filter, setFilter] = useState('all');
  const [yearFilter, setYearFilter] = useState([]);
  const [categoriesFilter, setCategoriesFilter] = useState([]);
  const [year, setYear] = useState('');
  const [category, setCategory] = useState('');
  const [selectedAlbum, setSelectedAlbum] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(true);
  const [loadFirts, setLoadFirts] = useState(false);

  const handleModal = (item) => {
    setShowModal(true);
    setSelectedAlbum(item)
  }

  const handleChangeFilter = (type, value) => {
    setFilter('');
    setYear('');
    setCategory('');

    if (type === 'year') {
      setYear(value);
      const filter = albums?.filter(i => i.year[0] === value);
      if (filter) setFilteredAlbums(filter);
    }
    if (type === 'category') {
      setCategory(value);
      const filter = albums?.filter(i => i.categoria[0] === value);
      if (filter) setFilteredAlbums(filter);
    }
    if (type === 'all') {
      setFilter('all')
      setFilteredAlbums(albums);
    }
  }

  useEffect(() => {

    setLoadFirts(true);
    const fetchAlbums = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`${API_BASE_URL}/discografia?per_page=200&_embed`);

        if (response?.data) {
          const processedAlbums = response.data.map(album => ({
            ...album,
            hasFeaturedImage: album?._embedded?.['wp:featuredmedia']?.[0]?.source_url
          }));

          setAlbums(processedAlbums);
          setFilteredAlbums(processedAlbums);
        }
        setLoading(false);
      } catch (error) {
        console.error('Error fetching albums:', error);
        setLoading(false);
      }
    };

    const fetchCategories = async () => {
      const response = await axios.get(`${API_BASE_URL}/categoria?per_page=100`);
      if (response?.data)
        setCategoriesFilter(response.data);
    }

    const fetchYears = async () => {
      const response = await axios.get(`${API_BASE_URL}/year?per_page=100`);
      if (response?.data)
        setYearFilter(response.data);
    }

    if (!loadFirts) {
      setLoadFirts(true);
      fetchAlbums();
      fetchCategories();
      fetchYears();
    }
  }, []);


  return (
    <div className="discography-modal">
      <div className="div-close-btnd">
        <button className="close-button-m" onClick={() => onClose()}>
          <FontAwesomeIcon icon={faTimes} />
        </button>
        <span className="text-white ml-2">Close</span>
      </div>

      <h2 className="discography-title">DISCOGRAPHY</h2>

      {loading === true ? (
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <p>Loading albums...</p>
        </div>
      ) : (
        <>
          <div className="albums-main-container">
            <div className="nav-container">
              <button
                className={`nav-button ${filter === 'all' ? 'active' : ''}`}
                onClick={() => handleChangeFilter('all', 'all')}
              >
                ALL
              </button>
              <div className="genre-dropdown">
                <span className="genre-label">GENRE</span>
                <div className="genre-list min-h-[250px]">
                  {categoriesFilter.map(item => (
                    <div
                      key={item?.id}
                      className={`genre-item ${category === item?.id ? 'active' : ''}`}
                      onClick={() => handleChangeFilter('category', item?.id)}
                    >
                      {item?.name}
                    </div>
                  ))}
                </div>
              </div>
              <div className="year-dropdown">
                <span className="year-label">YEAR</span>
                <div className="year-list min-h-[250px]">
                  {yearFilter.map(item => (
                    <div
                      key={item?.id}
                      className={`year-item ${year === item?.id ? 'active' : ''}`}
                      onClick={() => handleChangeFilter('year', item?.id)}
                    >
                      {item?.name}
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div className="albums-grid-container">
              <div className="albums-grid">
                {filteredAlbums.map(album => {
                  const featuredMedia = album?._embedded?.['wp:featuredmedia']?.[0];
                  const imageUrl = featuredMedia?.media_details?.sizes?.medium?.source_url
                    || featuredMedia?.source_url
                    || 'ruta/a/imagen/por/defecto.jpg';

                  return (
                    <div key={album.id} className="album-item" onClick={() => handleModal(album)}>
                      <div className="album-thumbnail">
                        <img
                          src={imageUrl}
                          alt={album?.title?.rendered || 'Album cover'}
                        />
                        <div className="album-overlay">
                          <div className="album-overlay-text">
                            <p className="artist-name">{'album.artist'}</p>
                            <p className="album-title">
                              {album?.title?.rendered?.length > 25
                                ? `${album.title.rendered.substring(0, 25)}...`
                                : album?.title?.rendered}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
          {showModal &&
            <Modal setShowModal={setShowModal} album={selectedAlbum} />
          }
        </>
      )}
      <div className="scroll-button-container">
        <button className="scroll-button" >
          <img src={icondDown} alt="down" />
        </button>
      </div>
    </div>
  );
};

const Modal = ({ setShowModal, album }) => {
  const featuredMedia = album?._embedded?.['wp:featuredmedia']?.[0];
  const imageUrl = featuredMedia?.media_details?.sizes?.medium?.source_url
    || featuredMedia?.source_url
    || 'ruta/a/imagen/por/defecto.jpg';
  return (
    <div className="discography-modal">
      <div className="div-close-btnd">
        <button className="close-button-m" onClick={() => setShowModal(false)}>
          <FontAwesomeIcon icon={faTimes} />
        </button>
        <span className="text-white ml-2">Close</span>
      </div>

      <h2 className="discography-title">DISCOGRAPHY</h2>

      <div className="album-detail-container">
        <div className="album-detail-content">
          <div className="album-cover">
            <img src={imageUrl} alt={`${album?.title?.rendered}`} />
          </div>
          <div className="album-info">
            <h3>{album?.title?.rendered}</h3>
            <div dangerouslySetInnerHTML={{ __html: album?.content?.rendered }} />
          </div>
        </div>
      </div>

      <div className="back-button-container">
        <button className="back-button" onClick={() => setShowModal(false)}>
          <img src={icondDown} alt="down" style={{
            transform: 'rotate(90deg)',
            marginRight: 7
          }} />
          <span>back</span>
        </button>
      </div>
    </div>
  );
}

export default Discography;