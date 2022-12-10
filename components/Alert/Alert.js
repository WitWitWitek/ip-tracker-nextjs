import { setError, setSuccess } from "../../context/alertSlice";
import { useSelector, useDispatch } from "react-redux"
import { useEffect } from "react";
import { useState } from "react";

export default function Alert() {
    const dispatch = useDispatch()
    const { success, error } = useSelector(state => state.alert)
    const [alertClasses, setAlertClasses] = useState(null)
    const [content, setContent] = useState(null)

    useEffect(() => {
        if (success) {
            setAlertClasses(`ip-tracker__alert success`);
            setContent(success);
        } else if (error) {
            setAlertClasses(`ip-tracker__alert error`);
            setContent(error);
        } else if (!error || !success) {
            setAlertClasses(`ip-tracker__alert`);
            setContent(null);
        }
        const clearStates = setTimeout(() => {
            setContent(null)
            dispatch(setError(null))
            dispatch(setSuccess(null))
        }, 7000)

        return () => clearTimeout(clearStates)
        }, [success, error])

    return (
        <>
            {content && <div className={alertClasses}>{content}</div>}
        </>
    )
}
