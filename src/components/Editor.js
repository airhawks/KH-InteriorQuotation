import * as React from "react";
import FormItem from "./ItemForm";
import ClientDetails from "./ClientDetails";

const COLS = ["Sr. No.", "Description", "Quantity", "Unit", "Rate", "Amount"];

const COLS_SIZES = {
  "Sr. No.": 0.7,
  Description: 4,
  Image: 1.5,
  Unit: 1,
  Quantity: 0.5,
  Rate: 0.5,
  Amount: 0.5,
};

const localDataString = window.localStorage.getItem("KH_data");
let localData = JSON.parse(localDataString || "[]");

export default function Editor() {
  const [data, updateData] = React.useState(localData);
  const [editingItem, updateEditingItem] = React.useState({});
  const [focussedItem, setFocussedItem] = React.useState(null);
  const [modaShown, setModalShown] = React.useState(false);

  const setData = (data) => {
    window.localStorage.setItem("KH_data", JSON.stringify(data));
    updateData(data);
  };

  const addItem = () => {
    const item = editingItem;
    // setShowModal();
    focussedItem !== null
      ? setData([
          ...data.slice(0, focussedItem),
          item,
          ...data.slice(focussedItem + 1),
        ])
      : setData([...data, item]);
    data.push({});
  };

  React.useEffect(() => {
    const myModalEl = document.getElementById("exampleModal");
    if (myModalEl == null) {
      return;
    }
    const onShowModal = () => {
      setModalShown(true);
    };
    const onHideModal = () => {
      setModalShown(false);
    };
    myModalEl.addEventListener("show.bs.modal", onShowModal);
    myModalEl.addEventListener("hidden.bs.modal", onHideModal);
    return () => {
      myModalEl.removeEventListener("show.bs.modal", onShowModal);
      myModalEl.removeEventListener("hidden.bs.modal", onHideModal);
    };
  }, []);
  return (
    <div className="container-fluid ">
      <ClientDetails />
      <div className="d-grid gap-2 m-2 d-sm-flex justify-content-sm-end">
        {/* <button
          type="button"
          className="btn btn-primary me-sm-2"
          onClick={addItem}
        ></button> */}
        {focussedItem !== null ? (
          <button
            type="button"
            className="btn btn-primary"
            data-bs-toggle="modal"
            data-bs-target="#exampleModal"
          >
            Edit Item
          </button>
        ) : null}

        {focussedItem !== null ? (
          <button
            type="button"
            className="btn btn-primary"
            onClick={() => {
              setData([
                ...data.slice(0, focussedItem),
                ...data.slice(focussedItem + 1),
              ]);
              setFocussedItem(null);
            }}
          >
            Delete Item
          </button>
        ) : null}
        <button
          type="button"
          className="btn btn-primary"
          data-bs-toggle="modal"
          data-bs-target="#exampleModal"
          onClick={() => setFocussedItem(null)}
        >
          Add Item
        </button>
      </div>
      <table
        className="table table-dark table-striped table-bordered"
        style={{ width: "100%" }}
      >
        <thead>
          <tr>
            {COLS.map((column) => (
              <th
                key={column}
                scope="col"
                className="text-center"
                style={{
                  width: `${COLS_SIZES[column] * 10}%`,
                  wordWrap: "break-word",
                  maxWidth: `${COLS_SIZES[column] * 10}%`,
                }}
              >
                {column}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map(
            (
              {
                description,
                serialNumber,
                isHeader,
                image,
                unit,
                quantity,
                rate,
              },
              index
            ) => (
              <tr
                className={
                  focussedItem === index
                    ? "focussedItem text-center"
                    : "text-center"
                }
                key={index}
                onClick={() => setFocussedItem(index)}
              >
                <th scope="row">{serialNumber}</th>
                <td className="text-start">
                  {description
                    ? description.split("\n").map((line, index) => {
                        if (line.startsWith("HH ")) {
                          return (
                            <div className="fw-bold h6" key={index + line}>
                              {line.replace(/HH /, "")}
                            </div>
                          );
                        } else if (line.startsWith("BB ")) {
                          return (
                            <div
                              key={index + line}
                              className="fw-semibold fst-italic"
                            >
                              {line.replace(/BB /, "")}
                            </div>
                          );
                        } else if (line.startsWith("RR ")) {
                          return (
                            <div key={index + line} className="text-danger">
                              {line.replace(/RR /, "")}
                            </div>
                          );
                        }
                        return (
                          <div key={index + line}>
                            {line.split("**").map((separatedText, index) =>
                              index % 2 === 1 ? (
                                <span
                                  key={index + separatedText}
                                  className="fw-semibold"
                                >
                                  {separatedText}
                                </span>
                              ) : (
                                <span key={index + separatedText}>
                                  {separatedText}
                                </span>
                              )
                            )}
                          </div>
                        );
                      })
                    : null}
                </td>
                {/* <td>
                {image ? <img className="w-100" src={image} alt="" /> : ""}
              </td> */}
                {isHeader ? (
                  <>
                    <td />
                    <td />
                    <td />
                    <td />
                  </>
                ) : (
                  <>
                    <td>{quantity || 0}</td>
                    <td>{unit}</td>
                    <td>{rate || 0}</td>
                    <td>{(quantity || 0) * (rate || 0)}</td>
                  </>
                )}
              </tr>
            )
          )}
        </tbody>
      </table>

      {/* Modal */}

      <div
        className="modal fade"
        id="exampleModal"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel">
                Item Details
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              {modaShown ? (
                <FormItem
                  onChange={updateEditingItem}
                  data={focussedItem !== null ? data[focussedItem] : {}}
                />
              ) : null}
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Close
              </button>
              <button
                type="button"
                className="btn btn-primary"
                data-bs-dismiss="modal"
                onClick={addItem}
              >
                Save
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
