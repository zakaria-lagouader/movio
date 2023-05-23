import { url } from "../lib/utils";
import moviesData from "./movies.json";

const RandomMovieLink = () => {
	const goToRandomMovie = (
		e: MouseEvent & {
			currentTarget: HTMLAnchorElement;
			target: Element;
		}
	) => {
		e.preventDefault();
		const randomId =
			moviesData.movies[Math.floor(Math.random() * moviesData.movies.length)].id;
		window.location.href = url(`/movies/${randomId}`);
	};
	return (
		<a
			onClick={goToRandomMovie}
			href={url("/")}
			class="block py-2 pl-3 pr-4 rounded md:p-0 md:hover:text-blue-500 text-white hover:bg-gray-700 hover:text-white md:hover:bg-transparent border-gray-700"
		>
			Pick Random
		</a>
	);
};

export default RandomMovieLink;
