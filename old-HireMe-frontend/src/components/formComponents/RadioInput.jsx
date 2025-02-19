const RadioInput = ({ name, label, options }) => {
  return (
    <div className="mb-4">
      <label className="block text-sm font-medium">{label}</label>
      <div className="flex gap-4">
        {options.map((option, idx) => (
          <label key={idx} className="flex items-center gap-2">
            <input
              type="radio"
              name={name}
              value={option}
              required
              className="text-purple-600"
            />
            {option}
          </label>
        ))}
      </div>
    </div>
  );
};

export default RadioInput;
