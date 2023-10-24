import React, { useState, useEffect } from 'react';

const url = 'https://restcountries.com/v2/all';

const CountryCard = ({ country }) => {
  return (
    <div className="card">
      <div className="card-body">
        <img src={country.flags.png} alt={country.name} />
        <h3>{country.name}</h3>
        <p>
          <strong>Capital:</strong> {country.capital}
        </p>
        <p>
          <strong>Population:</strong> {country.population.toLocaleString()}
        </p>
        <p>
          <strong>Language:</strong> {country.languages[0].name}
        </p>
      </div>
    </div>
  );
};

const Worldcount = () => {
  const [country, setCountry] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRow, setSelectedRow] = useState(-1);

  useEffect(() => {
    const fetchWorldCountryData = async () => {
      try {
        const response = await fetch(url);
        const countries = await response.json();
        setCountry(countries);
        console.log(countries);
      } catch (error) {
        console.error('Error fetching country data:', error);
      }
    };

    fetchWorldCountryData();
  }, []);

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleSearchClick = () => {
    // Perform search logic here
    // You can use the searchTerm state to filter the countries
  };

  const formatPopulation = (population) => {
    return population.toLocaleString();
  };

  const handleCountrySelect = (index) => {
    if (selectedRow === index) {
      setSelectedRow(-1);
    } else {
      setSelectedRow(index);
    }
  };

  const filteredCountries = country.filter((country) =>
    country.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const renderTableRows = () => {
    if (filteredCountries.length === 0) {
      return (
        <tr>
          <td colSpan="5" className="no-results">
            No matching countries found !!
          </td>
        </tr>
      );
    }

    return filteredCountries.map((country, index) => {
      const { name, flags, capital, population, languages } = country;
      const flag = flags.png;

      const isRowSelected = index === selectedRow;
      const rowClass = isRowSelected ? 'selected-row' : '';

      return (
        <React.Fragment key={name}>
          <tr className={`table-row ${rowClass}`} onClick={() => handleCountrySelect(index)}>
            <td className="column-divider">
              <img src={flag} alt={name} />
            </td>
            <td className="column-divider">
              <h3>{name}</h3>
            </td>
            <td className="column-divider">
              <h4>{capital}</h4>
            </td>
            <td className="column-divider">
              <h4>{formatPopulation(population)}</h4>
            </td>
            <td className="column-divider">
              <h4>{languages[0].name}</h4>
            </td>
          </tr>
          {isRowSelected && (
            <tr>
              <td colSpan="5" className="card-cell">
                <CountryCard country={country} />
              </td>
            </tr>
          )}
        </React.Fragment>
      );
    });
  };

  return (
    <section className="table">
      <div className="searchBox">
        <input
          className="searchInput"
          type="text"
          placeholder="Enter a country name here"
          value={searchTerm}
          onChange={handleSearchChange}
        />
        <button className="searchButton" onClick={handleSearchClick}>
          <i className="material-icons">search</i>
        </button>
      </div>
      <div className="table-container">
        <table className="world-table">
          <thead>
            <tr>
              <th className="column-divider">
                <h2>Flag</h2>
              </th>
              <th className="column-divider">
                <h2>Country</h2>
              </th>
              <th className="column-divider">
                <h2>Capital</h2>
              </th>
              <th className="column-divider">
                <h2>Population</h2>
              </th>
              <th>
                <h2>Language</h2>
              </th>
            </tr>
          </thead>
          <tbody>{renderTableRows()}</tbody>
        </table>
      </div>
    </section>
  );
};

export default Worldcount;