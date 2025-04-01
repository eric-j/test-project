import React from "react";

interface VersionFilterProps {
  appVersions: string[];
  selectedVersion: string;
  onVersionChange: (version: string) => void;
}

const VersionFilter: React.FC<VersionFilterProps> = ({
  appVersions,
  selectedVersion,
  onVersionChange,
}) => {
  return (
    <div className="version-filter">
      <label htmlFor="version-select">Filter by Version:</label>
      <select
        id="version-select"
        onChange={(e) => onVersionChange(e.target.value)}
        value={selectedVersion}
      >
        <option value="">All Versions</option>
        {appVersions.map((appVersion) => (
          <option key={appVersion} value={appVersion}>
            {appVersion}
          </option>
        ))}
      </select>
    </div>
  );
};

export default VersionFilter;
