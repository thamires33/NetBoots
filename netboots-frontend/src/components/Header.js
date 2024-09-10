import React from 'react';

function Header() {
  return (
    <header style={styles.header}>
      <div style={styles.logo}>NetBoots
      </div>
      <input type="text" placeholder="Buscar produtos..." style={styles.searchBar} />
    </header>
  );
}

const styles = {
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '10px 20px',
    backgroundColor: '#fff',
    boxShadow: '0px 2px 5px rgba(0, 0, 0, 0.1)'
  },
  logo: {
    fontSize: '24px',
    fontWeight: 'bold',
  },
  searchBar: {
    width: '300px',
    padding: '10px',
    borderRadius: '5px',
    border: '1px solid #ccc',
  }
};

export default Header;
