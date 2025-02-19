const DatePicker = ({ name, label }) => {
  return (
    <div className="mb-4">
      <label htmlFor={name} className="block text-sm font-medium">
        {label}
      </label>
      <input
        type="date"
        id={name}
        name={name}
        className="bg-gray-50 border rounded-lg w-full p-2"
        required
      />
    </div>
  );
};

export default DatePicker;
