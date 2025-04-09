import { useState, useEffect } from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faTimes, faChevronDown, faArrowDown } from "@fortawesome/free-solid-svg-icons"
import axios from "axios"
import icondDown from "./arrow_down_button.png"
import "./Discography.css"

const API_BASE_URL = "https://monorama.com.mx/jerryordonezadmin/wp-json/wp/v2"

const Discography = ({ onClose, albums, setAlbums, filteredAlbums, setFilteredAlbums }) => {
  const [filter, setFilter] = useState("all")
  const [yearFilter, setYearFilter] = useState([])
  const [categoriesFilter, setCategoriesFilter] = useState([])
  const [year, setYear] = useState("")
  const [category, setCategory] = useState("")
  const [selectedAlbum, setSelectedAlbum] = useState(null)
  const [showModal, setShowModal] = useState(false)
  const [loading, setLoading] = useState(true)
  const [loadFirts, setLoadFirts] = useState(false)
  const [page, setPage] = useState(1)
  const [hasMore, setHasMore] = useState(true)
  const [buttonLoading, setButtonLoading] = useState(false)

  const handleModal = (item) => {
    setShowModal(true)
    setSelectedAlbum(item)
  }

  const handleChangeFilter = (type, value) => {
    setFilter("")
    setYear("")
    setCategory("")
    setAlbums([])
    setFilteredAlbums([])
    setPage(1)
    setHasMore(true)

    if (type === "year") {
      setYear(value)
      fetchAlbums(1, value, "")
    }
    if (type === "category") {
      setCategory(value)
      fetchAlbums(1, "", value)
    }
    if (type === "all") {
      setFilter("all")
      fetchAlbums(1)
    }
  }

  const handleLoadMore = () => {
    if (buttonLoading) return
    setButtonLoading(true)
    const nextPage = page + 1
    setPage(nextPage)
    fetchAlbums(nextPage, year, category)
  }

  const fetchAlbums = async (pageNumber = 1, selectedYear = "", selectedCategory = "") => {
    try {
      if (pageNumber === 1) setLoading(true)

      let url = `${API_BASE_URL}/discografia?per_page=12&page=${pageNumber}&_embed`
      if (selectedYear) url += `&year=${selectedYear}`
      if (selectedCategory) url += `&categoria=${selectedCategory}`

      const response = await axios.get(url)

      if (response?.data) {
        setTimeout(() => {
          const newAlbums = response.data.map((album) => ({
            ...album,
            hasFeaturedImage: album?._embedded?.["wp:featuredmedia"]?.[0]?.source_url,
          }))

          const combinedAlbums = pageNumber === 1 ? newAlbums : [...albums, ...newAlbums]
          setAlbums(combinedAlbums)
          setFilteredAlbums(combinedAlbums)

          if (newAlbums.length < 10) setHasMore(false)
          setButtonLoading(false)
        }, 800)
      }
    } catch (error) {
      if (error.response?.status === 400) {
        setHasMore(false)
      } else {
        console.error("Error fetching albums:", error.message)
      }
      setButtonLoading(false)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    setLoadFirts(true)

    const fetchCategories = async () => {
      const response = await axios.get(`${API_BASE_URL}/categoria?per_page=100`)
      if (response?.data) setCategoriesFilter(response.data)
    }

    const fetchYears = async () => {
      const response = await axios.get(`${API_BASE_URL}/year?per_page=100`)
      if (response?.data) setYearFilter(response.data)
    }

    if (!loadFirts) {
      setLoadFirts(true)
      fetchAlbums(1)
      fetchCategories()
      fetchYears()
    }
  }, [])

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
                className={`nav-button ${filter === "all" ? "active" : ""}`}
                onClick={() => handleChangeFilter("all", "all")}
              >
                ALL
              </button>
              <div className="genre-dropdown">
                <span className="genre-label">GENRE</span>
                <div className="genre-list min-h-[250px]">
                  {categoriesFilter.map((item) => (
                    <div
                      key={item?.id}
                      className={`genre-item ${category === item?.id ? "active" : ""}`}
                      onClick={() => handleChangeFilter("category", item?.id)}
                    >
                      {item?.name}
                    </div>
                  ))}
                </div>
              </div>
              <div className="year-dropdown">
                <span className="year-label">YEAR</span>
                <div className="year-list min-h-[250px]">
                  {yearFilter.map((item) => (
                    <div
                      key={item?.id}
                      className={`year-item ${year === item?.id ? "active" : ""}`}
                      onClick={() => handleChangeFilter("year", item?.id)}
                    >
                      {item?.name}
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div className="albums-grid-container">
              <div className="albums-grid">
                {filteredAlbums.map((album) => {
                  const featuredMedia = album?._embedded?.["wp:featuredmedia"]?.[0]
                  const imageUrl =
                    featuredMedia?.media_details?.sizes?.medium?.source_url ||
                    featuredMedia?.source_url ||
                    "ruta/a/imagen/por/defecto.jpg"

                  return (
                    <div key={album.id} className="album-item" onClick={() => handleModal(album)}>
                      <div className="album-thumbnail">
                        <img src={imageUrl || "/placeholder.svg"} alt={album?.title?.rendered || "Album cover"} />
                        <div className="album-overlay">
                          <div className="album-overlay-text">
                            <p className="artist-name">{"album.artist"}</p>
                            <p className="album-title">
                              {album?.title?.rendered?.length > 25
                                ? `${album.title.rendered.substring(0, 25)}...`
                                : album?.title?.rendered}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          </div>
          {showModal && <Modal setShowModal={setShowModal} album={selectedAlbum} />}
        </>
      )}

      <div className="scroll-button-container">
        <button
          className={`scroll-button ${buttonLoading ? "loading" : ""}`}
          onClick={handleLoadMore}
          disabled={buttonLoading || !hasMore}
        >
          {buttonLoading ? (
            <div className="button-loading-animation">
              <div className="button-spinner"></div>
              <span>Loading...</span>
            </div>
          ) : (
            <FontAwesomeIcon icon={faArrowDown} className="down-arrow-icon" />
          )}
        </button>
      </div>
    </div>
  )
}

const Modal = ({ setShowModal, album }) => {
  const featuredMedia = album?._embedded?.["wp:featuredmedia"]?.[0]
  const imageUrl =
    featuredMedia?.media_details?.sizes?.medium?.source_url ||
    featuredMedia?.source_url ||
    "ruta/a/imagen/por/defecto.jpg"
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
            <img src={imageUrl || "/placeholder.svg"} alt={`${album?.title?.rendered}`} />
          </div>
          <div className="album-info">
            <h3>{album?.title?.rendered}</h3>
            <div dangerouslySetInnerHTML={{ __html: album?.content?.rendered }} />
          </div>
        </div>
      </div>

      <div className="back-button-container">
        <button className="back-button" onClick={() => setShowModal(false)}>
          <img
            src={icondDown}
            alt="down"
            style={{
              transform: "rotate(90deg)",
              marginRight: 7
            }}
          />
          <span>back</span>
        </button>
      </div>
    </div>
  )
}

export default Discography
