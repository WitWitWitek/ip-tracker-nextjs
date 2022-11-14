import { useState } from "react"

export const useColletion = () => {
    const [ipData, setIpData] = useState(null)

    const getItemsFromCollection = async () => {
        const result = await fetch('/api/user/add-ip-item')
        const data = await result.json()
        setIpData(data.data)
    }

    const addItemToCollection = async (ipAddressData) => {
        const result = await fetch('/api/user/add-ip-item', {
            method: 'POST',
            body: JSON.stringify(ipAddressData),
            headers: {
                'Content-Type': 'application/json'
            }
        })

        const data = await result.json()
        console.log(data);


        // TRY CATCH TUTAJ I DAĆ ISERROR USESTATE
        // tworzenie useReducera na wzór the-dojo i tutaj sobie robic CRUD i odwolywac sie do poszczegolnych scieżek w API
    }

    const deleteItemFromCollection = async (ipAddressData) => {
        const result = await fetch('/api/user/add-ip-item', {
            method: 'DELETE',
            body: JSON.stringify(ipAddressData),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        const data = await result.json();
        console.log(data);
    }

    return { ipData, getItemsFromCollection, addItemToCollection, deleteItemFromCollection }
}