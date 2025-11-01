"use client";

import React, { useState, useMemo } from "react";
import { Search, Heart } from "lucide-react";

interface City {
  cityId: string;
  name: string;
  country: string;
}

interface CityListProps {
  cityData: City[];
}

/* --------------------------------------------------------------- */
export default function CityList({ cityData }: CityListProps) {
  const [cities, setCities] = useState(cityData);
  const [searchTerm, setSearchTerm] = useState("");
  const [favCities, setFavCities] = useState<City[]>([]);

  const handleSearch = (e: any) => {
    setSearchTerm(e.target.value);

    if (e.target.value === "") {
      setCities(cityData);
    } else {
      const newCities = cityData.filter((city) =>
        city.name.toLowerCase().includes(e.target.value.toLowerCase())
      );
      setCities(newCities);
    }
  };

  const addToFavorites = (cityId: string) => {
    const nonFav = cities.filter((city) => city.cityId !== cityId);
    setCities(nonFav);
    const fav = cities.filter((city) => city.cityId === cityId);
    setFavCities((prev) => [...prev, fav[0]]);
  };

  const removeFromFavorites = (cityId: string) => {
    const fav = favCities.filter((city) => city.cityId !== cityId);
    setFavCities(fav);
    const nonFav = favCities.filter((city) => city.cityId === cityId);
    setCities((prev) => [...prev, nonFav[0]]);
  };

  /* --------------------------------------------------------------- */
  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">City Explorer</h1>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* ==================== ALL CITIES ==================== */}
          <section className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">
              All Cities
            </h2>

            {/* ---- Search ---- */}
            <div className="relative mb-5">
              <Search className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search by City ID..."
                value={searchTerm}
                onChange={handleSearch}
                className="w-full text-black pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* ---- List ---- */}
            <div className="space-y-3 max-h-96 overflow-y-auto">
              {cities.length === 0 ? (
                <p className="text-center py-8 text-gray-500">
                  {searchTerm
                    ? `No cities match "${searchTerm}"`
                    : "No cities left – all are in favorites!"}
                </p>
              ) : (
                cities.map((city) => (
                  <div
                    key={city.cityId}
                    className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                  >
                    <div>
                      <div className="flex items-center gap-2">
                        <code className="text-sm font-mono bg-gray-200 px-2 py-1 rounded">
                          {city.cityId}
                        </code>
                        <span className="font-medium text-gray-900">
                          {city.name}
                        </span>
                      </div>
                      <p className="text-sm text-gray-600 mt-1">
                        {city.country}
                      </p>
                    </div>

                    <button
                      onClick={() => addToFavorites(city.cityId)}
                      className="flex items-center gap-2 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
                    >
                      <Heart className="h-4 w-4" />
                      Add to Favorites
                    </button>
                  </div>
                ))
              )}
            </div>
          </section>

          {/* ==================== FAVORITES ==================== */}
          <section className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">
              Favorite Cities ({favCities.length})
            </h2>

            <div className="space-y-3 max-h-96 overflow-y-auto">
              {favCities.length === 0 ? (
                <p className="text-center py-8 text-gray-500">
                  No favorites yet – add some from the left list!
                </p>
              ) : (
                favCities.map((city) => (
                  <div
                    key={city.cityId}
                    className="flex items-center justify-between p-4 bg-red-50 rounded-lg border border-red-200"
                  >
                    <div>
                      <div className="flex items-center gap-2">
                        <code className="text-sm font-mono bg-red-200 px-2 py-1 rounded text-red-700">
                          {city.cityId}
                        </code>
                        <span className="font-medium text-gray-900">
                          {city.name}
                        </span>
                      </div>
                      <p className="text-sm text-gray-600 mt-1">
                        {city.country}
                      </p>
                    </div>

                    <button
                      onClick={() => removeFromFavorites(city.cityId)}
                      className="flex items-center gap-2 px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
                    >
                      <Heart className="h-4 w-4 fill-current" />
                      Remove
                    </button>
                  </div>
                ))
              )}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}

/* --------------------------------------------------------------- */
/* Example usage (paste in your app)                               */
{
  /* <CityList
    cityData={[
      { cityId: "NYC001", name: "New York", country: "USA" },
      { cityId: "LON002", name: "London", country: "UK" },
      { cityId: "TOK003", name: "Tokyo", country: "Japan" },
      { cityId: "PAR004", name: "Paris", country: "France" },
      { cityId: "SYD005", name: "Sydney", country: "Australia" },
    ]}
  /> */
}
