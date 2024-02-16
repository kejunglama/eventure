const SelectCus = ({ items, selectedItem, handleChange, label, name }) => {
  console.log(selectedItem);
  return (
    <div className="mb-4">
      <label htmlFor={name} className="block mb-2">
        {label}
      </label>
      <select
        id={name}
        name={name}
        className="w-full px-3 py-2 border rounded border-gray-300"
        value={selectedItem}
        onChange={handleChange}
      >
        <option value="">~ Select {label.toLowerCase()}</option>
        {items.map((item) => (
          <option key={item._id} value={item._id}>
            {item.title ?? item.name}
          </option>
        ))}
      </select>
    </div>
  );
};

export default SelectCus;
