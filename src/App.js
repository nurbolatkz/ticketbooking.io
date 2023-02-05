import React, { useState, useEffect } from 'react';
import {
    createBrowserRouter,
    RouterProvider
} from "react-router-dom";
/* ------ import component ------ */
import CinemaCardList from "./components/CinemaCardList";
import CinemaCard from "./components/CinemaCard";
import DateOption from "./components/DateOption";
import SnackList from "./components/SnackList.jsx";
import Modal from "./components/Modal";
import FilmBlock from './components/FilmBlock';
import CinemaPlace from './components/CinemaPlace';
import SnackPage from './components/SnackPage';
import FilmBlock from './components/FilmBlock';
import CinemaPlace from './components/CinemaPlace';import SelectPlace from "./components/SelectPlace";

import CinemaInfo from "./components/CinemaInfo";
import FilmCardList from './components/FilmCardList';
import SelectPlace from './components/SelectPlace';

/* ------ import css ------ */
import './styles/App.css';
import ShortInfoBtn from './components/ShortInfoBtn';












function App() {


    const [cards, setCards] = useState([

        {id:1, address: 'KINO1', img_src: 'logo.jpg'},
        {id:2, address: 'KINO2', img_src: 'logo.jpg'},
        {id:3, address: 'KINO3', img_src: 'logo.jpg'},
        {id:4, address: 'KINO4', img_src: 'logo.jpg'},
        {id:5, address: 'KINO5', img_src: 'logo.jpg'}

    ])

    /*
    const [cards, setCards] = useState([])
    useEffect(() => {
        fetch('http://localhost:8000/cinemas/', {
            method: 'GET',
            headers: {
                accept: 'application/json',
            },})
            .then(res => console.log(res))
            .then(data => {setCards(data)})
    })
*/
    const [fcards, setFCards] = useState([
        {
           id: 1,
            movies : [
                { id:1,
                    film_name: 'Вавилон',
                    date:'01.02.2023',
                    times: ['20:30','21:10','21:40','22:00','00:00'],
                    lang: 'Русский',
                    ageaccess: '16'},
                    {
                        id:2, 
                        film_name: 'Отзвуки прошлого',
                        date: '02.02.2023',
                        times: ['22:30','23:10', '23:40','00:00', '00:10'],
                        lang: 'Русский',
                        ageaccess: '18'
                    }

            ]
        },
        {
           id: 2,
            movies: [
                { id:1,
                    film_name: 'Вавилон',
                    date:'01.02.2023',
                    times: ['20:30','21:10','21:40','22:00','00:00'],
                    lang: 'Русский',
                    ageaccess: '16'},
                    {
                        id:2, 
                        film_name: 'Отзвуки прошлого',
                        date: '02.02.2023',
                        times: ['22:30','23:10', '23:40','00:00', '00:10'],
                        lang: 'Русский',
                        ageaccess: '18'
                    },
                    { id:3,
                        film_name: 'Вавилон',
                        date:'01.02.2023',
                        times: ['20:30','21:10','21:40','22:00','00:00'],
                        lang: 'Русский',
                        ageaccess: '16'},
                        {
                            id:4, 
                            film_name: 'Отзвуки прошлого',
                            date: '02.02.2023',
                            times: ['22:30','23:10', '23:40','00:00', '00:10'],
                            lang: 'Русский',
                            ageaccess: '18'
                        }
            ]
        }

    ])


    const [cartItems, setCartItems] = useState([]);
    const [isModalActive, setIsModalActive] = useState(false);
    const [cinemaCartItem, setCinemaCartItem] = useState({});
    const [selectedDay, setSelectedDay] = useState();
    const[selectedMovie, setSelectedMovie] =  useState({});
    const [selectedTime, setSelectedTime] = useState(); 


    const [snacks, setSnacks] = useState([
        {id:1, snack_name: 'Popcorn', img_src: 'popcorn.jpg', price: 200},
        {id:2, snack_name: 'Coca-Cola', img_src: 'cola.jpg' ,price: 110},
        {id:3, snack_name: 'Fanta', img_src: 'fanta.jpg', price: 100},
        {id:4, snack_name: 'Fuse tea', img_src: 'fusetea.jpg', price: 15},
        {id:5, snack_name: 'Tassay', img_src: 'tassay.jpg', price: 100}

    ])
     

    const addItem = (item) => {
        const exist = cartItems.find((x) => x.id === item.id);
        if (exist) {
            setCartItems(
                cartItems.map((x) =>
                    x.id === item.id ? { ...exist, quantity: exist.quantity + 1} : x
                )

            );

        } else {
            item.quantity = 1;
            setCartItems([...cartItems, { ...item}]);
        }

    };


    const removeItem = (item) => {
        const exist = cartItems.find((x) => x.id === item.id);
        if (exist.quantity === 1) {
            setCartItems(cartItems.filter((x) => x.id !== item.id));
        } else {
            setCartItems(
                cartItems.map((x) =>
                    x.id === item.id ? { ...item, quantity: exist.quantity - 1 } : x
                )
            );
        }
    };


    const addCinemaCartItem = (item) => {
        setCinemaCartItem(item);
        setIsModalActive(false);

    }

    const selectDayOption = (day) => {
        setSelectedDay(day);
    }

    const setMovie = (movie)=>{
        setSelectedMovie(movie);
    }
    
    const router = createBrowserRouter([
        {
            path: "/",
            element:
                <>
                    <CinemaCardList cards ={cards} setActiveModal={setIsModalActive} addCinemaCart={addCinemaCartItem}></CinemaCardList>
                    <Modal active={isModalActive} setActive={setIsModalActive}>
                        <DateOption setActiveModal={setIsModalActive} selectDay={selectDayOption} cinema_cart={cinemaCartItem}></DateOption>
                    </Modal>
                </>,
        },
        {
            path: "/cinemas/:cinemaId/movies",
            element:
                <>
                    <FilmCardList fcards = {fcards}
                                 cinema_cards={cards}
                                  setSelectedMovie={setMovie}
                    ></FilmCardList>
                    <ShortInfoBtn cinema_card={cinemaCartItem}
                                  movie={selectedMovie} 
                                  movie_time={selectedTime}
                                  >

                    </ShortInfoBtn>
                </>
        },
        {
         path: "/test",
         element:
         <>
            <SnackPage></SnackPage>
            <FilmBlock></FilmBlock>
            <AllInfo></AllInfo>
            {/* <SelectPlace></SelectPlace> */}
         </>
        },
        {
         path: "/test",
         element:
         <>
            <SnackPage></SnackPage>
            <FilmBlock></FilmBlock>
            <AllInfo></AllInfo>
            {/* <SelectPlace></SelectPlace> */}
         </>
        },
        {
        path: "/places",
        element:
        <>
           {/* <SelectPlace></SelectPlace> */}
           <CinemaPlace></CinemaPlace>
           <SeatPrice></SeatPrice>
        </>
       },
    ]);


    return (
        /*------ render component
      <div>
          <CinemaCardList cards ={cards} setActiveModal={setIsModalActive} addCinemaCart={addCinemaCartItem}></CinemaCardList>

          <SnackList snack_cards={snacks} addItem={addItem} removeItem={removeItem}></SnackList>
          <Modal active={isModalActive} setActive={setIsModalActive}>
              <DateOption setActiveModal={setIsModalActive} selectDay={selectDayOption}></DateOption>
          </Modal>
           <CinemaInfo cinema_info = {{address: "Kino1", img_src: 'logo.jpg'}}/>
           
            <div>
          <CinemaCardList cards ={cards} ></CinemaCardList>
          <FilmCardList fcards = {fcards}></FilmCardList>
          <DateOption></DateOption>
          <SnackList snack_cards={snacks}></SnackList>
      </div>
      </div>
      */
        <RouterProvider router={router} />


  );
}

export default App;
