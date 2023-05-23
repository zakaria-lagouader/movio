import { createSignal, createEffect, createMemo, For } from "solid-js";
import Fuse from "fuse.js";
import debounce from "lodash.debounce";
import moviesData from "./movies.json";
import { url } from "../lib/utils";

type Movie = {
	id: number;
	title: string;
	release_date: string;
	poster_path: string | null;
};

const MovieSearchInput = () => {
	const [searchQuery, setSearchQuery] = createSignal("");
	const [filteredMovies, setFilteredMovies] = createSignal<Movie[]>([]);

	const debouncedSearch = debounce((value) => {
		const fuseOptions = {
			keys: ["title"],
		};

		const fuse = new Fuse(moviesData.movies, fuseOptions);
		const results = fuse.search(value);
		setFilteredMovies(results.map((result) => result.item).slice(0, 3));
	}, 200); // Debounce delay of 300ms

	createEffect(() => {
		debouncedSearch(searchQuery());
	});

	const handleSearchInputChange = (
		event: InputEvent & {
			currentTarget: HTMLInputElement;
			target: HTMLInputElement;
		}
	) => {
		setSearchQuery(event.target!.value);
	};

	const MemoizedMovieList = createMemo(() => (
		<div class="absolute top-[110%] left-0 w-full rounded-lg bg-gray-700 overflow-hidden">
			<For each={filteredMovies()}>
				{(movie) => (
					<a
						href={url(`/movies/${movie.id}`)}
						class="flex items-center gap-4 px-4 py-3 border-b border-b-gray-600 bg-gray-700 hover:bg-gray-800 transition"
					>
						<img
							class="w-12 h-12 rounded-lg object-cover block"
							src={`https://image.tmdb.org/t/p/original/${movie.poster_path}`}
							alt={`${movie.title} poster image`}
						/>
						<div class="text-left">
							<p class="text-white font-medium text-lg">{movie.title}</p>
							<p class="text-sm text-gray-200">
								{movie.release_date.split("-")[0]}
							</p>
						</div>
					</a>
				)}
			</For>
		</div>
	));

	return (
		<div class="max-w-4xl mx-auto">
			<label for="default-search" class="mb-2 text-sm font-medium sr-only text-white">
				Search
			</label>
			<div class="relative">
				<div class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
					<svg
						aria-hidden="true"
						class="w-5 h-5 text-gray-400"
						fill="none"
						stroke="currentColor"
						viewBox="0 0 24 24"
						xmlns="http://www.w3.org/2000/svg"
					>
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="2"
							d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
						></path>
					</svg>
				</div>
				<input
					type="search"
					value={searchQuery()}
					onInput={handleSearchInputChange}
					class="block w-full p-4 pl-10 text-sm border rounded-lg bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500"
					placeholder="Search Batman, christian bale..."
					required
				/>
				<button
					type="button"
					class="text-white absolute right-2.5 bottom-2.5 focus:ring-4 focus:outline-none font-medium rounded-lg text-sm px-4 py-2 bg-blue-600 hover:bg-blue-700 focus:ring-blue-800"
				>
					Search
				</button>
				<MemoizedMovieList />
			</div>
		</div>
	);
};

export default MovieSearchInput;
