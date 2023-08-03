import { useEffect, useState } from "react";
import useFirebase from "./useFirebase";

const UseCart = () => {
    const { user } = useFirebase();
    const { uid } = user;
    //console.log(user);
    const [selectedBooking, setSelectedBooking] = useState([]);
    useEffect(() => {
        fetch(`https://bhojon-bari.onrender.com/cart/${uid}`)
            .then(res => res.json())
            .then(data => {
                if (data.length) {
                    setSelectedBooking(data)
                }
            })
        setSelectedBooking([])
    }, [uid])
    const [allPlayers, setAllPlayers] = useState([]);
    useEffect(() => {
        fetch('http://localhost:5000/players')
            .then(result => result.json())
            .then(data => setAllPlayers(data))
    }, [uid]);
    function addToCart(user, dt) {
        const isHave = selectedBooking.find(select => select._id === dt._id);
        delete dt._id;
        dt.uid = uid;
        dt.user = user;
        dt.status = 'pending';
        if (isHave) {
            alert("Already Booked!! Thanks For Booking......")
        } else {
            fetch('https://bhojon-bari.onrender.com/booking/add', {
                method: "POST",
                headers: { "content-type": "application/json" },
                body: JSON.stringify(dt)
            })
                .then(res => res.json())
                .then(data => {
                    if (data.insertedId) {
                        alert('Added To Cart')
                        const newBooking = [...selectedBooking, dt];
                        setSelectedBooking(newBooking)
                    }
                })
        }
    }
    function remove(id) {
        const isConfirm = window.confirm('Are You Sure? Wanna delete?');
        //console.log(isConfirm);
        if (isConfirm) {
            const url = `https://bhojon-bari.onrender.com/booking/add/${id}`;
            //console.log(url);
            fetch(url, {
                method: 'DELETE'
            })
                .then(res => res.json())
                .then(data => {
                    if (data.deletedCount === 1) {
                        alert('remove successfully')
                        const selectAfterRemove = selectedBooking.filter((select) => !(select._id === id));
                        setSelectedBooking(selectAfterRemove)
                    } else {
                        alert('Something Wrong!')
                    }
                })
        }
    }
    // const setPublic = (publicData) => {
    //     // console.log(category, role);
    //     // const url = `http://localhost:5000/players-cat-rol/${category}/${role}`;
    //     // fetch(url)
    //     //     .then(res => res.json())
    //     //     .then(res => setPublicData(res));
    //     // console.log(publicData);
    //     //make public data
    //     fetch('http://localhost:5000/public', {
    //         method: "POST",
    //         headers: { "content-type": "application/json" },
    //         body: JSON.stringify(publicData)
    //     })
    //         .then(res => res.json())
    //         .then(data => {
    //             if (data.insertedId) {
    //                 alert('Showing To Public Now');
    //             }
    //         })
    // }
    return { addToCart, selectedBooking, remove, allPlayers };
};

export default UseCart;