import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes, faChevronDown, faAngleDown } from '@fortawesome/free-solid-svg-icons';
import './Discography.css';



const Discography = ({ isOpen, onClose }) => {
  const [albums, setAlbums] = useState([]);
  const [filteredAlbums, setFilteredAlbums] = useState([]);
  const [filter, setFilter] = useState('ALL');
  const [yearFilter, setYearFilter] = useState('');
  const [selectedAlbum, setSelectedAlbum] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAlbums = async () => {
      try {
        const response = await fetch('your-api-endpoint-here');
        const data = await response.json();
        setAlbums(data);
        setFilteredAlbums(data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching albums:', error);
        const sampleData = [
          { 
            id: 1, 
            title: 'We', 
            artist: 'Arcade Fire', 
            year: '2022', 
            genre: 'Alternative',
            credit: 'Tape Op/Assistant Engineer',
            isGrammyNominated: true,
            cover: 'https://i.pinimg.com/236x/98/db/3d/98db3d7e59cf97ecef1a28cf128835d7.jpg'
          },
          { 
            id: 2, 
            title: 'A Day\'s Work', 
            artist: 'Anonymous', 
            year: '2018', 
            genre: 'Electronic',
            credit: 'Producer',
            isGrammyNominated: false,
            cover: 'https://hips.hearstapps.com/hmg-prod/images/mejores-albumes-historia-nevermind-nirvana-1623775313.jpg?crop=1xw:1xh;center,top&resize=980:*'
          },
          { 
            id: 3, 
            title: 'Stereotype', 
            artist: 'Artist Name', 
            year: '2014', 
            genre: 'R&B',
            credit: 'Mixer',
            isGrammyNominated: false,
            cover: 'https://hips.hearstapps.com/hmg-prod/images/mejores-albumes-historia-pink-floyd-dark-side-moon-1623775315.jpg?crop=1xw:1xh;center,top&resize=980:*'
          },
          { 
            id: 4, 
            title: 'Another Album', 
            artist: 'Another Artist', 
            year: '2012', 
            genre: 'Pop',
            credit: 'Producer',
            isGrammyNominated: false,
            cover: 'https://cdn.venngage.com/template/thumbnail/small/bf008bfe-9bf6-4511-b795-e86f070bfff5.webp'
          },
          { 
            id: 5, 
            title: 'Fifth Album', 
            artist: 'Fifth Artist', 
            year: '2015', 
            genre: 'Rock',
            credit: 'Engineer',
            isGrammyNominated: false,
            cover: 'album5.jpg'
          },
          { 
            id: 6, 
            title: 'Sixth Album', 
            artist: 'Sixth Artist', 
            year: '2016', 
            genre: 'Jazz',
            credit: 'Producer',
            isGrammyNominated: false,
            cover: 'album6.jpg'
          },
          { 
            id: 7, 
            title: 'Seventh Album', 
            artist: 'Seventh Artist', 
            year: '2017', 
            genre: 'Classical',
            credit: 'Mixer',
            isGrammyNominated: true,
            cover: 'album7.jpg'
          },
          { 
            id: 8, 
            title: 'Eighth Album', 
            artist: 'Eighth Artist', 
            year: '2018', 
            genre: 'Hip Hop',
            credit: 'Producer',
            isGrammyNominated: false,
            cover: 'album8.jpg'
          },
          { 
            id: 9, 
            title: 'Ninth Album', 
            artist: 'Ninth Artist', 
            year: '2011', 
            genre: 'Electronic',
            credit: 'Engineer',
            isGrammyNominated: false,
            cover: 'album9.jpg'
          },
          { 
            id: 10, 
            title: 'Tenth Album', 
            artist: 'Tenth Artist', 
            year: '2013', 
            genre: 'Alternative',
            credit: 'Producer',
            isGrammyNominated: false,
            cover: 'album10.jpg'
          },
          { 
            id: 11, 
            title: 'Eleventh Album', 
            artist: 'Eleventh Artist', 
            year: '2008', 
            genre: 'Rock',
            credit: 'Mixer',
            isGrammyNominated: false,
            cover: 'album11.jpg'
          },
          { 
            id: 12, 
            title: 'Twelfth Album', 
            artist: 'Twelfth Artist', 
            year: '2018', 
            genre: 'Pop',
            credit: 'Producer',
            isGrammyNominated: true,
            cover: 'album12.jpg'
          },
        ];
        setAlbums(sampleData);
        setFilteredAlbums(sampleData);
        setLoading(false);
      }
    };

    if (isOpen) {
      fetchAlbums();
    }
  }, [isOpen]);

  useEffect(() => {
    if (filter === 'ALL' && !yearFilter) {
      setFilteredAlbums(albums);
    } else {
      let filtered = [...albums];
      
      if (filter !== 'ALL') {
        filtered = filtered.filter(album => album.genre === filter);
      }
      
      if (yearFilter) {
        filtered = filtered.filter(album => album.year === yearFilter);
      }
      
      setFilteredAlbums(filtered);
    }
  }, [filter, yearFilter, albums]);

  const handleAlbumClick = (album) => {
    setSelectedAlbum(album);
  };

  const closeModal = () => {
    setSelectedAlbum(null);
    onClose();
  };

  const handleGenreFilter = (genre) => {
    setFilter(genre);
    setYearFilter(''); // Reset year filter when changing genre
  };

  const handleYearFilter = (year) => {
    setYearFilter(yearFilter === year ? '' : year);
    setFilter('ALL'); // Reset genre filter when changing year
  };

  const genres = ['ALL', ...new Set(albums.map(album => album.genre))];
  
  const years = [...new Set(albums.map(album => album.year))].sort((a, b) => b - a);

  const scrollToMore = () => {
    window.scrollBy({
      top: window.innerHeight / 2,
      behavior: 'smooth'
    });
  };

  if (!isOpen) return null;

  if (selectedAlbum) {
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
              <img src={selectedAlbum.cover} alt={`${selectedAlbum.title} by ${selectedAlbum.artist}`} />
            </div>
            <div className="album-info">
              <h3>{selectedAlbum.artist} - {selectedAlbum.title}</h3>
              <p>{selectedAlbum.year} / {selectedAlbum.genre}</p>
              <p>Year Released: {selectedAlbum.year}</p>
              <p>Genre: {selectedAlbum.genre}</p>
              <p>Credit: {selectedAlbum.credit}</p>
              {selectedAlbum.isGrammyNominated && (
                <p className="grammy-nominated">
                  <span className="grammy-icon">🏆</span> Grammy Nominated
                </p>
              )}
            </div>
          </div>
        </div>

        <div className="back-button-container">
          <button className="back-button" onClick={() => setSelectedAlbum(null)}>
            <FontAwesomeIcon icon={faTimes} />
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
      
      {loading ? (
        <div className="loading">Loading...</div>
      ) : (
        <div className="albums-main-container">
          <div className="nav-container">
            <button 
              className={`nav-button ${filter === 'ALL' ? 'active' : ''}`} 
              onClick={() => {
                setFilter('ALL');
                setYearFilter('');
              }}
            >
              ALL
            </button>
            
            <div className="genre-dropdown">
              <span className="genre-label">GENRE</span>
              <div className="genre-list min-h-[250px]"> {/* Added min-height to maintain consistent size */}
                {genres.filter(genre => genre !== 'ALL').map(genre => (
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
              {filteredAlbums.map(album => (
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
                        <p className="album-title">{album.title}</p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
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