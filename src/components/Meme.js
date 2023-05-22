/* eslint-disable jsx-a11y/alt-text */
import React from 'react';
import memesData from "../memesData";

const Meme = () => {
	const [meme, setMeme] = React.useState({
		topText: '',
		bottomText: '',
		randomImage: 'https://i.imgflip.com/1bij.jpg'
	})

	const [allMemeImages, setAllMemeImages] = React.useState([])

	React.useEffect(() => {
		fetch("https://api.imgflip.com/get_memes").then(res => res.json()).then(data => setAllMemeImages(data.data.memes))
	}, [])


	const getMemeImage = () => {
		const randomNumber = Math.floor(Math.random() * allMemeImages.length);
		let url = allMemeImages[randomNumber].url;

		setMeme((previous) => ({
			...previous,
			topText: '',
			bottomText: '',
			randomImage: url
		}))

	}

	const handleChange = (event) => {
		
		const {name,value} = event.target;
		
		setMeme((previous) => {
			return {
			...previous,
			[name]: value
			}
			
		})

	}

	return (
		<div className='meme'>
			<div className='inputs'>
				<input onChange={handleChange} name='topText' value={meme.topText} type='text' placeholder='Top Text' />
				<input onChange={handleChange} name='bottomText' value={meme.bottomText} type='text' placeholder='Bottom Text' />
			</div>
			<button onClick={getMemeImage} type='text'>Get a new meme image</button>

			<div className= "meme-section">
				<img className="meme-image" alt='' src={meme.randomImage} />
				<h2 className="meme-text top">{meme.topText}</h2>
				<h2 className="meme-text bottom">{meme.bottomText}</h2>
			</div>
		</div>

	)
}

export default Meme;