import React, { useState, useEffect } from 'react';

const Useresultados = () => {
    
    const [useresultado, setResultados] = useState([]);
    
    return {
        setResultados,
        useresultado
    }
}
 
export default Useresultados;