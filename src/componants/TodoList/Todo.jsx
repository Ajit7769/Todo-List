import React, { useState, useEffect } from 'react';
import { MdDelete } from 'react-icons/md';
import { FaEdit } from 'react-icons/fa';


// get localstorage data 
const getLocalStoragData = () => {
    const list = localStorage.getItem("todo")
    if (list) {
        return JSON.parse(list);
        // eslint-disable-next-line
    } else {
        return [];
    }
}

const Todo = () => {

    const [inputData, setInputData] = useState("");
    const [items, setItems] = useState(getLocalStoragData());
    const [isEditItem, setIsEditItem] = useState("")
    const [isToggle, setIsToggele] = useState(false);

    const handleSubmit = () => {
        if (!inputData) {
            alert("Please Enter The Data...!")
        } else if(inputData && isToggle){
            setItems(items.map((curElem) =>{
                if(curElem.id === isEditItem){
                    return{...curElem , name: inputData}
                }
                return curElem;
            }))

            setInputData("");
            setIsEditItem("");
            setIsToggele(false)

        }else {
            const numberId = {
                id: new Date().getTime().toString(),
                name: inputData
            };
            setItems([...items, numberId])
            setInputData("");
        }
    }

    // Edit Items
    const editItems = (index) => {
        const itemsEfit = items.find((curelem) => {
            return curelem.id === index;
        })
        setInputData(itemsEfit.name);
        setIsEditItem(index);
        setIsToggele(true)
        // eslint-disable-next-line
    }

    const deleteItem = (index) => {
        const updateItems = items.filter((curEle) => {
            return (curEle.id !== index)
        })
        setItems(updateItems);
    }

    // Remove All items

    const removeAll = () => {
        setItems([]);
    }

    // Adding Data To Localsotrage

    useEffect(() => {
        localStorage.setItem("todo", JSON.stringify(items))
        // eslint-disable-next-line
    }, [items])


    return (
        <>

            <div className="bg-slate-100 h-screen">
                <nav className="w-full bg-yellow-400 py-4">
                    <h1 className="text-center text-2xl font-bold">TODO LIST</h1>
                </nav>
                <div className="flex flex-col w-full pt-10 items-center justify-center">
                    <div
                        className="bg-white rounded-md py-8 px-12 shadow-lg">
                        <h1 className="text-xl mt-2 text-center font-semibold text-gray-600">Whrite Todo List</h1>
                        <div className="mt-6 flex space-x-4 m-10 justify-center">
                            <input placeholder="✍️ write hear..."
                                className="bg-gray-100 rounded-md py-2 px-4 border-2 outline-none"
                                value={inputData}
                                onChange={(event) => setInputData(event.target.value)} />
                            {isToggle ? <button className="bg-yellow-400 px-4 rounded-md font-semibold"
                                onClick={handleSubmit}>Edit</button> :
                                <button className="bg-yellow-400 px-4 rounded-md font-semibold"
                                    onClick={handleSubmit}>Send</button>
                            }
                        </div>
                        {
                            items.map((curEle) => {
                                return (
                                    <div className='container'>
                                        {/* <span key={curEle.id}></span> */}
                                        <div className="flex mt-2 bg-white p-4 rounded-md text-dark shadow-lg" key={curEle.id}>
                                            {curEle.name}
                                        </div>
                                        <div className="mx-auto my-auto">
                                            <button className="bg-green-500 hover:bg-green-700 text-black font-bold py-1 px-2 my-1 rounded-full "
                                                onClick={() => editItems(curEle.id)}>
                                                <FaEdit />
                                            </button>
                                            <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 my-1 rounded-full"
                                                onClick={() => deleteItem(curEle.id)}>
                                                <MdDelete />
                                            </button>
                                        </div>

                                    </div>
                                )
                            })
                        }
                        <button className=" bg-yellow-400 hover:bg-yellow-600 text-dark font-bold py-2 px-4 border rounded mx-32 my-5 text-center"
                            onClick={removeAll}>
                            Delete All
                        </button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Todo;
