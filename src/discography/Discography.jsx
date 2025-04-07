import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes, faChevronDown, faAngleDown, faChevronLeft } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import './Discography.css';

const Discography = ({ isOpen, onClose }) => {
  const [albums, setAlbums] = useState([]);
  const [filteredAlbums, setFilteredAlbums] = useState([]);
  const [filter, setFilter] = useState('ALL');
  const [yearFilter, setYearFilter] = useState('');
  const [selectedAlbum, setSelectedAlbum] = useState(null);
  const [loading, setLoading] = useState(true);
  const [categories, setCategories] = useState(['ALL']);
  const [years, setYears] = useState([]);

  const API_BASE_URL = 'https://monorama.com.mx/jerryordonezadmin/wp-json/wp/v2/discografia';

  useEffect(() => {
    const fetchAlbums = async () => {
      try {
        setLoading(true);
        
        const response = await axios.get(API_BASE_URL);
        console.log("API response:", response);
        
        const data = response.data || [];
        
        const transformedData = Array.isArray(data) ? data.map(item => {
          const content = item.content && item.content.rendered ? item.content.rendered : '';
          const title = item.title && item.title.rendered ? item.title.rendered : '';
          
          return {
            id: item.id || 0,
            title: item.formatted_title || cleanupTitle(title),
            content: content,
            artist: extractArtistFromContent(content),
            year: item.years && item.years.length > 0 ? item.years[0] : '',
            genre: item.categorias && item.categorias.length > 0 ? item.categorias[0] : '',
            credit: extractCreditFromContent(content),
            isGrammyNominated: content.includes('Grammy') || content.includes('grammy'),
            cover: item.thumbnail || 'default-album-cover.jpg'
          };
        }) : [];
        
        setAlbums(transformedData);
        setFilteredAlbums(transformedData);
        
        const uniqueCategories = ['ALL', ...new Set(transformedData
          .map(album => album.genre)
          .filter(genre => genre !== ''))];
        
        const uniqueYears = [...new Set(transformedData
          .map(album => album.year)
          .filter(year => year !== ''))].sort((a, b) => b - a);
        
        setCategories(uniqueCategories);
        setYears(uniqueYears);
        
        setLoading(false);
      } catch (error) {
        console.error('Error fetching albums:', error);
        setLoading(false);
      }
    };

    if (isOpen) {
      fetchAlbums();
    }
  }, [isOpen]);

  const extractArtistFromContent = (content) => {
    const artistMatch = content.match(/Artist:\s*([^<\n]+)/i);
    return artistMatch ? artistMatch[1].trim() : '';
  };

  const extractCreditFromContent = (content) => {
    const creditMatch = content.match(/Credit:\s*([^<\n]+)/i);
    return creditMatch ? creditMatch[1].trim() : 'Producer/Engineer';
  };
  
  const cleanupTitle = (rawTitle) => {
    if (!rawTitle) return '';
    
    const tempElement = document.createElement('div');
    tempElement.innerHTML = rawTitle;
    
    let cleanTitle = tempElement.textContent || tempElement.innerText || '';
    
    cleanTitle = cleanTitle.trim();
    
    cleanTitle = cleanTitle.replace(/\w\S*/g, (txt) => {
      return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
    });
    
    return cleanTitle;
  };

  const fetchFilteredAlbums = async (genre, year) => {
    try {
      setLoading(true);
      
      let apiUrl = API_BASE_URL;
      const params = {};
      
      if (genre && genre !== 'ALL') {
        params.categoria = genre;
      }
      
      if (year) {
        params.year = year;
      }
      
      console.log("Fetching with params:", params);
      
      const response = await axios.get(apiUrl, { params });
      
      const data = response.data || [];
      
      if (!Array.isArray(data)) {
        console.error("API didn't return an array:", data);
        setFilteredAlbums([]);
        setLoading(false);
        return;
      }
      
      const transformedData = data.map(item => {
        const content = item.content && item.content.rendered ? item.content.rendered : '';
        const title = item.title && item.title.rendered ? item.title.rendered : '';
        
        return {
          id: item.id || 0,
          title: item.formatted_title || cleanupTitle(title),
          content: content,
          artist: extractArtistFromContent(content),
          year: item.years && item.years.length > 0 ? item.years[0] : '',
          genre: item.categorias && item.categorias.length > 0 ? item.categorias[0] : '',
          credit: extractCreditFromContent(content),
          isGrammyNominated: content.includes('Grammy') || content.includes('grammy'),
          cover: item.thumbnail || 'default-album-cover.jpg'
        };
      });
      
      setFilteredAlbums(transformedData);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching filtered albums:', error);
      setFilteredAlbums([]);
      setLoading(false);
    }
  };

  const handleAlbumClick = (album) => {
    setSelectedAlbum(album);
  };

  const closeModal = () => {
    setSelectedAlbum(null);
    onClose();
  };

  const handleGenreFilter = (genre) => {
    setFilter(genre);
    setYearFilter('');
    
    if (genre === 'ALL') {
      fetchFilteredAlbums(null, null);
    } else {
      fetchFilteredAlbums(genre, null);
    }
  };

  const handleYearFilter = (year) => {
    const newYearFilter = yearFilter === year ? '' : year;
    setYearFilter(newYearFilter);
    setFilter('ALL');
    
    if (newYearFilter === '') {
      fetchFilteredAlbums(null, null);
    } else {
      fetchFilteredAlbums(null, year);
    }
  };

  const scrollToMore = () => {
    window.scrollBy({
      top: window.innerHeight / 2,
      behavior: 'smooth'
    });
  };

  if (!isOpen) return null;

  if (selectedAlbum && typeof selectedAlbum === 'object') {
    const { 
      cover = 'default-album-cover.jpg', 
      title = '', 
      artist = '', 
      year = '', 
      genre = '', 
      credit = '',
      isGrammyNominated = false,
      content 
    } = selectedAlbum;
    
    const formattedTitle = title;
    
    return (
      <div className="discography-modal">
        <div className="div-close-btnd"> 
          <button className="close-button-m" onClick={closeModal}>
            <FontAwesomeIcon icon={faTimes} />
          </button>
          <span className="text-white ml-2">Close</span>
        </div>

        <h2 className="discography-title">DISCOGRAPHY</h2>
        
        <div className="album-detail-container">
          <div className="album-detail-content">
            <div className="album-cover">
              <img src={cover} alt={`${title} by ${artist}`} />
            </div>
            <div className="album-info">
              <h3>{formattedTitle}</h3>
              <div dangerouslySetInnerHTML={{ __html: content }} />
            </div>
          </div>
        </div>

        <div className="back-button-container">
          <button className="back-button" onClick={() => setSelectedAlbum(null)}>
            <FontAwesomeIcon icon={faChevronLeft} />
            <span>back</span>
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="discography-modal">
      <div className="div-close-btnd"> 
        <button className="close-button-m" onClick={closeModal}>
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
        <div className="albums-main-container">
          <div className="nav-container">
            <button 
              className={`nav-button ${filter === 'ALL' ? 'active' : ''}`} 
              onClick={() => {
                setFilter('ALL');
                setYearFilter('');
                fetchFilteredAlbums(null, null);
              }}
            >
              ALL
            </button>
            
            <div className="genre-dropdown">
              <span className="genre-label">GENRE</span>
              <div className="genre-list min-h-[250px]">
                {categories.filter(genre => genre !== 'ALL').map(genre => (
                  <div 
                    key={genre} 
                    className={`genre-item ${filter === genre ? 'active' : ''}`}
                    onClick={() => handleGenreFilter(genre)}
                  >
                    {genre}
                  </div>
                ))}
              </div>
            </div>
            
            <div className="year-dropdown">
              <span className="year-label">YEAR</span>
              <div className="year-list min-h-[250px]"> 
                {years.map(year => (
                  <div 
                    key={year} 
                    className={`year-item ${yearFilter === year ? 'active' : ''}`}
                    onClick={() => handleYearFilter(year)}
                  >
                    {year}
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="albums-grid-container">
            <div className="albums-grid">
              {filteredAlbums.length > 0 ? (
                filteredAlbums.map(album => (
                  <div 
                    key={album.id} 
                    className="album-item" 
                    onClick={() => handleAlbumClick(album)}
                  >
                    <div className="album-thumbnail">
                      <img src={album.cover} alt={`${album.title} by ${album.artist}`} />
                      <div className="album-overlay">
                        <div className="album-overlay-text">
                          <p className="artist-name">{album.artist}</p>
                          <p className="album-title" title={album.title}>
                            {album.title.length > 25 ? `${album.title.substring(0, 25)}...` : album.title}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="no-results">No albums found matching your criteria</div>
              )}
            </div>
          </div>
          
          {filteredAlbums.length > 6 && (
            <div className="scroll-button-container">
              <button className="scroll-button" onClick={scrollToMore}>
                <FontAwesomeIcon icon={faAngleDown} />
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Discography;