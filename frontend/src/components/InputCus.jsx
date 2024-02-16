const InputCus = ({
  label,
  type = "text",
  name,
  id,
  value,
  onChange,
  onKeyDown,
}) => (
  <div className="mb-4">
    <label className="block mb-2">{label}</label>
    <input
      className="border px-3 py-2 w-full"
      type={type}
      name={name}
      id={id}
      value={value}
      onChange={onChange}
      onKeyDown={onKeyDown}
    />
  </div>
);

export default InputCus;
