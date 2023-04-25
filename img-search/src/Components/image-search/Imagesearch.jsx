
import './Imagesearch.css'
import axios from 'axios'
import { useEffect, useState } from 'react';

const Imagesearch = () => {
    const [value, setValue] = useState('')
    const [photosArr, setPhotosArr] = useState([])
    const [input, setInput] = useState('')
    const [loading, setLoading] = useState(false)

    function renderImages() {
        setInput(value)
        setLoading(true)
        axios.get('https://api.flickr.com/services/rest', {
            params: {
                method: 'flickr.photos.search',
                api_key: 'e641ec47263483b463f445a51560a0e4',
                text: input,
                format: 'json',
                nojsoncallback: 1,
                per_page: 30
            }
        })
            .then((res) => {
                setPhotosArr(res.data.photos.photo)
            })
            .finally(() => {
                setLoading(false)
            })
    }

    useEffect(() => {
        if (input !== "") {
            renderImages()
        }
    }, [input])

    console.log(photosArr)

    return (
        <div>
            <h1 className='heading'>Image Search App</h1>
            <button className='bookmark'>bookmark</button>
            <input className='search' type="text" placeholder='Search for high resolution images' 
           onChange={(e) => { setValue(e.target.value) }} />
            <button className='search-button' onClick={() => { renderImages() }}>Search</button>
        
            {loading ? (
                <div className='loading'>Loading...</div>
            ) : (
                <div class="container">
            <div id='img-container'>
                {photosArr.map((photo) => {
                    return (
                        <img className='img' key={photo.id} src={`https://live.staticflickr.com/${photo.server}/${photo.id}_${photo.secret}.jpg`} />
                    )
                })}
            </div>
            </div> 
            )}
        </div>
    )
}

export default Imagesearch


// Key:
//e641ec47263483b463f445a51560a0e4
