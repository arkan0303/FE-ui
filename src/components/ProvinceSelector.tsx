import React, { useState, useEffect } from "react";
import { getProvinces } from "../services/api";

interface Province {
  id: string;
  name: string;
}

const ProvinceSelector: React.FC<{
  onSelect: (provinceId: string) => void;
}> = ({ onSelect }) => {
  const [provinces, setProvinces] = useState<Province[]>([]);
  const [selectedProvince, setSelectedProvince] = useState<string>("");

  useEffect(() => {
    const fetchProvinces = async () => {
      const response = await getProvinces();
      setProvinces(response.data);
    };

    fetchProvinces();
  }, []);

  const handleProvinceChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedProvince(e.target.value);
    onSelect(e.target.value);
  };

  return (
    <div className="form-group flex flex-col my-5">
      <label>Pilih Provinsi:</label>
      <select
        className="form-control"
        value={selectedProvince}
        onChange={handleProvinceChange}
      >
        <option value="">Provinsi</option>
        {provinces.map((province: Province) => (
          <option key={province.id} value={province.id}>
            {province.name}
          </option>
        ))}
      </select>
    </div>
  );
};

export default ProvinceSelector;
