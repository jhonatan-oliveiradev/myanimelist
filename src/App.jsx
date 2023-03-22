import { useEffect, useState } from "react";
import { AnimeList } from "./components/AnimeList/AnimeList";
import { AnimeInfo } from "./components/AnimeInfo/AnimeInfo";

function App() {
	const [animeData, setAnimeData] = useState();
	const [search, setSearch] = useState("Naruto");
	const [animeInfo, setAnimeInfo] = useState();

	const getData = async () => {
		const res = await fetch(`https://api.jikan.moe/v4/anime?q=${search}&sfw`);
		const resData = await res.json();
		setAnimeData(resData.data);
	};

	useEffect(() => {
		getData();
	}, [search]);

	const handleSearch = (e) => {
		setSearch(e.target.value);
	};

	return (
		<>
			<div className="header">
				<img src="logo.svg" alt="MyAnimeList logo" />
				<div className="search-box">
					<input
						type="search"
						placeholder="Search your anime"
						onChange={handleSearch}
					/>
				</div>
			</div>

			<div className="container">
				<div className="anime-info">
					{animeInfo && <AnimeInfo animeInfo={animeInfo} />}
				</div>
				<div className="anime-row">
					<h2 className="text-heading">Anime</h2>
					<div className="row">
						<AnimeList animelist={animeData} setAnimeInfo={setAnimeInfo} />
					</div>
				</div>
			</div>
		</>
	);
}

export default App;
