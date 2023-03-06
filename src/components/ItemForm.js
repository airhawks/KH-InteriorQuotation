import * as React from "react";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";

const UNIT_VALUES = ["Sqft", "Rft", "Sq M", "Meter", "Nos.", "Lumpsum"];

export default function Editor({ data = {}, onChange = () => {} }) {
  const [formData, setData] = React.useState(data);
  const { isHeader, description, serialNumber, unit, quantity, rate } =
    formData;

  const onChangeField = (field, value) => {
    const updatedData = {
      ...formData,
      [field]: value,
    };
    setData(updatedData);
    onChange(updatedData);
  };
  React.useEffect(() => {
    onChange(formData);
  }, []);

  return (
    <form>
      <div className="mb-3">
        <div className="form-check">
          <input
            className="form-check-input"
            type="checkbox"
            defaultChecked={isHeader}
            id="isHeader"
            onChange={(e) => onChangeField("isHeader", e.target.checked)}
          />
          <label className="form-check-label" htmlFor="isHeader">
            Is Header?
          </label>
        </div>

        <label htmlFor="serialNumber" className="form-label">
          Serial Number
        </label>
        <input
          className="form-control"
          id="serialNumber"
          defaultValue={serialNumber}
          onChange={(e) => onChangeField("serialNumber", e.target.value)}
        />

        <label htmlFor="description" className="form-label">
          Description
        </label>
        <textarea
          className="form-control"
          id="description"
          defaultValue={description}
          onChange={(e) => onChangeField("description", e.target.value)}
        />

        {isHeader ? null : (
          <>
            <label htmlFor="quantity" className="mt-3 form-label">
              Quantity
            </label>
            <input
              className="form-control"
              id="quantity"
              defaultValue={quantity}
              onChange={(e) => onChangeField("quantity", e.target.value)}
            />
            <label htmlFor="unit" className="mt-3 form-label">
              Unit
            </label>
            <select
              className="form-select"
              aria-label="Default select example"
              defaultValue={unit}
              onChange={(e) => onChangeField("unit", e.target.value)}
            >
              <option value="">Open this select menu</option>
              <>
                {UNIT_VALUES.map((UNIT) => (
                  <option key={UNIT} value={UNIT}>
                    {UNIT}
                  </option>
                ))}
              </>
            </select>
            <label htmlFor="rate" className="mt-3 form-label">
              Rate
            </label>
            <input
              className="form-control"
              id="rate"
              defaultValue={rate}
              onChange={(e) => onChangeField("rate", e.target.value)}
            />
          </>
        )}
      </div>
    </form>
  );
}
