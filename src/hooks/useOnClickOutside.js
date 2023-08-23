import { useEffect } from "react";

//this hook detects clicks outside of the specified component and calls
export default function useOnClickOutside(ref, handler){
    useEffect(() => {
        //define the listener function to be called on click/touch events
        const listener = (event) => {
            //if the click/touch event originated inside the ref element, do nothing
            if(!ref.current || ref.current.contains(event.target)){
                return;
            }
            //otherwise, call the provided handler funcn
            handler(event);
        };

        //add event listener for mousedown and touchstart events on the document
        document.addEventListener("mousedown", listener);
        document.addEventListener("touchstart", listener);

        //cleanup function to remove the event listeners when the component unmounts or when ref/handler dependencies change
        return() => {
            document.removeEventListener("mousedown", listener);
            document.removeEventListener("touchstart", listener);
        };
    }, [ref, handler]);//only run this effect when the ref or handler changes
}