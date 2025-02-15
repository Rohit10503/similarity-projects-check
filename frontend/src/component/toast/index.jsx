import React, { useEffect } from "react";
import "./toast.css"
const Toastart=()=>{

    function showToast() {
        const toast = document.getElementById('toast');
        toast.className = 'toast show';
        setTimeout(() => {
            toast.className = toast.className.replace('show', '');
        }, 13000); // Show for 3 seconds
    }
    useEffect(() => {
        showToast(); // Call showToast when the component mounts
    }, []);

    return <>
    
    <div id="toast" class="toast">This is a toast notification!</div>
    </>
}
export default Toastart;
