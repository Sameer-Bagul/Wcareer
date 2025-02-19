import React from "react";
import Select from "react-select";

const SkillsDropdown = ({ skills, selectedSkills, onSkillsChange }) => {
  // Format the skill options for React-Select
  const formattedOptions = skills.map((skill) => ({
    label: skill,
    value: skill,
  }));

  return (
    <div className="mb-4">
      <label className="block text-sm font-medium mb-2" htmlFor="skillset">
        Skillset
      </label>
      <Select
        id="skillset"
        isMulti
        options={formattedOptions}
        value={selectedSkills.map((skill) => ({ label: skill, value: skill }))}
        onChange={(selectedOptions) =>
          onSkillsChange(selectedOptions.map((option) => option.value))
        }
        placeholder="Select your skills..."
        className="react-select-container"
        classNamePrefix="react-select"
      />
    </div>
  );
};

export default SkillsDropdown;
