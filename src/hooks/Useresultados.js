import React, { useState, useEffect } from 'react';

const Useresultados = () => {
    
    const [useresultado, setResultados] = useState([]);
    console.log(useresultado);
    useEffect(() => {
        console.log(useresultado);       
    }, [useresultado])
    
    return {
        setResultados,
        useresultado
    }
}
 
export default Useresultados;