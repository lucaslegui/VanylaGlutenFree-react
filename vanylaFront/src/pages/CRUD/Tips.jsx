import React, { useState, useEffect } from 'react';
import api from '../../api/axios';

const Tips = () => {
  const [tips, setTips] = useState([]);

  useEffect(() => {
    const fetchTips = async () => {
      const response = await api.get('/tips');
      setTips(response.data);
    };
    fetchTips();
  }, []);

  const deleteTip = async (id) => {
    await api.delete(`/tips/${id}`);
    setTips(tips.filter(tip => tip.id !== id));
  };

  return (
    <div>
      <h2>Administrar Tips</h2>
      <ul>
        {tips.map(tip => (
          <li key={tip.id}>
            {tip.name} 
            <button onClick={() => deleteTip(tip.id)}>Eliminar</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Tips;
