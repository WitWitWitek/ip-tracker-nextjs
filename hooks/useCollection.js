import { setError, setSuccess } from "../context/alertSlice";
import { useDispatch } from "react-redux";
import { useState } from "react"

export const useColletion = () => {
    const dispatch = useDispatch()
    const [ipData, setIpData] = useState([]);

    const getItemsFromCollection = async () => {
        try {
            const result = await fetch('/api/user/ip-item-controller');
            const { ipAddressesData } = await result.json();
            if (!result.ok) {
                const { message } = await result.json()
                throw new Error(message);
            }
            setIpData(ipAddressesData)
        } catch (err) {
            dispatch(setError(err));
        }
    }

    const addItemToCollection = async (ipAddressData) => {
        try {
            const result = await fetch('/api/user/ip-item-controller', {
                method: 'POST',
                body: JSON.stringify(ipAddressData),
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            const { message } = await result.json()
            if (!result.ok) throw new Error(message);
            dispatch(setSuccess(message))
        } catch (err) {
            dispatch(setError(err.message));
        }
    }

    const deleteItemFromCollection = async (ipAddressData) => {
        try {
            const result = await fetch('/api/user/ip-item-controller', {
                method: 'DELETE',
                body: JSON.stringify(ipAddressData),
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            const { message, ipAddressesData } = await result.json()
            if (!result.ok) throw new Error(message);
            setIpData(ipAddressesData)
            dispatch(setSuccess(message))
        } catch (err) {
            dispatch(setError(err.message));
        }
    }

    return { ipData, getItemsFromCollection, addItemToCollection, deleteItemFromCollection }
}