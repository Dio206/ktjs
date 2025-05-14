import { useRef } from 'react';

const ProductItem = ({ item, onUpdate, onDelete }) => {
  const clickTimeout = useRef(null);
  const ignoreNextClick = useRef(false);

  const handleSingleClick = () => {
    if (ignoreNextClick.current) {
      ignoreNextClick.current = false;
      return;
    }

    clickTimeout.current = setTimeout(() => {
    }, 300); 
  };

  const handleDoubleClick = () => {
    clearTimeout(clickTimeout.current);
    ignoreNextClick.current = true;
    onDelete(item.id);
  };

  const handleButtonClick = (e, newCount) => {
    e.stopPropagation(); 
    clearTimeout(clickTimeout.current); 
    ignoreNextClick.current = true;     
    onUpdate(item.id, newCount);
  };

  return (
    <div 
      style={styles.card}
      onClick={handleSingleClick}
      onDoubleClick={handleDoubleClick}
    >
      <h3 style={styles.name}>{item.name}</h3>
      <p style={styles.price}>Price: {item.price}</p>
      <div style={styles.controls}>
        <button 
          onClick={(e) => handleButtonClick(e, item.count - 1)} 
          style={styles.button}
        >
          -
        </button>
        <span style={styles.count}>{item.count}</span>
        <button 
          onClick={(e) => handleButtonClick(e, item.count + 1)} 
          style={styles.button}
        >
          +
        </button>
      </div>
    </div>
  );
};

const styles = {
  card: {
    border: '1px solid black',
    padding: '20px',
    width: '200px',
    textAlign: 'center',
    backgroundColor: 'white'
  },
  name: {
    margin: '0 0 10px 0',
    fontSize: '18px',
    fontWeight: 'bold'
  },
  price: {
    margin: '0 0 20px 0',
    fontSize: '16px'
  },
  controls: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    gap: '15px'
  },
  button: {
    fontSize: '20px',
    width: '30px',
    height: '30px',
    cursor: 'pointer'
  },
  count: {
    fontSize: '18px',
    minWidth: '20px',
    textAlign: 'center'
  }
};

export default ProductItem;
