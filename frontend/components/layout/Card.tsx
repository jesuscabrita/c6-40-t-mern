import { MdFavorite, MdFavoriteBorder } from "react-icons/md";
import { MdDeleteSweep as Dele } from "react-icons/md";
import { FiEdit as Edi } from "react-icons/fi";
import { useAuth0 } from "@auth0/auth0-react";
import { Articulos } from "../../lib/interfaces";
import { useState } from "react";
import Link from "next/link";
interface ArticulosCardProps {
    publicaciones: Articulos;
    showDetail?: boolean;
}

export const Card: React.FC<ArticulosCardProps> = ({
    publicaciones,
}) => {

    const API_ENDPOINT = process.env.NEXT_PUBLIC_API_ENDPOINT

    const { user } = useAuth0();

    const [loadingDelete, setLoadingDelete] = useState(false)
    const [loadingFavorite, setLoadingFavorite] = useState(false)

    const handleAddFavorite = () => {
        setLoadingFavorite(true)
        fetch(`${API_ENDPOINT}/user/favorites/${user.sub}`, {
            method: 'POST',
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ article_id: publicaciones._id })
        })
    }

    const handleDelete = () => {
        setLoadingDelete(true)
        fetch(`${API_ENDPOINT}/article/${publicaciones._id}`, {
            method: 'DELETE',
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json'
            }
        })
    }

    return (
        <div className="flex flex-col rounded shadow-xl max-w-sm transition-all duration-500 hover:scale-105 shadow dark:shadow-gray-800 hover:shadow-md dark:hover:shadow-gray-700 ease-in-out items-center p-4 rounded-md bg-white dark:bg-slate-900">
            <div className="relative bottom-0 left-0">
                <button disabled={loadingFavorite} onClick={handleAddFavorite} className="absolute h-13 w-13 p-3 m-3 right-20 justify-center rounded-full bg-transparent hover:bg-red-500 text-red-700 hover:text-white hover:border-transparent animate-pulse ">
                    <i className="flex flex-row items-center">
                        {loadingFavorite ? <MdFavorite size={25} />
                            : <MdFavoriteBorder size={25} />}
                    </i>
                </button>
            </div>
            <div className="flex-shrink-0">
                <img
                    className="h-48 w-full object-cover"
                    src={publicaciones.img?.url}
                    alt={publicaciones.img?.name}

                />
            </div>
            <div className="flex-1 bg-white p-6 flex flex-col justify-between">
                <div className="flex-1">
                    <a href={`article/${publicaciones._id}`} className="block">
                        <h3 className="mt-2 text-xl leading-7 font-semibold text-gray-900">
                            {publicaciones.title}
                        </h3>
                        <p className="mt-3 text-base leading-6 text-gray-500">
                            {publicaciones.content}
                        </p>
                    </a>
                </div>
                <div className="mt-2">
                    <a
                        className="text-teal-400 hover:text-teal-900 text-sm transition duration-150 ease-in-out"
                        href="#"
                    >
                        Read more
                        <svg
                            className="chev inline-block ml-1 w-2 h-2 stroke-2 stroke-current"
                            viewBox="0 0 10 10"
                            fill="none"
                            aria-hidden="true"
                        >
                            <g fill-rule="evenodd">
                                <path d="M1 1l4 4-4 4"></path>
                            </g>
                        </svg>
                        <svg
                            className="arr hidden hover:inline-block ml-1 w-2 h-2 stroke-2 stroke-current"
                            viewBox="0 0 10 10"
                            fill="none"
                            aria-hidden="true"
                        >
                            <g fill-rule="evenodd">
                                <path d="M0 5h7"></path>
                                <path d="M4 1l4 4-4 4"></path>
                            </g>
                        </svg>
                    </a>
                    {user && (
                        <>
                            <button className="text-yellow-600 hover:bg-yellow-200 font-montserrat py-2 px-8 font-medium rounded-xl transition-all duration-300">
                                {" "}
                                <Edi size={20} />{" "}
                            </button>
                            <button
                                onClick={handleDelete}
                                disabled={loadingDelete}
                                className="text-red-600 hover:bg-red-200 font-montserrat py-2 px-8 font-medium rounded-xl transition-all duration-300"
                            >
                                <Dele size={20} />{" "}
                            </button>
                        </>
                    )}
                </div>
                <div className="mt-6 flex items-center">
                    <div className="flex-shrink-0">
                        <a href="#">
                            <img
                                className="h-10 w-10 rounded-full object-cover"
                                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR7HjQfYqYBsspqy-iV0-Cw5uHo-cH-3TbhbAugLXu7RnL9lmqiPZUkqBy-XpKfandg7FQ&usqp=CAU"
                                alt=""
                            />
                        </a>
                    </div>
                    <div className="ml-3">
                        {/* <p className="text-sm leading-5 font-medium text-gray-900">
                            <a href="#" className="hover:underline">
                                Fulanito Perez
                            </a>
                        </p> */}
                        <div className="flex text-sm leading-5 text-gray-500">
                            {/* <time dateTime="2020-03-16">{publicaciones.createdAt}</time> */}
                            <span className="mx-1">·</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
