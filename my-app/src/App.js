import { useState } from 'react';
import ProductItem from './ProductItem';

function App() {
  const [data, setData] = useState([
    {id: 1, name: 'Велосипед', price: 1000, count: 1},
    {id: 2, name: 'Самокат', price: 700, count: 1},
    {id: 3, name: 'Ролики', price: 1300, count: 2},
    {id: 4, name: 'Сноуборд', price: 19000, count: 4}
  ]);

  const addProduct = () => {
    const input = prompt('Введите название и цену через пробел:');
    if (!input) return;
    
    const [name, price] = input.split(' ');
    if (!name || !price || isNaN(price)) {
      alert('Ошибка ввода');
      return;
    }

    setData(prev => [...prev, {
      id: Date.now(),
      name,
      price: Number(price),
      count: 1
    }]);
  };

  const updateCount = (id, newCount) => {
    setData(prevData => 
      prevData
        .map(item => {
          if (item.id === id) {
            const updatedCount = Math.min(Math.max(newCount, 0), 25);
            return {...item, count: updatedCount};
          }
          return item;
        })
        .filter(item => item.count > 0)
    );
  };

  return (
    <div style={styles.app}>
      <button onClick={addProduct} style={styles.addButton}>
        Добавить товар
      </button>
      <div style={styles.list}>
        {data.map(item => (
          <ProductItem
            key={item.id}
            item={item}
            onUpdate={updateCount}
            onDelete={(id) => setData(prev => prev.filter(i => i.id !== id))}
          />
        ))}
      </div>
    </div>
  );
}

const styles = {
  app: { padding: 20 },
  addButton: { padding: 10, marginBottom: 20 },
  list: { display: 'flex', flexDirection: 'column', gap: 10}
};

export default App;