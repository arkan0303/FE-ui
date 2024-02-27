import React, { useState, useEffect } from "react";
import ProvinceSelector from "./components/ProvinceSelector";
import RegencySelector from "./components/RegencySelector";
import DistrictSelector from "./components/DistrictSelector";

const App: React.FC = () => {
  const [selectedProvince, setSelectedProvince] = useState("");
  const [selectedRegency, setSelectedRegency] = useState("");
  const [shouldRefresh, setShouldRefresh] = useState(false);

  useEffect(() => {
    if (shouldRefresh) {
      window.location.reload();
      setShouldRefresh(false);
    }
  }, [shouldRefresh]);

  const handleProvinceSelect = (provinceId: string) => {
    if (selectedProvince && selectedRegency) {
      setShouldRefresh(true);
    }
    setSelectedProvince(provinceId);
    setSelectedRegency("");
  };

  const handleRegencySelect = (regencyId: string) => {
    setSelectedRegency(regencyId);
  };

  return (
    <div className="container w-2/4 mx-auto ">
      <h1>Data Wilayah Indonesia</h1>
      <ProvinceSelector onSelect={handleProvinceSelect} />
      {selectedProvince && (
        <>
          <RegencySelector
            provinceId={selectedProvince}
            onSelect={handleRegencySelect}
          />
          {selectedRegency && (
            <DistrictSelector regencyId={selectedRegency} onSelect={() => {}} />
          )}
        </>
      )}
    </div>
  );
};

export default App;
