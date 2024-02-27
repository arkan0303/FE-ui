import React, { useState, useEffect } from "react";
import { getDistricts } from "../services/api";

interface District {
  id: string;
  name: string;
}

interface DistrictSelectorProps {
  regencyId: string;
  onSelect: (districtId: string) => void;
}

const DistrictSelector: React.FC<DistrictSelectorProps> = ({
  regencyId,
  onSelect,
}) => {
  const [districts, setDistricts] = useState<District[]>([]);
  const [selectedDistrict, setSelectedDistrict] = useState<string>("");

  useEffect(() => {
    const fetchDistricts = async () => {
      if (regencyId) {
        const response = await getDistricts(regencyId);
        setDistricts(response.data);
      }
    };

    fetchDistricts();
  }, [regencyId]);

  const handleDistrictChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedDistrict(e.target.value);
    onSelect(e.target.value);
  };

  return (
    <div className="form-group flex flex-col my-5">
      <label>Pilih Kecamatan:</label>
      <select
        className="form-control"
        value={selectedDistrict}
        onChange={handleDistrictChange}
      >
        <option value="">Kecamatan</option>
        {districts.map((district: District) => (
          <option key={district.id} value={district.id}>
            {district.name}
          </option>
        ))}
      </select>
    </div>
  );
};

export default DistrictSelector;
